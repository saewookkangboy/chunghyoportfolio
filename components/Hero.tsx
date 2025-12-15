import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Globe, ExternalLink, ArrowDownRight, Github, Sparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Hero: React.FC = () => {
  const { data, labels } = useLanguage();
  const { profile } = data;

  return (
    <section id="about" className="min-h-screen flex flex-col justify-end pb-24 px-4 sm:px-6 lg:px-12 pt-32 relative bg-transparent">
      <div className="max-w-7xl w-full mx-auto relative z-10">
        
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-end border-b border-slate-900 pb-12">
          
          {/* Main Title Area */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="w-3 h-3 bg-blue-600 rounded-full"></span>
                <span className="font-mono text-sm uppercase tracking-widest text-slate-500">
                  {labels.hero.role}
                </span>
              </div>
              
              <h1 className="text-6xl sm:text-7xl lg:text-9xl font-bold text-slate-900 tracking-tighter leading-[0.85] mb-8">
                {profile.englishName.split(' ')[0]}
                <span className="block text-slate-400 font-normal italic ml-2 sm:ml-4">{profile.englishName.split(' ')[1]}</span>
              </h1>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl sm:text-2xl text-slate-700 leading-relaxed max-w-3xl font-light whitespace-pre-line"
            >
              {profile.summary}
            </motion.p>
          </div>

          {/* Right Column: Image & Stats */}
          <div className="lg:col-span-4 flex flex-col justify-end gap-8">
             <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="relative aspect-[4/5] w-full max-w-sm mx-auto lg:ml-auto grayscale hover:grayscale-0 transition-all duration-700"
             >
                <img 
                  src="./profile.png" 
                  alt={profile.name}
                  className="w-full h-full object-cover rounded-sm border border-slate-200 shadow-sm"
                  onError={(e) => {
                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.englishName)}&background=f1f5f9&color=0f172a&size=512`;
                  }}
                />
             </motion.div>
             
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.5, duration: 0.8 }}
               className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200"
             >
                <div>
                   <span className="block text-2xl font-bold text-slate-900">20+</span>
                   <span className="text-xs font-mono uppercase text-slate-500">{labels.hero.yearsExp}</span>
                </div>
                <div>
                   <span className="block text-2xl font-bold text-slate-900">1.5k%</span>
                   <span className="text-xs font-mono uppercase text-slate-500">{labels.hero.maxRoas}</span>
                </div>
             </motion.div>
          </div>
        </div>

        {/* Links Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="pt-6 flex flex-wrap gap-x-8 gap-y-4 items-center"
        >
          <a href={`mailto:${profile.email}`} className="flex items-center gap-2 text-lg font-medium text-slate-900 hover:text-blue-600 transition-colors group">
            <Mail size={20} />
            <span>{labels.hero.emailMe}</span>
            <ArrowDownRight size={16} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
          </a>
          {profile.links.map((link) => (
             <a key={link.label} href={link.url} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-lg font-medium text-slate-900 hover:text-blue-600 transition-colors group">
                {link.label === 'Website' ? <Globe size={20} /> : 
                 link.label === 'LinkedIn' ? <Linkedin size={20} /> : 
                 link.label === 'GitHub' ? <Github size={20} /> : 
                 link.label.includes('AI') ? <Sparkles size={20} className="text-purple-600 group-hover:text-blue-600" /> :
                 <ExternalLink size={20} />}
                <span>{link.label}</span>
                <ArrowDownRight size={16} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
             </a>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;