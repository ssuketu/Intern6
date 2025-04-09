import * as React from 'react';
import { createContext, useContext, useState } from 'react';
import { Student, UserAccount } from '../types';

interface AuthContextType {
    isAuthenticated: boolean;
    userRole: 'student' | 'employer' | null;
    currentUser: Student | null;
    login: (email: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState<'student' | 'employer' | null>(null);
    const [currentUser, setCurrentUser] = useState<Student | null>(null);

    const login = (email: string) => {
        const role = email.includes('@company.com') ? 'employer' : 'student';
        setIsAuthenticated(true);
        setUserRole(role);

        if (role === 'student') {
            setCurrentUser({
                id: '1',
                userId: 'user1',
                name: 'John Doe',
                major: 'Computer Science',
                skills: ['JavaScript', 'React', 'TypeScript'],
                education: 'Bachelor of Science',
                resume: 'resume.pdf'
            });
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUserRole(null);
        setCurrentUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, userRole, currentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}; 