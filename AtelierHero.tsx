import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Sparkles, Calendar, MessageSquare, ArrowRight, TrendingUp } from 'lucide-react';

interface AtelierHeroProps {
  onGetStarted: () => void;
  onSeeFeatures: () => void;
}

export default function AtelierHero({ onGetStarted, onSeeFeatures }: AtelierHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Create beautiful 3D scroll effects based on document/section scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Calculate transforms for various elements to provide high-end 3D scroll animations
  const yText = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacityText = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const rotateXCard = useTransform(scrollYProgress, [0, 1], [12, -5]);
  const rotateYCard = useTransform(scrollYProgress, [0, 1], [-15, 5]);
  const scaleCard = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const yCard = useTransform(scrollYProgress, [0, 1], [0, -30]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[110vh] w-full flex flex-col justify-center items-center overflow-hidden bg-atelier-bg atelier-grid pt-32 pb-24 px-6 perspective-container"
    >
      {/* Decorative radial gradients for glowing warmth */}
      <div className="absolute top-[20%] left-[10%] w-[45rem] h-[45rem] bg-[#fdfaf2] rounded-full filter blur-[120px] opacity-70 pointer-events-none" />
      <div className="absolute bottom-[10%] right-[5%] w-[40rem] h-[40rem] bg-atelier-accent-gold/5 rounded-full filter blur-[150px] opacity-50 pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full flex flex-col lg:grid lg:grid-cols-12 gap-16 items-center relative z-10">
        
        {/* Left Column: Heading and Description with parallax scroll */}
        <motion.div 
          className="lg:col-span-6 text-left flex flex-col gap-8"
          style={{ y: yText, opacity: opacityText }}
        >
          {/* Subtle Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-espresso/5 border border-espresso/8 rounded-full w-fit">
            <Sparkles className="w-3.5 h-3.5 text-atelier-accent-gold animate-spin-slow" />
            <span className="text-[10px] tracking-widest uppercase font-semibold text-warm-brown font-sans">
              AI Marketing • Always On
            </span>
          </div>

          {/* Headline - Editorial Instrument Serif typography pairing */}
          <h1 className="font-serif text-5xl md:text-7xl leading-[1.05] text-espresso tracking-tight">
            Your AI <br />
            Marketing Team, <br />
            <span className="font-serif italic font-light text-atelier-blue relative inline-block">
              Always On
              <svg className="absolute -bottom-2 left-0 w-full h-2 text-atelier-accent-gold/40" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0,5 Q50,10 100,5" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </h1>

          {/* Description */}
          <p className="font-sans text-base md:text-lg text-warm-brown/90 leading-relaxed max-w-xl">
            Replace your social media manager. GrowthOS is a bespoke AI marketing platform that automates highly targeted content, plans tailored Indian festival campaigns, and publishes scheduled creatives—all powered by Google Gemini.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
            <button
              onClick={onGetStarted}
              className="group w-full sm:w-auto px-8 py-4 bg-espresso text-atelier-bg rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-warm-brown hover:-translate-y-0.5 duration-300 cursor-pointer shadow-lg shadow-espresso/15 border border-espresso"
            >
              <Sparkles className="w-4 h-4 text-atelier-accent-gold" />
              <span>Get Started Free</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onSeeFeatures}
              className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-espresso/5 border border-espresso/15 hover:border-espresso text-espresso rounded-xl font-bold uppercase tracking-widest text-xs duration-300 cursor-pointer"
            >
              See Features
            </button>
          </div>

          {/* Trust badges */}
          <div className="flex flex-col gap-2 pt-6 border-t border-espresso/8 mt-4">
            <span className="text-[10px] tracking-widest uppercase font-mono text-muted-taupe">
              Tailored Cultural IQ
            </span>
            <div className="flex items-center gap-6">
              <span className="text-xs font-semibold text-espresso">✓ Regional Festivities Scheduler</span>
              <span className="text-xs font-semibold text-espresso">✓ Gemini Pro 3.1 Creative Engine</span>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Beautiful Interactive 3D Interactive Mockup Container */}
        <div className="lg:col-span-6 w-full flex justify-center items-center">
          <motion.div
            className="w-full max-w-lg aspect-[4/3] relative preserve-3d"
            style={{
              rotateX: rotateXCard,
              rotateY: rotateYCard,
              scale: scaleCard,
              y: yCard,
            }}
          >
            {/* Main Premium Floating Glass Screen */}
            <div className="w-full h-full glass-card rounded-[1.5rem] p-6 flex flex-col justify-between border border-espresso/10 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-atelier-accent-gold via-espresso to-atelier-blue" />
              
              {/* Header inside mockup */}
              <div className="flex justify-between items-center border-b border-espresso/6 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-espresso/10" />
                  <div className="w-3 h-3 rounded-full bg-espresso/10" />
                  <div className="w-3 h-3 rounded-full bg-espresso/10" />
                  <span className="text-[10px] font-mono tracking-widest text-muted-taupe ml-2 uppercase">
                    GrowthOS Creative Suite
                  </span>
                </div>
                <span className="text-[10px] bg-atelier-blue/10 text-atelier-blue px-2.5 py-1 rounded-full font-semibold font-mono">
                  ● ACTIVE
                </span>
              </div>

              {/* Body inside mockup */}
              <div className="flex-grow flex flex-col gap-4 justify-center py-6">
                <div className="space-y-1.5">
                  <div className="text-[10px] uppercase font-mono text-muted-taupe tracking-wider flex items-center gap-1">
                    <span>Campaign Prompt</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  <div className="text-sm font-medium text-espresso italic bg-espresso/5 p-3 rounded-xl border border-espresso/5 font-serif">
                    "Create a social media campaign for Diwali celebrating high craftsmanship and warm lights"
                  </div>
                </div>

                <div className="space-y-2 border-t border-espresso/6 pt-4">
                  <div className="text-[10px] uppercase font-mono text-muted-taupe tracking-wider">
                    Generated Content Output
                  </div>
                  <div className="text-xs text-warm-brown leading-relaxed bg-atelier-surface/90 p-4 rounded-xl border border-espresso/8 shadow-sm">
                    <p className="font-semibold text-espresso mb-1">Let there be warm lights and intentional silences. ✨</p>
                    <p className="text-[11px] leading-relaxed">This Diwali, we celebrate the artisans of slow design. Bridging heritage and modern grace. #SlowLiving #HandcraftedDiwali #AtelierStyle</p>
                  </div>
                </div>
              </div>

              {/* Footer inside mockup */}
              <div className="flex justify-between items-center border-t border-espresso/6 pt-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-espresso">
                  <MessageSquare className="w-3.5 h-3.5 text-atelier-blue" />
                  <span>3 Platforms Connected</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>94.2% engagement boost</span>
                </div>
              </div>
            </div>

            {/* Small floating 3D secondary cards around the main card */}
            <motion.div 
              className="absolute -top-10 -left-12 glass-card rounded-xl p-4 shadow-xl border border-espresso/10 flex items-center gap-3 z-20 hover:scale-105 duration-300 cursor-pointer pointer-events-auto"
              style={{ translateZ: 100 }}
            >
              <div className="p-2 bg-atelier-accent-gold/15 rounded-lg text-atelier-accent-gold">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] font-mono text-muted-taupe uppercase tracking-wider">Gemini Engine</div>
                <div className="text-xs font-bold text-espresso">Creative Copy Optimized</div>
              </div>
            </motion.div>

            <motion.div 
              className="absolute -bottom-6 -right-10 glass-card rounded-xl p-4 shadow-xl border border-espresso/10 flex items-center gap-3 z-20 hover:scale-105 duration-300 cursor-pointer pointer-events-auto"
              style={{ translateZ: 150 }}
            >
              <div className="p-2 bg-atelier-blue/15 rounded-lg text-atelier-blue">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] font-mono text-muted-taupe uppercase tracking-wider">Campaign Schedule</div>
                <div className="text-xs font-bold text-espresso">Indian Holidays Loaded</div>
              </div>
            </motion.div>
          </motion.div>
        </div>

      </div>

      {/* Elegant scroll indicator at bottom */}
      <motion.div 
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 opacity-60 text-espresso/70 text-xs tracking-widest uppercase font-mono cursor-pointer"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
      >
        <span>Scroll to Explore</span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-espresso to-transparent" />
      </motion.div>
    </section>
  );
}
