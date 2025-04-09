// src/components/HomePage.tsx
import * as React from 'react';
import { Internship, Student } from '../types';
import { InternshipCard } from './InternshipCard';
import { Button } from './ui';

interface HomePageProps {
    internships: Internship[];
    students: Student[];
    onApply: (internshipId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ internships, students, onApply }) => {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Available Internships</h1>
                <div className="flex gap-4">
                    <Button variant="outline" onClick={() => window.location.href = '/manage'}>
                        Post Internship
                    </Button>
                </div>
            </div>
            {internships.length === 0 ? (
                <div className="text-center py-12">
                    <h2 className="text-2xl font-semibold text-gray-600 mb-4">No internships available</h2>
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