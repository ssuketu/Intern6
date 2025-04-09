import * as React from 'react';
import { Internship, Student, Application } from '../types';
import { HomePage } from './HomePage';
import { ApplicationStatus } from './ApplicationStatus';
import { LoginModal } from './LoginModal';
import { toast } from 'sonner';

interface InternshipMatchingPlatformProps {
    internships: Internship[];
    students: Student[];
    applications: Application[];
    onApply: (internshipId: string) => void;
    isAuthenticated: boolean;
    onLogin: (email: string) => void;
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
            toast.info('Please log in to apply for internships');
            return;
        }
        onApply(internshipId);
    };

    const handleLogin = (email: string) => {
        onLogin(email);
        setShowLoginModal(false);
    };

    return (
        <div className="space-y-8">
            <div className="bg-white shadow rounded-lg p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Available Internships</h1>
                <HomePage
                    internships={internships}
                    students={students}
                    onApply={handleApplyClick}
                />
            </div>

            {isAuthenticated && applications.length > 0 && (
                <div className="bg-white shadow rounded-lg p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Applications</h2>
                    <ApplicationStatus
                        applications={applications}
                        internships={internships}
                    />
                </div>
            )}

            {showLoginModal && (
                <LoginModal
                    onClose={() => setShowLoginModal(false)}
                    onLogin={handleLogin}
                />
            )}
        </div>
    );
}; 