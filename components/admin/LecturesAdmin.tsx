import React, { useState, useEffect } from 'react';
import { Save, Plus, Trash2, Edit2, X, Check, Loader2 } from 'lucide-react';
import { PortfolioData, LectureItem } from '../../types';
import { savePortfolioData, loadPortfolioData, getDefaultData } from '../../utils/adminStorage';
import { saveWithAutoTranslation } from '../../utils/autoTranslate';

interface LecturesAdminProps {
  language: 'ko' | 'en' | 'ja';
  onSave: () => void;
}

const LecturesAdmin: React.FC<LecturesAdminProps> = ({ language, onSave }) => {
  const [lectures, setLectures] = useState<LectureItem[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [translationProgress, setTranslationProgress] = useState<string>('');

  useEffect(() => {
    const saved = loadPortfolioData(language);
    setLectures(saved?.lectures || getDefaultData(language).lectures);
  }, [language]);

  const handleSave = async () => {
    setIsSaving(true);
    setTranslationProgress('');
    
    const saved = loadPortfolioData(language) || getDefaultData(language);
    const updated: PortfolioData = {
      ...saved,
      lectures,
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
    const newLecture: LectureItem = {
      id: `l${Date.now()}`,
      title: '',
      organizer: '',
      period: '',
      role: '',
      description: '',
      details: [],
      tags: [],
    };
    setLectures([newLecture, ...lectures]);
    setEditingId(newLecture.id);
  };

  const handleDelete = (id: string) => {
    if (confirm('이 강의를 삭제하시겠습니까?')) {
      setLectures(lectures.filter((l) => l.id !== id));
    }
  };

  const handleUpdate = (id: string, field: keyof LectureItem, value: any) => {
    setLectures(
      lectures.map((l) => (l.id === id ? { ...l, [field]: value } : l))
    );
  };

  const handleArrayItemAdd = (id: string, field: 'details' | 'tags') => {
    setLectures(
      lectures.map((l) =>
        l.id === id ? { ...l, [field]: [...l[field], ''] } : l
      )
    );
  };

  const handleArrayItemChange = (
    id: string,
    field: 'details' | 'tags',
    index: number,
    value: string
  ) => {
    setLectures(
      lectures.map((l) => {
        if (l.id === id) {
          const newArray = [...l[field]];
          newArray[index] = value;
          return { ...l, [field]: newArray };
        }
        return l;
      })
    );
  };

  const handleArrayItemDelete = (id: string, field: 'details' | 'tags', index: number) => {
    setLectures(
      lectures.map((l) => {
        if (l.id === id) {
          return { ...l, [field]: l[field].filter((_, i) => i !== index) };
        }
        return l;
      })
    );
  };

  return (
    <section id="admin-lectures" className="mb-12">
      <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">강의/강연 관리</h2>
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
          {lectures.map((lecture) => (
            <div
              key={lecture.id}
              className="border border-slate-200 dark:border-slate-800 rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-slate-400">{lecture.id}</span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {lecture.title || '(제목 없음)'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {editingId === lecture.id ? (
                    <button
                      onClick={() => setEditingId(null)}
                      className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-md"
                    >
                      <Check size={16} />
                    </button>
                  ) : (
                    <button
                      onClick={() => setEditingId(lecture.id)}
                      className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md"
                    >
                      <Edit2 size={16} />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(lecture.id)}
                    className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {editingId === lecture.id && (
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        제목
                      </label>
                      <input
                        type="text"
                        value={lecture.title}
                        onChange={(e) => handleUpdate(lecture.id, 'title', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        주최자
                      </label>
                      <input
                        type="text"
                        value={lecture.organizer}
                        onChange={(e) => handleUpdate(lecture.id, 'organizer', e.target.value)}
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
                        value={lecture.period}
                        onChange={(e) => handleUpdate(lecture.id, 'period', e.target.value)}
                        placeholder="예: 2023"
                        className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        역할
                      </label>
                      <input
                        type="text"
                        value={lecture.role}
                        onChange={(e) => handleUpdate(lecture.id, 'role', e.target.value)}
                        placeholder="예: Instructor, Mentor"
                        className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      설명
                    </label>
                    <textarea
                      value={lecture.description}
                      onChange={(e) => handleUpdate(lecture.id, 'description', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Details */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                        커리큘럼 및 주요 주제
                      </label>
                      <button
                        onClick={() => handleArrayItemAdd(lecture.id, 'details')}
                        className="text-xs px-2 py-1 bg-blue-600 text-white rounded"
                      >
                        <Plus size={12} className="inline" /> 추가
                      </button>
                    </div>
                    <div className="space-y-2">
                      {lecture.details.map((detail, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={detail}
                            onChange={(e) => handleArrayItemChange(lecture.id, 'details', idx, e.target.value)}
                            className="flex-1 px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <button
                            onClick={() => handleArrayItemDelete(lecture.id, 'details', idx)}
                            className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tags */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                        태그
                      </label>
                      <button
                        onClick={() => handleArrayItemAdd(lecture.id, 'tags')}
                        className="text-xs px-2 py-1 bg-blue-600 text-white rounded"
                      >
                        <Plus size={12} className="inline" /> 추가
                      </button>
                    </div>
                    <div className="space-y-2">
                      {lecture.tags.map((tag, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={tag}
                            onChange={(e) => handleArrayItemChange(lecture.id, 'tags', idx, e.target.value)}
                            className="flex-1 px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <button
                            onClick={() => handleArrayItemDelete(lecture.id, 'tags', idx)}
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

export default LecturesAdmin;

