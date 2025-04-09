// src/components/HomePage.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { SectionCard, AnimatedTagline, InternshipCard } from './';
import { Internship, Student } from '../types/types';

interface HomePageProps {
    internships: Internship[];
    students: Student[];
    onApply: (application: any) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ internships, students, onApply }) => {
    const student = students[0]; // For simplicity, use the first student

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
        >
            <SectionCard>
                <div className="text-center space-y-4">
                    <AnimatedTagline />
                    <p className="text-gray-400 text-lg">
                        Find the perfect internship to launch your career.
                    </p>
                </div>
            </SectionCard>
            <SectionCard>
                <h2 className="text-2xl font-semibold text-white mb-6">Featured Internships</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {internships.map((internship) => (
                        <InternshipCard
                            key={internship.id}
                            internship={internship}
                            onApply={(internshipId) => {
                                const newApplication = {
                                    id: `app-${Math.random().toString(36).substr(2, 9)}`,
                                    studentId: student.id,
                                    internshipId: internshipId,
                                    status: 'pending',
                                    applyDate: new Date().toISOString(),
                                };
                                onApply(newApplication);
                            }}
                            showReadinessScore={true}
                            student={student}
                        />
                    ))}
                </div>
            </SectionCard>
        </motion.div>
    );
};