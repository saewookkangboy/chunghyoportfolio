import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Linkedin, Globe, ExternalLink, ArrowDownRight, Github, Sparkles, ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const AccordionItem = ({ text, index }: { text: string; index: number }) => {
  const [isOpen, setIsOpen] = useState(index === 0);

  // Use the first line as the title preview
  const firstLine = text.split('\n')[0];
  const title = firstLine.length > 50 ? firstLine.substring(0, 50) + '...' : firstLine;

  return (
    <div className="border-b border-slate-200 dark:border-slate-800">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-4 text-left group"
      >
        <div className="flex items-center gap-4 pr-4">
          <span className="font-mono text-xs text-blue-600 dark:text-blue-400 font-bold shrink-0">
            {(index + 1).toString().padStart(2, '0')}
          </span>
          <span className={`text-sm sm:text-base font-medium transition-colors line-clamp-1 ${isOpen ? 'text-slate-900 dark:text-slate-100' : 'text-slate-500 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300'}`}>
            {title}
          </span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-slate-400 dark:text-slate-500 shrink-0"
        >
          <ChevronDown size={18} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-6 pl-8 sm:pl-10 text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line text-base sm:text-lg font-light">
              {text}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Hero: React.FC = () => {
  const { data, labels } = useLanguage();
  const { profile } = data;

  const summarySegments = profile.summary.split(/\n\n+/).filter(Boolean);

  // Split links into categories
  const socialLinks = profile.links.filter(link => !link.label.includes('AI') && link.label !== 'LinkedIn');
  const aiLinks = profile.links.filter(link => link.label.includes('AI'));

  const getIcon = (label: string) => {
    if (label === 'Website') return <Globe size={18} />;
    if (label === 'GitHub') return <Github size={18} />;
    return <ExternalLink size={18} />;
  };

  return (
    <section id="about" className="min-h-screen flex flex-col justify-end pb-24 px-4 sm:px-6 lg:px-12 pt-32 relative bg-transparent">
      <div className="max-w-7xl w-full mx-auto relative z-10">
        
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-end border-b border-slate-900 dark:border-slate-700 pb-12 transition-colors">
          
          {/* Main Title Area (Left on Desktop, Top on Mobile) */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="w-3 h-3 bg-blue-600 dark:bg-blue-500 rounded-full"></span>
                <span className="font-mono text-base font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                  {labels.hero.role}
                </span>
              </div>
              
              <h1 className="text-6xl sm:text-7xl lg:text-9xl font-black text-slate-900 dark:text-white tracking-tighter leading-[0.85] mb-8 transition-colors">
                {profile.englishName.split(' ')[0]}
                <span className="block text-slate-400 dark:text-slate-600 font-light ml-2 sm:ml-4">{profile.englishName.split(' ')[1]}</span>
              </h1>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="max-w-3xl mt-8 border-t border-slate-200 dark:border-slate-800"
            >
              {summarySegments.map((segment, idx) => (
                <AccordionItem key={idx} text={segment} index={idx} />
              ))}
            </motion.div>
          </div>

          {/* Right Column: Stats Only */}
          <div className="lg:col-span-4 flex flex-col justify-end gap-10">
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.5, duration: 0.8 }}
               className="grid grid-cols-2 gap-4"
             >
                <div>
                   <span className="block text-3xl font-bold text-slate-900 dark:text-white tracking-tight">20+</span>
                   <span className="text-xs font-mono uppercase text-slate-500 dark:text-slate-400 mt-1 block">{labels.hero.yearsExp}</span>
                </div>
                <div>
                   <span className="block text-3xl font-bold text-slate-900 dark:text-white tracking-tight">1.5k%</span>
                   <span className="text-xs font-mono uppercase text-slate-500 dark:text-slate-400 mt-1 block">{labels.hero.maxRoas}</span>
                </div>
             </motion.div>
          </div>
        </div>

        {/* Links Footer - 3 Lines Structure */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="pt-8 flex flex-col gap-4 items-start"
        >
          {/* Line 1: Email & Naver Profile */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a href={`mailto:${profile.email}`} className="flex items-center gap-2 text-lg font-medium text-slate-900 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group">
              <Mail size={20} />
              <span>{labels.hero.emailMe}</span>
              <ArrowDownRight size={16} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </a>

            <a href="https://search.naver.com/search.naver?where=nexearch&sm=tab_etc&mra=bjky&pkid=1&os=33766326&qvt=0&query=%EB%B0%95%EC%B6%A9%ED%9A%A8" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-lg font-medium text-slate-900 dark:text-slate-200 hover:text-green-500 dark:hover:text-green-400 transition-colors group">
              <span className="font-bold text-green-500">N</span>
              <span>Naver Profile</span>
              <ArrowDownRight size={16} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </a>
          </div>

          {/* Line 2: Standard Links (Website, Brunch, GitHub) - LinkedIn removed from here */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
             {socialLinks.map((link) => (
                <a key={link.label} href={link.url} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-base font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group">
                   {getIcon(link.label)}
                   <span>{link.label}</span>
                   <ArrowDownRight size={14} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </a>
             ))}
          </div>

          {/* Line 3: AI Projects */}
          <div className="flex items-center gap-2 text-base font-medium text-slate-600 dark:text-slate-400 flex-wrap">
            <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 mr-1">
               <Sparkles size={18} />
               <span className="font-bold tracking-tight">AI PROJECT :</span>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              {aiLinks.map((link, index) => (
                <React.Fragment key={link.url}>
                  {index > 0 && <span className="text-slate-300 dark:text-slate-600">|</span>}
                  <a 
                    href={link.url} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors relative group"
                  >
                    {link.label.replace('AI Project: ', '')}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-purple-600 dark:bg-purple-400 transition-all group-hover:w-full"></span>
                  </a>
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Line 4: LinkedIn (Dedicated) */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-2">
            <a 
              href="https://www.linkedin.com/in/chunghyopark/" 
              target="_blank" 
              rel="noreferrer" 
              className="flex items-center gap-2 text-base font-bold text-slate-700 dark:text-slate-300 hover:text-[#0a66c2] dark:hover:text-[#0a66c2] transition-colors group bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700"
            >
              <Linkedin size={18} className="text-[#0a66c2]" />
              <span>Connect on LinkedIn</span>
              <ArrowDownRight size={14} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </a>
          </div>

        </motion.div>

      </div>
    </section>
  );
};

export default Hero;