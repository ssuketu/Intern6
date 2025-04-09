import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Internship {
  id: string;
  title: string;
  company: string;
  description: string;
  requirements: string[];
  location: string;
  duration: string;
  stipend: number;
  postedBy: string;
  applications: string[];
  deadline: string;
  status: 'open' | 'closed';
  salary: number;
  employerId: string;
}

interface InternshipContextType {
  internships: Internship[];
  addInternship: (internship: Omit<Internship, 'id' | 'applications'>) => void;
  applyForInternship: (internshipId: string, studentId: string) => void;
  getInternshipById: (id: string) => Internship | undefined;
}

export const InternshipContext = createContext<InternshipContextType | undefined>(undefined);

export const InternshipProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [internships, setInternships] = useState<Internship[]>([]);

  const addInternship = (internship: Omit<Internship, 'id' | 'applications'>) => {
    const newInternship: Internship = {
      ...internship,
      id: Date.now().toString(),
      applications: []
    };
    setInternships(prev => [...prev, newInternship]);
  };

  const applyForInternship = (internshipId: string, studentId: string) => {
    setInternships(prev => 
      prev.map(internship => 
        internship.id === internshipId
          ? { ...internship, applications: [...internship.applications, studentId] }
          : internship
      )
    );
  };

  const getInternshipById = (id: string) => {
    return internships.find(internship => internship.id === id);
  };

  return (
    <InternshipContext.Provider value={{ internships, addInternship, applyForInternship, getInternshipById }}>
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