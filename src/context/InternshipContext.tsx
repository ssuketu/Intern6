import * as React from 'react';
import { createContext, useContext, useState } from 'react';
import { Internship, Application } from '../types';
import { toast } from 'sonner';

interface InternshipContextType {
    internships: Internship[];
    applications: Application[];
    addInternship: (internship: Omit<Internship, 'id'>) => void;
    updateInternship: (id: string, updates: Partial<Internship>) => void;
    deleteInternship: (id: string) => void;
    applyForInternship: (internshipId: string, studentId: string) => void;
    updateApplicationStatus: (applicationId: string, status: 'pending' | 'accepted' | 'rejected') => void;
}

const InternshipContext = createContext<InternshipContextType | undefined>(undefined);

export const InternshipProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [internships, setInternships] = useState<Internship[]>([
        {
            id: '1',
            employerId: 'emp1',
            title: 'Software Engineering Intern',
            description: 'Join our team as a software engineering intern',
            requirements: ['JavaScript', 'React', 'TypeScript'],
            location: 'Remote',
            duration: '3 months',
            salary: '$25/hour',
            deadline: '2024-06-01',
            status: 'open'
        },
        {
            id: '2',
            employerId: 'emp2',
            title: 'Data Science Intern',
            description: 'Work on exciting data science projects',
            requirements: ['Python', 'Machine Learning', 'SQL'],
            location: 'Hybrid',
            duration: '6 months',
            salary: '$30/hour',
            deadline: '2024-07-01',
            status: 'open'
        }
    ]);

    const [applications, setApplications] = useState<Application[]>([]);

    const addInternship = (internship: Omit<Internship, 'id'>) => {
        const newInternship: Internship = {
            ...internship,
            id: Date.now().toString()
        };
        setInternships(prev => [...prev, newInternship]);
        toast.success('Internship posted successfully');
    };

    const updateInternship = (id: string, updates: Partial<Internship>) => {
        setInternships(prev =>
            prev.map(internship =>
                internship.id === id ? { ...internship, ...updates } : internship
            )
        );
        toast.success('Internship updated successfully');
    };

    const deleteInternship = (id: string) => {
        setInternships(prev => prev.filter(internship => internship.id !== id));
        toast.success('Internship deleted successfully');
    };

    const applyForInternship = (internshipId: string, studentId: string) => {
        const newApplication: Application = {
            id: Date.now().toString(),
            studentId,
            internshipId,
            status: 'pending',
            appliedAt: new Date().toISOString()
        };
        setApplications(prev => [...prev, newApplication]);
        toast.success('Application submitted successfully');
    };

    const updateApplicationStatus = (applicationId: string, status: 'pending' | 'accepted' | 'rejected') => {
        setApplications(prev =>
            prev.map(application =>
                application.id === applicationId ? { ...application, status } : application
            )
        );
        toast.success('Application status updated');
    };

    return (
        <InternshipContext.Provider
            value={{
                internships,
                applications,
                addInternship,
                updateInternship,
                deleteInternship,
                applyForInternship,
                updateApplicationStatus
            }}
        >
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