

**WTF is d/acc**

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Product Requirements Document

Technical Architecture & Implementation Plan

Prepared for: Open Civics / Benjamin  
Date: March 6, 2026  
Version: 1.0

**CONFIDENTIAL**

# **1\. Executive Summary**

WTF is d/acc is an interactive educational website that explains Vitalik Buterin’s d/acc (decentralized, democratic, differential, defensive acceleration) philosophy and provides a live AI-powered tool for evaluating whether any project or person aligns with d/acc principles.

Inspired by WTF is Quadratic Funding (wtfisqf.com)—the site that popularized quadratic funding through an elegant interactive explainer—this project aims to do the same for d/acc: make a complex framework instantly understandable and practically useful through beautiful design and interactive tooling.

The site’s signature feature is the “Is it d/acc?” analyzer: a terminal-style chat interface where users paste a link to any project or person and receive a real-time, streaming diagnostic report that evaluates the target across four scored dimensions, flags risks, and provides actionable recommendations—all powered by Claude’s API with the d/acc evaluation rubric embedded as structured context.

### **Key Metrics for Success**

* Viral sharing of analyzer results (target: 10K unique analyses in first month)

* Framework comprehension (measured via optional quiz/feedback)

* Developer/investor adoption of the evaluation rubric

* Media coverage in crypto and tech press

# **2\. Vision & Design Philosophy**

## **2.1 The Metaphor: Light Cracking Into Darkness**

The site’s visual identity is built on a central metaphor: defensive technology as light breaking through the darkness of centralized surveillance and control. The aesthetic draws from hacker culture—terminal interfaces, monospace type, scanline effects, matrix-style data streams—but instead of the typical dark-on-dark pessimism, the site progressively introduces light. Green and cyan glow emanates from the content itself, as if the d/acc framework is illuminating something that was previously hidden.

Think: a white-hat hacker’s workstation. Not the villain’s lair—the resistance’s command center.

## **2.2 Design References**

* **WTF is QF (wtfisqf.com):** Single-concept explainer with interactive calculator. Clean, focused, shareable. Our structural model for the educational sections.

* **Terminal aesthetic:** JetBrains Mono / Fira Code typography. Blinking cursors. Command-line prompts. Scanline overlay effects. CRT phosphor glow.

* **Data visualization:** Matrix-rain ambient animation. Real-time streaming text. Diagnostic progress indicators. Radar/spider charts for scoring.

