import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, TrendingUp, Users, Calendar, ArrowRight, MessageSquareCode, CheckCircle2, Award } from 'lucide-react';
import { MarketingMetric, CampaignPost } from '../types';

interface DashboardViewProps {
  onNavigateToTab: (tabId: string) => void;
  onQuickCaptionGen: (prompt: string) => void;
}

export default function DashboardView({ onNavigateToTab, onQuickCaptionGen }: DashboardViewProps) {
  const [quickPrompt, setQuickPrompt] = useState('');

  const metrics: MarketingMetric[] = [
    {
      id: 'output',
      label: "AI Content Output",
      value: "148 posts",
      change: "+28% this month",
      isPositive: true,
      history: [
        { date: 'June 1', value: 10 },
        { date: 'June 5', value: 25 },
        { date: 'June 10', value: 45 },
        { date: 'June 15', value: 72 },
        { date: 'June 20', value: 110 },
        { date: 'June 24', value: 148 },
      ]
    },
    {
      id: 'engagement',
      label: "Engagement Rate",
      value: "6.84%",
      change: "+1.2% versus last week",
      isPositive: true,
      history: [
        { date: 'June 1', value: 4.5 },
        { date: 'June 5', value: 4.8 },
        { date: 'June 10', value: 5.2 },
        { date: 'June 15', value: 5.9 },
        { date: 'June 20', value: 6.2 },
        { date: 'June 24', value: 6.84 },
      ]
    },
    {
      id: 'saved',
      label: "Creator Time Saved",
      value: "42.5 hrs",
      change: "Calculated client average",
      isPositive: true,
      history: [
        { date: 'June 1', value: 5 },
        { date: 'June 5', value: 12 },
        { date: 'June 10', value: 22 },
        { date: 'June 15', value: 30 },
        { date: 'June 20', value: 38 },
        { date: 'June 24', value: 42.5 },
      ]
    }
  ];

  const upcomingQueue: CampaignPost[] = [
    {
      id: 'post-1',
      title: "Diwali Heritage Collection Reveal",
      channel: 'Instagram',
      date: "Scheduled • Nov 10",
      status: "Scheduled",
      caption: "Crafted in mud, illuminated by soul. Our Diwali Heritage collection releases soon, celebrating slow craftsmanship and native clay work.",
      hashtags: ["Diwali2026", "AtelierLife", "ClayHeritage", "SlowCraft"],
    },
    {
      id: 'post-2',
      title: "Gandhi Jayanti Native Khadi Spotlight",
      channel: 'LinkedIn',
      date: "Draft • Oct 02",
      status: "Draft",
      caption: "The grace of handmade fibers. On Gandhi Jayanti, we reflect on the simple genius of Swadeshi handloom weaving and its timeless elegance.",
      hashtags: ["GandhiJayanti", "Handcrafted", "KhadiMovement", "SustainableLuxury"],
    },
    {
      id: 'post-3',
      title: "Navratri Colors Content Sequence",
      channel: 'Twitter',
      date: "Scheduled • Oct 15",
      status: "Scheduled",
      caption: "9 Nights, 9 Narratives. Starting tomorrow, we break down the color-rhythms of Navratri and the artisans who weave these spectacular festive shades.",
      hashtags: ["Navratri2026", "ColorsOfIndia", "WeaversOfBengal"],
    }
  ];

  const handleQuickGenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickPrompt.trim()) return;
    onQuickCaptionGen(quickPrompt);
    onNavigateToTab('captions');
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col gap-12 mt-20">
      
      {/* Dashboard Headline Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-espresso/10 pb-8">
        <div className="space-y-2">
          <span className="text-xs uppercase font-mono tracking-widest text-muted-taupe">
            Workspace Dashboard
          </span>
          <h1 className="font-serif text-3xl md:text-5xl text-espresso tracking-tight">
            Creative Overview
          </h1>
        </div>
        <p className="font-sans text-sm text-warm-brown max-w-sm leading-relaxed">
          Monitor your active social media channels, generated campaign copy performance, and upcoming culturally matched events.
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((metric) => (
          <motion.div
            key={metric.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="glass-card rounded-[1.25rem] p-6 border border-espresso/8 flex flex-col justify-between h-48 hover:shadow-lg transition-all duration-300"
          >
            <div>
              <span className="text-[10px] font-mono tracking-widest text-muted-taupe uppercase block">
                {metric.label}
              </span>
              <div className="text-3xl md:text-4xl font-serif text-espresso font-bold mt-2">
                {metric.value}
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-espresso/5 pt-3 mt-4">
              <span className="text-xs font-semibold text-emerald-700 font-sans flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>{metric.change}</span>
              </span>
              
              {/* Micro-sparkline drawing using pure Tailwind divs */}
              <div className="flex items-end gap-1 h-6">
                {metric.history.map((pt, idx) => {
                  const maxVal = Math.max(...metric.history.map(p => p.value));
                  const hPercent = (pt.value / maxVal) * 100;
                  return (
                    <div 
                      key={idx} 
                      className={`w-1 rounded-full ${idx === metric.history.length - 1 ? 'bg-atelier-accent-gold' : 'bg-espresso/15'}`}
                      style={{ height: `${hPercent}%` }} 
                    />
                  );
                })}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Col (8 cols on desktop): Quick Generator & Queue */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          
          {/* Quick AI Generator Box */}
          <div className="glass-card rounded-[1.5rem] p-8 border border-espresso/8 shadow-sm flex flex-col gap-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-atelier-accent-gold/5 rounded-full filter blur-[40px] pointer-events-none" />
            
            <div className="flex items-center gap-3">
              <div className="p-3 bg-espresso text-atelier-bg rounded-xl">
                <Sparkles className="w-5 h-5 text-atelier-accent-gold" />
              </div>
              <div>
                <h3 className="font-serif text-xl md:text-2xl text-espresso">
                  Instant Copy Generator
                </h3>
                <p className="text-xs text-muted-taupe">Write a micro-prompt below to generate tailored cultural creatives.</p>
              </div>
            </div>

            <form onSubmit={handleQuickGenSubmit} className="flex flex-col gap-4">
              <div className="relative">
                <input
                  type="text"
                  value={quickPrompt}
                  onChange={(e) => setQuickPrompt(e.target.value)}
                  placeholder="e.g. 'Diwali festival offer for handmade brass lamps'"
                  className="w-full bg-espresso/[0.03] border border-espresso/12 rounded-xl py-4 px-4 pr-12 text-sm text-espresso placeholder:text-muted-taupe/70 focus:outline-none focus:border-espresso/40 transition-colors"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-espresso text-atelier-bg hover:bg-warm-brown rounded-lg transition-colors cursor-pointer"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-mono tracking-wider text-muted-taupe uppercase">Suggestions:</span>
                {["Durga Puja greetings", "Independence Day sale", "Khadi weavers highlight"].map((tag, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setQuickPrompt(`Create a captivating post for: ${tag}`)}
                    className="text-[10px] font-semibold text-espresso bg-espresso/5 hover:bg-espresso/10 px-2.5 py-1 rounded-full transition-colors cursor-pointer"
                  >
                    + {tag}
                  </button>
                ))}
              </div>
            </form>
          </div>

          {/* Social Media Queue List */}
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center border-b border-espresso/8 pb-3">
              <h3 className="font-serif text-xl md:text-2xl text-espresso">
                Active Campaigns Queue
              </h3>
              <button 
                onClick={() => onNavigateToTab('calendar')}
                className="text-xs font-bold uppercase tracking-wider text-atelier-blue hover:text-espresso flex items-center gap-1 cursor-pointer"
              >
                <span>Full Calendar</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex flex-col gap-4">
              {upcomingQueue.map((post) => (
                <div 
                  key={post.id}
                  className="bg-atelier-surface border border-espresso/6 hover:border-espresso/12 rounded-2xl p-6 shadow-sm transition-all duration-200 flex flex-col gap-4 group"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                          post.channel === 'Instagram' ? 'bg-amber-50 dark:bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-500/20' :
                          post.channel === 'LinkedIn' ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-500/20' :
                          'bg-slate-50 dark:bg-slate-500/10 text-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-500/20'
                        }`}>
                          {post.channel}
                        </span>
                        <span className="text-xs font-mono text-muted-taupe">{post.date}</span>
                      </div>
                      <h4 className="font-serif text-lg text-espresso group-hover:text-atelier-blue transition-colors">
                        {post.title}
                      </h4>
                    </div>
                    <span className={`text-[9px] font-bold uppercase font-mono px-2 py-0.5 rounded-full ${
                      post.status === 'Scheduled' ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400' : 'bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400'
                    }`}>
                      {post.status}
                    </span>
                  </div>

                  <p className="text-xs text-warm-brown bg-atelier-bg p-3.5 rounded-xl border border-espresso/5 italic leading-relaxed">
                    "{post.caption}"
                  </p>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {post.hashtags.map((h, hIdx) => (
                        <span key={hIdx} className="text-[10px] font-mono text-muted-taupe">#{h}</span>
                      ))}
                    </div>
                    
                    <button 
                      onClick={() => {
                        onQuickCaptionGen(post.caption);
                        onNavigateToTab('captions');
                      }}
                      className="text-[10px] font-bold uppercase tracking-wider text-atelier-blue group-hover:translate-x-1 duration-200 flex items-center gap-1 cursor-pointer"
                    >
                      <span>Modify in Copy Room</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Col (4 cols on desktop): India Calendar Checklist / Cultural Highlights */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          <div className="glass-card rounded-[1.5rem] p-6 border border-espresso/8 flex flex-col gap-6">
            <div className="flex items-center gap-2 border-b border-espresso/8 pb-4">
              <Award className="w-5 h-5 text-atelier-accent-gold" />
              <h4 className="font-serif text-lg text-espresso">
                Cultural Focus Checklist
              </h4>
            </div>

            <div className="flex flex-col gap-4">
              <p className="text-xs text-muted-taupe leading-relaxed">
                GrowthOS has loaded major national holidays and craft weeks. Click on any festival below to view campaign suggestions.
              </p>

              <div className="space-y-3">
                {[
                  { title: "Navratri Campaign Blueprint", date: "Starts Oct 14", completed: true },
                  { title: "Diwali National Festival Offer", date: "Starts Nov 08", completed: false },
                  { title: "Gandhi Jayanti Native Textile Post", date: "Starts Oct 02", completed: true },
                  { title: "Pushkar Camel Fair Micro-story", date: "Starts Nov 15", completed: false },
                ].map((item, idx) => (
                  <div 
                    key={idx}
                    onClick={() => onNavigateToTab('festivals')}
                    className="flex items-start gap-3 p-2 rounded-xl hover:bg-espresso/5 cursor-pointer transition-colors"
                  >
                    <div className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                      item.completed ? 'bg-emerald-500/10 text-emerald-600' : 'border border-espresso/20 text-transparent'
                    }`}>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-espresso">{item.title}</div>
                      <div className="text-[10px] font-mono text-muted-taupe">{item.date}</div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => onNavigateToTab('festivals')}
                className="w-full py-3 border border-espresso text-espresso hover:bg-espresso hover:text-atelier-bg rounded-xl font-bold uppercase tracking-widest text-[10px] duration-300 mt-2"
              >
                Go To Festivals Portal
              </button>
            </div>
          </div>

          <div className="glass-card rounded-[1.5rem] p-6 border border-espresso/8 flex flex-col gap-4">
            <h4 className="font-serif text-lg text-espresso">
              API Connection Status
            </h4>
            <div className="flex items-center justify-between text-xs bg-emerald-500/5 text-emerald-800 dark:text-emerald-300 p-3 rounded-xl border border-emerald-500/10">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Google Gemini AI Engine</span>
              </span>
              <span className="font-mono text-[10px] font-bold">READY</span>
            </div>
            <p className="text-[11px] text-muted-taupe leading-relaxed">
              Fully loaded with <strong>gemini-3.5-flash</strong>. Your caption generation uses actual real-time model requests secure on the backend.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
