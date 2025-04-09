// utils/utils.ts
import { UserAccount, Student, Employer, Internship, Application, ApplicationStatus } from '../types';

export const getLoggedInUser = (): UserAccount | null => {
    const userJson = localStorage.getItem('user');
    return userJson ? JSON.parse(userJson) : null;
};

export const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('student');
    localStorage.removeItem('employer');
};

export const mockUserAccounts: UserAccount[] = [
    { id: 'u1', email: 'student1@example.com', role: 'student' },
    { id: 'u2', email: 'employer1@example.com', role: 'employer' },
];

export const mockStudents: Student[] = [
    {
        id: 's1',
        userId: 'u1',
        name: 'Alice Smith',
        major: 'Computer Science',
        skills: ['React', 'Node.js', 'Python', 'JavaScript'],
        education: 'BS in Computer Science',
        resume: 'https://example.com/alice-resume.pdf'
    },
];

export const mockEmployers: Employer[] = [
    {
        id: 'e1',
        userId: 'u2',
        companyName: 'Tech Innovators Inc',
        description: 'A leading technology company',
        website: 'https://techinnovators.com'
    },
];

export const mockInternships: Internship[] = [
    {
        id: 'i1',
        employerId: 'e1',
        title: 'Software Engineering Intern',
        description: 'Join our team to work on cutting-edge projects.',
        requirements: ['Strong programming skills', 'Experience with React'],
        location: 'San Francisco, CA',
        duration: '3 months',
        salary: '$25/hour',
        deadline: '2024-04-30',
        status: 'open'
    },
    {
        id: 'i2',
        employerId: 'e1',
        title: 'Data Science Intern',
        description: 'Work with our data team to analyze large datasets.',
        requirements: ['Python', 'SQL', 'Data Analysis'],
        location: 'New York, NY',
        duration: '6 months',
        salary: '$30/hour',
        deadline: '2024-05-15',
        status: 'open'
    },
];

export const mockApplications: Application[] = [
    { 
        id: 'a1', 
        studentId: 's1', 
        internshipId: 'i1', 
        status: 'pending', 
        appliedAt: '2024-02-05' 
    },
    { 
        id: 'a2', 
        studentId: 's1', 
        internshipId: 'i2', 
        status: 'pending', 
        appliedAt: '2024-02-10' 
    },
];

export const createUserAccount = (email: string, role: 'student' | 'employer'): UserAccount => {
    return {
        id: crypto.randomUUID(),
        email,
        role
    };
};

export const createStudent = (userId: string, name: string, major: string, skills: string[], education: string, resume: string): Student => {
    return {
        id: crypto.randomUUID(),
        userId,
        name,
        major,
        skills,
        education,
        resume
    };
};

export const createEmployer = (userId: string, companyName: string, description: string, website: string): Employer => {
    return {
        id: crypto.randomUUID(),
        userId,
        companyName,
        description,
        website
    };
};

export const createInternship = (
    employerId: string,
    title: string,
    description: string,
    requirements: string[],
    location: string,
    duration: string,
    salary: string,
    deadline: string
): Internship => {
    return {
        id: crypto.randomUUID(),
        employerId,
        title,
        description,
        requirements,
        location,
        duration,
        salary,
        deadline,
        status: 'open'
    };
};

export const createApplication = (studentId: string, internshipId: string): Application => {
    return {
        id: crypto.randomUUID(),
        studentId,
        internshipId,
        status: 'pending',
        appliedAt: new Date().toISOString()
    };
};

export const getStatusColor = (status: ApplicationStatus): string => {
    switch (status) {
        case 'pending':
            return 'bg-yellow-500/20 text-yellow-500';
        case 'accepted':
            return 'bg-green-500/20 text-green-500';
        case 'rejected':
            return 'bg-red-500/20 text-red-500';
        default:
            return 'bg-gray-500/20 text-gray-500';
    }
};