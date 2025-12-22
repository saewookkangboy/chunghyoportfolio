import React, { useState, useEffect } from 'react';
import { Save, Plus, Trash2, Edit2, X, Check, Loader2 } from 'lucide-react';
import { PortfolioData, Certification } from '../../types';
import { savePortfolioData, loadPortfolioData, getDefaultData } from '../../utils/adminStorage';
import { saveWithAutoTranslation } from '../../utils/autoTranslate';

interface CertificationsAdminProps {
  language: 'ko' | 'en' | 'ja';
  onSave: () => void;
}

const CertificationsAdmin: React.FC<CertificationsAdminProps> = ({ language, onSave }) => {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [translationProgress, setTranslationProgress] = useState<string>('');

  useEffect(() => {
    const saved = loadPortfolioData(language);
    setCertifications(saved?.certifications || getDefaultData(language).certifications);
  }, [language]);

  const handleSave = async () => {
    setIsSaving(true);
    setTranslationProgress('');
    
    const saved = loadPortfolioData(language) || getDefaultData(language);
    const updated: PortfolioData = {
      ...saved,
      certifications,
    };

    if (language === 'ko') {
      try {
        await saveWithAutoTranslation(updated, (message) => {
          setTranslationProgress(message);
        });
        setTranslationProgress('');
        setEditingIndex(null);
        alert('저장되었습니다! (영어, 일본어 자동 번역 완료)');
      } catch (error) {
        console.error('저장 오류:', error);
        alert('저장 중 오류가 발생했습니다.');
      }
    } else {
      savePortfolioData(language, updated);
      setTimeout(() => {
        setEditingIndex(null);
        alert('저장되었습니다!');
      }, 300);
    }

    setIsSaving(false);
    onSave();
  };

  const handleAdd = () => {
    setCertifications([...certifications, { name: '', date: '', issuer: '' }]);
    setEditingIndex(certifications.length);
  };

  const handleDelete = (index: number) => {
    if (confirm('이 자격증을 삭제하시겠습니까?')) {
      setCertifications(certifications.filter((_, i) => i !== index));
    }
  };

  const handleUpdate = (index: number, field: keyof Certification, value: string) => {
    const newCerts = [...certifications];
    newCerts[index] = { ...newCerts[index], [field]: value };
    setCertifications(newCerts);
  };

  return (
    <section id="admin-certifications" className="mb-12">
      <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">자격증 관리</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={handleAdd}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
            >
              <Plus size={16} />
              추가
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-medium rounded-lg transition-colors"
            >
              {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
              {isSaving ? (translationProgress || '저장 중...') : '저장'}
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="border border-slate-200 dark:border-slate-800 rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {cert.name || '(이름 없음)'}
                  </span>
                  {cert.issuer && (
                    <span className="ml-2 text-sm text-slate-500 dark:text-slate-400">
                      - {cert.issuer}
                    </span>
                  )}
                  {cert.date && (
                    <span className="ml-2 text-sm text-slate-400 dark:text-slate-500">
                      ({cert.date})
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {editingIndex === index ? (
                    <button
                      onClick={() => setEditingIndex(null)}
                      className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-md"
                    >
                      <Check size={16} />
                    </button>
                  ) : (
                    <button
                      onClick={() => setEditingIndex(index)}
                      className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md"
                    >
                      <Edit2 size={16} />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(index)}
                    className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {editingIndex === index && (
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      자격증 이름
                    </label>
                    <input
                      type="text"
                      value={cert.name}
                      onChange={(e) => handleUpdate(index, 'name', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      날짜
                    </label>
                    <input
                      type="text"
                      value={cert.date}
                      onChange={(e) => handleUpdate(index, 'date', e.target.value)}
                      placeholder="예: 2022.06"
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      발행기관 (선택사항)
                    </label>
                    <input
                      type="text"
                      value={cert.issuer || ''}
                      onChange={(e) => handleUpdate(index, 'issuer', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsAdmin;

