import * as React from 'react';
import { Internship, Student, Application } from '../types';
import { HomePage } from './HomePage';
import { ApplicationStatus } from './ApplicationStatus';
import { LoginModal } from './LoginModal';

interface InternshipMatchingPlatformProps {
    internships: Internship[];
    students: Student[];
    applications: Application[];
    onApply: (internshipId: string) => void;
    isAuthenticated: boolean;
    onLogin: () => void;
}

export const InternshipMatchingPlatform: React.FC<InternshipMatchingPlatformProps> = ({
    internships,
    students,
    applications,
    onApply,
    isAuthenticated,
    onLogin,
}) => {
    const [showLoginModal, setShowLoginModal] = React.useState(false);

    const handleApplyClick = (internshipId: string) => {
        if (!isAuthenticated) {
            setShowLoginModal(true);
            return;
        }
        onApply(internshipId);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <HomePage
                internships={internships}
                students={students}
                onApply={handleApplyClick}
            />
            <div className="container mx-auto px-4 py-8">
                <h2 className="text-2xl font-bold mb-6">Your Applications</h2>
                <ApplicationStatus
                    applications={applications}
                    internships={internships}
                />
            </div>
            {showLoginModal && (
                <LoginModal
                    onClose={() => setShowLoginModal(false)}
                    onLogin={onLogin}
                />
            )}
        </div>
    );
}; 