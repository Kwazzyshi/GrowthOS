import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Sparkles, Instagram, Linkedin, Twitter, Calendar, Layers, Clock } from 'lucide-react';
import { CampaignPost } from '../types';

interface CalendarViewProps {
  onQuickCaptionGen: (prompt: string) => void;
  onNavigateToTab: (tabId: string) => void;
}

export default function CalendarView({ onQuickCaptionGen, onNavigateToTab }: CalendarViewProps) {
  const [calendarData, setCalendarData] = useState<{
    events: Array<{
      day: number;
      title: string;
      type: string;
      tag: string;
      campaignBrief: string;
      suggestedChannels: string[];
      hashtags: string[];
      postingTime: string;
    }>;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentMonth] = useState('October');
  const [currentYear] = useState(2026);
  const [selectedDay, setSelectedDay] = useState<number>(14); // Default selected day

  const generateCalendar = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/generate-calendar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          month: currentMonth,
          year: currentYear,
          brandContext: 'Premium Indian lifestyle, handloom textiles, and slow craft brand'
        })
      });
      if (!response.ok) throw new Error('Calendar generation failed');
      const data = await response.json();
      setCalendarData(data);
    } catch (err: any) {
      setError(err.message || 'An error occurred during calendar generation');
    } finally {
      setLoading(false);
    }
  };

  const eventForDay = (day: number) => {
    return calendarData?.events.find(e => e.day === day);
  };

  const postsForDay = (day: number) => {
    const event = eventForDay(day);
    if (!event) return [];
    return [{
      id: `event-${day}`,
      title: event.title,
      channel: (event.suggestedChannels && event.suggestedChannels[0]) as any || 'Instagram',
      date: `${currentMonth} ${day} • ${event.postingTime}`,
      status: 'Draft' as const,
      caption: event.campaignBrief,
      hashtags: event.hashtags || []
    }];
  };

  const daysInMonth = 31;
  const startOffset = 4; // Starts on a Thursday (October 2026)

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col gap-12 mt-20">
      
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-espresso/10 pb-8">
        <div className="space-y-2">
          <span className="text-xs uppercase font-mono tracking-widest text-muted-taupe">
            Cultural Editorial Planner
          </span>
          <h1 className="font-serif text-3xl md:text-5xl text-espresso tracking-tight">
            {currentMonth} {currentYear}
          </h1>
        </div>
        <div className="flex flex-col items-start md:items-end gap-3">
          <p className="font-sans text-sm text-warm-brown max-w-sm leading-relaxed md:text-right">
            Align your social media frequency with national and cultural milestones. Highlighted dates have curated campaigns and pre-scheduled drafts.
          </p>
          {calendarData === null ? (
            <button
              onClick={generateCalendar}
              disabled={loading}
              className="flex items-center gap-2 px-5 py-2.5 bg-espresso text-atelier-bg border border-espresso font-serif text-sm rounded-xl hover:bg-transparent hover:text-espresso transition-all duration-300 shadow-md cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-atelier-bg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Generating Planner...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Calendar with AI</span>
                </>
              )}
            </button>
          ) : (
            <div className="flex items-center gap-2 text-xs text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono">AI Cultural Planner Active</span>
            </div>
          )}
          {error && (
            <p className="text-xs text-red-500 font-mono mt-1">Error: {error}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Col: The gorgeous calendar grid (7 cols on desktop) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="flex justify-between items-center bg-espresso/5 p-4 rounded-2xl border border-espresso/5">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-atelier-accent-gold" />
              <span className="font-serif text-xl font-medium text-espresso">{currentMonth} {currentYear}</span>
            </div>
            <div className="flex items-center gap-1">
              <button className="p-2 rounded-xl hover:bg-espresso/10 text-espresso transition-colors"><ChevronLeft className="w-4 h-4" /></button>
              <button className="p-2 rounded-xl hover:bg-espresso/10 text-espresso transition-colors"><ChevronRight className="w-4 h-4" /></button>
            </div>
          </div>

          {/* Calendar Day Grid */}
          <div className="glass-card rounded-[1.5rem] p-6 border border-espresso/8 shadow-sm">
            {/* Weekdays Row */}
            <div className="grid grid-cols-7 gap-2 text-center text-[10px] font-mono tracking-wider text-muted-taupe uppercase border-b border-espresso/5 pb-4 mb-4">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => (
                <div key={d}>{d}</div>
              ))}
            </div>

            {/* Grid of days */}
            <div className="grid grid-cols-7 gap-2">
              {/* Empty offsets */}
              {[...Array(startOffset)].map((_, idx) => (
                <div key={`offset-${idx}`} className="aspect-square rounded-xl bg-transparent" />
              ))}

              {/* Days numbers */}
              {[...Array(daysInMonth)].map((_, idx) => {
                const dayNum = idx + 1;
                const holiday = eventForDay(dayNum);
                const posts = postsForDay(dayNum);
                const hasPost = posts.length > 0;
                const isSelected = selectedDay === dayNum;

                return (
                  <div
                    key={`day-${dayNum}`}
                    onClick={() => setSelectedDay(dayNum)}
                    className={`aspect-square rounded-xl p-2 border flex flex-col justify-between cursor-pointer group transition-all duration-300 relative ${
                      isSelected 
                        ? 'bg-espresso text-atelier-bg border-espresso shadow-md scale-105' 
                        : holiday 
                        ? 'bg-atelier-accent-gold/10 border-atelier-accent-gold/25 hover:border-atelier-accent-gold/40' 
                        : hasPost 
                        ? 'bg-atelier-blue/5 border-atelier-blue/20 hover:border-atelier-blue/40'
                        : 'bg-atelier-surface/80 border-espresso/6 hover:border-espresso/12'
                    }`}
                  >
                    <span className={`text-[10px] font-mono font-bold ${isSelected ? 'text-atelier-bg' : 'text-espresso/60 group-hover:text-espresso'}`}>
                      {dayNum}
                    </span>

                    {/* Indicators */}
                    <div className="flex gap-1 items-center justify-end self-end mt-auto">
                      {holiday && (
                        <div className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-atelier-accent-gold' : 'bg-atelier-accent-gold'}`} />
                      )}
                      {hasPost && (
                        <div className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-atelier-bg' : 'bg-atelier-blue'}`} />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Col: Day details & action pane (5 cols on desktop) */}
        <div className="lg:col-span-5 flex flex-col gap-6 sticky top-32">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedDay}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="glass-card rounded-[1.5rem] p-8 border border-espresso/8 shadow-sm flex flex-col gap-6"
            >
              {/* Day title info */}
              <div className="flex justify-between items-start border-b border-espresso/6 pb-4">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-muted-taupe">Selected Date</span>
                  <h3 className="font-serif text-2xl text-espresso mt-1">{currentMonth} {selectedDay}, {currentYear}</h3>
                </div>
                <div className="p-3 bg-espresso/5 rounded-xl border border-espresso/5 flex flex-col items-center">
                  <span className="text-xl font-serif font-bold text-espresso">{selectedDay}</span>
                  <span className="text-[8px] font-mono tracking-widest text-muted-taupe uppercase">OCT</span>
                </div>
              </div>

              {/* Holiday Info Panel */}
              {(() => {
                const holiday = eventForDay(selectedDay);
                if (holiday) {
                  return (
                    <div className="bg-atelier-accent-gold/10 border border-atelier-accent-gold/25 p-4 rounded-xl flex items-start gap-3">
                      <div className="p-2 bg-atelier-accent-gold/20 text-atelier-accent-gold rounded-lg">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-espresso uppercase tracking-wider">{holiday.title}</div>
                        <div className="text-[10px] font-mono text-muted-taupe mt-1 uppercase">Cultural Theme: {holiday.tag}</div>
                      </div>
                    </div>
                  );
                }
                return (
                  <div className="text-xs text-muted-taupe italic">No major holiday or craft events designated on this day.</div>
                );
              })()}

              {/* Day Posts scheduled */}
              <div className="space-y-4">
                {(() => {
                  const posts = postsForDay(selectedDay);
                  return (
                    <>
                      <div className="text-[10px] font-mono uppercase tracking-widest text-muted-taupe">Scheduled Creatives ({posts.length})</div>
                      
                      {posts.length > 0 ? (
                        posts.map((post, idx) => (
                          <div key={idx} className="bg-atelier-surface/95 border border-espresso/6 rounded-xl p-4 shadow-sm flex flex-col gap-3">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-1.5">
                                {post.channel === 'Instagram' ? <Instagram className="w-3.5 h-3.5 text-amber-700" /> : 
                                 post.channel === 'LinkedIn' ? <Linkedin className="w-3.5 h-3.5 text-blue-700" /> :
                                 <Twitter className="w-3.5 h-3.5 text-slate-700" />}
                                <span className="text-[10px] font-mono font-bold text-espresso uppercase">{post.channel} Feed</span>
                              </div>
                              <div className="flex items-center gap-1 text-[9px] font-mono text-muted-taupe">
                                <Clock className="w-3 h-3" />
                                <span>{post.date.split('•')[1]}</span>
                              </div>
                            </div>

                            <p className="text-[11px] text-warm-brown bg-atelier-bg p-3 rounded-lg border border-espresso/5 italic leading-relaxed">
                              "{post.caption}"
                            </p>

                            <div className="flex justify-between items-center mt-1">
                              <div className="flex items-center gap-1 flex-wrap">
                                {post.hashtags.slice(0, 3).map((h, hIdx) => (
                                  <span key={hIdx} className="text-[9px] font-mono text-muted-taupe">#{h}</span>
                                ))}
                              </div>
                              
                              <button
                                onClick={() => {
                                  onQuickCaptionGen(post.caption);
                                  onNavigateToTab('captions');
                                }}
                                className="text-[9px] font-bold uppercase text-atelier-blue hover:text-espresso cursor-pointer"
                              >
                                Modify copy
                              </button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-6 border border-dashed border-espresso/15 rounded-xl flex flex-col gap-2 items-center">
                          <Layers className="w-5 h-5 text-espresso/30" />
                          <span className="text-xs text-muted-taupe">No creative scheduled for this date.</span>
                          <button
                            onClick={() => {
                              const holiday = eventForDay(selectedDay);
                              const defaultPrompt = holiday 
                                ? `Create a campaign caption celebrating ${holiday.title}`
                                : `Create a marketing copy scheduled for October ${selectedDay}`;
                              onQuickCaptionGen(defaultPrompt);
                              onNavigateToTab('captions');
                            }}
                            className="text-[10px] font-bold uppercase tracking-wider text-atelier-blue hover:text-espresso mt-2 border border-espresso/15 px-3 py-1.5 rounded-lg hover:border-espresso transition-colors cursor-pointer"
                          >
                            + Generate a Draft
                          </button>
                        </div>
                      )}
                    </>
                  );
                })()}
              </div>
            </motion.div>
          </AnimatePresence>

        </div>

      </div>

    </div>
  );
}
