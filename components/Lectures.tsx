import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mic, Users, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { LectureItem } from '../types';
import LectureModal from './LectureModal';

const Lectures: React.FC = () => {
  const { data, labels } = useLanguage();
  const [selectedLecture, setSelectedLecture] = useState<LectureItem | null>(null);

  return (
    <section id="lectures" className="py-24 px-4 sm:px-6 lg:px-12 bg-slate-50 dark:bg-slate-900 relative z-10 border-t border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="grid md:grid-cols-12 gap-8 mb-16 border-b border-slate-200 dark:border-slate-700 pb-8 items-end">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="md:col-span-6"
          >
             <h2 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">{labels.lectures.title}</h2>
             <span className="font-mono text-sm uppercase tracking-widest text-blue-600 dark:text-blue-400">{labels.lectures.subtitle}</span>
          </motion.div>
          <div className="md:col-span-6 text-right md:text-left">
             <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed md:max-w-md md:ml-auto">
               {labels.lectures.description}
             </p>
          </div>
        </div>

        {/* Lectures Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.lectures.map((lecture, index) => (
            <motion.div
              key={lecture.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setSelectedLecture(lecture)}
              className="bg-white dark:bg-slate-950 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md hover:border-blue-200 dark:hover:border-blue-900 transition-all cursor-pointer group flex flex-col"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Mic size={24} />
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-medium text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-700 px-2 py-1 rounded-full">
                    {lecture.period}
                  </span>
                  <ArrowUpRight size={16} className="text-slate-300 dark:text-slate-600 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                </div>
              </div>

              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {lecture.title}
              </h3>
              
              <div className="flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400 mb-4">
                <Users size={14} />
                <span>{lecture.organizer}</span>
              </div>

              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-4 mt-auto line-clamp-3">
                {lecture.description}
              </p>
              
              <div className="mt-4 pt-2 flex flex-wrap gap-1">
                 {lecture.tags && lecture.tags.slice(0, 2).map(tag => (
                   <span key={tag} className="text-[10px] bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded border border-slate-100 dark:border-slate-700">
                     #{tag}
                   </span>
                 ))}
                 {lecture.tags && lecture.tags.length > 2 && (
                   <span className="text-[10px] text-slate-400 dark:text-slate-600 py-0.5 pl-1">...</span>
                 )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Lecture Modal */}
      {selectedLecture && (
        <LectureModal 
          lecture={selectedLecture} 
          onClose={() => setSelectedLecture(null)} 
        />
      )}
    </section>
  );
};

export default Lectures;