* **Light-breaking-through:** Dark backgrounds (near-black \#0F0F23) that transition to illuminated sections. Green (\#00FF88) and cyan (\#00D4FF) as primary accent colors. Subtle glow effects on interactive elements. Progressive disclosure that literally brightens the page as you scroll.

## **2.3 Target Users**

| Persona | Description | Primary Need |
| :---- | :---- | :---- |
| Crypto-native investor | Already familiar with Ethereum ecosystem, evaluating projects | Rigorous framework for d/acc alignment assessment |
| Developer / builder | Building in web3, wants to understand if their work qualifies | Clear criteria and self-assessment tool |
| Policy / governance nerd | Interested in democratic coordination mechanisms | Intellectual framework connecting tech to governance |
| Curious newcomer | Heard d/acc mentioned, wants to understand the concept | Accessible explanation with zero assumed knowledge |

# **3\. Site Architecture & Sections**

The site is a single-page application with six distinct sections, each progressively introducing more depth. Users scroll through the educational content before arriving at the interactive analyzer. An anchor-based nav bar provides direct access to any section.

## **3.1 Section 1: Hero / Landing**

**Purpose:** Instant hook. Communicate what d/acc is in under 5 seconds.

* **Headline:** “WTF is d/acc?” in large, glowing terminal-style type

* **Subline:** “Decentralized. Democratic. Differential. Defensive. Acceleration.” typewriter-animated

* **Background:** Subtle matrix-rain effect with d/acc-related terms (ZK, privacy, defense, coordination) falling as data streams

* **CTA:** Two buttons: “Learn the framework” (scroll) and “Analyze a project” (jump to analyzer)

* **Visual:** Animated 2x2 quadrant grid that assembles itself as the page loads

## **3.2 Section 2: The Framework Explainer**

**Purpose:** Progressive disclosure of the d/acc framework, from simple to sophisticated.

This section uses scroll-triggered animations to build understanding layer by layer:

1. **The Problem:** Technology accelerates. But for whom? Offense or defense? Centralized or distributed? One animated graphic showing the fork in the road.

2. **The Axes:** Introduce Atoms vs. Bits (vertical axis) and Survive vs. Thrive (horizontal axis). Interactive: user can hover/click each axis label to see examples.

3. **The Quadrant Map:** The full 2x2 assembles. Each quadrant is clickable and expands to show its sectors, primitives, and example projects.

4. **The Four D’s Test:** Interactive checklist: Is it Decentralized? Is it Democratic? Is it Differential (favors defense)? Does it Accelerate? Each with a toggle the user can mentally apply to any project.

## **3.3 Section 3: The Interactive Quadrant Map**

**Purpose:** Deep-dive visual taxonomy of the d/acc landscape.

A full-screen, interactive 2x2 grid where each quadrant contains its sectors, and each sector reveals its primitives and notable projects on click. Color-coded per the visual taxonomy:

* **Physical Defense (green):** Biodefense, Open Hardware, Resilient Infrastructure

* **Physical Coordination (yellow):** Energy, Property Rights, Environmental Markets, Civic Tech

* **Digital Defense (blue):** ZK Systems, Privacy Computing, Identity, Communication, Security

* **Digital Coordination (teal):** Funding Mechanisms, Epistemics, Governance, Monetary, Data

Each project card shows: name, one-line description, d/acc alignment rating (1-5 stars), and a link to the full analyzer report if available.

## **3.4 Section 4: The d/acc Analyzer (Marquee Feature)**

**Purpose:** The site’s killer feature. An AI-powered diagnostic tool that evaluates any project or person against the d/acc framework.

See Section 4 for complete feature specification.

## **3.5 Section 5: Project Directory**

**Purpose:** Browsable database of 90+ d/acc-aligned projects already evaluated.

* Searchable and filterable by quadrant, sector, tier, and alignment rating

* Each entry links to a pre-generated analyzer report

* Data sourced from the existing Notion database of projects

* Community submission pipeline (future): anyone can submit a project for analysis

## **3.6 Section 6: Resources & Attribution**

* Links to Vitalik’s original essays (My Techno-Optimism, d/acc: one year later)

* The evaluation rubric as a downloadable PDF

* Framework one-pager for stakeholders

* Links to Carl’s research, the Notion portal, and relevant events

* Credits and open-source license information

# **4\. The d/acc Analyzer: Complete Feature Specification**

## **4.1 User Flow**

The analyzer presents as a terminal-style chat window with a blinking cursor prompt that reads:

*`> is_it_dacc? paste a link to scan _`*

The user pastes a URL (project website, GitHub repo, Twitter/X profile, or any web page) and presses Enter. The system then executes the following sequence, with each step streaming visually in the terminal:

1. **TARGET ACQUISITION:** The URL is fetched server-side. Content is extracted (title, description, about text, README, key claims). A loading animation shows scanning progress.

2. **IDENTITY RESOLUTION:** System identifies what type of entity it is (protocol, dApp, hardware project, person, DAO, etc.) and which quadrant(s) it most likely maps to.

3. **DIMENSIONAL ANALYSIS:** Four scored evaluations stream in sequence, each with reasoning visible:

* Defensive Orientation (0-25 pts): Does it shift offense/defense balance toward defense?

* Decentralization (0-25 pts): Is control distributed? Can it resist capture?

* Democratic/Pluralistic (0-25 pts): Does it empower individuals over institutions?

* Acceleration Potential (0-25 pts): Does it enable positive progress at scale?

4. **FLAG DETECTION:** Red flags (centralization risks, closed source, insider token distribution) and green flags (government-independent operation, Vitalik endorsement, community-notes-style algorithms) are checked and reported.

5. **VERDICT COMPILATION:** The system synthesizes a final report card with: total score (0-100), investment tier classification (Tier 1-3 or Not Aligned), a plain-English summary, “Ways it IS d/acc,” “Ways it is NOT d/acc,” and “How it could be MORE d/acc.”

## **4.2 The Streaming UX**

The analysis must feel alive and intelligent, not like a loading spinner. The user needs to see the AI working through the rubric in real time. This is accomplished through:

* **Streaming tokens:** Claude’s response streams token-by-token via the Vercel AI SDK, appearing as typed text in the terminal window.

* **Stage headers:** Each analysis phase is preceded by a stylized header (e.g., “\[SCANNING TARGET...\]” in green monospace) with a progress indicator.

* **Thinking out loud:** The system prompt instructs Claude to reason through each dimension explicitly, citing specific evidence from the scraped content. Users see the logic, not just the conclusion.

* **Visual transitions:** As the analysis completes, the terminal interface transitions to a styled report card—the “light cracking through” moment. Dark scanning UI gives way to a clean, bright results panel.

## **4.3 The Report Card**

Once analysis is complete, the terminal transforms into a shareable report card:

* **Header:** Project/person name, logo (if extractable), one-line identity

* **Score visualization:** Radar/spider chart showing the four dimensions. Total score prominently displayed.

* **Tier badge:** Color-coded tier indicator (Tier 1 \= green, Tier 2 \= blue, Tier 3 \= yellow, Not Aligned \= red)

* **Analysis sections:** Three expandable sections: “Ways it IS d/acc,” “Ways it is NOT d/acc,” “How to be MORE d/acc”

* **Flags:** Red and green flags with explanations

* **Share:** One-click copy link, Twitter/X share button with pre-populated text, downloadable image of the report card

## **4.4 Prompt Architecture**

The analyzer’s intelligence comes from a carefully structured system prompt that embeds the entire d/acc evaluation framework as Claude’s operating context. The prompt includes:

* The full 100-point rubric with scoring criteria for each sub-dimension

* Red flag and green flag definitions with automatic scoring adjustments

* Tier classification thresholds

* Instructions to cite specific evidence from the scraped content

* Output format instructions for structured JSON (scores) and markdown (narrative)

* Persona instructions: “You are a d/acc diagnostic system. Analyze with rigor and cite evidence. Be honest about limitations in available data.”

The prompt uses Claude’s tool-use capability to enforce structured output: a “score\_project” tool definition ensures consistent JSON scoring, while the narrative analysis streams as natural text.

## **4.5 Content Extraction Pipeline**

When a user pastes a URL, the server-side extraction pipeline runs before the AI analysis:

| URL Type | Extraction Method | Data Extracted |
| :---- | :---- | :---- |
| Generic website | Server-side fetch \+ Cheerio HTML parser | Title, meta description, visible body text (truncated to 4K tokens), Open Graph data |
| GitHub repository | GitHub REST API (public repos) | README content, repo description, language breakdown, license, stars, contributor count |
| Twitter/X profile | Basic metadata extraction | Bio, display name, follower count (limited by X API restrictions) |
| Known project (cached) | Supabase lookup | Previously generated analysis, project metadata from our database |

Fallback: If the URL cannot be scraped or yields insufficient content, the analyzer prompts the user to paste a text description instead.

# **5\. Design System**

## **5.1 Color Palette**

| Token | Hex | Usage |
| :---- | :---- | :---- |
| \--bg-primary | \#0F0F23 | Main background, terminal areas |
| \--bg-secondary | \#1A1A2E | Card backgrounds, elevated surfaces |
| \--bg-tertiary | \#16213E | Hover states, subtle differentiation |
| \--text-primary | \#E0E0E0 | Body text on dark backgrounds |
| \--text-secondary | \#9999AA | Muted text, metadata |
| \--accent-green | \#00FF88 | Primary accent, d/acc positive, CTA buttons |
| \--accent-cyan | \#00D4FF | Secondary accent, links, interactive elements |
| \--accent-yellow | \#FFD93D | Warnings, Physical Coordination quadrant |
| \--accent-red | \#FF4444 | Red flags, errors, Not Aligned tier |
| \--glow-green | rgba(0,255,136,0.15) | Green glow effects behind key elements |
| \--glow-cyan | rgba(0,212,255,0.10) | Cyan glow effects, hover states |

## **5.2 Typography**

| Element | Font | Size | Weight |
| :---- | :---- | :---- | :---- |
| Display / Hero | JetBrains Mono | 48-72px | Bold |
| Section Headings | Inter | 28-36px | Semibold |
| Body Text | Inter | 16-18px | Regular |
| Terminal / Code | JetBrains Mono | 14-16px | Regular |
| Metadata / Labels | Inter | 12-14px | Medium |
| Buttons / CTA | JetBrains Mono | 14-16px | Bold |

## **5.3 Visual Effects**

* **Matrix rain:** Ambient background animation using canvas. Characters fall in columns, fading from bright green to transparent. Uses d/acc terminology instead of random characters.

* **Scanline overlay:** Subtle CSS repeating-linear-gradient creating horizontal scan lines over dark sections. Low opacity (0.03) so it’s felt, not seen.

* **CRT glow:** CSS text-shadow with multiple layered green/cyan glows on terminal text elements. Applied sparingly to headers and the analyzer interface.

* **Typing animation:** Custom React hook that reveals text character by character at variable speed. Used for the hero tagline and analyzer stage headers.

* **Scroll-triggered reveals:** Intersection Observer API triggers fade-in and slide-up animations as sections enter viewport. Content builds as you scroll.

* **Glitch effect:** CSS animation using clip-path and transform to create occasional glitch artifacts on the hero text. Subtle and infrequent.

# **6\. Technical Architecture**

## **6.1 Stack Overview**

| Layer | Technology | Rationale |
| :---- | :---- | :---- |
| Framework | Next.js 14+ (App Router) | Server components, API routes, streaming support, Vercel-native |
| Language | TypeScript | Type safety across full stack, better DX |
| Styling | Tailwind CSS \+ CSS Modules | Utility-first for speed, modules for complex animations |
| Animation | Framer Motion | Production-grade animations with React integration |
| AI | Vercel AI SDK \+ Anthropic Provider | First-class streaming support, useChat hook, tool calling |
| Database | Supabase (PostgreSQL) | Analysis caching, project directory, rate limiting, analytics |
| Hosting | Vercel | Edge functions, streaming support, CI/CD, preview deployments |
| Source Control | GitHub | PR-based workflow, branch previews via Vercel |
| Analytics | Vercel Analytics \+ PostHog | Performance monitoring \+ product analytics |
| Domain | wtfisdacc.com (or similar) | Memorable, brandable, referencing wtfisqf.com |

## **6.2 System Architecture Diagram**

The system follows a standard Next.js architecture with one critical addition: the AI streaming pipeline for the analyzer.

**`[User Browser]`**

    `|  HTTPS request`

    `v`

**`[Vercel Edge Network]`**

    `|  Route to appropriate handler`

    `v`

**`[Next.js App Router]`**

    `|-- Static pages (SSG): Hero, Explainer, Resources`

    `|-- Dynamic pages (SSR): Project Directory`

    `|-- API Route: /api/analyze (streaming)`

    `|       |`

    `|       |-- 1. URL Extraction Service`

    `|       |-- 2. Supabase Cache Check`

    `|       |-- 3. Claude API (streaming response)`

    `|       |-- 4. Cache result to Supabase`

    `|`

    `v`

**`[Supabase] -- PostgreSQL + Row Level Security`**

    `|-- analyses table (cached results)`

    `|-- projects table (directory data)`

    `|-- rate_limits table (per-IP tracking)`

## **6.3 API Route: /api/analyze**

This is the core backend logic. Pseudocode for the streaming analysis endpoint:

**`POST /api/analyze`**

  `Body: { url: string, forceRefresh?: boolean }`

1. Rate limit check (IP-based, 10 analyses/hour via Supabase)

2. Cache check: query Supabase for existing analysis of this URL (within 7 days)

3. If cached and not forceRefresh: return cached result (no AI call needed)

4. URL extraction: fetch content, parse with Cheerio, extract structured data

5. Claude API call via Vercel AI SDK: stream response with tool calling for structured scores

6. On stream complete: save full analysis \+ scores to Supabase cache

7. Return streaming response to client

## **6.4 AI Integration Details**

**Model:** Claude Sonnet 4 (claude-sonnet-4-20250514) for full analyses. Claude Haiku for cache-hit summaries or lightweight operations.

**Streaming:** Vercel AI SDK’s streamText() function with Anthropic provider. Client uses useChat() hook for real-time rendering.

**Tool calling:** A score\_project tool definition forces structured JSON output for the four dimension scores, tier classification, and flag lists. The narrative analysis streams as regular text.

**Token budget:** System prompt \~2,000 tokens. Scraped content limited to \~4,000 tokens. Response budget \~3,000 tokens. Total per-analysis: \~9,000 tokens.

**Cost estimate:** At Sonnet pricing (\~$3/M input, $15/M output tokens): roughly $0.05-0.08 per analysis. At 10K analyses/month: \~$500-800/month in AI costs.

## **6.5 Frontend Architecture**

The Next.js app uses the App Router with the following structure:

**`app/`**

  `layout.tsx           -- Root layout, fonts, global styles`

  `page.tsx             -- Home (all sections)`

  `api/analyze/route.ts -- Streaming analysis endpoint`

  `api/projects/route.ts -- Project directory API`

  `report/[id]/page.tsx -- Shareable report page`

**`components/`**

  `Hero.tsx             -- Landing section with matrix rain`

  `FrameworkExplainer.tsx -- Progressive disclosure explainer`

  `QuadrantMap.tsx      -- Interactive 2x2 visualization`

  `Analyzer.tsx         -- Terminal chat interface`

  `ReportCard.tsx       -- Analysis results display`

  `ProjectDirectory.tsx -- Searchable project grid`

  `MatrixRain.tsx       -- Canvas background animation`

  `RadarChart.tsx       -- D3/Recharts scoring visualization`

**`lib/`**

  `scraper.ts           -- URL content extraction`

  `prompt.ts            -- System prompt construction`

  `supabase.ts          -- Database client`

  `types.ts             -- TypeScript type definitions`

# **7\. Data Model (Supabase)**

## **7.1 analyses table**

| Column | Type | Description |
| :---- | :---- | :---- |
| id | uuid (PK) | Unique analysis ID |
| url | text (indexed) | The analyzed URL |
| url\_hash | text (unique) | SHA-256 of normalized URL for deduplication |
| entity\_name | text | Resolved name of the project/person |
| entity\_type | text | protocol | dapp | hardware | person | dao | other |
| quadrant | text | Primary quadrant classification |
| score\_defensive | integer | Defensive Orientation score (0-25) |
| score\_decentralization | integer | Decentralization score (0-25) |
| score\_democratic | integer | Democratic/Pluralistic score (0-25) |
| score\_acceleration | integer | Acceleration Potential score (0-25) |
| score\_total | integer | Composite score (0-100) |
| tier | text | tier\_1 | tier\_2 | tier\_3 | not\_aligned |
| red\_flags | jsonb | Array of detected red flags |
| green\_flags | jsonb | Array of detected green flags |
| analysis\_markdown | text | Full narrative analysis (markdown) |
| ways\_is\_dacc | text | Summary of d/acc alignment |
| ways\_not\_dacc | text | Summary of non-alignment |
| ways\_more\_dacc | text | Recommendations for improvement |
| scraped\_content | text | Raw scraped content used for analysis |
| model\_used | text | Claude model version used |
| created\_at | timestamptz | Analysis timestamp |
| expires\_at | timestamptz | Cache expiration (created\_at \+ 7 days) |

## **7.2 projects table**

| Column | Type | Description |
| :---- | :---- | :---- |
| id | uuid (PK) | Unique project ID |
| name | text | Project name |
| url | text | Primary URL |
| description | text | One-line description |
| quadrant | text | Primary quadrant |
| sector | text | Sector within quadrant |
| alignment\_rating | integer | 1-5 star d/acc alignment |
| latest\_analysis\_id | uuid (FK) | Most recent analysis |
| notion\_id | text | Link to Notion database entry |
| logo\_url | text | Project logo |
| created\_at | timestamptz | When added |

## **7.3 rate\_limits table**

| Column | Type | Description |
| :---- | :---- | :---- |
| ip\_hash | text (PK) | SHA-256 of client IP |
| window\_start | timestamptz | Start of current rate window |
| request\_count | integer | Requests in current window |

# **8\. Implementation Plan**

## **8.1 Phase 1: Foundation (Days 1-3)**

**Goal:** Deployable skeleton with CI/CD and core infrastructure.

1. Create GitHub repository (e.g., opencivics/wtf-is-dacc)

2. Initialize Next.js 14 project with TypeScript, Tailwind, App Router

3. Connect to Vercel, configure auto-deploys on push to main

4. Set up Supabase project, create database tables (analyses, projects, rate\_limits)

5. Configure environment variables (Anthropic API key, Supabase URL/key)

6. Build root layout with custom fonts (JetBrains Mono, Inter), dark theme, global CSS

7. Deploy skeleton to Vercel—verify the pipeline works end to end

**Deliverable:** Live URL showing a styled placeholder page. Full CI/CD pipeline operational.

## **8.2 Phase 2: Static Content & Design System (Days 4-8)**

**Goal:** All non-interactive sections built and styled.

1. Hero section: headline, animated tagline, matrix rain background (canvas), CTA buttons

2. Framework explainer: scroll-triggered progressive disclosure, animated axis introduction, Four D’s interactive checklist

3. Quadrant map: interactive 2x2 SVG with click-to-expand sectors and project cards

4. Resources section: links, downloads, credits

5. Navigation bar: sticky anchor-based nav with scroll-spy highlighting

6. Mobile responsive pass: ensure all sections work on phone/tablet

**Deliverable:** Complete static site with all educational content, fully styled and responsive.

## **8.3 Phase 3: The Analyzer (Days 9-14)**

**Goal:** Fully functional AI-powered d/acc diagnostic tool.

* Build URL extraction service (Cheerio for HTML, GitHub API integration, fallback to text input)

* Craft and iterate the system prompt with the full d/acc rubric, tool definitions, and output format

* Implement /api/analyze route with Vercel AI SDK streaming and Anthropic provider

* Build terminal chat interface component with typing animation, stage headers, and streaming text display

* Build ReportCard component with radar chart (Recharts), tier badge, expandable sections

* Implement Supabase caching layer (check cache before AI call, save results after)

* Implement rate limiting middleware (10 analyses/hour per IP)

* Build shareable report page (/report/\[id\]) with Open Graph meta tags for social sharing

* Test against 10+ known projects from the existing database to validate scoring accuracy

**Deliverable:** Working analyzer that produces accurate, streaming d/acc evaluations with shareable report cards.

## **8.4 Phase 4: Project Directory & Data (Days 15-18)**

**Goal:** Populated project directory seeded from existing research.

* Import 90+ projects from Notion database into Supabase projects table

* Build searchable, filterable project grid component with quadrant color coding

* Pre-generate analysis reports for top 20 projects (batch API calls)

* Link directory entries to their analysis reports

* Add community submission form (future-proofing: simple form that queues URLs for analysis)

**Deliverable:** Populated project directory with pre-generated reports for key projects.

## **8.5 Phase 5: Polish & Launch (Days 19-21)**

**Goal:** Production-ready, optimized, and launched.

* Performance audit: Lighthouse score 90+ on all metrics

* SEO optimization: meta tags, structured data, sitemap, robots.txt

* Open Graph / Twitter Card optimization for shared report links

* Analytics setup: Vercel Analytics for performance, PostHog for product events

* Error handling: graceful failures for scraping errors, API timeouts, rate limits

* Final cross-browser and mobile testing

* Domain setup and DNS configuration

* Launch coordination: prepare social media assets, press outreach

**Deliverable:** Live production site at wtfisdacc.com (or chosen domain), ready for public traffic.

# **9\. Infrastructure & DevOps**

## **9.1 Vercel Configuration**

* **Plan:** Pro plan recommended ($20/mo) for higher function limits and analytics

* **Functions:** Streaming API route runs as a serverless function with 60s timeout (sufficient for Claude streaming)

* **Edge middleware:** Rate limiting check runs at the edge for low latency

* **Preview deployments:** Every PR gets a preview URL for review

* **Environment variables:** ANTHROPIC\_API\_KEY, SUPABASE\_URL, SUPABASE\_SERVICE\_KEY, NEXT\_PUBLIC\_SUPABASE\_ANON\_KEY

## **9.2 Supabase Configuration**

* **Plan:** Free tier is sufficient for launch (500MB database, 50K monthly active users)

* **Row Level Security:** Analyses table is read-public, write-restricted to service key only

* **Indexes:** url\_hash (unique), created\_at, tier, quadrant for efficient querying

* **Backups:** Daily point-in-time recovery enabled

## **9.3 Monitoring & Alerting**

* Vercel Analytics for Core Web Vitals and traffic monitoring

* PostHog for product analytics (analyses run, report shares, section engagement)

* Sentry for error tracking (API failures, scraping errors)

* Anthropic usage dashboard for AI cost monitoring

# **10\. Cost Estimates**

## **10.1 Monthly Operating Costs**

| Service | Plan | Monthly Cost | Notes |
| :---- | :---- | :---- | :---- |
| Vercel | Pro | $20 | Hosting, CI/CD, edge functions, analytics |
| Supabase | Free → Pro | $0-25 | Free tier sufficient at launch; Pro at scale |
| Anthropic API | Pay-as-you-go | $500-800 | Estimated 10K analyses/month at \~$0.06 each |
| Domain | Annual | \~$2/mo | wtfisdacc.com or similar |
| PostHog | Free tier | $0 | 1M events/month free |
| Sentry | Free tier | $0 | 5K errors/month free |
| Total (launch) |  | \~$550-850/mo | Scales linearly with analysis volume |

## **10.2 Development Costs**

Development can be executed by a senior full-stack engineer (or a strong mid-level with AI experience) in approximately 3 weeks of focused work. Alternatively, this is well-suited for an AI-assisted development workflow using Claude Code or similar tools, which could compress the timeline to 2 weeks.

# **11\. Domain Strategy**

The domain should reference the WTF is QF pattern while being memorable and shareable. Candidates:

* **wtfisdacc.com:** Most direct parallel to wtfisqf.com. Clear and recognizable.

* **isitdacc.com:** Centered on the analyzer feature. Shorter.

* **dacc.fyi:** Modern, concise. “Fyi” fits the educational mission.

* **wtf-dacc.xyz:** Web3-native TLD. Edgy.

Recommendation: Secure wtfisdacc.com as primary and dacc.fyi as redirect/alias.

# **12\. Open Questions for Benjamin**

6. **Domain:** Which domain name do you prefer? Should we check availability and register immediately?

7. **API key:** Do you have an Anthropic API account with billing set up, or should we create one? Budget threshold for AI costs?

8. **GitHub org:** Should the repo live under opencivics GitHub org or a new one?

9. **Rate limiting:** 10 analyses/hour per IP—is that appropriate, or should it be more/less restrictive?

10. **Authentication:** Should the analyzer be fully open, or gated behind a simple email capture or wallet connect for higher limits?

11. **Branding:** Any existing logo/brand assets for the d/acc research portal, or are we creating the brand from scratch?

12. **Developer:** Do you have a developer in mind, or should this PRD serve as a brief for hiring/contracting?

13. **Launch timeline:** Is there a specific event or date you’re targeting for launch (e.g., ETHDenver, a Vitalik keynote)?

# **13\. Appendix: The d/acc Evaluation Rubric (Full Reference)**

This is the complete rubric that powers the analyzer’s scoring engine. It is embedded in the system prompt and applied to every analysis.

## **Dimension 1: Defensive Orientation (0-25 points)**

* Does it shift the offense/defense balance toward defense? (0-10)

* Does it enable defense without requiring centralized authority? (0-10)

* Is it resilient to single points of failure? (0-5)

## **Dimension 2: Decentralization (0-25 points)**

* Is control distributed across many independent actors? (0-10)

* Can it resist capture by any single entity (government, corporation, individual)? (0-10)

* Is the codebase open source? (0-5)

## **Dimension 3: Democratic/Pluralistic (0-25 points)**

* Does it empower individuals over institutions? (0-10)

* Does it enable coordination without coercion? (0-10)

* Does it preserve user sovereignty (data, identity, assets)? (0-5)

## **Dimension 4: Acceleration Potential (0-25 points)**

* Does it enable positive technological progress? (0-10)

* Is there a viable path to mainstream adoption? (0-10)

* Does it create compounding benefits over time? (0-5)

## **Tier Classification**

| Score Range | Tier | Recommendation |
| :---- | :---- | :---- |
| 85-100 | Tier 1: Core Position | Maximum allocation. True d/acc infrastructure. |
| 70-84 | Tier 2: Growth Position | Strong allocation. High potential, some caveats. |
| 55-69 | Tier 3: Speculative Position | Small allocation. Promising but unproven. |
| Below 55 | Not d/acc Aligned | Does not meet threshold. Evaluate case-by-case. |

## **Red Flags (Automatic Downgrade)**

* Single point of failure in key infrastructure

* Centralized control of upgrade mechanism

* Closed source core components

* Token distribution favoring insiders \>50%

* History of censorship or deplatforming

## **Green Flags (Bonus)**

* Government-independent operation demonstrated

* Survived adversarial conditions (sanctions, attacks, legal pressure)

* Vitalik direct endorsement or funding

* Balvi / Protocol Labs / Ethereum Foundation funding

* Community Notes-style bridging algorithm