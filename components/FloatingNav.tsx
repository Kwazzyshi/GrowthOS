import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Menu, X, Landmark, Compass, Calendar, MessageSquareQuote, Layers, BarChart2, Sun, Moon } from 'lucide-react';

interface FloatingNavProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  onLaunchApp: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export default function FloatingNav({
  currentTab,
  onTabChange,
  mobileMenuOpen,
  setMobileMenuOpen,
  onLaunchApp,
  isDarkMode,
  onToggleDarkMode,
}: FloatingNavProps) {
  
  const navItems = [
    { id: 'home', label: 'Overview', icon: Compass },
    { id: 'dashboard', label: 'Dashboard', icon: Layers },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'captions', label: 'Captions AI', icon: MessageSquareQuote },
    { id: 'festivals', label: 'Festivals', icon: Landmark },
    { id: 'audit', label: 'Social Audit', icon: BarChart2 },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3 rounded-full glass-nav border border-espresso/8 shadow-sm">
          
          {/* Logo Brand */}
          <div 
            onClick={() => onTabChange('home')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <span className="font-serif italic font-medium text-2xl tracking-tight text-espresso transition-all duration-300 group-hover:opacity-80">
              Growth<span className="font-sans font-bold text-lg tracking-widest text-atelier-blue uppercase not-italic">OS</span>
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-atelier-accent-gold" />
          </div>

          {/* Desktop Nav Tabs with Layout Slider */}
          <div className="hidden lg:flex items-center gap-1 bg-espresso/5 p-1 rounded-full border border-espresso/5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`relative flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                    isActive ? 'text-atelier-bg' : 'text-espresso/60 hover:text-espresso'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabGlow"
                      className="absolute inset-0 bg-espresso rounded-full z-0"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <Icon className="w-3.5 h-3.5 z-10 relative" />
                  <span className="z-10 relative">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Action CTA Button & Dark Mode Toggle */}
          <div className="hidden md:flex items-center gap-4">
            {/* Elegant Theme Switcher */}
            <button
              onClick={onToggleDarkMode}
              className="p-2.5 rounded-full border border-espresso/10 hover:bg-espresso/5 text-espresso transition-all duration-300 cursor-pointer"
              aria-label="Toggle theme mode"
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4 text-atelier-accent-gold" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>

            <button
              onClick={onLaunchApp}
              className="group relative flex items-center gap-2 px-5 py-2.5 bg-espresso text-atelier-bg rounded-full text-xs font-bold uppercase tracking-widest overflow-hidden hover:bg-warm-brown hover:-translate-y-0.5 duration-300 cursor-pointer shadow-lg shadow-espresso/10 border border-espresso"
            >
              <Sparkles className="w-3.5 h-3.5 text-atelier-accent-gold" />
              <span>Get Started Free</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Mobile Actions (Theme Toggle + Menu) */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-full border border-espresso/10 hover:bg-espresso/5 text-espresso transition-colors cursor-pointer"
              aria-label="Toggle theme mode"
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4 text-atelier-accent-gold" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex items-center justify-center p-2 rounded-full border border-espresso/10 hover:bg-espresso/5 text-espresso transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Slide-in Menu */}
      <div 
        className={`fixed inset-0 z-40 bg-atelier-bg/95 backdrop-blur-md flex flex-col justify-between p-8 pt-24 transition-all duration-500 ease-in-out md:hidden ${
          mobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'
        }`}
      >
        <div className="flex flex-col gap-6 mt-4">
          <div className="text-xs uppercase font-mono tracking-widest text-muted-taupe border-b border-espresso/10 pb-2 mb-2">
            Navigation
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onTabChange(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center gap-4 py-3 px-4 rounded-xl text-left border transition-all duration-300 ${
                  isActive 
                    ? 'bg-espresso text-atelier-bg border-espresso font-semibold' 
                    : 'bg-transparent text-espresso/70 border-transparent hover:border-espresso/10 hover:bg-espresso/5'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-atelier-accent-gold' : 'text-espresso/50'}`} />
                <span className="font-serif italic text-2xl">{item.label}</span>
              </button>
            );
          })}
        </div>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => {
              onLaunchApp();
              setMobileMenuOpen(false);
            }}
            className="w-full py-4 bg-espresso text-atelier-bg rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-warm-brown transition-colors shadow-md"
          >
            <Sparkles className="w-4 h-4 text-atelier-accent-gold" />
            <span>Get Started Free</span>
          </button>
          
          <div className="text-center text-[10px] text-muted-taupe font-mono tracking-wider">
            © 2026 GrowthOS. Designed for Atelier.
          </div>
        </div>
      </div>
    </>
  );
}
