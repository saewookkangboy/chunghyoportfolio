import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, User, Tag, ArrowRight } from 'lucide-react';
import { ProjectItem } from '../types';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

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
          className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="flex justify-between items-start p-6 sm:p-8 border-b border-slate-100 bg-slate-50/50">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className={`px-2 py-1 text-[10px] font-mono uppercase tracking-wider border rounded ${
                  project.category === 'Consulting' 
                    ? 'border-blue-200 text-blue-600 bg-blue-50' 
                    : 'border-emerald-200 text-emerald-600 bg-emerald-50'
                }`}>
                  {project.category}
                </span>
                <span className="flex items-center text-xs text-slate-500 font-mono">
                  <Calendar size={12} className="mr-1" />
                  {project.period}
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
                {project.client}
              </h2>
              <div className="flex items-center gap-2 mt-2 text-slate-600 font-medium">
                <User size={16} />
                <span>{project.role}</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-200 transition-colors text-slate-500"
            >
              <X size={24} />
            </button>
          </div>

          {/* Scrollable Body */}
          <div className="overflow-y-auto p-6 sm:p-8 space-y-8 custom-scrollbar">
            
            {/* Description */}
            <div>
              <h3 className="text-sm font-bold uppercase text-slate-400 tracking-widest mb-3">Overview</h3>
              <p className="text-lg text-slate-800 leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Tasks / Details */}
            <div>
              <h3 className="text-sm font-bold uppercase text-slate-400 tracking-widest mb-4">Key Responsibilities & Achievements</h3>
              <ul className="grid gap-3">
                {project.tasks.map((task, idx) => (
                  <li key={idx} className="flex gap-3 text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-lg border border-slate-100">
                    <ArrowRight size={18} className="text-blue-500 shrink-0 mt-0.5" />
                    <span>{task}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tags */}
            <div>
              <h3 className="text-sm font-bold uppercase text-slate-400 tracking-widest mb-3">Technologies & Domains</h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <div key={tag} className="flex items-center px-3 py-1.5 bg-white border border-slate-200 rounded-full text-sm text-slate-600">
                    <Tag size={12} className="mr-2 text-slate-400" />
                    {tag}
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Footer */}
          <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end">
            <button 
              onClick={onClose}
              className="px-6 py-2.5 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors"
            >
              Close Details
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProjectModal;