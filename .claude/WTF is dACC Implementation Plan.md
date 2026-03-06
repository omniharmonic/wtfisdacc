

**WTF is d/acc**

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Implementation Plan

Task-by-Task Build Sequence

`wtfisdacc.com`

Version 1.0  |  March 6, 2026  
Open Civics  |  Benjamin

**TARGET: LAUNCH TODAY**

# **1\. Launch Strategy**

This is a rapid launch build. The goal is to get a functional, beautiful v1 live at wtfisdacc.com today. We achieve this by building in strict priority order: the most impressive and functional features first, with progressive enhancement after launch.

## **1.1 What “Launch” Means**

Launch \= a live URL at wtfisdacc.com that a visitor can use to understand d/acc and run at least one AI-powered analysis. It does not mean every feature is polished or every project is pre-analyzed. We ship, then iterate.

## **1.2 Build Priority Stack**

Everything is ordered by impact-to-effort ratio. If we run out of time, we cut from the bottom:

| Priority | Feature | Impact | Effort | Status |
| :---- | :---- | :---- | :---- | :---- |
| P0 | Project scaffold \+ Vercel deploy | Foundation for everything | 30 min | Must ship |
| P0 | Hero section with terminal aesthetic | First impression; the hook | 1-2 hrs | Must ship |
| P0 | Framework explainer (static) | Core educational value | 2-3 hrs | Must ship |
| P0 | The d/acc Analyzer (streaming) | Marquee feature; viral driver | 3-4 hrs | Must ship |
| P1 | Interactive quadrant map | Deep framework engagement | 2-3 hrs | Should ship |
| P1 | Shareable report pages | Viral loop; social sharing | 1-2 hrs | Should ship |
| P2 | Project directory | Browse existing research | 2-3 hrs | Nice to have |
| P2 | Resources section | Links to source material | 30 min | Nice to have |
| P3 | OG image generation | Social card previews | 1-2 hrs | Post-launch |
| P3 | Pre-generated reports for 20 projects | Content depth | 1-2 hrs | Post-launch |

# **2\. Phase 0: Project Scaffold (30 minutes)**

**Goal:** Deployable Next.js skeleton live on Vercel with all infrastructure connected.

## **2.1 Task List**

* Create GitHub repository (personal account, public or private)

* npx create-next-app@latest wtf-is-dacc \--typescript \--tailwind \--app \--src-dir \--import-alias "@/\*"

* Install core dependencies: framer-motion, @ai-sdk/anthropic, ai, @supabase/supabase-js, cheerio, recharts

* Install dev dependencies: @types/node

* Create Supabase project; run schema SQL (analyses, projects, rate\_limits tables)

* Configure tailwind.config.ts with custom d/acc theme (colors, fonts, animations)

* Set up globals.css with CSS custom properties, scanline overlay, glow utilities

* Configure next.config.js (image domains, headers)

* Push to GitHub; connect to Vercel; deploy skeleton

* Add environment variables in Vercel dashboard

* Verify: skeleton deploys and loads at Vercel preview URL

## **2.2 Supabase Schema SQL**

Run this in the Supabase SQL editor:

`-- analyses table`

`CREATE TABLE analyses (`

  `id uuid PRIMARY KEY DEFAULT gen_random_uuid(),`

  `url text NOT NULL,`

  `url_hash text UNIQUE NOT NULL,`

  `entity_name text NOT NULL DEFAULT 'Unknown',`

  `entity_type text NOT NULL DEFAULT 'other',`

  `quadrant text NOT NULL DEFAULT 'digital_defense',`

  `score_defensive int2 DEFAULT 0 CHECK (score_defensive BETWEEN 0 AND 25),`

  `score_decentralization int2 DEFAULT 0 CHECK (score_decentralization BETWEEN 0 AND 25),`

  `score_democratic int2 DEFAULT 0 CHECK (score_democratic BETWEEN 0 AND 25),`

  `score_acceleration int2 DEFAULT 0 CHECK (score_acceleration BETWEEN 0 AND 25),`

  `score_total int2 GENERATED ALWAYS AS (`

    `score_defensive + score_decentralization + score_democratic + score_acceleration`

  `) STORED,`

  `tier text NOT NULL DEFAULT 'not_aligned',`

  `red_flags jsonb DEFAULT '[]',`

  `green_flags jsonb DEFAULT '[]',`

  `analysis_markdown text NOT NULL DEFAULT '',`

  `ways_is_dacc jsonb DEFAULT '[]',`

  `ways_not_dacc jsonb DEFAULT '[]',`

  `ways_more_dacc jsonb DEFAULT '[]',`

  `one_liner text DEFAULT '',`

  `model_used text NOT NULL DEFAULT 'claude-sonnet-4-20250514',`

  `created_at timestamptz DEFAULT now(),`

  `expires_at timestamptz DEFAULT now() + interval '7 days'`

