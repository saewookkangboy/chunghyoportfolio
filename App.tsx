import React, { useState, useEffect } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Lectures from './components/Lectures';
import ChatWidget from './components/ChatWidget';
import InteractiveBackground from './components/InteractiveBackground';
import AdminPage from './components/admin/AdminPage';

const App: React.FC = () => {
  // 초기 상태를 즉시 확인 (렌더링 전에)
  const checkAdminRoute = () => {
    if (typeof window === 'undefined') return false;
    const hash = window.location.hash;
    const params = new URLSearchParams(window.location.search);
    return hash === '#admin' || params.get('admin') === 'true';
  };

  const [isAdmin, setIsAdmin] = useState(checkAdminRoute());

  useEffect(() => {
    // Admin 페이지 접근 확인 함수
    const checkRoute = () => {
      const hash = window.location.hash;
      const params = new URLSearchParams(window.location.search);
      return hash === '#admin' || params.get('admin') === 'true';
    };

    // 해시 변경 감지
    const handleHashChange = () => {
      setIsAdmin(checkRoute());
    };

    // 쿼리 파라미터 변경 감지
    const handlePopState = () => {
      setIsAdmin(checkRoute());
    };

    // 초기 체크 (useEffect 내에서도 한 번 더 확인)
    setIsAdmin(checkRoute());

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  if (isAdmin) {
    return <AdminPage />;
  }

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