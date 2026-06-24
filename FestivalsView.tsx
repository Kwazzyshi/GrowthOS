import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Landmark, Sparkles, ArrowRight, Calendar, CheckCircle2, Award, Copy, Check, Image, Compass, RefreshCw } from 'lucide-react';
import { FestivalCampaign } from '../types';

interface FestivalsViewProps {
  onSelectFestivalCampaign: (prompt: string) => void;
  onNavigateToTab: (tabId: string) => void;
}

export default function FestivalsView({ onSelectFestivalCampaign, onNavigateToTab }: FestivalsViewProps) {
  const [activeFestival, setActiveFestival] = useState<string>('diwali');
  const [campaignLoading, setCampaignLoading] = useState(false);
  const [campaignResult, setCampaignResult] = useState<{
    campaignName: string;
    heroCaption: string;
    instagramCaption: string;
    linkedinCaption: string;
    hashtags: string[];
    campaignStrategy: string;
    contentSchedule: Array<{
      day: string;
      contentIdea: string;
      format: string;
    }>;
    imagePrompt: string;
  } | null>(null);
  const [campaignError, setCampaignError] = useState<string | null>(null);
  const [copiedState, setCopiedState] = useState<string | null>(null);

  const festivals: FestivalCampaign[] = [
    {
      id: 'diwali',
      name: "Diwali • Festival of Lights & Slow Crafts",
      date: "November 08, 2026",
      description: "Celebrate the warmth of slow-spun cottons, native brassware, and handmade terracotta diyas.",
      significance: "The absolute zenith of India's cultural retail, celebrating victory, warmth, and the home. Focus heavily on slow-crafted premium items, lights, sustainability, and gifting handmade heritage goods.",
      themes: [
        " Terracotta & Handcrafted Diyas: Honoring organic clay artisans.",
        " Brass & Metalwork: Antique premium finishes and heirloom quality.",
        " Heritage Gift Boxes: Slow luxury hampers containing organic products."
      ],
      suggestedHashtags: ["DiwaliHeritage", "SlowLuxuryDiwali", "HandmadeIndia", "TerracottaWarmth"],
      status: "Ready"
    },
    {
      id: 'navratri',
      name: "Navratri • The 9 Color Sequences of Weaving",
      date: "Starts October 14, 2026",
      description: "Engage your audience with consecutive days celebrating organic colors, handloom cottons, and craft guilds.",
      significance: "A nine-night dance of colors and devotion. Leverage daily themes matching Navratri's traditional colors (Yellow, Green, Grey, Orange, etc.) to highlight unique regional weaving techniques.",
      themes: [
        " Gujarat Mirror Weaving: Exquisite glasswork and sand-dune hues.",
        " Indigo dyeing & Block prints: Celebrating natural pigments.",
        " Multi-day carousel: Mapping your collection items to the festive colors."
      ],
      suggestedHashtags: ["NavratriColors", "NineNightsOfCraft", "MirrorWeaving", "VibrantIndia"],
      status: "Ready"
    },
    {
      id: 'khadi',
      name: "Gandhi Jayanti • Swadeshi Fiber Week",
      date: "October 02, 2026",
      description: "Honoring organic spinning and local weavers. Focus on pure hand-spun Khadi cottons and linen textiles.",
      significance: "Reflecting on self-sufficiency, sustainability, and the raw beauty of organic looms. An excellent opportunity to showcase pure organic fiber ranges, hand-made weaves, and conscious design philosophy.",
      themes: [
        " Handspun Cotton: Exploring the coarse, breathable beauty of genuine Khadi.",
        " Sustainable Fashion: The ultimate zero-carbon textile story.",
        " Artisan Chronicles: Interviews and spotlights of village loom masters."
      ],
      suggestedHashtags: ["KhadiSwadeshi", "GandhiJayanti", "ConsciousLuxury", "HandspunIndia"],
      status: "Ready"
    },
    {
      id: 'pushkar',
      name: "Pushkar Fair • Nomadic Leather & Desert Weaves",
      date: "November 15, 2026",
      description: "Celebrate camel hair rugs, nomadic leather craft, and heavy sand-dyed ethnic jewelry collections.",
      significance: "A vibrant, world-renowned fair in Rajasthan. Perfect for brands with artisanal leather accessories, heavy brass ornamentation, nomad rugs, and warm rustic desert interior aesthetics.",
      themes: [
        " Rustic Sand Tones: Earthy terracotta, warm ochre, and deep sienna colorways.",
        " Nomadic Accessories: Vegan or vegetable-dyed leather straps and utility gear.",
        " Brass Embellishments: Heavy desert jewelry-inspired accents."
      ],
      suggestedHashtags: ["PushkarFair", "NomadicCraft", "DesertAesthetic", "EarthyTextiles"],
      status: "Planned"
    }
  ];

  const handleLaunchCampaign = async (festival: FestivalCampaign) => {
    setCampaignLoading(true);
    setCampaignError(null);
    setCampaignResult(null);
    setCopiedState(null);
    
    try {
      const response = await fetch('/api/generate-festival-campaign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          festivalName: festival.name,
          festivalDate: festival.date,
          significance: festival.significance,
          themes: festival.themes,
          brandContext: 'Premium Indian handloom and slow craft brand'
        })
      });
      
      if (!response.ok) throw new Error('Campaign generation failed');
      const data = await response.json();
      setCampaignResult(data);
    } catch (err: any) {
      setCampaignError(err.message || 'Campaign generation failed');
    } finally {
      setCampaignLoading(false);
    }
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedState(type);
    setTimeout(() => setCopiedState(null), 2000);
  };

  const activeFestivalData = festivals.find(f => f.id === activeFestival) || festivals[0];

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col gap-12 mt-20">
      
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-espresso/10 pb-8">
        <div className="space-y-2">
          <span className="text-xs uppercase font-mono tracking-widest text-muted-taupe">
            Cultural Campaigns Guide
          </span>
          <h1 className="font-serif text-3xl md:text-5xl text-espresso tracking-tight">
            Indian Festivals Planner
          </h1>
        </div>
        <p className="font-sans text-sm text-warm-brown max-w-sm leading-relaxed">
          Pre-planned multi-channel campaign architectures synchronized with national celebrations and traditional craft weeks.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Festival List (5 cols on desktop) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="text-[10px] uppercase font-mono tracking-widest text-muted-taupe">
            Active Campaign Library
          </div>
          
          <div className="flex flex-col gap-3">
            {festivals.map((fest) => {
              const isActive = activeFestival === fest.id;
              return (
                <div
                  key={fest.id}
                  onClick={() => {
                    setActiveFestival(fest.id);
                    setCampaignResult(null); // Clear previous results when switching festivals
                    setCampaignError(null);
                  }}
                  className={`p-5 rounded-2xl border text-left cursor-pointer transition-all duration-300 flex items-center justify-between group ${
                    isActive 
                      ? 'bg-espresso text-atelier-bg border-espresso shadow-md scale-102' 
                      : 'bg-white/80 border-espresso/6 hover:border-espresso/15 hover:bg-white'
                  }`}
                >
                  <div className="space-y-1">
                    <span className={`text-[9px] font-mono tracking-widest ${isActive ? 'text-atelier-accent-gold' : 'text-muted-taupe'}`}>
                      {fest.date}
                    </span>
                    <h3 className="font-serif text-lg leading-tight">
                      {fest.name.split('•')[0].trim()}
                    </h3>
                  </div>
                  <div className={`p-2 rounded-full border transition-all ${
                    isActive 
                      ? 'border-atelier-accent-gold/30 bg-atelier-accent-gold/10 text-atelier-accent-gold' 
                      : 'border-espresso/10 bg-transparent text-espresso/40 group-hover:bg-espresso/5 group-hover:text-espresso'
                  }`}>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Dynamic Preview Card & Campaign Results */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          
          {/* Active Festival Description Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFestivalData.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="glass-card rounded-[1.5rem] p-8 border border-espresso/8 shadow-md flex flex-col gap-6"
            >
              <div className="flex justify-between items-start border-b border-espresso/6 pb-4">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-muted-taupe">Cultural Landmark</span>
                  <h2 className="font-serif text-2xl md:text-3xl text-espresso">{activeFestivalData.name}</h2>
                </div>
                <span className="text-[10px] font-mono border border-espresso/10 text-espresso px-3 py-1 rounded-full uppercase font-bold shrink-0">
                  {activeFestivalData.status}
                </span>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] uppercase font-mono tracking-widest text-muted-taupe block">The Marketing Significance</span>
                <p className="text-sm text-warm-brown leading-relaxed bg-atelier-surface/60 p-4 rounded-xl border border-espresso/5 italic">
                  "{activeFestivalData.significance}"
                </p>
              </div>

              <div className="space-y-4">
                <span className="text-[10px] uppercase font-mono tracking-widest text-muted-taupe block">Recommended Campaign Angles</span>
                <div className="grid grid-cols-1 gap-3">
                  {activeFestivalData.themes.map((theme, tIdx) => (
                    <div key={tIdx} className="flex items-start gap-3 p-3 bg-espresso/5 rounded-xl border border-espresso/5">
                      <CheckCircle2 className="w-4 h-4 text-atelier-accent-gold shrink-0 mt-0.5" />
                      <span className="text-xs font-semibold text-espresso leading-relaxed">{theme}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2 border-t border-espresso/6 pt-5">
                <span className="text-[10px] uppercase font-mono tracking-widest text-muted-taupe block">Hashtag Blueprint</span>
                <div className="flex flex-wrap gap-1.5">
                  {activeFestivalData.suggestedHashtags.map((h, hIdx) => (
                    <span key={hIdx} className="text-[10px] font-mono text-muted-taupe bg-espresso/5 px-2 py-0.5 rounded-full">
                      #{h}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => handleLaunchCampaign(activeFestivalData)}
                disabled={campaignLoading}
                className="w-full py-4 bg-espresso text-atelier-bg hover:bg-warm-brown rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 duration-300 mt-4 shadow-lg cursor-pointer disabled:opacity-55"
              >
                {campaignLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-atelier-accent-gold" />
                    <span>Orchestrating Cultural AI Campaign...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-atelier-accent-gold" />
                    <span>Generate AI Festival Campaign</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </motion.div>
          </AnimatePresence>

          {/* Error Message */}
          {campaignError && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-700 text-xs rounded-xl font-mono">
              Error generating campaign: {campaignError}
            </div>
          )}

          {/* AI Generated Campaign Result Display */}
          {campaignResult && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="glass-card rounded-[1.5rem] p-8 border border-espresso/12 shadow-xl flex flex-col gap-8 bg-atelier-surface"
            >
              <div className="border-b border-espresso/10 pb-5">
                <span className="text-[10px] uppercase font-mono tracking-widest text-atelier-accent-gold">Generated AI Strategy</span>
                <h3 className="font-serif text-2xl md:text-3xl text-espresso mt-1">
                  {campaignResult.campaignName}
                </h3>
              </div>

              {/* Strategic Overview */}
              <div className="space-y-2">
                <span className="text-[10px] uppercase font-mono tracking-widest text-muted-taupe block">Strategic Roadmap</span>
                <p className="text-sm text-warm-brown leading-relaxed font-sans bg-espresso/5 p-4 rounded-xl border border-espresso/5">
                  {campaignResult.campaignStrategy}
                </p>
              </div>

              {/* Interactive Multi-Format Captions */}
              <div className="space-y-6">
                <span className="text-[10px] uppercase font-mono tracking-widest text-muted-taupe block">Copywriting Blueprints</span>
                
                {/* 1. Hero Editorial Caption */}
                <div className="bg-atelier-bg border border-espresso/8 rounded-2xl p-5 relative space-y-3 shadow-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-serif font-bold text-espresso uppercase tracking-wider">Heritage Story Editorial</span>
                    <button
                      onClick={() => copyToClipboard(campaignResult.heroCaption, 'hero')}
                      className="p-1.5 rounded-lg border border-espresso/10 hover:border-espresso text-[10px] font-mono tracking-wider transition-all duration-300 bg-white hover:bg-espresso hover:text-atelier-bg flex items-center gap-1 cursor-pointer"
                    >
                      {copiedState === 'hero' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-espresso" />}
                      <span>{copiedState === 'hero' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <p className="text-xs text-warm-brown leading-relaxed italic font-serif whitespace-pre-wrap">
                    "{campaignResult.heroCaption}"
                  </p>
                </div>

                {/* 2. Instagram & LinkedIn side-by-side */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Instagram Version */}
                  <div className="bg-atelier-bg border border-espresso/8 rounded-2xl p-5 relative space-y-3 flex flex-col justify-between shadow-sm">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-[11px] font-mono font-bold text-amber-800 uppercase tracking-wider">Instagram Post</span>
                        <button
                          onClick={() => copyToClipboard(campaignResult.instagramCaption, 'insta')}
                          className="p-1 rounded-lg border border-espresso/10 text-[9px] font-mono transition-all bg-white hover:bg-espresso hover:text-atelier-bg flex items-center gap-1 cursor-pointer"
                        >
                          {copiedState === 'insta' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-espresso" />}
                          <span>{copiedState === 'insta' ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>
                      <p className="text-xs text-warm-brown leading-relaxed font-sans whitespace-pre-wrap">
                        {campaignResult.instagramCaption}
                      </p>
                    </div>
                  </div>

                  {/* LinkedIn Version */}
                  <div className="bg-atelier-bg border border-espresso/8 rounded-2xl p-5 relative space-y-3 flex flex-col justify-between shadow-sm">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-[11px] font-mono font-bold text-blue-800 uppercase tracking-wider">LinkedIn Visionary</span>
                        <button
                          onClick={() => copyToClipboard(campaignResult.linkedinCaption, 'linkedin')}
                          className="p-1 rounded-lg border border-espresso/10 text-[9px] font-mono transition-all bg-white hover:bg-espresso hover:text-atelier-bg flex items-center gap-1 cursor-pointer"
                        >
                          {copiedState === 'linkedin' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-espresso" />}
                          <span>{copiedState === 'linkedin' ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>
                      <p className="text-xs text-warm-brown leading-relaxed font-sans whitespace-pre-wrap">
                        {campaignResult.linkedinCaption}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hashtags and Visual Prompt */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-espresso/8 pt-6">
                
                {/* Visual Art Direction */}
                <div className="space-y-3">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-muted-taupe flex items-center gap-1.5">
                    <Image className="w-3.5 h-3.5" />
                    <span>Visual Art Direction</span>
                  </span>
                  <p className="text-xs text-warm-brown leading-relaxed font-sans bg-espresso/5 p-4 rounded-xl border border-espresso/5 italic">
                    "{campaignResult.imagePrompt}"
                  </p>
                </div>

                {/* Campaign Hashtags */}
                <div className="space-y-3">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-muted-taupe flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5" />
                    <span>Hashtag Set</span>
                  </span>
                  <div className="flex flex-wrap gap-1.5 bg-espresso/5 p-4 rounded-xl border border-espresso/5">
                    {campaignResult.hashtags.map((tag, i) => (
                      <span key={i} className="text-xs font-mono text-espresso bg-white px-2 py-0.5 rounded-md border border-espresso/5">
                        #{tag.replace('#', '')}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Multi-Day Content Schedule Timeline */}
              <div className="border-t border-espresso/8 pt-6 space-y-4">
                <span className="text-[10px] uppercase font-mono tracking-widest text-muted-taupe block">Multi-Day Content Launch Schedule</span>
                
                <div className="relative pl-6 border-l border-espresso/15 ml-3 space-y-6">
                  {campaignResult.contentSchedule.map((item, idx) => (
                    <div key={idx} className="relative group">
                      {/* Timeline Dot */}
                      <span className="absolute -left-[31px] top-1.5 w-4.5 h-4.5 rounded-full bg-atelier-bg border-2 border-atelier-accent-gold flex items-center justify-center group-hover:scale-110 transition-transform">
                        <span className="w-1.5 h-1.5 rounded-full bg-espresso" />
                      </span>
                      
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-atelier-accent-gold">{item.day}</span>
                          <span className="text-[9px] font-mono uppercase bg-espresso/5 px-2 py-0.5 rounded-full text-muted-taupe">{item.format}</span>
                        </div>
                        <p className="text-xs text-espresso leading-relaxed font-sans font-medium">
                          {item.contentIdea}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </motion.div>
          )}

        </div>

      </div>

    </div>
  );
}
