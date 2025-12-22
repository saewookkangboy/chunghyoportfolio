import React, { useState, useEffect } from 'react';
import { Save, Plus, Trash2, Edit2, X, Check, Loader2, Download } from 'lucide-react';
import { PortfolioData, ProjectItem } from '../../types';
import { savePortfolioData, loadPortfolioData, getDefaultData } from '../../utils/adminStorage';
import { saveWithAutoTranslation } from '../../utils/autoTranslate';
import { ExtractedProject } from '../../utils/pdfExtractor';

interface ProjectsAdminProps {
  language: 'ko' | 'en' | 'ja';
  onSave: () => void;
}

const ProjectsAdmin: React.FC<ProjectsAdminProps> = ({ language, onSave }) => {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [translationProgress, setTranslationProgress] = useState<string>('');
  const [isDragOver, setIsDragOver] = useState(false);

  useEffect(() => {
    const saved = loadPortfolioData(language);
    setProjects(saved?.projects || getDefaultData(language).projects);
  }, [language]);

  // 드롭 이벤트 처리
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    try {
      const data = e.dataTransfer.getData('application/json');
      if (!data) return;

      const dragData = JSON.parse(data);
      if (dragData.type === 'extracted-project') {
        const extracted = dragData.project as ExtractedProject;
        
        // ExtractedProject를 ProjectItem으로 변환
        const newProject: ProjectItem = {
          id: `p${Date.now()}`,
          client: extracted.company,
          role: '',
          period: extracted.period,
          description: extracted.description || extracted.projectName,
          tasks: extracted.tasks || [],
          results: [],
          tags: [],
          category: 'Consulting',
        };

        // 프로젝트 목록에 추가
        setProjects([newProject, ...projects]);
        setEditingId(newProject.id); // 자동으로 편집 모드로 전환
        
        alert(`"${extracted.company}" 프로젝트가 추가되었습니다. 내용을 확인하고 저장해주세요.`);
      }
    } catch (error) {
      console.error('드롭 처리 오류:', error);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setTranslationProgress('');
    
    const saved = loadPortfolioData(language) || getDefaultData(language);
    const updated: PortfolioData = {
      ...saved,
      projects,
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
    const newProject: ProjectItem = {
      id: `p${Date.now()}`,
      client: '',
      role: '',
      period: '',
      description: '',
      tasks: [],
      results: [],
      tags: [],
      category: 'Consulting',
    };
    setProjects([newProject, ...projects]);
    setEditingId(newProject.id);
  };

  const handleDelete = (id: string) => {
    if (confirm('이 프로젝트를 삭제하시겠습니까?')) {
      setProjects(projects.filter((p) => p.id !== id));
    }
  };

  const handleUpdate = (id: string, field: keyof ProjectItem, value: any) => {
    setProjects(
      projects.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  const handleArrayItemAdd = (id: string, field: 'tasks' | 'results' | 'tags') => {
    setProjects(
      projects.map((p) =>
        p.id === id ? { ...p, [field]: [...p[field], ''] } : p
      )
    );
  };

  const handleArrayItemChange = (
    id: string,
    field: 'tasks' | 'results' | 'tags',
    index: number,
    value: string
  ) => {
    setProjects(
      projects.map((p) => {
        if (p.id === id) {
          const newArray = [...p[field]];
          newArray[index] = value;
          return { ...p, [field]: newArray };
        }
        return p;
      })
    );
  };

  const handleArrayItemDelete = (id: string, field: 'tasks' | 'results' | 'tags', index: number) => {
    setProjects(
      projects.map((p) => {
        if (p.id === id) {
          return { ...p, [field]: p[field].filter((_, i) => i !== index) };
        }
        return p;
      })
    );
  };

  return (
    <section id="admin-projects" className="mb-12">
      <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">프로젝트 관리</h2>
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

        {/* 드롭 존 */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`mb-4 p-6 border-2 border-dashed rounded-lg transition-all ${
            isDragOver
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
              : 'border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50'
          }`}
        >
          <div className="flex items-center justify-center gap-2 text-slate-600 dark:text-slate-400">
            <Download size={20} />
            <span className="text-sm font-medium">
              PDF에서 추출한 프로젝트를 여기로 드래그하세요
            </span>
          </div>
        </div>

        <div className="space-y-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="border border-slate-200 dark:border-slate-800 rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-slate-400">{project.id}</span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {project.client || '(제목 없음)'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {editingId === project.id ? (
                    <button
                      onClick={() => setEditingId(null)}
                      className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-md"
                    >
                      <Check size={16} />
                    </button>
                  ) : (
                    <button
                      onClick={() => setEditingId(project.id)}
                      className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md"
                    >
                      <Edit2 size={16} />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {editingId === project.id && (
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        클라이언트
                      </label>
                      <input
                        type="text"
                        value={project.client}
                        onChange={(e) => handleUpdate(project.id, 'client', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        역할
                      </label>
                      <input
                        type="text"
                        value={project.role}
                        onChange={(e) => handleUpdate(project.id, 'role', e.target.value)}
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
                        value={project.period}
                        onChange={(e) => handleUpdate(project.id, 'period', e.target.value)}
                        placeholder="예: 2025.04 - 2025.06"
                        className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        카테고리
                      </label>
                      <select
                        value={project.category}
                        onChange={(e) => handleUpdate(project.id, 'category', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Consulting">Consulting</option>
                        <option value="In-House">In-House</option>
                        <option value="Project">Project</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      설명
                    </label>
                    <textarea
                      value={project.description}
                      onChange={(e) => handleUpdate(project.id, 'description', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Tasks */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                        주요 역할 (Tasks)
                      </label>
                      <button
                        onClick={() => handleArrayItemAdd(project.id, 'tasks')}
                        className="text-xs px-2 py-1 bg-blue-600 text-white rounded"
                      >
                        <Plus size={12} className="inline" /> 추가
                      </button>
                    </div>
                    <div className="space-y-2">
                      {project.tasks.map((task, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={task}
                            onChange={(e) => handleArrayItemChange(project.id, 'tasks', idx, e.target.value)}
                            className="flex-1 px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <button
                            onClick={() => handleArrayItemDelete(project.id, 'tasks', idx)}
                            className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Results */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                        주요 성과 (Results) - 선택사항
                      </label>
                      <button
                        onClick={() => handleArrayItemAdd(project.id, 'results')}
                        className="text-xs px-2 py-1 bg-blue-600 text-white rounded"
                      >
                        <Plus size={12} className="inline" /> 추가
                      </button>
                    </div>
                    <div className="space-y-2">
                      {(project.results || []).map((result, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={result}
                            onChange={(e) => handleArrayItemChange(project.id, 'results', idx, e.target.value)}
                            className="flex-1 px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <button
                            onClick={() => handleArrayItemDelete(project.id, 'results', idx)}
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
                        onClick={() => handleArrayItemAdd(project.id, 'tags')}
                        className="text-xs px-2 py-1 bg-blue-600 text-white rounded"
                      >
                        <Plus size={12} className="inline" /> 추가
                      </button>
                    </div>
                    <div className="space-y-2">
                      {project.tags.map((tag, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={tag}
                            onChange={(e) => handleArrayItemChange(project.id, 'tags', idx, e.target.value)}
                            className="flex-1 px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <button
                            onClick={() => handleArrayItemDelete(project.id, 'tags', idx)}
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

export default ProjectsAdmin;

