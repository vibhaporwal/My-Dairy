
import React from 'react';
import { HabitEntry } from '../types';

interface JournalListProps {
  entries: HabitEntry[];
  onDelete: (id: string) => void;
}

const JournalList: React.FC<JournalListProps> = ({ entries, onDelete }) => {
  const sortedEntries = [...entries].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-extrabold text-slate-800">Your Journal</h2>
        <span className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
          {entries.length} {entries.length === 1 ? 'Entry' : 'Entries'}
        </span>
      </div>

      <div className="space-y-4">
        {sortedEntries.map((entry) => (
          <div key={entry.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-50 rounded-xl flex flex-col items-center justify-center text-indigo-600 font-black">
                  <span className="text-lg leading-none">{entry.date.split('-')[2]}</span>
                  <span className="text-[10px] uppercase tracking-tighter opacity-60">
                    {new Date(entry.date).toLocaleString('default', { month: 'short' })}
                  </span>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-800">{new Date(entry.date).toLocaleDateString(undefined, { weekday: 'long' })}</h4>
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <span className="flex items-center gap-1">
                      <i className="fa-solid fa-mobile-screen scale-75"></i> {entry.screenTime}h
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="font-semibold text-indigo-600">Mood {entry.moodScore}/10</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => onDelete(entry.id)}
                className="text-slate-300 hover:text-rose-500 transition-colors p-2"
              >
                <i className="fa-solid fa-trash-can"></i>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-emerald-600 flex items-center gap-1.5 mb-1">
                    <i className="fa-solid fa-circle-check"></i> Highlights
                  </label>
                  <p className="text-slate-700 text-sm leading-relaxed">{entry.happyReason}</p>
                </div>
                {entry.angerReason && (
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-rose-500 flex items-center gap-1.5 mb-1">
                      <i className="fa-solid fa-bolt"></i> Tension
                    </label>
                    <p className="text-slate-700 text-sm leading-relaxed">{entry.angerReason}</p>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                {entry.thingsToImprove && (
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-indigo-500 flex items-center gap-1.5 mb-1">
                      <i className="fa-solid fa-arrows-up-to-line"></i> Focus
                    </label>
                    <p className="text-slate-700 text-sm leading-relaxed">{entry.thingsToImprove}</p>
                  </div>
                )}
                {entry.newLearnings && (
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-violet-500 flex items-center gap-1.5 mb-1">
                      <i className="fa-solid fa-sparkles"></i> Growth
                    </label>
                    <p className="text-slate-700 text-sm leading-relaxed">{entry.newLearnings}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {entries.length === 0 && (
          <div className="py-20 text-center bg-white rounded-2xl border border-dashed border-slate-200">
            <i className="fa-solid fa-book-open text-4xl text-slate-200 mb-4"></i>
            <p className="text-slate-400">Your journal is empty. Reflect on your first day!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JournalList;
