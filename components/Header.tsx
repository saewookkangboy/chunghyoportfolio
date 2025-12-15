import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Language } from '../types';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, setLanguage, labels } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navItems = [
    { label: labels.nav.about, href: '#about' },
    { label: labels.nav.projects, href: '#experience' },
    { label: labels.nav.expertise, href: '#skills' },
    { label: labels.nav.lectures, href: '#lectures' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-sm border-b border-slate-100 py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex justify-between items-center">
        <a 
          href="#" 
          onClick={(e) => handleSmoothScroll(e, '#')}
          className="font-bold text-xl tracking-tighter text-slate-900 hover:text-blue-600 transition-colors"
        >
          P.CHUNGHYO
        </a>
        
        <div className="flex items-center gap-8">
          <nav className="hidden md:flex gap-8">
            {navItems.map(item => (
              <a 
                key={item.href}
                href={item.href}
                onClick={(e) => handleSmoothScroll(e, item.href)}
                className="text-sm font-medium text-slate-500 hover:text-slate-900 uppercase tracking-widest transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center bg-slate-100 rounded-full p-1">
             {(['ko', 'en', 'ja'] as Language[]).map((lang) => (
               <button
                 key={lang}
                 onClick={() => setLanguage(lang)}
                 className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${
                   language === lang 
                     ? 'bg-white text-blue-600 shadow-sm' 
                     : 'text-slate-400 hover:text-slate-600'
                 }`}
               >
                 {lang.toUpperCase()}
               </button>
             ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;