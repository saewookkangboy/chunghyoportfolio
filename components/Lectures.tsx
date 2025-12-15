import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mic, Users, ArrowUpRight } from 'lucide-react';
import { RESUME_DATA } from '../constants';
import { LectureItem } from '../types';
import LectureModal from './LectureModal';

const Lectures: React.FC = () => {
  const [selectedLecture, setSelectedLecture] = useState<LectureItem | null>(null);

  return (
    <section id="lectures" className="py-24 px-4 sm:px-6 lg:px-12 bg-slate-50 relative z-10 border-t border-slate-200">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="grid md:grid-cols-12 gap-8 mb-16 border-b border-slate-200 pb-8 items-end">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="md:col-span-6"
          >
             <h2 className="text-5xl md:text-6xl font-bold text-slate-900 tracking-tight mb-2">Lectures</h2>
             <span className="font-mono text-sm uppercase tracking-widest text-blue-600">Speaking & Teaching</span>
          </motion.div>
          <div className="md:col-span-6 text-right md:text-left">
             <p className="text-slate-600 text-lg leading-relaxed md:max-w-md md:ml-auto">
               Sharing knowledge and field expertise through corporate training and educational sessions.
             </p>
          </div>
        </div>

        {/* Lectures Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {RESUME_DATA.lectures.map((lecture, index) => (
            <motion.div
              key={lecture.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setSelectedLecture(lecture)}
              className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:border-blue-200 transition-all cursor-pointer group flex flex-col"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Mic size={24} />
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-medium text-slate-400 border border-slate-200 px-2 py-1 rounded-full">
                    {lecture.period}
                  </span>
                  <ArrowUpRight size={16} className="text-slate-300 group-hover:text-blue-600 transition-colors" />
                </div>
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-2 leading-snug group-hover:text-blue-600 transition-colors">
                {lecture.title}
              </h3>
              
              <div className="flex items-center gap-2 text-sm font-medium text-slate-500 mb-4">
                <Users size={14} />
                <span>{lecture.organizer}</span>
              </div>

              <p className="text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4 mt-auto line-clamp-3">
                {lecture.description}
              </p>
              
              <div className="mt-4 pt-2 flex flex-wrap gap-1">
                 {lecture.tags && lecture.tags.slice(0, 2).map(tag => (
                   <span key={tag} className="text-[10px] bg-slate-50 text-slate-500 px-2 py-0.5 rounded border border-slate-100">
                     #{tag}
                   </span>
                 ))}
                 {lecture.tags && lecture.tags.length > 2 && (
                   <span className="text-[10px] text-slate-400 py-0.5 pl-1">...</span>
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