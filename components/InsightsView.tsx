
import React, { useState, useEffect } from 'react';
import { HabitEntry, AIInsight } from '../types';
import { getAIInsights } from '../services/geminiService';

interface InsightsViewProps {
  entries: HabitEntry[];
}

const InsightsView: React.FC<InsightsViewProps> = ({ entries }) => {
  const [insight, setInsight] = useState<AIInsight | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchInsights = async () => {
    if (entries.length < 3) return;
    setLoading(true);
    try {
      const result = await getAIInsights(entries);
      setInsight(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInsights();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (entries.length < 3) {
    return (
      <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
        <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <i className="fa-solid fa-lock text-2xl"></i>
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">Insights Locked</h3>
        <p className="text-slate-500 max-w-sm mx-auto">
          We need at least 3 entries to start generating meaningful AI insights for your habit journey.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-1000">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-slate-800">AI Wisdom</h2>
          <p className="text-slate-500">Personalized reflection powered by Gemini 3.</p>
        </div>
        <button 
          onClick={fetchInsights}
          disabled={loading}
          className="bg-white border border-slate-200 px-4 py-2 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-50 flex items-center gap-2"
        >
          <i className={`fa-solid fa-arrows-rotate ${loading ? 'animate-spin' : ''}`}></i>
          Refresh
        </button>
      </div>

      {loading ? (
        <div className="bg-white p-12 rounded-3xl border border-slate-100 flex flex-col items-center gap-6">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
            <i className="fa-solid fa-sparkles absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-indigo-600 text-xl"></i>
          </div>
          <p className="text-slate-500 font-medium animate-pulse">ZenHabit is analyzing your growth patterns...</p>
        </div>
      ) : insight ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Summary Card */}
          <div className="lg:col-span-2 bg-gradient-to-br from-indigo-600 to-violet-700 p-8 rounded-3xl text-white shadow-xl shadow-indigo-100">
            <i className="fa-solid fa-quote-left text-4xl opacity-20 mb-4 block"></i>
            <h3 className="text-2xl font-bold mb-4">Your Recent Journey</h3>
            <p className="text-indigo-50 leading-relaxed text-lg italic">
              {insight.summary}
            </p>
            <div className="mt-8 pt-8 border-t border-white/10">
              <p className="text-xs font-black uppercase tracking-widest opacity-60 mb-2">Daily Affirmation</p>
              <p className="text-xl font-medium">“{insight.affirmation}”</p>
            </div>
          </div>

          {/* Suggestions Card */}
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <i className="fa-solid fa-lightbulb text-amber-500"></i>
              Growth Tips
            </h3>
            <ul className="space-y-6">
              {insight.suggestions.map((tip, i) => (
                <li key={i} className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center font-bold text-sm">
                    {i + 1}
                  </span>
                  <p className="text-slate-600 leading-snug">{tip}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default InsightsView;
