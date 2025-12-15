import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Tag, Mic, ChevronDown } from 'lucide-react';
import { LectureItem } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface LectureModalProps {
  lecture: LectureItem | null;
  onClose: () => void;
}

const DetailAccordion: React.FC<{ index: number; detail: string }> = ({ index, detail }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Extract a potential title if there is a colon, otherwise use generic Session title
  const hasTitle = detail.includes(':');
  const title = hasTitle ? detail.split(':')[0] : `Session ${index + 1}`;
  const content = hasTitle ? detail.substring(detail.indexOf(':') + 1).trim() : detail;

  return (
    <div className="border-b border-slate-100 dark:border-slate-800 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-4 text-left group transition-all"
      >
        <div className="flex items-center gap-4">
          <span className={`font-mono text-xs font-bold px-2 py-1 rounded transition-colors ${
            isOpen 
              ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400' 
              : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:bg-slate-200 dark:group-hover:bg-slate-700'
          }`}>
            {(index + 1).toString().padStart(2, '0')}
          </span>
          <span className={`text-sm font-medium transition-colors ${
            isOpen ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200'
          }`}>
            {hasTitle ? title : 'Session Detail'}
          </span>
        </div>
        <ChevronDown
          size={16}
          className={`text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-blue-500' : 'group-hover:text-slate-600'}`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pb-4 pl-12 pr-4">
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
                 {content}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const LectureModal: React.FC<LectureModalProps> = ({ lecture, onClose }) => {
  const { labels } = useLanguage();

  if (!lecture) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 sm:px-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 dark:bg-black/80 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="relative w-full max-w-2xl max-h-[85vh] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="flex justify-between items-start p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
            <div className="pr-8">
              <div className="flex items-center gap-3 mb-3">
                <span className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 rounded">
                  {lecture.organizer}
                </span>
                <span className="flex items-center text-xs text-slate-500 dark:text-slate-400 font-mono">
                  <Calendar size={12} className="mr-1" />
                  {lecture.period}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white leading-tight">
                {lecture.title}
              </h2>
              <div className="flex items-center gap-2 mt-2 text-blue-600 dark:text-blue-400 font-medium text-sm">
                <Mic size={14} />
                <span>{lecture.role}</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-slate-500 dark:text-slate-400 shrink-0"
            >
              <X size={24} />
            </button>
          </div>

          {/* Scrollable Body */}
          <div className="overflow-y-auto p-6 space-y-8 custom-scrollbar">
            
            {/* Description */}
            <div>
              <h3 className="text-xs font-bold uppercase text-slate-400 dark:text-slate-500 tracking-widest mb-3">{labels.lectures.modalSummary}</h3>
              <p className="text-base text-slate-800 dark:text-slate-200 leading-relaxed">
                {lecture.description}
              </p>
            </div>

            {/* Curriculum / Details (Accordion) */}
            {lecture.details && lecture.details.length > 0 && (
              <div>
                <h3 className="text-xs font-bold uppercase text-slate-400 dark:text-slate-500 tracking-widest mb-4">{labels.lectures.modalCurriculum}</h3>
                <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl px-4">
                  {lecture.details.map((detail, idx) => (
                    <DetailAccordion key={idx} index={idx} detail={detail} />
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            {lecture.tags && lecture.tags.length > 0 && (
              <div>
                <h3 className="text-xs font-bold uppercase text-slate-400 dark:text-slate-500 tracking-widest mb-3">{labels.lectures.modalKeywords}</h3>
                <div className="flex flex-wrap gap-2">
                  {lecture.tags.map(tag => (
                    <div key={tag} className="flex items-center px-3 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-xs text-slate-600 dark:text-slate-300 font-medium">
                      <Tag size={10} className="mr-1.5 text-slate-400 dark:text-slate-500" />
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default LectureModal;