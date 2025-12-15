import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { ProjectItem } from '../types';
import ProjectModal from './ProjectModal';

// Helper to sort projects by date (newest first)
const sortProjects = (projects: ProjectItem[]) => {
  return [...projects].sort((a, b) => {
    // Assuming format "YYYY.MM - ..."
    const dateA = a.period.split(' - ')[0];
    const dateB = b.period.split(' - ')[0];
    return dateB.localeCompare(dateA);
  });
};

const ProjectRow: React.FC<{ project: ProjectItem; index: number; onClick: () => void }> = ({ project, index, onClick }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      onClick={onClick}
      className="group relative border-t border-slate-200 dark:border-slate-800 py-8 transition-all duration-300 hover:bg-slate-50/80 dark:hover:bg-slate-900/50 cursor-pointer"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-y-4 md:gap-8 px-4 sm:px-0 items-start">
        
        {/* 1. Period (Compact) */}
        <div className="md:col-span-2 flex flex-row md:flex-col justify-between md:justify-start gap-1">
          <div className="font-mono text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {project.period.split(' ')[0]}
          </div>
          <div className="md:hidden text-xs text-slate-400 dark:text-slate-500 self-center">
            {project.category}
          </div>
        </div>

        {/* 2. Client & Role */}
        <div className="md:col-span-4 pr-4">
          <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-50 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-center gap-2">
            {project.client}
            <ArrowUpRight size={18} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-blue-500" />
          </h3>
          <div className="mt-1.5 text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
            {project.role}
          </div>
        </div>

        {/* 3. Description (Preview) */}
        <div className="md:col-span-6">
          <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2 mb-3">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tags.slice(0, 3).map(tag => (
              <span key={tag} className="text-[10px] font-mono text-slate-400 dark:text-slate-500 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 px-1.5 py-0.5 rounded">
                #{tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 px-1.5 py-0.5">+more</span>
            )}
          </div>
        </div>

      </div>
    </motion.div>
  );
};

const Experience: React.FC = () => {
  const { data, labels } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // Group projects by Year
  const groupedProjects = useMemo(() => {
    const sorted = sortProjects(data.projects);
    const groups: { [year: string]: ProjectItem[] } = {};
    
    sorted.forEach(project => {
      const year = project.period.split('.')[0]; // Extract YYYY
      if (!groups[year]) groups[year] = [];
      groups[year].push(project);
    });

    // Sort years descending
    return Object.entries(groups).sort((a, b) => b[0].localeCompare(a[0]));
  }, [data.projects]);

  return (
    <section id="experience" className="py-24 px-4 sm:px-6 lg:px-12 bg-white dark:bg-slate-950 relative z-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="grid md:grid-cols-12 gap-8 mb-16 border-b border-slate-900 dark:border-slate-700 pb-8 items-end">
          <div className="md:col-span-6">
            <h2 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">{labels.experience.title}</h2>
            <span className="font-mono text-sm uppercase tracking-widest text-blue-600 dark:text-blue-400">{labels.experience.subtitle}</span>
          </div>
          <div className="md:col-span-6 text-right md:text-left">
             <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed md:max-w-md md:ml-auto">
               {labels.experience.description}
             </p>
          </div>
        </div>

        {/* Projects List (Grouped by Year) */}
        <div className="mb-24">
          {groupedProjects.map(([year, projects]) => (
            <div key={year} className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl font-bold text-slate-200 dark:text-slate-800 font-mono">{year}</span>
                <div className="h-px bg-slate-100 dark:bg-slate-800 flex-1"></div>
              </div>
              <div className="border-b border-slate-200 dark:border-slate-800">
                {projects.map((project, index) => (
                  <ProjectRow 
                    key={project.id} 
                    project={project} 
                    index={index} 
                    onClick={() => setSelectedProject(project)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Collapsible Career History */}
        <div className="border-t border-slate-900 dark:border-slate-700 pt-10">
           <div 
             className="flex justify-between items-center cursor-pointer group select-none"
             onClick={() => setIsHistoryOpen(!isHistoryOpen)}
           >
             <div className="flex flex-col">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{labels.experience.historyTitle}</h2>
                <span className="font-mono text-xs uppercase tracking-widest text-slate-400 dark:text-slate-500 mt-1">{labels.experience.historySubtitle}</span>
             </div>
             <div className={`p-2 rounded-full border transition-all ${isHistoryOpen ? 'bg-slate-900 dark:bg-slate-700 text-white border-slate-900 dark:border-slate-700' : 'border-slate-300 dark:border-slate-600 text-slate-400 group-hover:border-blue-600 dark:group-hover:border-blue-400 group-hover:text-blue-600 dark:group-hover:text-blue-400'}`}>
                {isHistoryOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
             </div>
           </div>
           
           <AnimatePresence>
             {isHistoryOpen && (
               <motion.div
                 initial={{ height: 0, opacity: 0 }}
                 animate={{ height: "auto", opacity: 1 }}
                 exit={{ height: 0, opacity: 0 }}
                 transition={{ duration: 0.4, ease: "easeInOut" }}
                 className="overflow-hidden"
               >
                 <div className="grid lg:grid-cols-12 gap-12 pt-12">
                    <div className="lg:col-span-3 hidden lg:block">
                       <span className="font-mono text-xs text-slate-400 dark:text-slate-500">{labels.experience.chronological}</span>
                    </div>
                    
                    <div className="lg:col-span-9">
                       <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
                         {data.careerHistory.map((job) => (
                           <div key={job.id} className="group">
                             <div className="flex justify-between items-baseline border-b border-slate-200 dark:border-slate-800 pb-3 mb-4 group-hover:border-blue-600 dark:group-hover:border-blue-400 transition-colors">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">{job.company}</h3>
                                <span className="font-mono text-xs text-slate-500 dark:text-slate-400">{job.period}</span>
                             </div>
                             
                             <div className="flex items-center gap-2 mb-4">
                               <span className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide">{job.role}</span>
                               <span className="text-slate-300 dark:text-slate-600">|</span>
                               <span className="text-sm text-slate-500 dark:text-slate-400">{job.type}</span>
                             </div>

                             <ul className="space-y-2">
                               {job.details.map((detail, idx) => (
                                 <li key={idx} className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-slate-300 dark:before:text-slate-600">
                                   {detail}
                                 </li>
                               ))}
                             </ul>
                           </div>
                         ))}
                       </div>
                    </div>
                 </div>
               </motion.div>
             )}
           </AnimatePresence>
        </div>

      </div>

      {/* Detail Modal Overlay */}
      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </section>
  );
};

export default Experience;