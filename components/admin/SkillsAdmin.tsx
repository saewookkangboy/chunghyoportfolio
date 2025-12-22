import React, { useState, useEffect } from 'react';
import { Save, Plus, Trash2, X, Loader2 } from 'lucide-react';
import { PortfolioData, SkillCategory } from '../../types';
import { savePortfolioData, loadPortfolioData, getDefaultData } from '../../utils/adminStorage';
import { saveWithAutoTranslation } from '../../utils/autoTranslate';

interface SkillsAdminProps {
  language: 'ko' | 'en' | 'ja';
  onSave: () => void;
}

const SkillsAdmin: React.FC<SkillsAdminProps> = ({ language, onSave }) => {
  const [skills, setSkills] = useState<SkillCategory[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [translationProgress, setTranslationProgress] = useState<string>('');

  useEffect(() => {
    const saved = loadPortfolioData(language);
    setSkills(saved?.skills || getDefaultData(language).skills);
  }, [language]);

  const handleSave = async () => {
    setIsSaving(true);
    setTranslationProgress('');
    
    const saved = loadPortfolioData(language) || getDefaultData(language);
    const updated: PortfolioData = {
      ...saved,
      skills,
    };

    if (language === 'ko') {
      try {
        await saveWithAutoTranslation(updated, (message) => {
          setTranslationProgress(message);
        });
        setTranslationProgress('');
        alert('저장되었습니다! (영어, 일본어 자동 번역 완료)');
      } catch (error) {
        console.error('저장 오류:', error);
        alert('저장 중 오류가 발생했습니다.');
      }
    } else {
      savePortfolioData(language, updated);
      setTimeout(() => {
        alert('저장되었습니다!');
      }, 300);
    }

    setIsSaving(false);
    onSave();
  };

  const handleCategoryAdd = () => {
    setSkills([...skills, { name: '', items: [] }]);
  };

  const handleCategoryDelete = (index: number) => {
    if (confirm('이 카테고리를 삭제하시겠습니까?')) {
      setSkills(skills.filter((_, i) => i !== index));
    }
  };

  const handleCategoryNameChange = (index: number, name: string) => {
    const newSkills = [...skills];
    newSkills[index] = { ...newSkills[index], name };
    setSkills(newSkills);
  };

  const handleItemAdd = (categoryIndex: number) => {
    const newSkills = [...skills];
    newSkills[categoryIndex].items = [...newSkills[categoryIndex].items, ''];
    setSkills(newSkills);
  };

  const handleItemChange = (categoryIndex: number, itemIndex: number, value: string) => {
    const newSkills = [...skills];
    newSkills[categoryIndex].items[itemIndex] = value;
    setSkills(newSkills);
  };

  const handleItemDelete = (categoryIndex: number, itemIndex: number) => {
    const newSkills = [...skills];
    newSkills[categoryIndex].items = newSkills[categoryIndex].items.filter(
      (_, i) => i !== itemIndex
    );
    setSkills(newSkills);
  };

  return (
    <section id="admin-skills" className="mb-12">
      <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">기술 스택 관리</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCategoryAdd}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
            >
              <Plus size={16} />
              카테고리 추가
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

        <div className="space-y-6">
          {skills.map((category, catIndex) => (
            <div
              key={catIndex}
              className="border border-slate-200 dark:border-slate-800 rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-4">
                <input
                  type="text"
                  value={category.name}
                  onChange={(e) => handleCategoryNameChange(catIndex, e.target.value)}
                  placeholder="카테고리 이름"
                  className="text-lg font-bold text-slate-900 dark:text-white bg-transparent border-b-2 border-transparent focus:border-blue-500 focus:outline-none px-2 py-1"
                />
                <button
                  onClick={() => handleCategoryDelete(catIndex)}
                  className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="space-y-2">
                {category.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => handleItemChange(catIndex, itemIndex, e.target.value)}
                      placeholder="기술 항목"
                      className="flex-1 px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={() => handleItemDelete(catIndex, itemIndex)}
                      className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => handleItemAdd(catIndex)}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors"
                >
                  <Plus size={14} />
                  항목 추가
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsAdmin;

