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
  // Admin 페이지 접근 확인 함수
  const checkAdminRoute = (): boolean => {
    if (typeof window === 'undefined') return false;
    
    const hash = window.location.hash;
    const search = window.location.search;
    const pathname = window.location.pathname;
    
    // 여러 방법으로 체크
    const isHashAdmin = hash === '#admin' || hash.startsWith('#admin');
    const isQueryAdmin = search.includes('admin=true');
    const isPathAdmin = pathname.includes('/admin');
    
    const result = isHashAdmin || isQueryAdmin || isPathAdmin;
    
    // 디버깅용 로그 (개발 환경에서만)
    if (process.env.NODE_ENV === 'development') {
      console.log('Admin route check:', {
        hash,
        search,
        pathname,
        isHashAdmin,
        isQueryAdmin,
        isPathAdmin,
        result
      });
    }
    
    return result;
  };

  const [isAdmin, setIsAdmin] = useState(() => {
    // 초기 상태를 함수로 설정하여 렌더링 시점에 체크
    return checkAdminRoute();
  });

  useEffect(() => {
    // 초기 체크
    const initialCheck = checkAdminRoute();
    if (initialCheck !== isAdmin) {
      setIsAdmin(initialCheck);
    }

    // 해시 변경 감지
    const handleHashChange = () => {
      const shouldBeAdmin = checkAdminRoute();
      setIsAdmin(shouldBeAdmin);
    };

    // 쿼리 파라미터 및 경로 변경 감지
    const handlePopState = () => {
      const shouldBeAdmin = checkAdminRoute();
      setIsAdmin(shouldBeAdmin);
    };

    // 주기적 체크 (SPA 환경에서 해시 변경이 감지되지 않는 경우 대비)
    const intervalId = setInterval(() => {
      const shouldBeAdmin = checkAdminRoute();
      setIsAdmin(prev => {
        if (prev !== shouldBeAdmin) {
          return shouldBeAdmin;
        }
        return prev;
      });
    }, 1000);

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handlePopState);
      clearInterval(intervalId);
    };
  }, [isAdmin]);

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