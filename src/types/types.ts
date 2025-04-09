// types/types.ts
export type UserAccount = {
    id: string;
    email: string;
    role: 'student' | 'employer';
};

export type Student = {
    id: string;
    userId: string;
    name: string;
    major: string;
    skills: string[];
    education: string;
    resume: string;
};

export type Employer = {
    id: string;
    userId: string;
    companyName: string;
    industry: string;
    website: string;
    location: string;
    contactPerson: string;
};

export type Internship = {
    id: string;
    employerId: string;
    title: string;
    description: string;
    requirements: string[];
    location: string;
    duration: string;
    salary: string;
    deadline: string;
    status: 'open' | 'closed';
};

export type ApplicationStatus = 'pending' | 'accepted' | 'rejected';

export type Application = {
    id: string;
    studentId: string;
    internshipId: string;
    status: ApplicationStatus;
    appliedAt: string;
};