`);`

`CREATE INDEX idx_analyses_url_hash ON analyses(url_hash);`

`CREATE INDEX idx_analyses_created ON analyses(created_at DESC);`

`CREATE INDEX idx_analyses_tier ON analyses(tier);`

`-- RLS: public read, service-only write`

`ALTER TABLE analyses ENABLE ROW LEVEL SECURITY;`

`CREATE POLICY "Public read" ON analyses FOR SELECT USING (true);`

`CREATE POLICY "Service write" ON analyses FOR INSERT`

  `WITH CHECK (auth.role() = 'service_role');`

`-- rate_limits table`

`CREATE TABLE rate_limits (`

  `ip_hash text PRIMARY KEY,`

  `window_start timestamptz NOT NULL DEFAULT now(),`

  `request_count int4 DEFAULT 1`

`);`

`-- projects table`

`CREATE TABLE projects (`

  `id uuid PRIMARY KEY DEFAULT gen_random_uuid(),`

  `name text NOT NULL,`

  `url text NOT NULL,`

  `description text DEFAULT '',`

  `quadrant text NOT NULL,`

  `sector text DEFAULT '',`

  `alignment_rating int2 DEFAULT 3 CHECK (alignment_rating BETWEEN 1 AND 5),`

  `latest_analysis_id uuid REFERENCES analyses(id),`

  `logo_url text DEFAULT '',`

  `created_at timestamptz DEFAULT now()`

`);`

## **2.3 npm install command**

`npm install framer-motion @ai-sdk/anthropic ai @supabase/supabase-js`

  `cheerio recharts zod crypto-js`

**Deliverable:** Live Vercel URL showing a dark-themed placeholder page. All infra connected.

# **3\. Phase 1: Hero Section \+ Design System (1-2 hours)**

**Goal:** Stunning first impression. Visitor lands on the page and immediately gets the vibe.

## **3.1 Task List**

* Build MatrixRain.tsx: canvas-based falling characters using d/acc terms

* Build GlitchText.tsx: CSS glitch animation component for headings

* Build TypeWriter.tsx: character-by-character text reveal hook

* Build Hero.tsx section: full-viewport hero with matrix rain background, glitch headline, typewriter tagline, two CTA buttons

* Build Nav.tsx: sticky navigation bar with anchor links, scroll-spy active state, terminal-style aesthetic

* Configure JetBrains Mono and Inter fonts via next/font

* Test on mobile: hero should be compelling on a phone screen

## **3.2 Key Implementation Details**

### **MatrixRain Component**

