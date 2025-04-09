import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Internship, Application } from '../types';

interface InternshipContextType {
  internships: Internship[];
  applications: Application[];
  addInternship: (internship: Omit<Internship, 'id' | 'createdAt'>) => Promise<void>;
  applyForInternship: (internshipId: string, coverLetter: string) => Promise<void>;
  updateApplicationStatus: (applicationId: string, status: 'accepted' | 'rejected') => Promise<void>;
}

export const InternshipContext = createContext<InternshipContextType | undefined>(undefined);

export const InternshipProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [internships, setInternships] = useState<Internship[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);

  const addInternship = async (internship: Omit<Internship, 'id' | 'createdAt'>) => {
    const newInternship: Internship = {
      ...internship,
      id: Date.now().toString(),
      createdAt: new Date(),
      applications: [],
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'open',
      salary: typeof internship.salary === 'string' ? parseFloat(internship.salary) : internship.salary,
      stipend: typeof internship.stipend === 'string' ? parseFloat(internship.stipend) : internship.stipend,
      employerId: internship.postedBy
    };
    setInternships(prev => [...prev, newInternship]);
  };

  const applyForInternship = async (internshipId: string, coverLetter: string) => {
    const newApplication: Application = {
      id: Date.now().toString(),
      internshipId,
      studentId: 'current-user-id', // This should be replaced with actual user ID
      status: 'pending',
      appliedAt: new Date(),
      coverLetter
    };
    setApplications(prev => [...prev, newApplication]);
  };

  const updateApplicationStatus = async (applicationId: string, status: 'accepted' | 'rejected') => {
    setApplications(prev =>
      prev.map(app =>
        app.id === applicationId ? { ...app, status } : app
      )
    );
  };

  return (
    <InternshipContext.Provider value={{ internships, applications, addInternship, applyForInternship, updateApplicationStatus }}>
      {children}
    </InternshipContext.Provider>
  );
};

export const useInternship = () => {
  const context = useContext(InternshipContext);
  if (context === undefined) {
    throw new Error('useInternship must be used within an InternshipProvider');
  }
  return context;
}; 