import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Sparkles } from 'lucide-react';

interface TickerItem {
  text: string;
  linkText?: string;
  onClick?: () => void;
  tag?: string;
}

interface InteractiveTickerProps {
  items?: TickerItem[];
  direction?: 'left' | 'right';
  speed?: number;
}

export default function InteractiveTicker({
  items,
  direction = 'left',
  speed = 35,
}: InteractiveTickerProps) {
  const [isHovered, setIsHovered] = useState(false);

  const defaultItems: TickerItem[] = [
    { text: "Your Social Media Manager, Reimagined", tag: "AI TEAM" },
    { text: "Campaign Planning tailored for India's Cultural Festivals", tag: "CULTURAL IQ" },
    { text: "Automated Content Generation Powered by Gemini", tag: "NEXT-GEN" },
    { text: "Optimize audience insight and posting schedules", tag: "GROWTH OS" },
    { text: "Atelier Premium Design System Integration", tag: "CRAFT" },
  ];

  const displayItems = items || defaultItems;

  // Duplicate items to ensure smooth loop
  const tripledItems = [...displayItems, ...displayItems, ...displayItems];

  return (
    <div 
      className="relative w-full overflow-hidden border-y border-espresso py-4 bg-espresso z-20 select-none cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-espresso to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-espresso to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex whitespace-nowrap gap-16 items-center"
        animate={{
          x: direction === 'left' ? [0, -1000] : [-1000, 0],
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: speed,
          playState: isHovered ? "paused" : "running",
        }}
        style={{ width: 'max-content' }}
      >
        {tripledItems.map((item, index) => (
          <div key={index} className="flex items-center gap-6 group">
            {/* Elegant tiny badge */}
            {item.tag && (
              <span className="text-[9px] tracking-widest uppercase font-mono px-2 py-0.5 rounded-full border border-atelier-bg/30 text-atelier-bg/80 bg-espresso group-hover:bg-atelier-bg group-hover:text-espresso group-hover:border-atelier-bg transition-all duration-300">
                {item.tag}
              </span>
            )}
            
            {/* Ticker Text */}
            <span className="font-serif italic text-2xl text-atelier-bg tracking-tight">
              {item.text}
            </span>

            {/* Link Text with elegant icon */}
            {item.linkText && (
              <span 
                onClick={item.onClick}
                className="flex items-center gap-1 font-sans text-xs font-semibold uppercase tracking-wider text-atelier-accent-gold hover:text-atelier-bg underline decoration-dotted underline-offset-4 transition-all duration-200"
              >
                {item.linkText}
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            )}

            {/* Divider element */}
            <Sparkles className="w-4 h-4 text-atelier-accent-gold/80 animate-pulse ml-4" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
