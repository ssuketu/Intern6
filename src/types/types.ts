// types/types.ts
export enum ApplicationStatus {
    PENDING = 'pending',
    REVIEWED = 'reviewed',
    ACCEPTED = 'accepted',
    REJECTED = 'rejected',
}

export interface UserAccount {
    id: string;
    email: string;
    role: 'student' | 'employer' | 'admin';
    verified: boolean;
}

export interface Student {
    id: string;
    name: string;
    email: string;
    skills: string[];
    experience: string[];
    education: string;
    readinessScore: number;
}

export interface Employer {
    id: string;
    companyName: string;
    email: string;
    industry: string;
    website: string;
    contactPerson: string;
}

export interface Internship {
    id: string;
    title: string;
    company: string;
    location: string;
    description: string;
    requirements: string[];
    duration: string;
    salary: string;
    postedDate: string;
    skills: string[];
    status: 'open' | 'closed';
    major?: string;
}

export interface Application {
    id: string;
    studentId: string;
    internshipId: string;
    status: ApplicationStatus;
    applyDate: string;
}