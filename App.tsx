import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Skills from './components/Skills';
import ChatWidget from './components/ChatWidget';
import InteractiveBackground from './components/InteractiveBackground';

const App: React.FC = () => {
  return (
    <main className="relative bg-slate-50 min-h-screen">
      <InteractiveBackground />
      <Header />
      <Hero />
      <Experience />
      <Skills />
      
      <footer className="py-10 bg-slate-900 text-slate-400 text-center text-sm relative z-10">
        <p>&copy; {new Date().getFullYear()} Park Chunghyo. All Rights Reserved.</p>
        <p className="mt-2 text-xs opacity-60">Built with React & Gemini AI</p>
      </footer>

      <ChatWidget />
    </main>
  );
};

export default App;