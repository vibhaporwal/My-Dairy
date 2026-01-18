
import React, { useState, useEffect } from 'react';
import { ViewMode, HabitEntry } from './types';
import Layout from './components/Layout';
import JournalForm from './components/JournalForm';
import Dashboard from './components/Dashboard';
import JournalList from './components/JournalList';
import InsightsView from './components/InsightsView';

const STORAGE_KEY = 'zenhabit_entries';

const App: React.FC = () => {
  const [entries, setEntries] = useState<HabitEntry[]>([]);
  const [activeView, setActiveView] = useState<ViewMode>(ViewMode.DASHBOARD);

  // Load entries on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setEntries(JSON.parse(saved));
      } catch (err) {
        console.error("Failed to parse saved entries", err);
      }
    }
  }, []);

  // Save entries when they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }, [entries]);

  const handleAddEntry = (entry: HabitEntry) => {
    setEntries(prev => [...prev, entry]);
    setActiveView(ViewMode.JOURNAL);
  };

  const handleDeleteEntry = (id: string) => {
    if (confirm("Are you sure you want to delete this reflection?")) {
      setEntries(prev => prev.filter(e => e.id !== id));
    }
  };

  const renderContent = () => {
    switch (activeView) {
      case ViewMode.DASHBOARD:
        return <Dashboard entries={entries} />;
      case ViewMode.JOURNAL:
        return <JournalList entries={entries} onDelete={handleDeleteEntry} />;
      case ViewMode.NEW_ENTRY:
        return <JournalForm onSave={handleAddEntry} onCancel={() => setActiveView(ViewMode.DASHBOARD)} />;
      case ViewMode.INSIGHTS:
        return <InsightsView entries={entries} />;
      default:
        return <Dashboard entries={entries} />;
    }
  };

  return (
    <Layout activeView={activeView} onViewChange={setActiveView}>
      {renderContent()}
    </Layout>
  );
};

export default App;
