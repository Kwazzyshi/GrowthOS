import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Send, Copy, Check, Instagram, Linkedin, Twitter, Youtube, 
  AlertCircle, ArrowUpRight, TrendingUp, ShieldAlert, Compass, Lightbulb, 
  Zap, RefreshCw, BarChart2, Globe, Shield, MessageSquare
} from 'lucide-react';

interface AuditResult {
  platform: string;
  accountName: string;
  overallScore: number;
  critique: {
    visualAesthetic: string;
    narrativeVoice: string;
    engagementStrategy: string;
  };
  metricsEstimate: {
    strengths: string[];
    weaknesses: string[];
  };
  actionableSteps: string[];
  recommendedBioOrPostCorrection: string;
}

const SAMPLE_TEMPLATES = [
  {
    label: "Instagram Artisanal Boutique",
    url: "https://instagram.com/atelier.khadi.collective",
    notes: "High-end handloom linen, targeting Gen-Z luxury buyers with swadeshi heritage stories."
  },
  {
    label: "LinkedIn Founder Post",
    url: "https://linkedin.com/posts/sandra-creates-slow-design-velocity",
    notes: "Design agency leader talking about slow branding, regional vernacular, and premium organic design."
  },
  {
    label: "Twitter/X Creative Thread",
    url: "https://twitter.com/handcrafted_os/status/12984712",
    notes: "A thread on why zero-carbon packaging is the future of luxury craft shipping."
  }
];

