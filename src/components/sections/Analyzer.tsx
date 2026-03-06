"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import TerminalWindow from "@/components/ui/TerminalWindow";
import ReportCard from "@/components/ui/ReportCard";
import { isValidUrl } from "@/lib/utils";
import type { AnalysisScores, Tier, Quadrant, EntityType } from "@/lib/types";

interface ToolCallResult {
  entityName: string;
  entityType: EntityType;
  quadrant: Quadrant;
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

  const { messages, status, sendMessage } = useChat({
    transport,
    onFinish: () => {
      setAnalysisComplete(true);
    },
    onError: (error) => {
      setErrorMessage(error.message || "[SYSTEM ERROR] Analysis failed.");
    },
  });

  const isStreaming = status === "streaming" || status === "submitted";

  // Extract tool results from messages (AI SDK v6 format)
  useEffect(() => {
    for (const msg of messages) {
      if (msg.parts) {
        for (const part of msg.parts) {
          // AI SDK v6: tool parts are typed as "tool-{toolName}"
          if (part.type === "tool-score_project") {
            const toolPart = part as unknown as {
              type: string;
              state: string;
              input?: ToolCallResult;
              output?: ToolCallResult;
            };
            if (toolPart.state === "output-available" && toolPart.output) {
              setToolResult(toolPart.output);
            } else if (toolPart.state === "input-available" && toolPart.input) {
              // Tool was called but no execute fn — use input as result
              setToolResult(toolPart.input);
            }
          }
        }
      }
    }
  }, [messages]);

  // Auto-scroll
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [messages]);

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

    // Pre-check: cache and rate limit (HEAD-like check to avoid double analysis)
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
      // Try to extract error from JSON response body
      if (msg.includes("429")) {
        setErrorMessage("[RATE LIMIT] Too many requests. Please wait a few minutes.");
      } else {
        setErrorMessage(`[ERROR] ${msg}`);
      }
    }
  };

  const reset = () => {
    setInput("");
    setTextInput("");
    setTextFallback(false);
    setAnalysisComplete(false);
    setToolResult(null);
    setErrorMessage("");
  };

  return (
    <section id="analyzer" className="py-16 sm:py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <span className="font-mono text-xs text-dacc-green tracking-widest uppercase">
            // The Analyzer
          </span>
          <h2 className="font-mono text-3xl sm:text-4xl font-bold text-dacc-text mt-4">
            Is it <span className="text-dacc-green text-glow-green">d/acc</span>?
          </h2>
          <p className="font-sans text-dacc-muted mt-2">
            Paste any project URL. Get an instant d/acc diagnostic.
          </p>
        </div>

        {/* Report Card view */}
        {analysisComplete && toolResult && (
          <div className="mb-8">
            <ReportCard result={toolResult} />
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
          <TerminalWindow title="d/acc diagnostic v1.0">
            {/* Input */}
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
              {messages
                .filter((m) => m.role === "assistant")
                .map((msg) => (
                  <div key={msg.id} className="text-sm whitespace-pre-wrap">
                    {msg.parts?.map((part, i) => {
                      if (part.type === "text") {
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
                ))}
              {isStreaming && (
                <span className="text-dacc-green animate-blink">▌</span>
              )}
            </div>
          </TerminalWindow>
        )}
      </div>
    </section>
  );
}
