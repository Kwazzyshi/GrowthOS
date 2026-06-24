import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, CheckCircle2, Sparkles, Calendar, BarChart3, CloudUpload, Landmark } from 'lucide-react';
import { FeatureItem } from '../types';

interface FeaturesSectionProps {
  onSelectFeatureAction: (featureId: string) => void;
}

export default function FeaturesSection({ onSelectFeatureAction }: FeaturesSectionProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activeFeature, setActiveFeature] = useState<string>('content');

  const features: FeatureItem[] = [
    {
      id: 'content',
      title: "Content Generation",
      description: "Automated, contextual social media copy optimized for regional nuances and premium styles.",
      longDescription: "Our creative generator crafts pristine captions and image briefs that match your brand's unique tone of voice. Leveraging Gemini 3.5's high-fidelity language processing, it generates multi-platform narratives instantly.",
      benefits: [
        "Regional cultural references and idioms natively woven in.",
        "Perfect tone-matching ranging from editorial minimal to conversational.",
        "Generates detailed visual instructions for your design team or image generators."
      ],
      visualType: 'captions'
    },
    {
      id: 'planning',
      title: "Campaign Planning",
      description: "Synchronize your strategy around major holidays and regional events with an interactive editorial planner.",
      longDescription: "Never miss a critical campaign window. GrowthOS pre-emptively maps out festival sequences, advising you on timelines, themes, and publication frequency to build cultural affinity with your audience.",
      benefits: [
        "Pre-loaded Indian holiday calendars (Diwali, Holi, Dussehra, Independence Day, etc.).",
        "Strategic multi-week campaign architecture guidance.",
        "Drag-and-drop editorial schedule that matches the rhythm of slow design."
      ],
      visualType: 'calendar'
    },
    {
      id: 'insights',
      title: "Audience Insights",
      description: "Stunning analytics that chart your growth and help you understand what truly resonates.",
      longDescription: "We distill complex engagement data into beautifully clean, readable metrics. Understand key performing themes and audience behaviors with bespoke, high-contrast visual reports.",
      benefits: [
        "Deep semantic analysis of user comments and feedback.",
        "Content theme classification mapping (which topics perform best).",
        "Bespoke data visualizations suited for executive reviews."
      ],
      visualType: 'chart'
    },
    {
      id: 'posting',
      title: "Automated Posting",
      description: "Seamless publishing pipeline delivering your brand creatives reliably and safely.",
      longDescription: "Deploy content smoothly. Setup automated pipelines that post high-resolution creatives directly to Instagram, Twitter, and LinkedIn, maintaining a continuous, high-quality digital presence.",
      benefits: [
        "Intelligent queue management to space posts naturally.",
        "Auto-tagging and location tagging for targeted regional reach.",
        "Continuous uptime with robust server-side distribution."
      ],
      visualType: 'grid'
    }
  ];

  return (
    <section className="relative py-32 bg-atelier-surface-dim/30 atelier-grid border-y border-espresso/6 overflow-hidden">
      <div className="max-w-6xl mx-auto w-full px-6">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-24">
          <div className="space-y-4">
            <span className="text-xs tracking-widest uppercase font-mono text-muted-taupe">
              The Platform Capabilities
            </span>
            <h2 className="font-serif text-4xl md:text-6xl text-espresso tracking-tight">
              Slow Crafted. <br />
              <span className="italic font-light text-atelier-blue">Intelligently Driven.</span>
            </h2>
          </div>
          <p className="font-sans text-sm text-warm-brown max-w-sm leading-relaxed">
            Every feature is designed to reduce the friction of constant digital scheduling, enabling premium storytelling with robust, AI-powered systems.
          </p>
        </div>

        {/* Dual-column interactive feature list and live visual layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left: The interactive list */}
          <div className="lg:col-span-6 flex flex-col divide-y divide-espresso/10">
            {features.map((feature) => {
              const isSelected = activeFeature === feature.id;
              const isHovered = hoveredId === feature.id;
              
              return (
                <div
                  key={feature.id}
                  className="py-8 cursor-pointer group transition-all duration-300"
                  onMouseEnter={() => {
                    setHoveredId(feature.id);
                    setActiveFeature(feature.id);
                  }}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => onSelectFeatureAction(feature.id)}
                >
                  <div className="flex justify-between items-end gap-4">
                    <div className="space-y-3">
                      {/* Section Number */}
                      <span className="text-[10px] font-mono tracking-widest text-muted-taupe block">
                        {`0${features.indexOf(feature) + 1}`}
                      </span>
                      {/* Heading */}
                      <h3 className="font-serif text-2xl md:text-4xl text-espresso group-hover:text-atelier-blue transition-colors duration-300">
                        {feature.title}
                      </h3>
                    </div>
                    {/* Outward arrow icon */}
                    <div className="w-10 h-10 rounded-full border border-espresso/10 flex items-center justify-center group-hover:bg-espresso group-hover:text-atelier-bg transition-all duration-500">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Elegant expansion section */}
                  <div className={`grid transition-all duration-500 overflow-hidden ${
                    isSelected ? 'grid-rows-[1fr] opacity-100 mt-6' : 'grid-rows-[0fr] opacity-0'
                  }`}>
                    <div className="overflow-hidden">
                      <p className="font-sans text-sm text-warm-brown leading-relaxed mb-6">
                        {feature.longDescription}
                      </p>
                      
                      {/* Benefits bullets list */}
                      <ul className="space-y-2.5">
                        {feature.benefits.map((benefit, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-2.5 text-xs font-medium text-espresso">
                            <CheckCircle2 className="w-4 h-4 text-atelier-accent-gold shrink-0 mt-0.5" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                      
                      {/* Go to app link */}
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectFeatureAction(feature.id);
                        }}
                        className="mt-6 flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-atelier-blue hover:text-espresso underline decoration-dotted underline-offset-4 transition-all"
                      >
                        Launch Interactive Module
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: The beautiful reactive glassmorphic visual panel */}
          <div className="lg:col-span-6 sticky top-32">
            <div className="w-full aspect-[4/3] glass-card rounded-[1.5rem] p-8 border border-espresso/8 shadow-xl relative overflow-hidden flex flex-col justify-between">
              {/* Subtle background graphics */}
              <div className="absolute inset-0 bg-atelier-surface/40 opacity-50 z-0" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-atelier-accent-gold/5 rounded-full filter blur-[50px] z-0" />

              <div className="relative z-10 w-full h-full flex flex-col justify-between">
                
                {/* Header info */}
                <div className="flex justify-between items-center border-b border-espresso/6 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-atelier-blue" />
                    <span className="text-[10px] font-mono tracking-widest uppercase text-muted-taupe">
                      {features.find(f => f.id === activeFeature)?.title} Visualizer
                    </span>
                  </div>
                  <span className="text-[9px] font-mono border border-espresso/15 text-espresso px-2 py-0.5 rounded-full uppercase">
                    Sandbox v1.0
                  </span>
                </div>

                {/* Main Interactive visualization content based on selected feature */}
                <div className="flex-grow flex items-center justify-center py-6 relative z-10">
                  <AnimatePresence mode="wait">
                    {activeFeature === 'content' && (
                      <motion.div
                        key="content"
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        transition={{ duration: 0.4 }}
                        className="w-full bg-atelier-surface/90 border border-espresso/8 p-5 rounded-2xl shadow-sm flex flex-col gap-4"
                      >
                        <div className="flex justify-between items-center text-[10px] uppercase font-mono text-muted-taupe border-b border-espresso/5 pb-2">
                          <span>Creative Draft</span>
                          <span className="text-atelier-blue font-bold">Instantly Ready</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="p-2.5 bg-atelier-accent-gold/15 rounded-xl text-atelier-accent-gold">
                            <Sparkles className="w-5 h-5" />
                          </div>
                          <div className="space-y-1.5 flex-grow">
                            <div className="text-[11px] font-semibold text-espresso italic">diwali_heritage_campaign.pdf</div>
                            <div className="h-2 bg-espresso/5 rounded-full w-4/5" />
                            <div className="h-2 bg-espresso/5 rounded-full w-3/5" />
                          </div>
                        </div>
                        <div className="text-xs text-warm-brown bg-atelier-bg p-3 rounded-xl border border-espresso/5 font-serif italic text-center">
                          "Under the quiet sky of lights, a story begins..."
                        </div>
                      </motion.div>
                    )}

                    {activeFeature === 'planning' && (
                      <motion.div
                        key="planning"
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        transition={{ duration: 0.4 }}
                        className="w-full grid grid-cols-7 gap-2"
                      >
                        {[...Array(14)].map((_, i) => {
                          const dayNum = i + 12;
                          const hasEvent = i === 2 || i === 8;
                          const hasPost = i === 4 || i === 11;
                          
                          return (
                            <div 
                              key={i} 
                              className={`aspect-square rounded-xl border p-2 flex flex-col justify-between transition-all duration-300 ${
                                hasEvent 
                                  ? 'bg-atelier-accent-gold/10 border-atelier-accent-gold/30' 
                                  : hasPost 
                                  ? 'bg-atelier-blue/10 border-atelier-blue/30' 
                                  : 'bg-atelier-surface/80 border-espresso/6'
                              }`}
                            >
                              <span className="text-[9px] font-mono text-muted-taupe">{dayNum}</span>
                              {hasEvent && <Landmark className="w-3 h-3 text-atelier-accent-gold shrink-0 self-end" />}
                              {hasPost && <Calendar className="w-3 h-3 text-atelier-blue shrink-0 self-end" />}
                            </div>
                          );
                        })}
                      </motion.div>
                    )}

                    {activeFeature === 'insights' && (
                      <motion.div
                        key="insights"
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        transition={{ duration: 0.4 }}
                        className="w-full bg-atelier-surface/80 border border-espresso/8 p-5 rounded-2xl shadow-sm flex flex-col gap-4"
                      >
                        <div className="flex justify-between items-center text-[10px] uppercase font-mono text-muted-taupe">
                          <span>Performance Trend</span>
                          <span className="text-emerald-700 font-bold font-mono">↗ +45% CTR</span>
                        </div>
                        {/* Custom visual chart drawing using fine lines */}
                        <div className="h-28 w-full flex items-end gap-3 pt-4 border-b border-espresso/8 pb-1">
                          {[40, 25, 55, 30, 75, 50, 90].map((val, i) => (
                            <div key={i} className="flex-grow flex flex-col items-center gap-1.5 h-full justify-end">
                              <motion.div 
                                className={`w-full rounded-t-md ${i === 6 ? 'bg-atelier-accent-gold' : 'bg-espresso/20'}`}
                                initial={{ height: 0 }}
                                animate={{ height: `${val}%` }}
                                transition={{ duration: 0.8, delay: i * 0.05 }}
                              />
                              <span className="text-[8px] font-mono text-muted-taupe">M0{i+1}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {activeFeature === 'posting' && (
                      <motion.div
                        key="posting"
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        transition={{ duration: 0.4 }}
                        className="w-full flex flex-col gap-3"
                      >
                        {['LinkedIn Feed', 'Instagram Carousel', 'X Status'].map((feed, idx) => (
                          <div key={idx} className="bg-atelier-surface/90 border border-espresso/8 p-3 rounded-xl flex items-center justify-between shadow-sm">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-espresso/5 flex items-center justify-center text-espresso border border-espresso/10">
                                <CloudUpload className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="text-xs font-semibold text-espresso">{feed}</div>
                                <div className="text-[10px] text-muted-taupe font-mono">Queue slot {idx + 1} • Auto-posting</div>
                              </div>
                            </div>
                            <span className="text-[9px] bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-bold px-2 py-0.5 rounded-full font-mono">
                              READY
                            </span>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Footer labels */}
                <div className="flex justify-between items-center border-t border-espresso/6 pt-4 text-[10px] font-mono text-muted-taupe">
                  <span>GrowthOS Studio Interactive Sandbox</span>
                  <span className="text-espresso font-semibold">Active Mode</span>
                </div>

              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
