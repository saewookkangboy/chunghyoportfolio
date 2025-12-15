import React from 'react';
import { RESUME_DATA } from '../constants';
import { ProjectItem } from '../types';

const ProjectRow: React.FC<{ project: ProjectItem; index: number }> = ({ project, index }) => {
  return (
    <div className="group border-t border-slate-200 py-10 transition-colors duration-500 hover:bg-slate-50/80">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-y-6 md:gap-8 px-4 sm:px-0">
        
        {/* 1. ID & Period */}
        <div className="md:col-span-2 flex flex-row md:flex-col justify-between md:justify-start gap-1">
          <div className="font-mono text-xs text-slate-400 mb-1">{(index + 1).toString().padStart(2, '0')}</div>
          <div className="font-mono text-sm font-semibold text-slate-900">{project.period.split(' ')[0]}</div>
          <div className="md:hidden text-xs text-slate-400 self-center">
            {project.category}
          </div>
        </div>

        {/* 2. Client & Role */}
        <div className="md:col-span-4 pr-4">
          <h3 className="text-2xl font-bold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">
            {project.client}
          </h3>
          <div className="mt-2 flex items-center flex-wrap gap-2">
            <span className="text-sm font-medium text-slate-500 uppercase tracking-wide">{project.role}</span>
          </div>
          <span className={`hidden md:inline-block mt-3 px-2 py-0.5 text-[10px] font-mono uppercase border ${project.category === 'Consulting' ? 'border-blue-200 text-blue-600 bg-blue-50' : 'border-emerald-200 text-emerald-600 bg-emerald-50'}`}>
            {project.category}
          </span>
        </div>

        {/* 3. Details */}
        <div className="md:col-span-6 space-y-5">
          <p className="text-lg text-slate-800 leading-relaxed font-normal">
            {project.description}
          </p>
          <ul className="space-y-2 border-l-2 border-slate-100 pl-4">
             {project.tasks.map((task, i) => (
                <li key={i} className="text-sm text-slate-600 leading-relaxed">
                  {task}
                </li>
             ))}
          </ul>
          <div className="flex flex-wrap gap-x-4 gap-y-2 pt-2">
            {project.tags.map(tag => (
              <span key={tag} className="text-xs font-mono text-slate-400 bg-white border border-slate-100 px-2 py-1">#{tag}</span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-24 px-4 sm:px-6 lg:px-12 bg-white relative z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="grid md:grid-cols-12 gap-8 mb-20 border-b border-slate-900 pb-8 items-end">
          <div className="md:col-span-6">
            <h2 className="text-5xl md:text-6xl font-bold text-slate-900 tracking-tight mb-2">Projects</h2>
            <span className="font-mono text-sm uppercase tracking-widest text-blue-600">Selected Works 2016 — 2025</span>
          </div>
          <div className="md:col-span-6">
             <p className="text-slate-600 text-lg leading-relaxed md:max-w-md md:ml-auto">
               주요 컨설팅 및 인하우스 프로젝트 인덱스입니다.<br/>
               데이터 기반 전략과 크리에이티브 솔루션을 제공합니다.
             </p>
          </div>
        </div>

        {/* Projects List */}
        <div className="mb-32">
          {/* Table Header */}
          <div className="hidden md:grid grid-cols-12 gap-8 pb-3 border-b border-slate-900 text-xs font-mono uppercase text-slate-900 font-bold px-4 sm:px-0">
            <div className="col-span-2">No. / Year</div>
            <div className="col-span-4">Client / Role</div>
            <div className="col-span-6">Description / Outcome</div>
          </div>
          
          <div className="border-b border-slate-900">
            {RESUME_DATA.projects.map((project, index) => (
              <ProjectRow key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>

        {/* Career History */}
        <div className="grid lg:grid-cols-12 gap-12 pt-12 border-t border-slate-200">
           <div className="lg:col-span-3">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">History</h2>
              <span className="font-mono text-xs uppercase tracking-widest text-slate-400">Professional Journey</span>
           </div>
           
           <div className="lg:col-span-9">
              <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
                {RESUME_DATA.careerHistory.map((job) => (
                  <div key={job.id} className="group">
                    <div className="flex justify-between items-baseline border-b border-slate-200 pb-3 mb-4 group-hover:border-blue-600 transition-colors">
                       <h3 className="text-xl font-bold text-slate-900">{job.company}</h3>
                       <span className="font-mono text-xs text-slate-500">{job.period}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-sm font-bold text-blue-600 uppercase tracking-wide">{job.role}</span>
                      <span className="text-slate-300">|</span>
                      <span className="text-sm text-slate-500">{job.type}</span>
                    </div>

                    <ul className="space-y-2">
                      {job.details.map((detail, idx) => (
                        <li key={idx} className="text-slate-600 text-sm leading-relaxed pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-slate-300">
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
           </div>
        </div>

      </div>
    </section>
  );
};

export default Experience;