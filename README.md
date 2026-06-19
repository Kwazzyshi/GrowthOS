# GrowthOS 🚀
### AI-Powered Autonomous Digital Growth Platform

> Built for NMIMS INNOVATHON 2026 — Challenge 1: Zero-Touch Growth Operating System

GrowthOS replaces the need for a full-time social media manager. Paste your website URL or Instagram handle — get a complete brand profile, 7-day content calendar, AI-generated captions, and festival-aware campaign ideas in under 30 seconds.

---

## ✨ Features

| Feature | Status |
|---|---|
| Persona Onboarding (Influencer / Small Business / Brand / Social Media Manager) | ✅ |
| URL & Instagram Handle Analyzer — instant brand profile | ✅ |
| AI Caption Generator — 3 variations with Hinglish support | ✅ |
| Weekly Content Calendar — festival-aware, India-first | ✅ |
| Festival & Trend Detector — next 30 days of Indian festivals | ✅ |
| Performance Dashboard — mock analytics with AI insights | ✅ |
| Ad Recommendation Engine — mock ad copy + projections | ✅ |

---

## 🛠️ Tech Stack

- **Frontend:** Next.js 14 + React 18 + TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **AI Engine:** Google Gemini 1.5 Flash
- **Database:** Firebase Firestore
- **Images:** Unsplash API
- **Charts:** Recharts
- **Deployment:** Vercel
- **Total Cost:** ₹0

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm 9+
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/growthOS.git
cd growthOS

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Fill in your API keys in .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Environment Variables

Create a `.env.local` file in the root directory:

```env
GEMINI_API_KEY=your_gemini_api_key
UNSPLASH_ACCESS_KEY=your_unsplash_access_key
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
```

**Getting API Keys:**
- **Gemini:** [aistudio.google.com](https://aistudio.google.com) → Get API Key (free, 1M tokens/day)
- **Unsplash:** [unsplash.com/developers](https://unsplash.com/developers) → Create App (free, 50 req/hour)
- **Firebase:** [firebase.google.com](https://firebase.google.com) → New Project → Web App → Copy config

> ⚠️ Never commit `.env.local` to GitHub. It is already listed in `.gitignore`.

---

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx                  → Landing / Persona Selection
│   ├── onboarding/page.tsx       → URL Analyzer + Brand Profile
│   ├── dashboard/page.tsx        → Main Dashboard Hub
│   ├── calendar/page.tsx         → Weekly Content Calendar
│   ├── captions/page.tsx         → Caption Generator
│   ├── festivals/page.tsx        → Festival / Trend Detector
│   ├── ads/page.tsx              → Ad Recommendations
│   └── api/
│       ├── analyze/route.ts      → URL / brand analysis
│       ├── caption/route.ts      → Caption generation
│       ├── calendar/route.ts     → Weekly calendar
│       ├── festival/route.ts     → Festival detector
│       └── ads/route.ts          → Ad recommendations
├── components/
│   ├── PersonaSelector.tsx
│   ├── URLAnalyzer.tsx
│   ├── BrandProfileCard.tsx
│   ├── CaptionGenerator.tsx
│   ├── CalendarView.tsx
│   ├── FestivalDetector.tsx
│   └── AdDashboard.tsx
└── lib/
    ├── gemini.ts
    ├── firebase.ts
    ├── unsplash.ts
    ├── fallbacks.ts
    └── indianFestivals.json
```

---

## 🎯 Demo Businesses

The app comes pre-loaded with 3 sample Indian businesses for demo purposes:

1. **Sharma Ji ka Dhaba** — Local restaurant in Delhi (Small Business persona)
2. **Glow & Co** — D2C skincare brand (Established Brand persona)
3. **@TravelWithRiya** — Travel content creator (Influencer persona)

---

## 🚢 Deployment

This app is deployed on **Vercel**. To deploy your own instance:

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import your GitHub repo
3. Add all environment variables in Vercel Settings → Environment Variables
4. Click Deploy — done ✅

**Live Demo:** [your-app.vercel.app](https://your-app.vercel.app)

---


---

## 📄 License

This project is licensed under the MIT License — see [LICENSE](LICENSE) for details.
