// utils/utils.ts
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
    { id: 'u1', email: 'student1@example.com', role: 'student', verified: true },
    { id: 'u2', email: 'employer1@example.com', role: 'employer', verified: true },
    { id: 'u3', email: 'admin@example.com', role: 'admin', verified: true },
];

export const mockStudents: Student[] = [
    {
        id: 's1',
        name: 'Alice Smith',
        email: 'student1@example.com',
        major: 'Computer Science',
        skills: ['React', 'Node.js', 'Python', 'JavaScript'],
        education: 'BS in Computer Science',
        resume: 'https://example.com/alice-resume.pdf',
        profileComplete: 80,
        financialFitnessScore: 75,
    },
];

export const mockEmployers: Employer[] = [
    {
        id: 'e1',
        companyName: 'Tech Innovators Inc',
        email: 'employer1@example.com',
        industry: 'Technology',
        website: 'https://techinnovators.com',
        contactPerson: 'John Doe',
    },
];

export const mockInternships: Internship[] = [
    {
        id: 'i1',
        title: 'Software Engineering Intern',
        company: 'Tech Innovators Inc',
        location: 'San Francisco, CA',
        description: 'Join our team to work on cutting-edge projects.',
        requirements: ['Strong programming skills', 'Experience with React'],
        duration: '3 months',
        postedDate: '2024-01-15',
        skills: ['React', 'Node.js', 'JavaScript'],
        status: 'open',
        major: 'Computer Science',
    },
    {
        id: 'i2',
        title: 'Data Science Intern',
        company: 'Data Insights Corp',
        location: 'New York, NY',
        description: 'Work with our data team to analyze large datasets.',
        requirements: ['Python', 'SQL', 'Data Analysis'],
        duration: '6 months',
        postedDate: '2024-01-20',
        skills: ['Python', 'SQL', 'Data Analysis'],
        status: 'open',
        major: 'Statistics',
    },
];

export const mockApplications: Application[] = [
    { id: 'a1', studentId: 's1', internshipId: 'i1', status: ApplicationStatus.PENDING, applyDate: '2024-02-05' },
    { id: 'a2', studentId: 's1', internshipId: 'i2', status: ApplicationStatus.REVIEWED, applyDate: '2024-02-10' },
];