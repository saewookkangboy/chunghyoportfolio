import React, { useState, useEffect } from 'react';
import { Save, Plus, Trash2, GripVertical, Loader2 } from 'lucide-react';
import { PortfolioData } from '../../types';
import { savePortfolioData, loadPortfolioData, getDefaultData } from '../../utils/adminStorage';
import { saveWithAutoTranslation } from '../../utils/autoTranslate';

interface ProfileAdminProps {
  language: 'ko' | 'en' | 'ja';
  onSave: () => void;
}

const ProfileAdmin: React.FC<ProfileAdminProps> = ({ language, onSave }) => {
  const [data, setData] = useState<PortfolioData['profile']>(getDefaultData(language).profile);
  const [isSaving, setIsSaving] = useState(false);
  const [translationProgress, setTranslationProgress] = useState<string>('');

  useEffect(() => {
    const saved = loadPortfolioData(language);
    if (saved) {
      setData(saved.profile);
    } else {
      setData(getDefaultData(language).profile);
    }
  }, [language]);

  const handleSave = async () => {
    setIsSaving(true);
    setTranslationProgress('');
    
    const saved = loadPortfolioData(language) || getDefaultData(language);
    const updated: PortfolioData = {
      ...saved,
      profile: data,
    };

    if (language === 'ko') {
      // 한국어 저장 시 자동 번역
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
      // 영어/일본어는 직접 저장 (번역하지 않음)
      savePortfolioData(language, updated);
      setTimeout(() => {
        alert('저장되었습니다!');
      }, 300);
    }

    setIsSaving(false);
    onSave();
  };

  const handleLinkAdd = () => {
    setData({
      ...data,
      links: [...data.links, { label: '', url: '' }],
    });
  };

  const handleLinkChange = (index: number, field: 'label' | 'url', value: string) => {
    const newLinks = [...data.links];
    newLinks[index] = { ...newLinks[index], [field]: value };
    setData({ ...data, links: newLinks });
  };

  const handleLinkDelete = (index: number) => {
    if (confirm('이 링크를 삭제하시겠습니까?')) {
      setData({
        ...data,
        links: data.links.filter((_, i) => i !== index),
      });
    }
  };

  return (
    <section id="admin-profile" className="mb-12">
      <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">프로필 관리</h2>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-medium rounded-lg transition-colors"
          >
            {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            {isSaving ? (translationProgress || '저장 중...') : '저장'}
          </button>
          {language === 'ko' && (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              한국어 저장 시 영어, 일본어가 자동으로 번역됩니다
            </p>
          )}
        </div>

        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                이름 (한글)
              </label>
              <input
                type="text"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                이름 (영문)
              </label>
              <input
                type="text"
                value={data.englishName}
                onChange={(e) => setData({ ...data, englishName: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                이메일
              </label>
              <input
                type="email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                전화번호
              </label>
              <input
                type="tel"
                value={data.phone}
                onChange={(e) => setData({ ...data, phone: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              요약 (Summary) - 각 문단은 빈 줄로 구분
            </label>
            <textarea
              value={data.summary}
              onChange={(e) => setData({ ...data, summary: e.target.value })}
              rows={10}
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
              placeholder="각 문단을 빈 줄로 구분하여 입력하세요"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              명언 (Quote) - 줄바꿈은 \n 사용
            </label>
            <textarea
              value={data.quote}
              onChange={(e) => setData({ ...data, quote: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="예: 현장에서 답을 찾고,\n지속적인 Learn-by-Doing"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                링크
              </label>
              <button
                onClick={handleLinkAdd}
                className="flex items-center gap-2 px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
              >
                <Plus size={14} />
                추가
              </button>
            </div>
            <div className="space-y-3">
              {data.links.map((link, index) => (
                <div key={index} className="flex items-center gap-2">
                  <GripVertical size={16} className="text-slate-400 cursor-move" />
                  <input
                    type="text"
                    value={link.label}
                    onChange={(e) => handleLinkChange(index, 'label', e.target.value)}
                    placeholder="라벨"
                    className="flex-1 px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="url"
                    value={link.url}
                    onChange={(e) => handleLinkChange(index, 'url', e.target.value)}
                    placeholder="URL"
                    className="flex-1 px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={() => handleLinkDelete(index)}
                    className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileAdmin;

