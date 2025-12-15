import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, User, Tag, ArrowRight, Mic } from 'lucide-react';
import { LectureItem } from '../types';

interface LectureModalProps {
  lecture: LectureItem | null;
  onClose: () => void;
}

const LectureModal: React.FC<LectureModalProps> = ({ lecture, onClose }) => {
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
              <h3 className="text-xs font-bold uppercase text-slate-400 tracking-widest mb-3">Summary</h3>
              <p className="text-base text-slate-800 leading-relaxed">
                {lecture.description}
              </p>
            </div>

            {/* Curriculum / Details */}
            {lecture.details && lecture.details.length > 0 && (
              <div>
                <h3 className="text-xs font-bold uppercase text-slate-400 tracking-widest mb-4">Curriculum & Key Topics</h3>
                <ul className="grid gap-2">
                  {lecture.details.map((detail, idx) => (
                    <li key={idx} className="flex gap-3 text-slate-700 text-sm leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
                      <ArrowRight size={16} className="text-blue-500 shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tags */}
            {lecture.tags && lecture.tags.length > 0 && (
              <div>
                <h3 className="text-xs font-bold uppercase text-slate-400 tracking-widest mb-3">Keywords</h3>
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