Uses HTML Canvas with requestAnimationFrame for performance. Characters are drawn in columns at varying speeds, fading from bright green (\#00FF88) to transparent. Instead of random characters, uses a pool of d/acc-related terms: ZK, PRIVACY, DEFENSE, COORDINATION, SOVEREIGN, PLURAL, RESILIENT, DECENTRALIZE, ACCELERATE, VERIFY, ATTEST, ENCRYPT, PERMISSIONLESS.

Performance: render at 30fps on mobile (skip every other frame), 60fps on desktop. Use devicePixelRatio for sharp rendering. Dispose canvas on unmount to prevent memory leaks.

### **Hero Layout**

`<section class="relative h-screen flex flex-col items-center justify-center">`

  `<MatrixRain className="absolute inset-0 z-0" />`

  `<div class="relative z-10 text-center">`

    `<GlitchText>`

      `<h1 class="font-mono text-6xl text-dacc-green">WTF is d/acc?</h1>`

    `</GlitchText>`

    `<TypeWriter text="Decentralized. Democratic. Differential. Defensive."`

      `className="font-mono text-xl text-dacc-muted mt-4" />`

    `<div class="mt-8 flex gap-4">`

      `<a href="#explainer" class="btn-primary">Learn the framework</a>`

      `<a href="#analyzer" class="btn-secondary">Analyze a project</a>`

    `</div>`

  `</div>`

`</section>`

**Deliverable:** Visitor sees a dark, animated landing page with matrix rain, glitch headline, and navigation.

# **4\. Phase 2: Framework Explainer (2-3 hours)**

**Goal:** Anyone can understand d/acc in 2 minutes of scrolling.

## **4.1 Task List**

* Build Explainer.tsx with scroll-triggered reveal animations (Framer Motion \+ IntersectionObserver)

* Section A: "The Problem" — animated fork diagram showing tech acceleration diverging into offense vs. defense

* Section B: "The Axes" — introduce Atoms/Bits (vertical) and Survive/Thrive (horizontal) with hover explanations

* Section C: "The Quadrant Map" (static preview) — the 2x2 grid assembles on scroll with color coding

* Section D: "The Four D’s Test" — interactive checklist: Decentralized? Democratic? Differential? Accelerating?

* Section E: "The Scoring" — brief overview of the 100-point rubric with example scores

* Mobile test: all scroll animations degrade gracefully on mobile

## **4.2 Content Strategy**

Each sub-section should be no more than 2-3 short paragraphs. The power is in the visuals and progressive reveal, not walls of text. Think: one idea per viewport height.

Write all copy in short, punchy terminal-style sentences. Example:

`// The Problem`

`Technology accelerates. That’s not the question.`

`The question is: acceleration toward what?`

`Toward centralized control? Or distributed resilience?`

`Toward offense? Or defense?`

`d/acc is a filter. A framework. A diagnostic.`

`It asks: does this technology make the world`

`more defensible, more democratic, more decentralized?`

**Deliverable:** Scrolling through the page teaches d/acc fundamentals with beautiful animations.

# **5\. Phase 3: The d/acc Analyzer (3-4 hours)**

**Goal:** The marquee feature works end to end. User pastes a URL, gets a streaming AI diagnosis.

## **5.1 Task List**

### **Backend (lib/ \+ api/)**

* Build lib/scraper.ts: URL content extraction with Cheerio, GitHub API special handling, content sanitization and truncation

* Build lib/prompt.ts: system prompt constructor with full 100-point rubric, persona instructions, output format

* Build lib/tools.ts: Zod-validated score\_project tool definition for structured output

* Build lib/supabase.ts: typed Supabase client with helper functions (checkCache, saveAnalysis, checkRateLimit)

* Build lib/utils.ts: normalizeUrl(), hashUrl(), formatScore() helpers

* Build api/analyze/route.ts: streaming endpoint with rate limiting, cache check, URL scraping, Claude streaming, and cache save

### **Frontend (components/)**

* Build TerminalWindow.tsx: reusable terminal chrome (title bar, minimize/maximize buttons, rounded corners, dark bg)

* Build Analyzer.tsx: terminal chat interface using Vercel AI SDK’s useChat() hook

* Implement terminal prompt: blinking cursor, "is\_it\_dacc? paste a link \> \_" placeholder

* Implement streaming display: tokens appear as typed text, stage headers highlighted in green

* Build RadarChart.tsx: 4-axis spider chart using Recharts for score visualization

* Build TierBadge.tsx: color-coded tier indicator (green=T1, blue=T2, yellow=T3, red=NA)

* Build ReportCard.tsx: final analysis display with scores, radar chart, tier badge, expandable sections

* Implement transition: terminal UI morphs into report card when analysis completes

* Add text input fallback: if URL scraping fails, prompt user to paste description

* Test with 5+ real URLs: Aztec Network, Gitcoin, GrapheneOS, ENS, a non-d/acc project

## **5.2 System Prompt (Complete Draft)**

This is the full system prompt that will be embedded in lib/prompt.ts. It’s the single most important piece of code in the system:

`You are the d/acc Diagnostic System — an AI evaluator that assesses projects`

`and people against Vitalik Buterin’s d/acc framework (decentralized,`

`democratic, differential, defensive acceleration).`

`## Your Task`

`Analyze the provided content and evaluate it against the d/acc rubric.`

`Think through your analysis step by step, showing your reasoning.`

`## Presentation Style`

`Present your analysis as a diagnostic scan using these stage headers:`

`[SCANNING TARGET...] - Identify the entity and its category`

`[ANALYZING DEFENSIVE ORIENTATION...] - Score dimension 1`

`[EVALUATING DECENTRALIZATION...] - Score dimension 2`

`[ASSESSING DEMOCRATIC ALIGNMENT...] - Score dimension 3`

`[MEASURING ACCELERATION POTENTIAL...] - Score dimension 4`

`[FLAG DETECTION...] - Check for red and green flags`

`[COMPILING VERDICT...] - Final synthesis`

`For each dimension, cite specific evidence from the content.`

`Be honest about what the content does and doesn’t tell you.`

`## The d/acc Evaluation Rubric (100 points total)`

`### Dimension 1: Defensive Orientation (0-25)`

`- Shifts offense/defense balance toward defense? (0-10)`

`- Enables defense without centralized authority? (0-10)`

`- Resilient to single points of failure? (0-5)`

`### Dimension 2: Decentralization (0-25)`

`- Control distributed across many actors? (0-10)`

`- Can resist capture by any single entity? (0-10)`

`- Codebase open source? (0-5)`

`### Dimension 3: Democratic/Pluralistic (0-25)`

`- Empowers individuals over institutions? (0-10)`

`- Enables coordination without coercion? (0-10)`

`- Preserves user sovereignty? (0-5)`

`### Dimension 4: Acceleration Potential (0-25)`

`- Enables positive technological progress? (0-10)`

`- Viable path to mainstream adoption? (0-10)`

`- Creates compounding benefits? (0-5)`

`### Tier Classification`

`- 85-100: Tier 1 (Core d/acc)`

`- 70-84:  Tier 2 (Growth)`

`- 55-69:  Tier 3 (Speculative)`

`- < 55:   Not d/acc Aligned`

`### Red Flags (automatic downgrade)`

`- Single point of failure in key infra`

`- Centralized upgrade mechanism`

`- Closed source core`

`- Insider token distribution > 50%`

`- History of censorship`

`### Green Flags (bonus consideration)`

`- Government-independent operation demonstrated`

`- Survived adversarial conditions`

`- Vitalik endorsement or funding`

`- Balvi/Protocol Labs/EF funding`

`- Community Notes-style bridging algorithm`

`## Output Instructions`

`1. Stream your analysis using the stage headers above`

`2. Call the score_project tool with your scores and findings`

`3. After the tool call, provide a brief final narrative summary`

`If the content is insufficient, say so and score conservatively.`

`Never fabricate evidence. Never hallucinate project features.`

**Deliverable:** The analyzer works. Paste a URL, watch it stream a diagnostic, see the report card.

# **6\. Phase 4: Interactive Quadrant Map (2-3 hours)**

**Goal:** Visual taxonomy of the d/acc landscape that users can explore.

## **6.1 Task List**

* Build QuadrantMap.tsx: 2x2 grid layout with color-coded quadrants

* Each quadrant clickable → expands to show sectors within it

* Each sector clickable → shows primitives and example projects

* Color coding: Physical Defense=green, Physical Coordination=yellow, Digital Defense=blue, Digital Coordination=teal

* Hover effects: glow matching quadrant color

* Project cards within sectors show: name, one-liner, alignment stars, link to analyzer

* Mobile: quadrants stack vertically; tap to expand

## **6.2 Data Source**

The quadrant map content is hardcoded for v1 (not from Supabase). The data structure is defined in lib/quadrant-data.ts and contains the complete taxonomy from the research:

* 4 Quadrants, each with:

* 3-5 Sectors, each with:

* 2-4 Primitives and 3-8 example projects

Post-launch, this data can be migrated to Supabase and made dynamic.

**Deliverable:** Interactive, beautiful visualization of the d/acc landscape.

# **7\. Phase 5: Shareable Report Pages (1-2 hours)**

**Goal:** Every analysis generates a shareable URL with proper social previews.

## **7.1 Task List**

* Build report/\[id\]/page.tsx: SSR page that fetches analysis from Supabase by ID

* Layout: clean report card with radar chart, scores, tier badge, full analysis text

* Meta tags: dynamic title ("{Project} | d/acc Score: {X}/100"), description, OG image

* Share buttons: Copy link, Twitter/X share with pre-populated text

* "Run your own analysis" CTA that links back to the analyzer section

* Handle: analysis not found → friendly 404 with redirect to home

## **7.2 URL Structure**

`https://wtfisdacc.com/report/{analysis-uuid}`

The analyzer automatically generates this URL after each analysis completes and displays it as a "Share this report" link.

**Deliverable:** Analyses are shareable via URL with proper social card previews.

# **8\. Domain Setup & Launch Checklist**

**Goal:** Live at wtfisdacc.com with everything working.

## **8.1 Domain Configuration**

* Add wtfisdacc.com to Vercel project as custom domain

* Update DNS records (Vercel provides A and CNAME records to add at registrar)

* Verify SSL certificate auto-provisioned by Vercel

* Set NEXT\_PUBLIC\_SITE\_URL=https://wtfisdacc.com in environment variables

* Test: site loads at https://wtfisdacc.com with valid SSL

## **8.2 Pre-Launch Validation**

* Hero loads with matrix rain animation

* Framework explainer scrolls smoothly with animations

* Analyzer accepts a URL and streams a complete analysis

* Report card displays after analysis with correct scores

* Shareable report page loads for a completed analysis

* Rate limiting works (11th request in an hour returns 429\)

* Mobile responsive: all sections usable on phone

* No console errors in browser DevTools

* Lighthouse performance score \> 80 (can optimize to 90+ post-launch)

## **8.3 Launch Sequence**

1. **1\.** Final push to main → Vercel production deploy

2. **2\.** Verify production URL loads correctly

3. **3\.** Connect custom domain

4. **4\.** Run 3 test analyses on production to verify end-to-end

5. **5\.** Ship it. Share the URL.

# **9\. Post-Launch Roadmap**

These are enhancements to build after the site is live and generating traffic.

## **9.1 Week 1 After Launch**

* Dynamic OG image generation (api/og/route.tsx) for social cards with scores and radar chart

* Pre-analyze top 20 projects from the Notion database (batch script)

* Project directory page with search and quadrant filters

* Resources section with links to Vitalik’s essays and the research portal

* PostHog analytics integration for tracking analyzer usage patterns

* Bug fixes and performance improvements based on real traffic

## **9.2 Week 2-3 After Launch**

* Person analysis: handle Twitter/X profiles with bio extraction

* "Compare" feature: analyze two projects side by side

* Community submissions: form to suggest projects for analysis

* Supabase Auth \+ optional wallet connect for higher rate limits

* API documentation for programmatic access to d/acc evaluations

* Notion two-way sync: keep Supabase projects in sync with research portal

# **10\. Dependency Map**

This shows what blocks what. Independent tasks within a phase can be parallelized.

| Task | Depends On | Blocks |
| :---- | :---- | :---- |
| GitHub repo \+ Next.js scaffold | Nothing | Everything |
| Supabase project \+ schema | Nothing | Analyzer backend, shareable reports |
| Tailwind theme \+ globals.css | Scaffold | All UI components |
| MatrixRain.tsx | Scaffold | Hero section |
| TypeWriter.tsx, GlitchText.tsx | Scaffold | Hero section |
| Hero.tsx | MatrixRain, TypeWriter, GlitchText, theme | Nothing (independent section) |
| Nav.tsx | Theme | Nothing (can be added anytime) |
| Explainer.tsx | Theme, Framer Motion | Nothing (independent section) |
| lib/scraper.ts | Scaffold, cheerio | Analyzer API route |
| lib/prompt.ts | Nothing (pure text) | Analyzer API route |
| lib/tools.ts | Zod | Analyzer API route |
| lib/supabase.ts | Supabase project | Analyzer API route, report pages |
| api/analyze/route.ts | scraper, prompt, tools, supabase | Analyzer frontend |
| Analyzer.tsx (frontend) | TerminalWindow, API route | Nothing |
| ReportCard.tsx | RadarChart, TierBadge | Analyzer completion UI |
| report/\[id\]/page.tsx | supabase.ts, ReportCard | Nothing (independent route) |
| QuadrantMap.tsx | Theme, quadrant-data.ts | Nothing (independent section) |

# **11\. What Benjamin Needs To Do**

Before or during the build, the following are needed from you:

1. **1\.** Create an Anthropic API account and generate an API key (console.anthropic.com). Set a monthly spend limit of $100 to start.

2. **2\.** Point wtfisdacc.com DNS to Vercel (they’ll provide A/CNAME records after the domain is added to the project).

3. **3\.** Review the system prompt in Phase 3 and flag any d/acc rubric adjustments before it goes live.

4. **4\.** Prepare a launch tweet / announcement post to share once the site is live.

5. **5\.** Decide: should the GitHub repo be public (open source, community contributions) or private?

Everything else is engineering work that I’ll handle.

# **12\. Risk Register**

| Risk | Likelihood | Impact | Mitigation |
| :---- | :---- | :---- | :---- |
| Claude API timeout on complex analyses | Medium | High | 60s Vercel function timeout; show partial results if timeout hits |
| URL scraping fails for specific sites | High | Medium | Text input fallback always available; graceful error messaging |
| Rate limit too restrictive / too permissive | Medium | Low | Configurable in code; adjust based on launch day traffic |
| Prompt injection via scraped content | Low | High | Content sanitization \+ strong system prompt boundaries |
| Vercel free tier function limits hit | Low | Medium | Pro plan ($20/mo) provides 1M function invocations |
| Anthropic API costs spike from viral traffic | Low | High | Caching reduces repeat calls; rate limiting caps spend; usage alerts |
| Mobile performance issues with matrix rain | Medium | Medium | 30fps cap on mobile; reduce column density; disable on low-power |

