
import React from 'react';
import { ViewMode } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeView: ViewMode;
  onViewChange: (view: ViewMode) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeView, onViewChange }) => {
  const navItems = [
    { id: ViewMode.DASHBOARD, icon: 'fa-chart-line', label: 'Dashboard' },
    { id: ViewMode.JOURNAL, icon: 'fa-book', label: 'Journal' },
    { id: ViewMode.NEW_ENTRY, icon: 'fa-plus-circle', label: 'New Entry' },
    { id: ViewMode.INSIGHTS, icon: 'fa-sparkles', label: 'AI Insights' },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar / Top Nav */}
      <nav className="w-full md:w-64 bg-slate-900 text-white p-6 flex-shrink-0">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center">
            <i className="fa-solid fa-seedling text-xl"></i>
          </div>
          <h1 className="text-xl font-bold tracking-tight">ZenHabit</h1>
        </div>

        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onViewChange(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeView === item.id
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <i className={`fa-solid ${item.icon} w-5`}></i>
                <span className="font-medium">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 bg-slate-50 overflow-y-auto">
        <div className="max-w-5xl mx-auto p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
