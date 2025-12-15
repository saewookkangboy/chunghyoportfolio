import React from 'react';
import { motion } from 'framer-motion';
import { Quote as QuoteIcon } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Quote: React.FC = () => {
  const { data } = useLanguage();

  return (
    <section className="py-32 px-4 sm:px-6 lg:px-12 bg-white dark:bg-slate-950 relative z-10 transition-colors duration-300 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 1 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-900 dark:text-white pointer-events-none"
        >
          <QuoteIcon size={200} />
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white leading-tight whitespace-pre-line relative z-10"
        >
          {data.profile.quote}
        </motion.h2>
      </div>
    </section>
  );
};

export default Quote;