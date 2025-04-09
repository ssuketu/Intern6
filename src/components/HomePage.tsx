// src/components/HomePage.tsx
import * as React from 'react';
import { Internship, Student } from '../types';
import { InternshipCard } from './InternshipCard';
import { Button } from './ui';
import { useNavigate } from 'react-router-dom';

interface HomePageProps {
    internships: Internship[];
    students: Student[];
    onApply: (internshipId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ internships, students, onApply }) => {
    const navigate = useNavigate();

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-lg font-medium text-gray-900">
                        {internships.length} {internships.length === 1 ? 'Internship' : 'Internships'} Available
                    </h2>
                    <p className="text-sm text-gray-500">
                        Browse and apply for internships that match your skills
                    </p>
                </div>
                <Button
                    variant="outline"
                    onClick={() => navigate('/manage')}
                    className="bg-indigo-600 text-white hover:bg-indigo-700"
                >
                    Post Internship
                </Button>
            </div>

            {internships.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No internships available</h3>
                    <p className="text-gray-500">Check back later for new opportunities</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {internships.map((internship) => (
                        <InternshipCard
                            key={internship.id}
                            internship={internship}
                            onApply={onApply}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};