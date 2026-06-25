import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, Sparkles, AlertCircle, ArrowUpRight, Github, Heart } from 'lucide-react';

import FloatingNav from './components/FloatingNav';
import InteractiveTicker from './components/InteractiveTicker';
import AtelierHero from './components/AtelierHero';
import FeaturesSection from './components/FeaturesSection';
import DashboardView from './components/DashboardView';
import CalendarView from './components/CalendarView';
import CaptionsView from './components/CaptionsView';
import FestivalsView from './components/FestivalsView';
import SocialAuditView from './components/SocialAuditView';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [captionsPrompt, setCaptionsPrompt] = useState<string>('');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const handleLaunchApp = () => {
    setCurrentTab('dashboard');
  };

  const handleQuickCaptionGen = (prompt: string) => {
    setCaptionsPrompt(prompt);
    setCurrentTab('captions');
  };

  const handleSelectFestivalCampaign = (prompt: string) => {
    setCaptionsPrompt(prompt);
    setCurrentTab('captions');
  };

  const handleNavigateToTab = (tabId: string) => {
    setCurrentTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`${isDarkMode ? 'dark' : ''} bg-atelier-bg text-espresso min-h-screen font-sans selection:bg-espresso selection:text-atelier-bg flex flex-col justify-between transition-colors duration-500`}>
      
      {/* Floating Glassmorphic Dock Navigation */}
      <FloatingNav
        currentTab={currentTab}
        onTabChange={handleNavigateToTab}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        onLaunchApp={handleLaunchApp}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
      />

      {/* Main Page Layout Container */}
      <main className="flex-grow w-full relative">
        <AnimatePresence mode="wait">
          
          {/* Landing Page Route / Overview */}
          {currentTab === 'home' && (
            <motion.div
              key="home-page"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <AtelierHero 
                onGetStarted={handleLaunchApp} 
                onSeeFeatures={() => {
                  const el = document.getElementById('features-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              />
              
              {/* Dynamic Scrolling Framer Marquee Ticker */}
              <InteractiveTicker />

              <div id="features-section">
                <FeaturesSection onSelectFeatureAction={handleNavigateToTab} />
              </div>
            </motion.div>
          )}

          {/* Interactive Client Dashboard View */}
          {currentTab === 'dashboard' && (
            <motion.div
              key="dashboard-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
            >
              <DashboardView 
                onNavigateToTab={handleNavigateToTab} 
                onQuickCaptionGen={handleQuickCaptionGen} 
              />
            </motion.div>
          )}

          {/* Culturally Loaded Calendar Planner */}
          {currentTab === 'calendar' && (
            <motion.div
              key="calendar-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
            >
              <CalendarView 
                onQuickCaptionGen={handleQuickCaptionGen} 
                onNavigateToTab={handleNavigateToTab} 
              />
            </motion.div>
          )}

          {/* AI Caption & Strategy Generation Room */}
          {currentTab === 'captions' && (
            <motion.div
              key="captions-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
            >
              <CaptionsView initialPrompt={captionsPrompt} />
            </motion.div>
          )}

          {/* Curated Festivals Campaigns Selection Hub */}
          {currentTab === 'festivals' && (
            <motion.div
              key="festivals-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
            >
              <FestivalsView 
                onSelectFestivalCampaign={handleSelectFestivalCampaign} 
                onNavigateToTab={handleNavigateToTab} 
              />
            </motion.div>
          )}

          {/* Social Media Link Audit Room */}
          {currentTab === 'audit' && (
            <motion.div
              key="audit-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
            >
              <SocialAuditView />
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Exquisite Minimal Editorial Footer */}
      <footer className="border-t border-espresso/10 bg-[#faf9f5] dark:bg-atelier-surface/90 py-16 px-6 z-10 relative">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          
          {/* Brand Col */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-serif italic text-2xl tracking-tight text-espresso">
                Growth<span className="font-sans font-bold text-lg tracking-widest text-atelier-blue uppercase not-italic">OS</span>
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-atelier-accent-gold" />
            </div>
            <p className="text-xs text-muted-taupe leading-relaxed max-w-sm">
              An elegant, full-stack AI content studio blending Google Gemini 3.5 intelligence with custom brand constraints and high cultural IQ.
            </p>
          </div>

          {/* Navigation Links Column */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-[10px] font-mono tracking-widest uppercase text-muted-taupe">Atelier Modules</div>
            <div className="flex flex-col gap-2.5">
              {[
                { id: 'home', label: 'Landing Overview' },
                { id: 'dashboard', label: 'Active Dashboard' },
                { id: 'calendar', label: 'Editorial Calendar' },
                { id: 'captions', label: 'Gemini Caption AI' },
                { id: 'festivals', label: 'Festival Campaigns' },
                { id: 'audit', label: 'Social Brand Audit' },
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavigateToTab(link.id)}
                  className={`text-xs text-left ${
                    currentTab === link.id ? 'text-atelier-blue font-semibold' : 'text-espresso/70 hover:text-espresso'
                  } transition-colors duration-200 cursor-pointer`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Context Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="text-[10px] font-mono tracking-widest uppercase text-muted-taupe">Cultural Focus</div>
            <p className="text-xs text-muted-taupe leading-relaxed">
              Tailored for agencies marketing high-end regional crafts, zero-carbon handloom textiles, seasonal events, and premium boutique products. Pre-configured for Indian holidays and national celebrations.
            </p>
            <div className="flex items-center gap-2.5 text-xs text-espresso font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Full-Stack Mode Connected</span>
            </div>
          </div>

        </div>

        {/* Legal Row */}
        <div className="max-w-6xl mx-auto border-t border-espresso/8 pt-8 mt-12 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-mono text-muted-taupe">
          <div>© 2026 GrowthOS Campaign Manager. Built for SandraCreates Atelier style guidelines.</div>
          <div className="flex items-center gap-1.5">
            <span>Powered by Gemini 3.5 Flash & Motion React</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
