import React from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Lectures from './components/Lectures';
import ChatWidget from './components/ChatWidget';
import InteractiveBackground from './components/InteractiveBackground';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <main className="relative bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors duration-300">
          <InteractiveBackground />
          <Header />
          <Hero />
          <Experience />
          <Skills />
          <Lectures />
          
          <footer className="py-10 bg-slate-900 dark:bg-black text-slate-400 text-center text-sm relative z-10 transition-colors duration-300">
            <p>&copy; {new Date().getFullYear()} Park Chunghyo. All Rights Reserved.</p>
            <p className="mt-2 text-xs opacity-60">Built with React & Gemini AI</p>
          </footer>

          <ChatWidget />
        </main>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;