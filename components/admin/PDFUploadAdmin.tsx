import React, { useState, useEffect } from 'react';
import { Upload, FileText, Loader2, CheckCircle, X, Plus, Save, AlertTriangle, GripVertical } from 'lucide-react';
import { extractTextFromPDF } from '../../utils/pdfExtractor';
import { extractProjectsFromPDF } from '../../services/pdfExtractionService';
import { ExtractedProject } from '../../utils/pdfExtractor';
import { ProjectItem } from '../../types';
import { savePortfolioData, loadPortfolioData, getDefaultData } from '../../utils/adminStorage';
import { findDuplicates } from '../../utils/duplicateChecker';

interface PDFUploadAdminProps {
  language: 'ko' | 'en' | 'ja';
  onSave: () => void;
}

const PDFUploadAdmin: React.FC<PDFUploadAdminProps> = ({ language, onSave }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractedProjects, setExtractedProjects] = useState<ExtractedProject[]>([]);
  const [selectedProjects, setSelectedProjects] = useState<Set<number>>(new Set());
  const [duplicateIndices, setDuplicateIndices] = useState<Set<number>>(new Set());
  const [duplicateInfo, setDuplicateInfo] = useState<Map<number, ProjectItem>>(new Map());
  const [error, setError] = useState<string>('');
  const [existingProjects, setExistingProjects] = useState<ProjectItem[]>([]);

  // 기존 프로젝트 로드
  useEffect(() => {
    const saved = loadPortfolioData(language) || getDefaultData(language);
    setExistingProjects(saved.projects || []);
  }, [language]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      setError('PDF 파일만 업로드 가능합니다.');
      return;
    }

    setIsUploading(true);
    setError('');
    setExtractedProjects([]);
    setSelectedProjects(new Set());

    try {
      // 1. PDF에서 텍스트 추출
      const pdfText = await extractTextFromPDF(file);
      
      if (!pdfText || pdfText.trim().length === 0) {
        throw new Error('PDF에서 텍스트를 추출할 수 없습니다.');
      }

      setIsUploading(false);
      setIsExtracting(true);

      // 2. Gemini AI로 프로젝트 정보 추출
      const projects = await extractProjectsFromPDF(pdfText);
      
      setIsExtracting(false);
      
      if (projects.length === 0) {
        setError('프로젝트 정보를 찾을 수 없습니다. PDF 형식을 확인해주세요.');
        return;
      }

      // 기존 프로젝트와 중복 체크
      const currentData = loadPortfolioData(language) || getDefaultData(language);
      const { duplicates, duplicateInfo: dupInfo } = findDuplicates(projects, currentData.projects);
      
      setExtractedProjects(projects);
      setDuplicateIndices(new Set(duplicates));
      setDuplicateInfo(dupInfo);
      
      // 중복되지 않은 프로젝트만 기본 선택
      const nonDuplicateIndices = projects
        .map((_, index) => index)
        .filter(index => !duplicates.includes(index));
      setSelectedProjects(new Set(nonDuplicateIndices));
      
      // 중복이 있으면 알림
      if (duplicates.length > 0) {
        console.log(`${duplicates.length}개의 중복 프로젝트가 발견되었습니다.`);
      }
    } catch (err) {
      setIsUploading(false);
      setIsExtracting(false);
      const errorMessage = err instanceof Error ? err.message : 'PDF 처리 중 오류가 발생했습니다.';
      console.error('PDF 업로드 오류 상세:', err);
      setError(errorMessage);
      
      // 에러를 더 자세히 표시
      if (errorMessage.includes('API Key')) {
        setError(`${errorMessage}\n\n.env.local 파일에 GEMINI_API_KEY를 설정해주세요.`);
      }
    }
  };

  const toggleProjectSelection = (index: number) => {
    const newSelected = new Set(selectedProjects);
    if (newSelected.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setSelectedProjects(newSelected);
  };

  const handleSaveSelected = () => {
    if (selectedProjects.size === 0) {
      alert('저장할 프로젝트를 선택해주세요.');
      return;
    }

    const selectedProjectsData = Array.from(selectedProjects)
      .map((index) => {
        const extracted = extractedProjects[index];
        const project: ProjectItem = {
          id: `p${Date.now()}-${index}`,
          client: extracted.company,
          role: '', // 사용자가 나중에 수정 가능
          period: extracted.period,
          description: extracted.description || extracted.projectName,
          tasks: extracted.tasks || [],
          results: [],
          tags: [],
          category: 'Consulting', // 기본값, 사용자가 수정 가능
        };
        return project;
      });

    // 중복 체크: 선택한 프로젝트 중 기존 프로젝트와 중복되는 것 제외
    const currentData = loadPortfolioData(language) || getDefaultData(language);
    const { duplicates: newDuplicates } = findDuplicates(
      selectedProjectsData.map(p => ({
        period: p.period,
        company: p.client,
        projectName: p.description,
        description: p.description,
        tasks: p.tasks,
      })),
      currentData.projects
    );
    
    // 중복되지 않은 프로젝트만 추가
    const uniqueProjects = selectedProjectsData.filter((_, index) => 
      !newDuplicates.includes(index)
    );
    
    // 기존 프로젝트에 추가 (중복 제외)
    const updated: typeof currentData = {
      ...currentData,
      projects: [...uniqueProjects, ...currentData.projects],
    };

    savePortfolioData(language, updated);
    
    const duplicateCount = selectedProjects.size - uniqueProjects.length;
    if (duplicateCount > 0) {
      alert(`${uniqueProjects.length}개의 프로젝트가 저장되었습니다. (${duplicateCount}개 중복 제외)`);
    } else {
      alert(`${uniqueProjects.length}개의 프로젝트가 저장되었습니다!`);
    }
    
    // 초기화
    setExtractedProjects([]);
    setSelectedProjects(new Set());
    setDuplicateIndices(new Set());
    setDuplicateInfo(new Map());
    onSave();
  };

  const formatPeriod = (period: string): string => {
    // YYYY.MM.DD 또는 YYYY.MM 형식으로 정리
    const parts = period.split('.');
    if (parts.length === 3) {
      return `${parts[0]}.${parts[1].padStart(2, '0')}.${parts[2].padStart(2, '0')}`;
    } else if (parts.length === 2) {
      return `${parts[0]}.${parts[1].padStart(2, '0')}`;
    }
    return period;
  };

  return (
    <section id="admin-pdf-upload" className="mb-12">
      <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">PDF 이력서 업로드</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              PDF 파일을 업로드하면 프로젝트 정보를 자동으로 추출합니다
            </p>
          </div>
        </div>

        {/* 파일 업로드 영역 */}
        <div className="mb-6">
          <label className="block mb-2">
            <div className="flex items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg cursor-pointer hover:border-blue-500 dark:hover:border-blue-500 transition-colors">
              {isUploading || isExtracting ? (
                <div className="flex flex-col items-center gap-2">
                  <Loader2 className="animate-spin text-blue-600 dark:text-blue-400" size={24} />
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    {isUploading ? 'PDF 읽는 중...' : '프로젝트 정보 추출 중...'}
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <Upload className="text-slate-400 dark:text-slate-500" size={24} />
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    PDF 파일을 선택하거나 드래그하세요
                  </span>
                </div>
              )}
            </div>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileUpload}
              disabled={isUploading || isExtracting}
              className="hidden"
              id="pdf-upload"
            />
          </label>
        </div>

        {/* 에러 메시지 */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
              <X size={16} />
              <span className="text-sm">{error}</span>
            </div>
          </div>
        )}

        {/* 추출된 프로젝트 목록 */}
        {extractedProjects.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  추출된 프로젝트 ({extractedProjects.length}개)
                </h3>
                {duplicateIndices.size > 0 && (
                  <p className="text-sm text-amber-600 dark:text-amber-400 mt-1 flex items-center gap-1">
                    <AlertTriangle size={14} />
                    {duplicateIndices.size}개의 중복 프로젝트가 발견되었습니다 (자동 선택 해제됨)
                  </p>
                )}
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  💡 프로젝트를 드래그하여 "프로젝트 관리" 또는 "경력 이력 관리" 영역으로 이동할 수 있습니다
                </p>
              </div>
              <button
                onClick={handleSaveSelected}
                disabled={selectedProjects.size === 0}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
              >
                <Save size={16} />
                선택한 프로젝트 저장 ({selectedProjects.size}개)
              </button>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {extractedProjects.map((project, index) => {
                const isSelected = selectedProjects.has(index);
                const isDuplicate = duplicateIndices.has(index);
                const existingProject = duplicateInfo.get(index);
                
                // 드래그 시작
                const handleDragStart = (e: React.DragEvent) => {
                  if (isDuplicate) {
                    e.preventDefault();
                    return;
                  }
                  const dragData = {
                    type: 'extracted-project',
                    index,
                    project,
                  };
                  e.dataTransfer.setData('application/json', JSON.stringify(dragData));
                  e.dataTransfer.effectAllowed = 'move';
                  // 드래그 중 시각적 피드백
                  (e.currentTarget as HTMLElement).style.opacity = '0.5';
                };
                
                const handleDragEnd = (e: React.DragEvent) => {
                  (e.currentTarget as HTMLElement).style.opacity = '1';
                };
                
                return (
                  <div
                    key={index}
                    draggable={!isDuplicate}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    className={`border rounded-lg p-4 transition-all ${
                      isDuplicate
                        ? 'border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-900/10 cursor-not-allowed'
                        : isSelected
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 cursor-move hover:shadow-lg'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 cursor-move hover:shadow-md'
                    }`}
                    onClick={() => !isDuplicate && toggleProjectSelection(index)}
                  >
                    <div className="flex items-start gap-3">
                      {!isDuplicate && (
                        <div className="mt-1 text-slate-400 dark:text-slate-500 cursor-move" title="드래그하여 이동">
                          <GripVertical size={20} />
                        </div>
                      )}
                      <div className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                        isSelected
                          ? 'border-blue-500 bg-blue-500'
                          : 'border-slate-300 dark:border-slate-600'
                      }`}>
                        {isSelected && <CheckCircle size={16} className="text-white" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                            {formatPeriod(project.period)}
                          </span>
                          <span className="font-bold text-slate-900 dark:text-white">
                            {project.company}
                          </span>
                          {isDuplicate && (
                            <span className="text-xs px-2 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded flex items-center gap-1">
                              <AlertTriangle size={12} />
                              중복
                            </span>
                          )}
                        </div>
                        {isDuplicate && existingProject && (
                          <div className="mb-2 p-2 bg-slate-50 dark:bg-slate-800 rounded text-xs text-slate-600 dark:text-slate-400">
                            <span className="font-medium">기존 프로젝트:</span> {existingProject.client} ({existingProject.period})
                          </div>
                        )}
                        <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">
                          {project.projectName}
                        </h4>
                        {project.description && (
                          <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                            {project.description}
                          </p>
                        )}
                        {project.tasks && project.tasks.length > 0 && (
                          <div className="mt-2">
                            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                              주요 업무:
                            </p>
                            <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400 space-y-1">
                              {project.tasks.slice(0, 3).map((task, taskIndex) => (
                                <li key={taskIndex}>{task}</li>
                              ))}
                              {project.tasks.length > 3 && (
                                <li className="text-slate-400">... 외 {project.tasks.length - 3}개</li>
                              )}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PDFUploadAdmin;

