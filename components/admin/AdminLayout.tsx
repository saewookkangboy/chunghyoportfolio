import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { LogOut, Settings, Database, Download, Upload, RotateCcw } from 'lucide-react';
import { logout } from '../../utils/adminAuth';
import { exportData, importData, resetToDefault } from '../../utils/adminStorage';
import { Language } from '../../types';

interface AdminLayoutProps {
  children: ReactNode;
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  onDataChange: () => void;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  currentLanguage,
  onLanguageChange,
  onDataChange,
}) => {
  const handleLogout = () => {
    if (confirm('로그아웃 하시겠습니까?')) {
      logout();
      window.location.href = '/';
    }
  };

  const handleExport = () => {
    exportData(currentLanguage);
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        try {
          await importData(currentLanguage, file);
          alert('데이터를 성공적으로 가져왔습니다.');
          onDataChange();
        } catch (error) {
          alert('데이터 가져오기 실패: ' + (error as Error).message);
        }
      }
    };
    input.click();
  };

  const handleReset = () => {
    if (confirm('기본값으로 초기화하시겠습니까? 저장된 변경사항이 모두 사라집니다.')) {
      resetToDefault(currentLanguage);
      alert('기본값으로 초기화되었습니다.');
      onDataChange();
    }
  };

  const navItems = [
    { id: 'profile', label: '프로필' },
    { id: 'pdf-upload', label: 'PDF 업로드' },
    { id: 'projects', label: '프로젝트' },
    { id: 'career', label: '경력' },
    { id: 'skills', label: '기술' },
    { id: 'certifications', label: '자격증' },
    { id: 'lectures', label: '강의' },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(`admin-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-6">
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                Admin Panel
              </h1>
              
              {/* Language Selector */}
              <div className="flex items-center gap-2">
                {(['ko', 'en', 'ja'] as Language[]).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => onLanguageChange(lang)}
                    className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                      currentLanguage === lang
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
                title="데이터 내보내기"
              >
                <Download size={16} />
                <span className="hidden sm:inline">내보내기</span>
              </button>
              <button
                onClick={handleImport}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
                title="데이터 가져오기"
              >
                <Upload size={16} />
                <span className="hidden sm:inline">가져오기</span>
              </button>
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
                title="기본값으로 초기화"
              >
                <RotateCcw size={16} />
                <span className="hidden sm:inline">초기화</span>
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
              >
                <LogOut size={16} />
                <span className="hidden sm:inline">로그아웃</span>
              </button>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-1 overflow-x-auto pb-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md transition-colors whitespace-nowrap"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;

