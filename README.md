<div align="center">

# ✦ GrowthOS

### AI-Powered Marketing Platform for Indian SMEs

<br />

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite_6-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Google_Gemini-8E75B2?style=for-the-badge&logo=google&logoColor=white)
![Cloudflare Workers](https://img.shields.io/badge/Cloudflare_Workers-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)
![Express](https://img.shields.io/badge/Express_4-000000?style=for-the-badge&logo=express&logoColor=white)
![Motion](https://img.shields.io/badge/Motion_(Framer)-0055FF?style=for-the-badge&logo=framer&logoColor=white)

<br />

**GrowthOS** is a full-stack, zero-touch AI marketing studio built specifically for **Indian small and medium enterprises**. It combines Google Gemini's generative intelligence with deep Indian cultural IQ to automate social media content creation, festival campaign planning, content calendars, and social media brand audits — all wrapped in a premium, editorial-grade UI.

> Built for a **24-hour hackathon** • Designed with the **Atelier Editorial Design System** • Powered by **Google Gemini**

<br />

[Features](#-features) · [Tech Stack](#-tech-stack) · [Architecture](#-architecture) · [Getting Started](#-getting-started) · [API Reference](#-api-reference) · [Project Structure](#-project-structure)

</div>

---

<br />

## ✨ Features

### 🎨 AI Caption & Copy Generator
Generate platform-specific, culturally-aware social media copy powered by Google Gemini. Supports multiple brand tones — **Organic Minimal**, **Heritage Editorial**, **Conversational**, and **Bold Statement** — with optional Indian Cultural IQ enrichment that weaves in regional vernacular, craft references, and festival context.

### 📅 Cultural Content Calendar
AI-generated monthly content calendars that automatically incorporate **Indian festivals, national holidays, and cultural events**. Each event comes with ready-to-use campaign briefs, optimal posting times (IST), suggested channels, and curated hashtags.

### 🪔 Indian Festivals Campaign Planner
Pre-loaded festival campaigns for **Diwali, Navratri, Gandhi Jayanti, Pushkar Fair**, and more. One-click AI generation produces complete multi-channel campaigns — including hero captions, Instagram & LinkedIn variants, content schedules, visual art direction prompts, and hashtag sets.

### 🔍 Social Media Brand Audit
Paste any social media URL and receive an **AI-powered creative audit** — scoring visual aesthetics, narrative voice, and engagement strategy. Includes strengths/weaknesses analysis, actionable growth plans, and AI-rewritten bio/post corrections. Features a cinematic multi-step loading experience.

### 📊 Marketing Dashboard
A premium glassmorphic dashboard with **live metric cards** (AI content output, engagement rate, creator time saved), micro-sparkline visualizations, an active campaigns queue, and a cultural focus checklist — all with smooth Framer Motion animations.

### 🌙 Dark Mode
Full dark mode support with carefully inverted CSS custom properties — toggling between warm parchment tones and a deep espresso-dark palette.

<br />

---

<br />

## 🛠 Tech Stack

| Layer | Technology | Purpose |
|:------|:-----------|:--------|
| **Frontend Framework** | React 19 | Component-based SPA with hooks |
| **Build Tool** | Vite 6 | Lightning-fast HMR and optimized builds |
| **Language** | TypeScript 5.8 | Full type safety across client and server |
| **Styling** | Tailwind CSS 4 | Utility-first CSS with custom Atelier design tokens |
| **Animations** | Motion (Framer Motion) | Page transitions, scroll parallax, micro-interactions |
| **Icons** | Lucide React | 40+ premium SVG icons used throughout the UI |
| **AI Engine** | Google Gemini API (`@google/genai`) | Content generation with structured JSON output schemas |
| **AI Models** | `gemini-2.5-flash` → `gemini-2.0-flash` → `gemini-1.5-flash` | Multi-model fallback chain for resilience |
| **Dev Server** | Express 4 + Vite Middleware | Local API bridge simulating the worker environment |
| **Deployment Target** | Cloudflare Workers | Edge-deployed serverless backend via Wrangler |
| **Fonts** | Instrument Serif, Inter, JetBrains Mono | Premium editorial typography via Google Fonts |

<br />

---

<br />

## 🏗 Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                     CLIENT (React SPA)                       │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌───────────┐ │
│  │  Dashboard  │ │  Captions  │ │  Calendar  │ │  Festivals│ │
│  └──────┬─────┘ └──────┬─────┘ └──────┬─────┘ └─────┬─────┘ │
│         │              │              │              │       │
│  ┌──────┴──────────────┴──────────────┴──────────────┴─────┐ │
│  │                  FloatingNav + App.tsx                   │ │
│  │            (State Management & Tab Routing)             │ │
│  └──────────────────────┬──────────────────────────────────┘ │
│                         │  fetch('/api/...')                  │
└─────────────────────────┼────────────────────────────────────┘
                          │
              ┌───────────▼───────────┐
              │    Express Dev Server  │  (Local: dev-server.ts)
              │   OR Cloudflare Worker │  (Prod:  server.ts)
              └───────────┬───────────┘
                          │
              ┌───────────▼───────────┐
              │   Google Gemini API    │
              │  (Structured JSON)     │
              │  Multi-Model Fallback  │
              │  gemini-2.5-flash →    │
              │  gemini-2.0-flash →    │
              │  gemini-1.5-flash      │
              └────────────────────────┘
```

### Design Philosophy — Atelier Editorial System

The UI follows a **bespoke "Atelier" design system** inspired by premium editorial portfolios:

- **Color Palette**: Warm parchment (`#F7F4F0`), Espresso (`#1A1A1A`), Accent Gold (`#B38F62`), Atelier Blue (`#2A3B50`)
- **Typography**: Serif headings (Instrument Serif) paired with clean sans-serif body text (Inter) and monospace labels (JetBrains Mono)
- **Glassmorphism**: Frosted-glass card components with backdrop blur and subtle borders
- **Grid Backgrounds**: Fine 60px architectural gridlines for a premium studio aesthetic
- **3D Scroll Parallax**: Hero section with `perspective`, `rotateX/Y`, and `scale` transforms driven by scroll progress
- **Infinite Ticker Marquee**: Auto-scrolling keyword ribbon with CSS keyframe animations

<br />

---

<br />

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** (bundled with Node.js)
- A **Google Gemini API Key** — [Get one here](https://aistudio.google.com/app/apikey)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Kwazzyshi/GrowthOS.git
cd GrowthOS

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env.local
# Open .env.local and set your Gemini API key:
#   GEMINI_API_KEY="your_gemini_api_key_here"

# 4. Start the development server
npm run dev
```

The app will be live at **`http://localhost:3000`**.

### Available Scripts

| Command | Description |
|:--------|:------------|
| `npm run dev` | Start the local Express + Vite dev server |
| `npm run build` | Build the production bundle with Vite |
| `npm run start` | Serve the built production bundle |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run TypeScript type-checking (`tsc --noEmit`) |

<br />

---

<br />

## 📡 API Reference

All API endpoints are served from `server.ts` (Cloudflare Worker) or proxied via `dev-server.ts` locally.

### `GET /api/health`

Health check endpoint.

**Response:**
```json
{ "status": "ok", "time": "2026-06-29T15:30:00.000Z" }
```

---

### `POST /api/generate-captions`

Generate AI-powered social media captions with cultural context.

**Request Body:**
```json
{
  "prompt": "Diwali festival offer for handmade brass lamps",
  "tone": "minimal | storytelling | conversational | bold",
  "channel": "Instagram | LinkedIn | Twitter",
  "culturalIq": true
}
```

**Response:**
```json
{
  "caption": "Let there be warm lights and intentional silences...",
  "hashtags": ["#SlowLiving", "#HandcraftedDiwali"],
  "campaignStrategy": "Post at 6 PM IST for peak audience...",
  "imagePrompt": "Hasselblad macro shot, warm shadows...",
  "calendarTheme": "Heritage Spotlight"
}
```

---

### `POST /api/analyze-social`

Run an AI-driven audit on any social media profile or post.

**Request Body:**
```json
{
  "url": "https://instagram.com/brand_handle",
  "additionalInfo": "High-end handloom linen brand"
}
```

**Response:**
```json
{
  "platform": "Instagram",
  "accountName": "@brand_handle",
  "overallScore": 74,
  "critique": {
    "visualAesthetic": "...",
    "narrativeVoice": "...",
    "engagementStrategy": "..."
  },
  "metricsEstimate": {
    "strengths": ["..."],
    "weaknesses": ["..."]
  },
  "actionableSteps": ["..."],
  "recommendedBioOrPostCorrection": "..."
}
```

---

### `POST /api/generate-calendar`

Generate a full month's content calendar with Indian cultural events.

**Request Body:**
```json
{
  "month": "November",
  "year": 2026,
  "brandContext": "Premium Indian craft and lifestyle brand"
}
```

---

### `POST /api/generate-festival-campaign`

Generate complete multi-channel festival marketing campaigns.

**Request Body:**
```json
{
  "festivalName": "Diwali",
  "festivalDate": "November 08, 2026",
  "significance": "The zenith of India's cultural retail...",
  "themes": ["Terracotta & Handcrafted Diyas", "Heritage Gift Boxes"],
  "brandContext": "Premium Indian handloom brand"
}
```

<br />

---

<br />

## 📁 Project Structure

```
GrowthOS/
├── src/                          # Frontend source
│   ├── App.tsx                   # Root component — tab routing & state
│   ├── main.tsx                  # React DOM entry point
│   ├── index.css                 # Atelier design system — tokens, glass, grid
│   ├── types.ts                  # TypeScript interfaces (Feature, Metric, Campaign, etc.)
│   └── components/
│       ├── AtelierHero.tsx       # 3D parallax hero section with scroll transforms
│       ├── FloatingNav.tsx       # Glassmorphic dock navigation bar
│       ├── InteractiveTicker.tsx # Infinite marquee keyword ribbon
│       ├── FeaturesSection.tsx   # Feature showcase with animated cards
│       ├── DashboardView.tsx     # Marketing dashboard with metrics & queue
│       ├── CaptionsView.tsx      # AI caption generation room (Gemini-powered)
│       ├── CalendarView.tsx      # Cultural content calendar planner
│       ├── FestivalsView.tsx     # Indian festival campaign generator
│       └── SocialAuditView.tsx   # Social media brand audit suite
│
├── functions/
│   └── api/                      # Cloudflare Pages Functions (alternative endpoints)
│       ├── generate-captions.ts
│       ├── generate-calendar.ts
│       ├── generate-festival-campaign.ts
│       └── analyze-social.ts
│
├── server.ts                     # Cloudflare Worker — main API handler (Gemini)
├── dev-server.ts                 # Local Express dev server (API bridge + Vite HMR)
├── vite.config.ts                # Vite configuration with Tailwind & React plugins
├── tsconfig.json                 # TypeScript configuration (ES2022, bundler resolution)
├── wrangler.toml                 # Cloudflare Workers deployment config
├── package.json                  # Dependencies and scripts
├── .env.example                  # Environment variable template
├── .gitignore                    # Git ignore rules
├── index.html                    # SPA entry HTML
└── metadata.json                 # AI Studio project metadata
```

<br />

---

<br />

## 🔑 Key Technical Decisions

| Decision | Rationale |
|:---------|:----------|
| **Multi-model fallback** (`gemini-2.5-flash` → `2.0` → `1.5`) | Ensures resilience against transient 503 errors during high-demand periods |
| **Structured JSON output** via `responseSchema` | Forces Gemini to return clean, typed JSON — no parsing heuristics needed |
| **Express → Worker bridge** in dev | `dev-server.ts` proxies API calls through the same Worker `fetch()` handler, ensuring parity between local and production |
| **CSS custom properties** for dark mode | A single `.dark` class flips all design tokens — no duplicate component styles |
| **Client-side tab routing** (no React Router) | Lightweight SPA navigation for a hackathon — `AnimatePresence` handles transitions |
| **Cloudflare Workers** as deployment target | Edge-deployed, zero cold-start serverless backend |

<br />

---

<br />

## 🧰 Tools & Services Used

| Tool / Service | Usage |
|:---------------|:------|
| **Google AI Studio** | Initial project scaffolding and prototyping environment |
| **Google Gemini API** | Core AI engine for content generation, audits, and calendar planning |
| **Vite** | Frontend build tooling with sub-second HMR |
| **Tailwind CSS v4** | Utility-first styling with custom `@theme` tokens |
| **Motion (Framer Motion)** | Scroll-driven parallax, page transitions, spring animations |
| **Lucide Icons** | Consistent, premium icon set (40+ icons used) |
| **Cloudflare Workers + Wrangler** | Serverless edge deployment with `nodejs_compat` |
| **Express.js** | Local development API bridge |
| **TypeScript** | End-to-end type safety |
| **Google Fonts** | Instrument Serif, Inter, JetBrains Mono |
| **Git & GitHub** | Version control and code hosting |

<br />

---

<br />

## 📜 License

This project was built for a hackathon demonstration. Feel free to fork, learn from, and build upon it.

<br />

---

<div align="center">

**Built with ☕ and Gemini** · Made in India 🇮🇳

</div>
