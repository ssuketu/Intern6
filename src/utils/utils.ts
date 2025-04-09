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
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        university: 'Example University',
        major: 'Computer Science',
        skills: ['JavaScript', 'React', 'TypeScript'],
        role: 'student',
        userId: '1'
    },
    {
        id: 's1',
        userId: 'u1',
        name: 'Alice Smith',
        email: 'alice@example.com',
        university: 'Tech University',
        major: 'Computer Science',
        skills: ['React', 'Node.js', 'Python', 'JavaScript'],
        role: 'student'
    }
];

export const mockEmployers: Employer[] = [
    {
        id: 'e1',
        userId: 'u2',
        companyName: 'Tech Innovators Inc',
        description: 'A leading technology company',
        website: 'https://techinnovators.com'
    }
];

export const mockInternships: Internship[] = [
    {
        id: '1',
        title: 'Software Development Intern',
        company: 'Tech Corp',
        description: 'Join our team as a software development intern...',
        requirements: ['JavaScript', 'React', 'TypeScript'],
        location: 'Remote',
        duration: '3 months',
        stipend: 2000,
        postedBy: '1',
        createdAt: new Date(),
        applications: [],
        deadline: '2024-12-31',
        status: 'open',
        salary: 2000,
        employerId: '1'
    },
    {
        id: 'i2',
        employerId: 'e1',
        title: 'Data Science Intern',
        description: 'Work with our data team to analyze large datasets.',
        requirements: ['Python', 'SQL', 'Data Analysis'],
        location: 'New York, NY',
        duration: '6 months',
        stipend: 3000,
        postedBy: 'e1',
        createdAt: new Date(),
        applications: [],
        deadline: '2024-05-15',
        status: 'open',
        salary: 3000,
        company: 'Tech Innovators Inc'
    }
];

export const mockApplications: Application[] = [
    { 
        id: 'a1', 
        studentId: 's1', 
        internshipId: 'i1', 
        status: 'pending', 
        appliedAt: new Date(),
        coverLetter: 'I am interested in this position...'
    }
];

export const createUserAccount = (email: string, role: 'student' | 'employer'): UserAccount => {
    return {
        id: crypto.randomUUID(),
        email,
        role
    };
};

export const createStudent = (userId: string, name: string, email: string, university: string, major: string, skills: string[]): Student => {
    return {
        id: crypto.randomUUID(),
        userId,
        name,
        email,
        university,
        major,
        skills,
        role: 'student'
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
    stipend: number,
    salary: number
): Internship => {
    return {
        id: crypto.randomUUID(),
        employerId,
        title,
        description,
        requirements,
        location,
        duration,
        stipend: Number(stipend),
        salary: Number(salary),
        postedBy: employerId,
        createdAt: new Date(),
        applications: [],
        deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        status: 'open',
        company: 'Company Name'
    };
};

export const createApplication = (studentId: string, internshipId: string, coverLetter: string): Application => {
    return {
        id: crypto.randomUUID(),
        studentId,
        internshipId,
        status: 'pending',
        appliedAt: new Date(),
        coverLetter
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