import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Copy, Check, Instagram, Linkedin, Twitter, Landmark, RefreshCw, Send, AlertCircle, ChevronDown, ChevronUp, Feather, BookOpen, Zap, MessageSquare } from 'lucide-react';
import { AISuggestionResponse } from '../types';

interface CaptionsViewProps {
  initialPrompt?: string;
}

export default function CaptionsView({ initialPrompt = '' }: CaptionsViewProps) {
  const [prompt, setPrompt] = useState(initialPrompt);
  const [tone, setTone] = useState<'minimal' | 'storytelling' | 'conversational' | 'bold'>('storytelling');
  const [channel, setChannel] = useState<'Instagram' | 'LinkedIn' | 'Twitter'>('Instagram');
  const [culturalIq, setCulturalIq] = useState(true);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AISuggestionResponse | null>(null);
  const [copied, setCopied] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toneOptions = [
    { id: 'minimal', label: 'Minimalist', desc: 'Organic Minimal (poetic, slow, spacious)', icon: Feather },
    { id: 'storytelling', label: 'Editorial', desc: 'Heritage Editorial (detailed craft story)', icon: BookOpen },
    { id: 'conversational', label: 'Conversational', desc: 'Vibrant Modern (engaging, warm, casual)', icon: MessageSquare },
    { id: 'bold', label: 'Bold', desc: 'Aesthetic Statement (sophisticated, direct)', icon: Zap },
  ] as const;

  // Click outside to close dropdown
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const container = document.getElementById('tone-select-container');
      if (container && !container.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [dropdownOpen]);

  // Sync initialPrompt changes
  useEffect(() => {
    if (initialPrompt) {
      setPrompt(initialPrompt);
    }
  }, [initialPrompt]);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);
    setCopied(false);

    try {
     const response = await fetch(
  'https://growthos.jatinbamola2006.workers.dev/api/generate-captions',
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      prompt,
      tone,
      channel,
      culturalIq,
    }),
  }
);

      if (!response.ok) {
        throw new Error('Failed to generate. Please ensure GEMINI_API_KEY is configured in Secrets.');
      }

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred during campaign copy generation.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col gap-12 mt-20">
      
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-espresso/10 pb-8">
        <div className="space-y-2">
          <span className="text-xs uppercase font-mono tracking-widest text-muted-taupe">
            Copy Writing Atelier
          </span>
          <h1 className="font-serif text-3xl md:text-5xl text-espresso tracking-tight">
            AI Campaign Writer
          </h1>
        </div>
        <p className="font-sans text-sm text-warm-brown max-w-sm leading-relaxed">
          Create premium, authentic, and high-impact captions tailored for social streams. Infused with cultural IQ, regional references, and slow design philosophy.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Form and Config (6 cols on desktop) */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <form onSubmit={handleGenerate} className="glass-card rounded-[1.5rem] p-8 border border-espresso/8 shadow-sm flex flex-col gap-6">
            <h3 className="font-serif text-xl text-espresso flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-atelier-accent-gold" />
              <span>Drafting Instructions</span>
            </h3>

            {/* Prompt input area */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase font-mono tracking-widest text-muted-taupe">What are you marketing?</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your product, craft, story, or festival offer..."
                rows={4}
                className="w-full bg-espresso/[0.02] border border-espresso/12 rounded-xl py-3 px-4 text-sm text-espresso placeholder:text-muted-taupe/70 focus:outline-none focus:border-espresso/40 transition-colors resize-none"
              />
            </div>

            {/* Platform Select */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase font-mono tracking-widest text-muted-taupe">Target Channel</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'Instagram', label: 'Instagram', icon: Instagram },
                  { id: 'LinkedIn', label: 'LinkedIn', icon: Linkedin },
                  { id: 'Twitter', label: 'X (Twitter)', icon: Twitter },
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = channel === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setChannel(item.id as any)}
                      className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider border transition-all duration-300 cursor-pointer ${
                        isSelected 
                          ? 'bg-espresso text-atelier-bg border-espresso shadow-sm' 
                          : 'bg-transparent text-espresso/70 border-espresso/10 hover:border-espresso/20'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.id}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tone Selector Dropdown */}
            <div className="flex flex-col gap-2 relative" id="tone-select-container">
              <label className="text-[10px] uppercase font-mono tracking-widest text-muted-taupe font-semibold">
                Brand Tone
              </label>
              
              {/* Trigger Button */}
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center justify-between w-full p-4 bg-atelier-surface/50 border border-espresso/10 rounded-xl hover:border-espresso/20 hover:bg-atelier-surface/80 transition-all duration-300 cursor-pointer text-left focus:outline-none"
              >
                <div className="flex items-center gap-3">
                  {(() => {
                    const selected = toneOptions.find(t => t.id === tone) || toneOptions[0];
                    const Icon = selected.icon;
                    return (
                      <>
                        <div className="p-2 bg-espresso/5 rounded-lg text-espresso/70">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold uppercase tracking-wider text-espresso">
                            {selected.label}
                          </div>
                          <div className="text-[10px] text-muted-taupe mt-0.5">
                            {selected.desc}
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </div>
                {dropdownOpen ? (
                  <ChevronUp className="w-4 h-4 text-espresso/60" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-espresso/60" />
                )}
              </button>

              {/* Dropdown Options List */}
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-[calc(100%+4px)] left-0 w-full bg-atelier-surface border border-espresso/12 rounded-xl shadow-lg z-30 overflow-hidden flex flex-col p-1"
                  >
                    {toneOptions.map((item) => {
                      const isSelected = tone === item.id;
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => {
                            setTone(item.id as any);
                            setDropdownOpen(false);
                          }}
                          className={`flex items-center justify-between p-3 rounded-lg text-left transition-all duration-200 cursor-pointer ${
                            isSelected 
                              ? 'bg-espresso text-atelier-bg' 
                              : 'hover:bg-espresso/5 text-espresso'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`p-1.5 rounded-md ${isSelected ? 'bg-white/10 text-atelier-bg' : 'bg-espresso/5 text-espresso/70'}`}>
                              <Icon className="w-3.5 h-3.5" />
                            </div>
                            <div>
                              <div className="text-xs font-bold uppercase tracking-wider">{item.label}</div>
                              <div className={`text-[10px] mt-0.5 ${isSelected ? 'text-atelier-bg/75' : 'text-muted-taupe'}`}>
                                {item.desc}
                              </div>
                            </div>
                          </div>
                          {isSelected && <Check className="w-4 h-4 text-atelier-bg shrink-0 ml-2" />}
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Cultural IQ Toggle */}
            <div className="flex items-center justify-between p-4 bg-espresso/5 rounded-xl border border-espresso/6">
              <div className="flex gap-2 items-start">
                <Landmark className="w-5 h-5 text-atelier-accent-gold mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-espresso uppercase tracking-wider">Culturally Nuanced AI (India Context)</div>
                  <div className="text-[10px] text-muted-taupe mt-0.5">Infuses regional dialect, local textiles, and seasonal accents.</div>
                </div>
              </div>
              <input
                type="checkbox"
                checked={culturalIq}
                onChange={(e) => setCulturalIq(e.target.checked)}
                className="w-4 h-4 accent-espresso cursor-pointer"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !prompt.trim()}
              className="w-full py-4 bg-espresso text-atelier-bg hover:bg-warm-brown rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 duration-300 cursor-pointer shadow-lg disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>CRAFTING COPY...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>GENERATE COPY VERSE</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Column: AI Outputs Pane (6 cols on desktop) */}
        <div className="lg:col-span-6 flex flex-col gap-6 sticky top-32">
          
          <AnimatePresence mode="wait">
            {loading && (
              <motion.div
                key="loading-skeleton"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="glass-card rounded-[1.5rem] p-8 border border-espresso/8 shadow-sm flex flex-col gap-6 h-[400px] justify-center items-center"
              >
                <div className="relative">
                  <div className="w-12 h-12 rounded-full border-2 border-espresso/10 border-t-atelier-accent-gold animate-spin" />
                  <Sparkles className="w-5 h-5 text-atelier-accent-gold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                </div>
                <div className="space-y-2 text-center">
                  <div className="font-serif italic text-lg text-espresso">Drafting cultural threads...</div>
                  <div className="text-[10px] font-mono tracking-widest text-muted-taupe uppercase">Querying Gemini 3.5 Flash</div>
                </div>
              </motion.div>
            )}

            {error && (
              <motion.div
                key="error-box"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="glass-card rounded-[1.5rem] p-8 border border-red-200 bg-red-50/50 shadow-sm flex flex-col gap-4 text-center items-center justify-center h-[300px]"
              >
                <AlertCircle className="w-10 h-10 text-red-600" />
                <div className="space-y-1.5">
                  <h4 className="font-serif text-lg text-red-800">Generation Halted</h4>
                  <p className="text-xs text-red-700/80 max-w-sm leading-relaxed">{error}</p>
                </div>
              </motion.div>
            )}

            {result && (
              <motion.div
                key="result-pane"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="glass-card rounded-[1.5rem] p-8 border border-espresso/8 shadow-md flex flex-col gap-6"
              >
                {/* Out Title block */}
                <div className="flex justify-between items-center border-b border-espresso/6 pb-4">
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-muted-taupe">Campaign Output</span>
                    <h4 className="font-serif text-xl text-espresso">Generated Campaign Brief</h4>
                  </div>
                  <button
                    onClick={() => copyToClipboard(`${result.caption}\n\n${result.hashtags.map(h => `#${h}`).join(' ')}`)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-espresso/5 hover:bg-espresso text-espresso hover:text-atelier-bg rounded-lg border border-espresso/8 text-xs font-semibold uppercase tracking-wider duration-300"
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy All'}</span>
                  </button>
                </div>

                {/* Caption Panel */}
                <div className="space-y-2">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-muted-taupe">Curated Caption Copy</span>
                  <div className="bg-atelier-surface/95 border border-espresso/6 p-5 rounded-2xl shadow-sm text-sm text-espresso leading-relaxed whitespace-pre-line font-serif italic relative group">
                    "{result.caption}"
                    
                    {/* Copy Caption button */}
                    <button 
                      onClick={() => copyToClipboard(result.caption)}
                      className="absolute right-4 bottom-4 p-1.5 bg-espresso/5 rounded-lg text-espresso opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-espresso/10"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Hashtags */}
                <div className="space-y-2">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-muted-taupe">Culturally Matched Hashtags</span>
                  <div className="flex flex-wrap gap-2">
                    {result.hashtags.map((h, hIdx) => (
                      <span key={hIdx} className="text-xs font-semibold text-atelier-blue bg-atelier-blue/5 border border-atelier-blue/10 px-3 py-1 rounded-full">
                        #{h}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Strategic insights drawer */}
                <div className="border-t border-espresso/6 pt-5 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <span className="text-[9px] uppercase font-mono text-muted-taupe block">Strategy Context</span>
                      <p className="text-[11px] text-warm-brown leading-relaxed">{result.campaignStrategy}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[9px] uppercase font-mono text-muted-taupe block">Suggested Creative/Image Prompt</span>
                      <p className="text-[11px] text-warm-brown italic leading-relaxed bg-espresso/5 p-2 rounded-lg">{result.imagePrompt}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {!loading && !error && !result && (
              <motion.div
                key="empty-box"
                className="glass-card rounded-[1.5rem] p-8 border border-espresso/8 shadow-sm flex flex-col gap-4 text-center items-center justify-center h-[350px]"
              >
                <Landmark className="w-12 h-12 text-espresso/20" />
                <div className="space-y-1">
                  <h4 className="font-serif text-lg text-espresso">Campaign Output Ready</h4>
                  <p className="text-xs text-muted-taupe max-w-xs leading-relaxed">Fill in the generation details on the left, then click Generate to prompt our Gemini marketing engine.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>

    </div>
  );
}