export default function SocialAuditView() {
  const [url, setUrl] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AuditResult | null>(null);
  const [copied, setCopied] = useState(false);

  // High-fidelity analysis steps for the micro-interaction loader
  const loadingSteps = [
    "Establishing encrypted connection to server-side audit core...",
    "Scanning content structure and typography patterns of the URL...",
    "Deconstructing visual color palette harmony & grid layout consistency...",
    "Evaluating narrative voice, copywriting velocity, and call-to-actions...",
    "Benchmarking performance index against slow-design agency standards...",
    "Synthesizing customized GrowthOS corrective actionable strategy..."
  ];

  const handleApplyTemplate = (tpl: typeof SAMPLE_TEMPLATES[0]) => {
    setUrl(tpl.url);
    setAdditionalInfo(tpl.notes);
  };

  const startLoaderAnimation = () => {
    setLoadingStep(0);
    const interval = setInterval(() => {
      setLoadingStep((prev) => {
        if (prev >= loadingSteps.length - 1) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 2200);
    return interval;
  };

  const handleRunAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setIsLoading(true);
    setError(null);
    setResult(null);
    
    const loaderInterval = startLoaderAnimation();

    try {
     const response = await fetch(
  'https://growthos.jatinbamola2006.workers.dev/api/analyze-social',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url,
      additionalInfo,
    }),
  }
);

      clearInterval(loaderInterval);

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `Server responded with status ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred during the audit process. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyCorrection = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.recommendedBioOrPostCorrection);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getPlatformIcon = (platform: string) => {
    const p = platform.toLowerCase();
    if (p.includes('instagram')) return <Instagram className="w-5 h-5 text-[#E1306C]" />;
    if (p.includes('linkedin')) return <Linkedin className="w-5 h-5 text-[#0077B5]" />;
    if (p.includes('twitter') || p.includes('x')) return <Twitter className="w-5 h-5 text-espresso" />;
    if (p.includes('youtube')) return <Youtube className="w-5 h-5 text-[#FF0000]" />;
    return <Globe className="w-5 h-5 text-atelier-blue" />;
  };

  return (
    <div className="max-w-6xl mx-auto px-6 pt-32 pb-24">
      
      {/* Editorial Header */}
      <div className="space-y-4 mb-12">
        <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-atelier-accent-gold font-bold">
          <BarChart2 className="w-4 h-4" />
          <span>GrowthOS Audit Suite</span>
        </div>
        <h1 className="font-serif text-5xl md:text-6xl text-espresso tracking-tight font-medium">
          Social Media <br className="hidden sm:inline" />
          <span className="italic">Brand Audit</span> & Analysis
        </h1>
        <p className="text-sm md:text-base text-muted-taupe leading-relaxed max-w-2xl">
          Instantly dissect any social profile, post, or campaign strategy. Let GrowthOS Gemini intelligence grade your visual aesthetic, narrative voice, and provide high-end, zero-fluff corrections.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Hand side configuration board */}
        <div className="lg:col-span-5 space-y-6 bg-white/60 dark:bg-atelier-surface/40 p-6 sm:p-8 rounded-3xl border border-espresso/10 backdrop-blur-md">
          <div className="flex items-center gap-2 border-b border-espresso/10 pb-4 mb-2">
            <Zap className="w-4 h-4 text-atelier-accent-gold" />
            <h2 className="text-xs uppercase font-mono tracking-wider font-bold text-espresso">Audit Configurator</h2>
          </div>

          <form onSubmit={handleRunAudit} className="space-y-5">
            {/* Social URL input */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-mono tracking-widest text-muted-taupe font-semibold">
                Social URL or Account Handle
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="e.g. instagram.com/brand_handle"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full pl-4 pr-12 py-3.5 bg-atelier-bg/50 border border-espresso/10 rounded-xl focus:border-espresso focus:outline-none text-xs text-espresso transition-all duration-300"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-taupe">
                  <Compass className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Campaign context / Notes */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-[10px] uppercase font-mono tracking-widest text-muted-taupe font-semibold">
                  Campaign Focus & Context
                </label>
                <span className="text-[9px] font-mono text-muted-taupe opacity-60">Optional</span>
              </div>
              <textarea
                rows={3}
                placeholder="Mention specific targets (e.g. modern organic aesthetics, handmade swadeshi values, local craft heritage)..."
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                className="w-full p-4 bg-atelier-bg/50 border border-espresso/10 rounded-xl focus:border-espresso focus:outline-none text-xs text-espresso transition-all duration-300 resize-none leading-relaxed"
              />
            </div>

            {/* Action buttons */}
            <button
              type="submit"
              disabled={isLoading || !url.trim()}
              className="w-full py-4 bg-espresso text-atelier-bg hover:bg-warm-brown disabled:bg-espresso/50 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-espresso/10 transition-all duration-300 cursor-pointer border border-espresso"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-atelier-accent-gold" />
                  <span>Analyzing Profile...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-atelier-accent-gold animate-pulse" />
                  <span>Execute Brand Audit</span>
                  <ArrowUpRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Sandbox Templates */}
          <div className="pt-4 border-t border-espresso/10 space-y-3">
            <div className="text-[10px] uppercase font-mono tracking-widest text-muted-taupe font-semibold">
              Try a Quick Campaign Sandbox
            </div>
            <div className="flex flex-col gap-2">
              {SAMPLE_TEMPLATES.map((tpl, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleApplyTemplate(tpl)}
                  className="w-full text-left p-3 rounded-xl border border-espresso/8 hover:border-espresso/20 bg-espresso/5 hover:bg-atelier-surface/50 transition-all duration-200 group cursor-pointer"
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-espresso group-hover:text-atelier-blue transition-colors">
                      {tpl.label}
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-muted-taupe opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-[10px] text-muted-taupe line-clamp-1">{tpl.notes}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Hand Side results or Interactive loading deck */}
        <div className="lg:col-span-7 min-h-[500px]">
          <AnimatePresence mode="wait">
            
            {/* Initial State / Prompting to load */}
            {!isLoading && !result && !error && (
              <motion.div
                key="empty-audit"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex flex-col items-center justify-center text-center p-8 border border-dashed border-espresso/15 rounded-3xl bg-atelier-surface/30 backdrop-blur-sm min-h-[500px]"
              >
                <div className="w-16 h-16 rounded-full bg-espresso/5 flex items-center justify-center text-espresso/40 mb-6">
                  <Compass className="w-8 h-8" />
                </div>
                <h3 className="font-serif italic text-2xl text-espresso mb-2">Awaiting Campaign URL</h3>
                <p className="text-xs text-muted-taupe max-w-sm leading-relaxed">
                  Apply one of our custom sandbox boutique templates on the left or paste your own social channel link to start the audit.
                </p>
              </motion.div>
            )}

            {/* Micro Interaction Loading State */}
            {isLoading && (
              <motion.div
                key="loading-audit"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center p-12 border border-espresso/10 rounded-3xl bg-white/50 dark:bg-atelier-surface/40 min-h-[500px] text-center space-y-8"
              >
                <div className="relative w-24 h-24 flex items-center justify-center">
                  {/* Outer breathing orbital ring */}
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-atelier-accent-gold/40 animate-spin [animation-duration:12s]" />
                  {/* Inner spinning ring */}
                  <div className="absolute inset-2 rounded-full border-2 border-espresso/10 border-t-espresso animate-spin" />
                  <Sparkles className="w-8 h-8 text-atelier-accent-gold animate-bounce" />
                </div>

                <div className="space-y-3 max-w-md">
                  <h3 className="font-serif italic text-2xl text-espresso animate-pulse">
                    GrowthOS Auditor in Session
                  </h3>
                  
                  {/* Step-by-step descriptive logs */}
                  <div className="h-10 flex items-center justify-center">
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={loadingStep}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="text-xs font-mono text-muted-taupe italic"
                      >
                        {loadingSteps[loadingStep]}
                      </motion.p>
                    </AnimatePresence>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-48 h-1 bg-espresso/5 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-atelier-accent-gold"
                    initial={{ width: '0%' }}
                    animate={{ width: `${((loadingStep + 1) / loadingSteps.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </motion.div>
            )}

            {/* Error display */}
            {error && (
              <motion.div
                key="error-audit"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-8 border border-red-200 bg-red-50/50 rounded-3xl min-h-[500px] flex flex-col items-center justify-center text-center space-y-4"
              >
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl text-red-950 font-semibold">Audit Execution Terminated</h3>
                <p className="text-xs text-red-800 max-w-md leading-relaxed">{error}</p>
                <button
                  onClick={() => setError(null)}
                  className="px-4 py-2 bg-espresso text-atelier-bg rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-warm-brown transition-colors cursor-pointer"
                >
                  Dismiss & Retry
                </button>
              </motion.div>
            )}

            {/* Beautiful Editorial Result Dashboard */}
            {result && !isLoading && (
              <motion.div
                key="result-audit"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-8"
              >
                {/* Score & Profile Header Card */}
                <div className="bg-espresso text-atelier-bg p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col sm:flex-row justify-between items-center gap-6 border border-espresso">
                  <div className="space-y-2 text-center sm:text-left">
                    <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-mono tracking-widest text-atelier-accent-gold uppercase font-semibold">
                      {getPlatformIcon(result.platform)}
                      <span>{result.platform} Campaign</span>
                    </div>
                    <h3 className="font-serif text-3xl font-medium tracking-tight">
                      {result.accountName}
                    </h3>
                    <p className="text-xs text-atelier-bg/60 font-mono">
                      Core Brand Audit Report ID: #GOS-{Math.floor(1000 + Math.random() * 9000)}
                    </p>
                  </div>

                  {/* Circular Score Visual with motion spring */}
                  <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="56"
                        cy="56"
                        r="48"
                        stroke="rgba(255,255,255,0.08)"
                        strokeWidth="8"
                        fill="transparent"
                      />
                      <motion.circle
                        cx="56"
                        cy="56"
                        r="48"
                        stroke="#B38F62"
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={2 * Math.PI * 48}
                        initial={{ strokeDashoffset: 2 * Math.PI * 48 }}
                        animate={{ strokeDashoffset: 2 * Math.PI * 48 * (1 - result.overallScore / 100) }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                      />
                    </svg>
                    <div className="absolute text-center">
                      <span className="font-serif text-3xl font-bold tracking-tight">
                        {result.overallScore}
                      </span>
                      <span className="text-[9px] block text-muted-taupe uppercase font-mono tracking-wider font-semibold">
                        Score Index
                      </span>
                    </div>
                  </div>
                </div>

                {/* Critique Matrix bento boxes */}
                <div className="space-y-4">
                  <div className="text-[10px] uppercase font-mono tracking-widest text-muted-taupe font-semibold font-bold">
                    Strategic Critique Matrix
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    
                    {/* Aesthetic Card */}
                    <div className="p-5 bg-white/70 dark:bg-atelier-surface/50 border border-espresso/10 rounded-2xl space-y-2">
                      <div className="flex items-center gap-2 text-xs text-espresso font-semibold font-bold">
                        <Compass className="w-4 h-4 text-atelier-accent-gold" />
                        <span>Visual Aesthetic</span>
                      </div>
                      <p className="text-xs text-muted-taupe leading-relaxed">
                        {result.critique.visualAesthetic}
                      </p>
                    </div>

                    {/* Narrative Card */}
                    <div className="p-5 bg-white/70 dark:bg-atelier-surface/50 border border-espresso/10 rounded-2xl space-y-2">
                      <div className="flex items-center gap-2 text-xs text-espresso font-semibold font-bold">
                        <MessageSquare className="w-4 h-4 text-atelier-accent-gold" />
                        <span>Narrative Voice</span>
                      </div>
                      <p className="text-xs text-muted-taupe leading-relaxed">
                        {result.critique.narrativeVoice}
                      </p>
                    </div>

                    {/* Engagement Card */}
                    <div className="p-5 bg-white/70 dark:bg-atelier-surface/50 border border-espresso/10 rounded-2xl space-y-2">
                      <div className="flex items-center gap-2 text-xs text-espresso font-semibold font-bold">
                        <TrendingUp className="w-4 h-4 text-atelier-accent-gold" />
                        <span>Engagement Strategy</span>
                      </div>
                      <p className="text-xs text-muted-taupe leading-relaxed">
                        {result.critique.engagementStrategy}
                      </p>
                    </div>

                  </div>
                </div>

                {/* comparative Strengths & Weaknesses */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Strengths */}
                  <div className="p-6 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl space-y-3">
                    <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider">
                      <TrendingUp className="w-4 h-4" />
                      <span>Creative Strengths</span>
                    </div>
                    <ul className="space-y-2.5">
                      {result.metricsEstimate.strengths.map((s, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs text-emerald-950 dark:text-emerald-200">
                          <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Weaknesses */}
                  <div className="p-6 bg-amber-500/5 border border-amber-500/20 rounded-2xl space-y-3">
                    <div className="flex items-center gap-2 text-amber-800 dark:text-amber-400 text-xs font-mono font-bold uppercase tracking-wider">
                      <ShieldAlert className="w-4 h-4" />
                      <span>Critical Creative Gaps</span>
                    </div>
                    <ul className="space-y-2.5">
                      {result.metricsEstimate.weaknesses.map((w, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs text-amber-950 dark:text-amber-200">
                          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                          <span>{w}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

                {/* Editorial Correction Box */}
                <div className="p-6 bg-atelier-surface/90 dark:bg-atelier-surface/80 border border-espresso/15 rounded-3xl space-y-4 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-atelier-accent-gold/5 rounded-full blur-2xl" />
                  
                  <div className="flex justify-between items-center border-b border-espresso/8 pb-3 relative z-10">
                    <div className="flex items-center gap-2">
                      <Lightbulb className="w-4 h-4 text-atelier-accent-gold" />
                      <span className="text-xs font-mono font-bold uppercase text-espresso tracking-wider">Recommended Correction Draft</span>
                    </div>
                    
                    <button
                      onClick={handleCopyCorrection}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-espresso/8 hover:border-espresso text-[10px] font-mono tracking-widest uppercase transition-all duration-300 bg-atelier-surface cursor-pointer hover:bg-espresso hover:text-atelier-bg"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-500" />
                          <span className="text-emerald-600">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy Draft</span>
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-xs text-espresso font-serif italic leading-relaxed relative z-10 whitespace-pre-line bg-espresso/5 p-4 rounded-xl">
                    {result.recommendedBioOrPostCorrection}
                  </p>
                </div>

                {/* Actionable Plan Checklist */}
                <div className="space-y-3">
                  <div className="text-[10px] uppercase font-mono tracking-widest text-muted-taupe font-semibold font-bold">
                    Actionable Growth Plan
                  </div>
                  <div className="flex flex-col gap-2.5">
                    {result.actionableSteps.map((step, idx) => (
                      <div 
                        key={idx}
                        className="flex gap-4 items-center p-4 bg-white/40 dark:bg-atelier-surface/20 border border-espresso/8 rounded-xl hover:border-espresso/15 transition-all duration-300"
                      >
                        <div className="w-6 h-6 rounded-full bg-espresso text-atelier-bg flex items-center justify-center text-xs font-mono shrink-0">
                          {idx + 1}
                        </div>
                        <p className="text-xs text-espresso leading-relaxed">
                          {step}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>

    </div>
  );
}
