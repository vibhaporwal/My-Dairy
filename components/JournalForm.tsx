
import React, { useState } from 'react';
import { HabitEntry } from '../types';

interface JournalFormProps {
  onSave: (entry: HabitEntry) => void;
  onCancel: () => void;
}

const JournalForm: React.FC<JournalFormProps> = ({ onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    happyReason: '',
    angerReason: '',
    thingsToImprove: '',
    screenTime: 0,
    newLearnings: '',
    moodScore: 5
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: HabitEntry = {
      ...formData,
      id: crypto.randomUUID(),
      createdAt: Date.now()
    };
    onSave(newEntry);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-slate-800">Daily Reflection</h2>
        <button onClick={onCancel} className="text-slate-400 hover:text-slate-600">
          <i className="fa-solid fa-xmark text-xl"></i>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-600">Date</label>
            <input
              type="date"
              required
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-600">Mood Score (1-10)</label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="1"
                max="10"
                className="flex-1 accent-indigo-600"
                value={formData.moodScore}
                onChange={(e) => setFormData({ ...formData, moodScore: parseInt(e.target.value) })}
              />
              <span className="w-8 text-center font-bold text-indigo-600">{formData.moodScore}</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
            <i className="fa-solid fa-face-smile text-amber-500"></i>
            What made you happy today?
          </label>
          <textarea
            required
            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none h-24 resize-none"
            placeholder="A small win, a kind word..."
            value={formData.happyReason}
            onChange={(e) => setFormData({ ...formData, happyReason: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
            <i className="fa-solid fa-face-angry text-rose-500"></i>
            What made you feel angry or stressed?
          </label>
          <textarea
            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none h-24 resize-none"
            placeholder="Be honest with yourself..."
            value={formData.angerReason}
            onChange={(e) => setFormData({ ...formData, angerReason: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
              <i className="fa-solid fa-arrow-trend-up text-emerald-500"></i>
              Things to improve
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="e.g., focus more on deep work"
              value={formData.thingsToImprove}
              onChange={(e) => setFormData({ ...formData, thingsToImprove: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
              <i className="fa-solid fa-mobile-screen text-indigo-500"></i>
              Screen Time (Hours)
            </label>
            <input
              type="number"
              step="0.1"
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
              value={formData.screenTime}
              onChange={(e) => setFormData({ ...formData, screenTime: parseFloat(e.target.value) || 0 })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
            <i className="fa-solid fa-graduation-cap text-violet-500"></i>
            New learnings or insights
          </label>
          <textarea
            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none h-24 resize-none"
            placeholder="Something new you learned today..."
            value={formData.newLearnings}
            onChange={(e) => setFormData({ ...formData, newLearnings: e.target.value })}
          />
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="flex-1 bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
          >
            Save Reflection
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-6 bg-slate-100 text-slate-600 font-bold py-3 rounded-xl hover:bg-slate-200 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default JournalForm;
