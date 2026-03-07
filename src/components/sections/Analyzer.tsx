"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import TerminalWindow from "@/components/ui/TerminalWindow";
import ReportCard from "@/components/ui/ReportCard";
import { isValidUrl, hashUrl } from "@/lib/utils";
import type { AnalysisScores, Tier, Quadrant, EntityType } from "@/lib/types";

interface ToolCallResult {
  entityName: string;
  entityType: EntityType;
  quadrant: Quadrant;
  sector: string;
  scores: AnalysisScores;
  tier: Tier;
  redFlags: string[];
  greenFlags: string[];
  waysIsDacc: string[];
  waysNotDacc: string[];
  waysMoreDacc: string[];
  oneLiner: string;
}

const transport = new DefaultChatTransport({
  api: "/api/analyze",
});

export default function Analyzer() {
  const [input, setInput] = useState("");
  const [textFallback, setTextFallback] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [toolResult, setToolResult] = useState<ToolCallResult | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const outputRef = useRef<HTMLDivElement>(null);

  // Refinement state
  const [refinementUsed, setRefinementUsed] = useState(false);
  const [isRefining, setIsRefining] = useState(false);
  const [feedbackInput, setFeedbackInput] = useState("");
  const [firstPassAnalysisText, setFirstPassAnalysisText] = useState("");
  const [currentUrl, setCurrentUrl] = useState("");
  const [currentUrlHash, setCurrentUrlHash] = useState("");

  // First pass chat
  const { messages, status, sendMessage } = useChat({
    transport,
    onError: (error) => {
      const msg = error.message || "";
      try {
        const parsed = JSON.parse(msg);
        if (parsed.needsTextInput) {
          setTextFallback(true);
          setErrorMessage(parsed.error || "[WARN] Could not reach URL. Describe the project below.");
          return;
        }
        if (parsed.error) {
          setErrorMessage(parsed.error);
          return;
        }
      } catch {
        // Not JSON
      }
      setErrorMessage("[SYSTEM ERROR] Looks like we're accelerating a bit too fast. Try again in a moment.");
    },
  });

  // Second chat for refinement
  const refineTransport = useMemo(
    () => new DefaultChatTransport({ api: "/api/analyze/refine" }),
    []
  );
  const {
    messages: refineMessages,
    status: refineStatus,
    sendMessage: sendRefineMessage,
  } = useChat({
    transport: refineTransport,
    onError: () => {
      setErrorMessage("[SYSTEM ERROR] Refinement failed. Try again.");
      setIsRefining(false);
    },
  });

  const isStreaming = status === "streaming" || status === "submitted";
  const isRefineStreaming = refineStatus === "streaming" || refineStatus === "submitted";

  // Extract tool results from first-pass messages + capture analysis text
  useEffect(() => {
    let analysisText = "";
    for (const msg of messages) {
      if (msg.role === "assistant" && msg.parts) {
        for (const part of msg.parts) {
          if (part.type === "text") {
            analysisText += part.text;
          }
          if (part.type === "tool-score_project") {
            const toolPart = part as unknown as {
              type: string;
              state: string;
              input?: ToolCallResult;
              output?: ToolCallResult;
            };
            let result: ToolCallResult | null = null;
            if (toolPart.state === "output-available" && toolPart.output) {
              result = toolPart.output;
            } else if (toolPart.state === "input-available" && toolPart.input) {
              result = toolPart.input;
            }
            if (result) {
              setToolResult(result);
              setAnalysisComplete(true);
            }
          }
        }
      }
    }
    if (analysisText) {
      setFirstPassAnalysisText(analysisText);
    }
  }, [messages]);

  // Extract tool results from refine messages
  useEffect(() => {
    for (const msg of refineMessages) {
      if (msg.parts) {
        for (const part of msg.parts) {
          if (part.type === "tool-score_project") {
            const toolPart = part as unknown as {
              type: string;
              state: string;
              input?: ToolCallResult;
              output?: ToolCallResult;
            };
            let result: ToolCallResult | null = null;
            if (toolPart.state === "output-available" && toolPart.output) {
              result = toolPart.output;
            } else if (toolPart.state === "input-available" && toolPart.input) {
              result = toolPart.input;
            }
            if (result) {
              setToolResult(result);
              setAnalysisComplete(true);
              setRefinementUsed(true);
              setIsRefining(false);
            }
          }
        }
      }
    }
  }, [refineMessages]);

  // Auto-scroll
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [messages, refineMessages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setAnalysisComplete(false);
    setToolResult(null);

    if (textFallback && textInput.trim()) {
      try {
        await sendMessage({
          text: textInput,
        }, {
          body: { textInput: textInput.trim(), url: null },
        });
      } catch (err) {
        setErrorMessage(err instanceof Error ? err.message : "Analysis failed");
      }
      return;
    }

    const url = input.trim();
    if (!url) return;

    if (!isValidUrl(url)) {
      setErrorMessage("[ERROR] Invalid URL format. Include https://");
      return;
    }

    setCurrentUrl(url);
    setCurrentUrlHash(hashUrl(url));

    // Pre-check: cache and rate limit
    try {
      const res = await fetch("/api/analyze/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.rateLimited) {
          setErrorMessage(data.error);
          return;
        }
        if (data.needsTextInput) {
          setTextFallback(true);
          setErrorMessage(data.error);
          return;
        }
        if (data.cached && data.analysis) {
          setToolResult({
            entityName: data.analysis.entity_name,
            entityType: data.analysis.entity_type,
            quadrant: data.analysis.quadrant,
            sector: data.analysis.sector || "",
            scores: {
              defensive: data.analysis.score_defensive,
              decentralization: data.analysis.score_decentralization,
              democratic: data.analysis.score_democratic,
              acceleration: data.analysis.score_acceleration,
            },
            tier: data.analysis.tier,
            redFlags: data.analysis.red_flags || [],
            greenFlags: data.analysis.green_flags || [],
            waysIsDacc: data.analysis.ways_is_dacc || [],
            waysNotDacc: data.analysis.ways_not_dacc || [],
            waysMoreDacc: data.analysis.ways_more_dacc || [],
            oneLiner: data.analysis.one_liner || "",
          });
          setFirstPassAnalysisText(data.analysis.analysis_markdown || "");
          setAnalysisComplete(true);
          return;
        }
      }
    } catch {
      // If check fails, proceed to streaming anyway
    }

    // Start streaming analysis
    try {
      await sendMessage({
        text: `Analyze: ${url}`,
      }, {
        body: { url },
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Analysis failed";
      try {
        const parsed = JSON.parse(msg);
        if (parsed.needsTextInput) {
          setTextFallback(true);
          setErrorMessage(parsed.error || "[WARN] Could not reach that URL. Describe the project below.");
          return;
        }
        if (parsed.error) {
          setErrorMessage(parsed.error);
          return;
        }
      } catch {
        // Not JSON
      }
      if (msg.includes("429")) {
        setErrorMessage("[RATE LIMIT] Whoa, you're accelerating too fast! Take a breather and try again in a few minutes.");
      } else {
        setErrorMessage("[BLOCKED] That site's defenses held up against our scanner. Describe the project instead.");
        setTextFallback(true);
      }
    }
  };

  const handleRefineSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackInput.trim() || !toolResult) return;

    setIsRefining(true);
    setAnalysisComplete(false);
    setErrorMessage("");

    try {
      await sendRefineMessage({
        text: feedbackInput,
      }, {
        body: {
          url: currentUrl,
          urlHash: currentUrlHash,
          previousAnalysis: firstPassAnalysisText,
          previousScores: toolResult.scores,
          feedback: feedbackInput.trim(),
        },
      });
    } catch {
      setErrorMessage("[SYSTEM ERROR] Refinement failed. Try again.");
      setIsRefining(false);
      setAnalysisComplete(true);
    }
  };

  const reset = () => {
    setInput("");
    setTextInput("");
    setTextFallback(false);
    setAnalysisComplete(false);
    setToolResult(null);
    setErrorMessage("");
    setRefinementUsed(false);
    setIsRefining(false);
    setFeedbackInput("");
    setFirstPassAnalysisText("");
    setCurrentUrl("");
    setCurrentUrlHash("");
  };

  // Render streaming messages from either first pass or refine pass
  const renderStreamingMessages = (
    msgs: typeof messages,
  ) =>
    msgs
      .filter((m) => m.role === "assistant")
      .map((msg) => (
        <div key={msg.id} className="text-sm whitespace-pre-wrap">
          {msg.parts?.map((part, i) => {
            if (part.type === "text") {
              if (part.text.startsWith("{") && part.text.includes('"error"')) return null;
              return (
                <span key={i}>
                  {part.text.split(/(\[.*?\])/).map((segment, j) =>
                    segment.match(/^\[.*\]$/) ? (
                      <span key={j} className="text-dacc-green font-bold">
                        {segment}
                      </span>
                    ) : (
                      <span key={j} className="text-dacc-text">
                        {segment}
                      </span>
                    )
                  )}
                </span>
              );
            }
            return null;
          })}
        </div>
      ));

  return (
    <section id="analyzer" className="py-16 sm:py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <span className="font-mono text-xs text-dacc-green tracking-widest uppercase">
            // The Analyzer
          </span>
          <h2 className="font-mono text-2xl sm:text-4xl font-bold text-dacc-text mt-4">
            Is it <span className="text-dacc-green text-glow-green">d/acc</span>?
          </h2>
          <p className="font-sans text-dacc-muted mt-2">
            Paste any project URL. Get an instant d/acc diagnostic.
          </p>
        </div>

        {/* Report Card view */}
        {analysisComplete && toolResult && (
          <div className="mb-8">
            <ReportCard result={toolResult} isRefined={refinementUsed} />

            {/* Feedback input — only shows once, before refinement */}
            {!refinementUsed && (
              <form onSubmit={handleRefineSubmit} className="mt-4">
                <div className="border border-dacc-green/20 bg-dacc-surface/30 p-4">
                  <label className="font-mono text-xs text-dacc-cyan block mb-2">
                    CORRECTIONS / ADDITIONAL CONTEXT
                  </label>
                  <textarea
                    value={feedbackInput}
                    onChange={(e) => setFeedbackInput(e.target.value)}
                    placeholder="Got insider knowledge? Tell us what we got wrong or missed..."
                    className="w-full h-24 bg-dacc-bg border border-dacc-green/10 p-3 text-dacc-text font-mono text-sm placeholder:text-dacc-muted/50 outline-none resize-none"
                  />
                  <button
                    type="submit"
                    disabled={!feedbackInput.trim()}
                    className="btn-primary mt-2 w-full disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    [RE-ANALYZE WITH CORRECTIONS]
                  </button>
                </div>
              </form>
            )}

            <button
              onClick={reset}
              className="btn-secondary mt-4 w-full"
            >
              Analyze another project
            </button>
          </div>
        )}

        {/* Terminal view */}
        {!analysisComplete && (
          <TerminalWindow
            title={isRefining ? "d/acc diagnostic v1.0 — refinement" : "d/acc diagnostic v1.0"}
          >
            {/* Input — only show when not refining */}
            {!isRefining && (
              <form onSubmit={handleSubmit} className="mb-4">
                {!textFallback ? (
                  <div className="flex items-center gap-2">
                    <span className="text-dacc-green shrink-0">is_it_dacc?</span>
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="paste a link >"
                      className="flex-1 bg-transparent border-none outline-none text-dacc-text font-mono text-sm placeholder:text-dacc-muted/50"
                      disabled={isStreaming}
                    />
                    {!isStreaming && (
                      <button
                        type="submit"
                        className="text-dacc-green hover:text-dacc-green/80 font-mono text-sm"
                      >
                        [SCAN]
                      </button>
                    )}
                  </div>
                ) : (
                  <div>
                    <p className="text-dacc-yellow text-sm mb-2">
                      {errorMessage}
                    </p>
                    <textarea
                      value={textInput}
                      onChange={(e) => setTextInput(e.target.value)}
                      placeholder="Describe the project here..."
                      className="w-full h-32 bg-dacc-surface/50 border border-dacc-green/20 p-3 text-dacc-text font-mono text-sm placeholder:text-dacc-muted/50 outline-none resize-none"
                      disabled={isStreaming}
                    />
                    <button
                      type="submit"
                      className="btn-primary mt-2 w-full"
                      disabled={isStreaming}
                    >
                      [ANALYZE TEXT]
                    </button>
                  </div>
                )}
              </form>
            )}

            {/* Error display */}
            {errorMessage && !textFallback && (
              <div className="text-dacc-red text-sm font-mono mb-4">
                {errorMessage}
              </div>
            )}

            {/* Streaming output */}
            <div
              ref={outputRef}
              className="max-h-96 overflow-y-auto space-y-2"
            >
              {isRefining
                ? renderStreamingMessages(refineMessages)
                : renderStreamingMessages(messages)}
              {(isStreaming || isRefineStreaming) && (
                <span className="text-dacc-green animate-blink">▌</span>
              )}
            </div>
          </TerminalWindow>
        )}
      </div>
    </section>
  );
}
