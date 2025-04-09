export interface Student {
    id: string;
    name: string;
    email: string;
    university: string;
    major: string;
    skills: string[];
}

export interface Internship {
    id: string;
    title: string;
    company: string;
    description: string;
    requirements: string[];
    location: string;
    duration: string;
    stipend: number;
    postedBy: string;
    createdAt: Date;
}

export interface Application {
    id: string;
    internshipId: string;
    studentId: string;
    status: 'pending' | 'accepted' | 'rejected';
    appliedAt: Date;
    coverLetter: string;
}

export interface User {
    id: string;
    email: string;
    name: string;
    role: 'student' | 'employer';
}

export interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}

export interface InternshipContextType {
    internships: Internship[];
    applications: Application[];
    addInternship: (internship: Omit<Internship, 'id' | 'createdAt'>) => Promise<void>;
    applyForInternship: (internshipId: string, coverLetter: string) => Promise<void>;
    updateApplicationStatus: (applicationId: string, status: 'accepted' | 'rejected') => Promise<void>;
}

export type Employer = {
    id: string;
    userId: string;
    companyName: string;
    description: string;
    website: string;
};

export type ApplicationStatus = 'pending' | 'accepted' | 'rejected';

export type UserAccount = {
    id: string;
    email: string;
    role: 'student' | 'employer';
}; 