import React from 'react';
import { motion } from 'framer-motion';
import { RESUME_DATA } from '../constants';

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-12 bg-white relative z-10 border-t border-slate-200">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="grid md:grid-cols-12 gap-8 mb-16 border-b border-slate-900 pb-8 items-end">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="md:col-span-6"
          >
             <h2 className="text-5xl md:text-6xl font-bold text-slate-900 tracking-tight mb-2">Expertise</h2>
             <span className="font-mono text-sm uppercase tracking-widest text-blue-600">Capabilities & Credentials</span>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* Skills Grid */}
          <div className="lg:col-span-7">
             <div className="grid sm:grid-cols-2 gap-x-8 gap-y-12">
               {RESUME_DATA.skills.map((category, catIndex) => (
                 <motion.div 
                   key={category.name} 
                   className="flex flex-col"
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true, margin: "-50px" }}
                   transition={{ duration: 0.5, delay: catIndex * 0.1 }}
                 >
                   <h3 className="text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">
                     {category.name}
                   </h3>
                   <ul className="space-y-3">
                     {category.items.map((item, itemIndex) => (
                       <motion.li 
                         key={item} 
                         className="text-slate-600 text-sm font-medium hover:text-blue-600 transition-colors cursor-default"
                         initial={{ opacity: 0, x: -10 }}
                         whileInView={{ opacity: 1, x: 0 }}
                         viewport={{ once: true }}
                         transition={{ duration: 0.3, delay: (catIndex * 0.1) + (itemIndex * 0.05) }}
                       >
                         {item}
                       </motion.li>
                     ))}
                   </ul>
                 </motion.div>
               ))}
             </div>
          </div>

          {/* Sidebar: Education & Certs */}
          <div className="lg:col-span-5 space-y-16">
            
            {/* Education */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
               <h3 className="font-mono text-xs uppercase tracking-widest text-slate-400 mb-6 border-b border-slate-200 pb-2">
                 Education
               </h3>
               <div className="space-y-8">
                  <div className="group">
                    <div className="flex justify-between items-baseline mb-1">
                       <h4 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Chung-Ang University</h4>
                       <span className="text-xs font-mono text-slate-400">Graduate</span>
                    </div>
                    <p className="text-slate-600">Strategy & Brand Communication</p>
                  </div>
                  <div className="group">
                    <div className="flex justify-between items-baseline mb-1">
                       <h4 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Soonchunhyang University</h4>
                       <span className="text-xs font-mono text-slate-400">Bachelor</span>
                    </div>
                    <p className="text-slate-600">Financial Insurance</p>
                  </div>
               </div>
            </motion.div>

            {/* Certifications */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
               <h3 className="font-mono text-xs uppercase tracking-widest text-slate-400 mb-6 border-b border-slate-200 pb-2">
                 Certifications
               </h3>
               <div className="space-y-4">
                  {RESUME_DATA.certifications.map((cert, idx) => (
                    <div key={idx} className="flex justify-between items-start group">
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">{cert.name}</h4>
                        <span className="text-xs text-slate-500">{cert.issuer || 'Certified'}</span>
                      </div>
                      <span className="font-mono text-xs text-slate-400">{cert.date}</span>
                    </div>
                  ))}
               </div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Skills;