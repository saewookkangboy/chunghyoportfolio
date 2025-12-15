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

  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden bg-slate-50 mb-3 last:mb-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-100 transition-colors group"
      >
        <span className={`font-bold text-sm transition-colors ${isOpen ? 'text-blue-600' : 'text-slate-700'}`}>
          Topic {(index + 1).toString().padStart(2, '0')}
        </span>
        <ChevronDown
          size={16}
          className={`text-slate-400 transition-transform duration-300 group-hover:text-blue-500 ${
            isOpen ? 'rotate-180 text-blue-500' : ''
          }`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <div className="px-4 pb-4 pt-0 bg-white border-t border-slate-100">
              <div className="pt-4 flex gap-3 text-sm text-slate-600 leading-relaxed">
                 <div className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                 <span>{detail}</span>
              </div>
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
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="relative w-full max-w-2xl max-h-[85vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="flex justify-between items-start p-6 border-b border-slate-100 bg-slate-50/50">
            <div className="pr-8">
              <div className="flex items-center gap-3 mb-3">
                <span className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider border border-slate-200 text-slate-600 bg-white rounded">
                  {lecture.organizer}
                </span>
                <span className="flex items-center text-xs text-slate-500 font-mono">
                  <Calendar size={12} className="mr-1" />
                  {lecture.period}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
                {lecture.title}
              </h2>
              <div className="flex items-center gap-2 mt-2 text-blue-600 font-medium text-sm">
                <Mic size={14} />
                <span>{lecture.role}</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-200 transition-colors text-slate-500 shrink-0"
            >
              <X size={24} />
            </button>
          </div>

          {/* Scrollable Body */}
          <div className="overflow-y-auto p-6 space-y-8 custom-scrollbar">
            
            {/* Description */}
            <div>
              <h3 className="text-xs font-bold uppercase text-slate-400 tracking-widest mb-3">{labels.lectures.modalSummary}</h3>
              <p className="text-base text-slate-800 leading-relaxed">
                {lecture.description}
              </p>
            </div>

            {/* Curriculum / Details (Accordion) */}
            {lecture.details && lecture.details.length > 0 && (
              <div>
                <h3 className="text-xs font-bold uppercase text-slate-400 tracking-widest mb-4">{labels.lectures.modalCurriculum}</h3>
                <div className="flex flex-col">
                  {lecture.details.map((detail, idx) => (
                    <DetailAccordion key={idx} index={idx} detail={detail} />
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            {lecture.tags && lecture.tags.length > 0 && (
              <div>
                <h3 className="text-xs font-bold uppercase text-slate-400 tracking-widest mb-3">{labels.lectures.modalKeywords}</h3>
                <div className="flex flex-wrap gap-2">
                  {lecture.tags.map(tag => (
                    <div key={tag} className="flex items-center px-3 py-1 bg-white border border-slate-200 rounded-full text-xs text-slate-600 font-medium">
                      <Tag size={10} className="mr-1.5 text-slate-400" />
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