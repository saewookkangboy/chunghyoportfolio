import React, { useState, useEffect } from 'react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

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
      // Offset for fixed header (approx 100px for breathing room)
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
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#experience' },
    { label: 'Expertise', href: '#skills' },
    { label: 'Lectures', href: '#lectures' },
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
        
        <nav className="hidden md:flex gap-8">
          {navItems.map(item => (
            <a 
              key={item.label}
              href={item.href}
              onClick={(e) => handleSmoothScroll(e, item.href)}
              className="text-sm font-medium text-slate-500 hover:text-slate-900 uppercase tracking-widest transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>
        
        {/* Mobile menu place holder - simple solution for now */}
        <nav className="md:hidden flex gap-4">
           {navItems.slice(0,2).map(item => (
             <a 
               key={item.label}
               href={item.href}
               onClick={(e) => handleSmoothScroll(e, item.href)}
               className="text-xs font-bold text-slate-600 uppercase"
             >
               {item.label}
             </a>
           ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;