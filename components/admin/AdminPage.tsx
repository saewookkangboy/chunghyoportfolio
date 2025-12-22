import React, { useState, useEffect } from 'react';
import { isAdminAuthenticated, setAdminAuthenticated } from '../../utils/adminAuth';
import { loadPortfolioData, getDefaultData } from '../../utils/adminStorage';
import AdminLogin from './AdminLogin';
import AdminLayout from './AdminLayout';
import ProfileAdmin from './ProfileAdmin';
import PDFUploadAdmin from './PDFUploadAdmin';
import ProjectsAdmin from './ProjectsAdmin';
import CareerAdmin from './CareerAdmin';
import SkillsAdmin from './SkillsAdmin';
import CertificationsAdmin from './CertificationsAdmin';
import LecturesAdmin from './LecturesAdmin';
import { Language } from '../../types';

const AdminPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<Language>('ko');
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    setIsAuthenticated(isAdminAuthenticated());
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleDataChange = () => {
    setRefreshKey((prev) => prev + 1);
  };

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <AdminLayout
      currentLanguage={currentLanguage}
      onLanguageChange={setCurrentLanguage}
      onDataChange={handleDataChange}
    >
      <ProfileAdmin key={`profile-${currentLanguage}-${refreshKey}`} language={currentLanguage} onSave={handleDataChange} />
      <PDFUploadAdmin key={`pdf-upload-${currentLanguage}-${refreshKey}`} language={currentLanguage} onSave={handleDataChange} />
      <ProjectsAdmin key={`projects-${currentLanguage}-${refreshKey}`} language={currentLanguage} onSave={handleDataChange} />
      <CareerAdmin key={`career-${currentLanguage}-${refreshKey}`} language={currentLanguage} onSave={handleDataChange} />
      <SkillsAdmin key={`skills-${currentLanguage}-${refreshKey}`} language={currentLanguage} onSave={handleDataChange} />
      <CertificationsAdmin key={`certifications-${currentLanguage}-${refreshKey}`} language={currentLanguage} onSave={handleDataChange} />
      <LecturesAdmin key={`lectures-${currentLanguage}-${refreshKey}`} language={currentLanguage} onSave={handleDataChange} />
    </AdminLayout>
  );
};

export default AdminPage;

