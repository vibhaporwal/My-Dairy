
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { HabitEntry } from '../types';

interface DashboardProps {
  entries: HabitEntry[];
}

const Dashboard: React.FC<DashboardProps> = ({ entries }) => {
  const sortedEntries = [...entries].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).slice(-14);

  const averageMood = entries.length > 0 
    ? (entries.reduce((acc, curr) => acc + curr.moodScore, 0) / entries.length).toFixed(1)
    : 0;

  const averageScreen = entries.length > 0
    ? (entries.reduce((acc, curr) => acc + curr.screenTime, 0) / entries.length).toFixed(1)
    : 0;

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-800">Welcome Back</h2>
          <p className="text-slate-500">Here's a summary of your journey so far.</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 min-w-[140px]">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Avg Mood</p>
            <p className="text-2xl font-black text-indigo-600">{averageMood}/10</p>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 min-w-[140px]">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Avg Screen</p>
            <p className="text-2xl font-black text-rose-500">{averageScreen}h</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Mood Trend */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <i className="fa-solid fa-chart-line text-indigo-500"></i>
            Mood Trend (Last 14 Days)
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sortedEntries}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 10, fill: '#94a3b8' }} 
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(val) => val.split('-').slice(1).join('/')}
                />
                <YAxis hide domain={[0, 10]} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  labelStyle={{ fontWeight: 'bold' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="moodScore" 
                  stroke="#6366f1" 
                  strokeWidth={4} 
                  dot={{ r: 6, fill: '#6366f1', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Screen Time Usage */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <i className="fa-solid fa-mobile-button text-rose-500"></i>
            Screen Time Usage (Hours)
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sortedEntries}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 10, fill: '#94a3b8' }} 
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(val) => val.split('-').slice(1).join('/')}
                />
                <YAxis hide />
                <Tooltip 
                   contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="screenTime" radius={[4, 4, 0, 0]}>
                  {sortedEntries.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.screenTime > 6 ? '#f43f5e' : '#6366f1'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <section>
        <h3 className="text-xl font-bold text-slate-800 mb-6">Recent Reflections</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {entries.slice(-3).reverse().map(entry => (
            <div key={entry.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:border-indigo-200 transition-colors group">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-slate-400 uppercase">{entry.date}</span>
                <span className="text-sm font-black text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg">
                  {entry.moodScore}/10
                </span>
              </div>
              <p className="text-slate-700 font-medium mb-4 line-clamp-2">“{entry.happyReason}”</p>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <i className="fa-solid fa-graduation-cap text-indigo-400"></i>
                <span className="truncate">{entry.newLearnings || 'No learnings logged'}</span>
              </div>
            </div>
          ))}
          {entries.length === 0 && (
            <div className="col-span-full py-12 text-center text-slate-400">
              <i className="fa-solid fa-feather-pointed text-4xl mb-4 opacity-20"></i>
              <p>No entries yet. Start your journey by creating a new reflection.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
