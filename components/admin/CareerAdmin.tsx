import React, { useState, useEffect } from 'react';
import { Save, Plus, Trash2, Edit2, X, Check, Loader2 } from 'lucide-react';
import { PortfolioData, CareerItem } from '../../types';
import { savePortfolioData, loadPortfolioData, getDefaultData } from '../../utils/adminStorage';
import { saveWithAutoTranslation } from '../../utils/autoTranslate';

interface CareerAdminProps {
  language: 'ko' | 'en' | 'ja';
  onSave: () => void;
}

const CareerAdmin: React.FC<CareerAdminProps> = ({ language, onSave }) => {
  const [careers, setCareers] = useState<CareerItem[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [translationProgress, setTranslationProgress] = useState<string>('');

  useEffect(() => {
    const saved = loadPortfolioData(language);
    setCareers(saved?.careerHistory || getDefaultData(language).careerHistory);
  }, [language]);

  const handleSave = async () => {
    setIsSaving(true);
    setTranslationProgress('');
    
    const saved = loadPortfolioData(language) || getDefaultData(language);
    const updated: PortfolioData = {
      ...saved,
      careerHistory: careers,
    };

    if (language === 'ko') {
      try {
        await saveWithAutoTranslation(updated, (message) => {
          setTranslationProgress(message);
        });
        setTranslationProgress('');
        setEditingId(null);
        alert('저장되었습니다! (영어, 일본어 자동 번역 완료)');
      } catch (error) {
        console.error('저장 오류:', error);
        alert('저장 중 오류가 발생했습니다.');
      }
    } else {
      savePortfolioData(language, updated);
      setTimeout(() => {
        setEditingId(null);
        alert('저장되었습니다!');
      }, 300);
    }

    setIsSaving(false);
    onSave();
  };

  const handleAdd = () => {
    const newCareer: CareerItem = {
      id: `c${Date.now()}`,
      company: '',
      role: '',
      period: '',
      type: 'In-House',
      details: [],
    };
    setCareers([newCareer, ...careers]);
    setEditingId(newCareer.id);
  };

  const handleDelete = (id: string) => {
    if (confirm('이 경력을 삭제하시겠습니까?')) {
      setCareers(careers.filter((c) => c.id !== id));
    }
  };

  const handleUpdate = (id: string, field: keyof CareerItem, value: any) => {
    setCareers(
      careers.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  const handleDetailAdd = (id: string) => {
    setCareers(
      careers.map((c) =>
        c.id === id ? { ...c, details: [...c.details, ''] } : c
      )
    );
  };

  const handleDetailChange = (id: string, index: number, value: string) => {
    setCareers(
      careers.map((c) => {
        if (c.id === id) {
          const newDetails = [...c.details];
          newDetails[index] = value;
          return { ...c, details: newDetails };
        }
        return c;
      })
    );
  };

  const handleDetailDelete = (id: string, index: number) => {
    setCareers(
      careers.map((c) => {
        if (c.id === id) {
          return { ...c, details: c.details.filter((_, i) => i !== index) };
        }
        return c;
      })
    );
  };

  return (
    <section id="admin-career" className="mb-12">
      <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">경력 이력 관리</h2>
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
          {careers.map((career) => (
            <div
              key={career.id}
              className="border border-slate-200 dark:border-slate-800 rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-slate-400">{career.id}</span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {career.company || '(회사명 없음)'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {editingId === career.id ? (
                    <button
                      onClick={() => setEditingId(null)}
                      className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-md"
                    >
                      <Check size={16} />
                    </button>
                  ) : (
                    <button
                      onClick={() => setEditingId(career.id)}
                      className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md"
                    >
                      <Edit2 size={16} />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(career.id)}
                    className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {editingId === career.id && (
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        회사명
                      </label>
                      <input
                        type="text"
                        value={career.company}
                        onChange={(e) => handleUpdate(career.id, 'company', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        역할
                      </label>
                      <input
                        type="text"
                        value={career.role}
                        onChange={(e) => handleUpdate(career.id, 'role', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        기간
                      </label>
                      <input
                        type="text"
                        value={career.period}
                        onChange={(e) => handleUpdate(career.id, 'period', e.target.value)}
                        placeholder="예: 2016.01 - 현재"
                        className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        타입
                      </label>
                      <select
                        value={career.type}
                        onChange={(e) => handleUpdate(career.id, 'type', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Founder">Founder</option>
                        <option value="In-House">In-House</option>
                        <option value="Agency">Agency</option>
                        <option value="Consulting">Consulting</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      설명 (선택사항)
                    </label>
                    <textarea
                      value={career.description || ''}
                      onChange={(e) => handleUpdate(career.id, 'description', e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                        상세 내용
                      </label>
                      <button
                        onClick={() => handleDetailAdd(career.id)}
                        className="text-xs px-2 py-1 bg-blue-600 text-white rounded"
                      >
                        <Plus size={12} className="inline" /> 추가
                      </button>
                    </div>
                    <div className="space-y-2">
                      {career.details.map((detail, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={detail}
                            onChange={(e) => handleDetailChange(career.id, idx, e.target.value)}
                            className="flex-1 px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <button
                            onClick={() => handleDetailDelete(career.id, idx)}
                            className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
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

export default CareerAdmin;

