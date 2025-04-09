// src/components/HomePage.tsx
import * as React from 'react';
import { Internship, Student } from '../types';
import { InternshipCard } from './InternshipCard';

interface HomePageProps {
    internships: Internship[];
    students: Student[];
    onApply: (internshipId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ internships, students, onApply }) => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Available Internships</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {internships.map((internship) => (
                    <InternshipCard
                        key={internship.id}
                        internship={internship}
                        onApply={onApply}
                    />
                ))}
            </div>
        </div>
    );
};