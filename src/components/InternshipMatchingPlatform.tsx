import * as React from 'react';
import { Internship, Student, Application } from '../types';
import { HomePage } from './HomePage';
import { ApplicationStatus } from './ApplicationStatus';

interface InternshipMatchingPlatformProps {
    internships: Internship[];
    students: Student[];
    applications: Application[];
    onApply: (internshipId: string) => void;
}

export const InternshipMatchingPlatform: React.FC<InternshipMatchingPlatformProps> = ({
    internships,
    students,
    applications,
    onApply,
}) => {
    return (
        <div className="min-h-screen bg-gray-50">
            <HomePage
                internships={internships}
                students={students}
                onApply={onApply}
            />
            <div className="container mx-auto px-4 py-8">
                <h2 className="text-2xl font-bold mb-6">Your Applications</h2>
                <ApplicationStatus
                    applications={applications}
                    internships={internships}
                />
            </div>
        </div>
    );
}; 