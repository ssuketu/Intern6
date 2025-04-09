// components/InternshipCard.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button } from '@/components/ui';
import { cn } from '@/lib/utils';
import { Internship, Student } from '../types/types';

interface InternshipCardProps {
    internship: Internship;
    onApply?: (internshipId: string) => void;
    showReadinessScore?: boolean;
    student?: Student;
}

export const InternshipCard: React.FC<InternshipCardProps> = ({
    internship,
    onApply,
    showReadinessScore,
    student,
}) => {
    const [showDetails, setShowDetails] = useState(false);
    const [readinessScore, setReadinessScore] = useState<number | null>(null);

    useEffect(() => {
        if (showReadinessScore && student) {
            const matchedSkills = student.skills.filter((skill) =>
                internship.skills.some((internshipSkill) =>
                    internshipSkill.toLowerCase().includes(skill.toLowerCase())
                )
            );
            const score = (matchedSkills.length / internship.skills.length) * 100;
            setReadinessScore(Math.round(score));
        }
    }, [internship, student, showReadinessScore]);

    return (
        <Card className={cn(
            "bg-white/5 backdrop-blur-md shadow-lg border border-white/10 transition-all duration-300",
            "hover:scale-[1.02] hover:shadow-xl hover:border-purple-500/20",
            "group"
        )}>
            <CardHeader>
                <CardTitle className="text-lg font-semibold text-white flex justify-between items-start">
                    {internship.title}
                    {showReadinessScore && readinessScore !== null && (
                        <span className={cn(
                            "text-sm font-medium px-2 py-1 rounded",
                            readinessScore > 70 ? 'bg-green-500/20 text-green-300' :
                            readinessScore > 40 ? 'bg-yellow-500/20 text-yellow-300' :
                            'bg-red-500/20 text-red-300'
                        )}>
                            Readiness: {readinessScore}%
                        </span>
                    )}
                </CardTitle>
                <CardDescription className="text-gray-400 flex items-center gap-2">
                    <span className="truncate">{internship.company}</span>
                    <span className="mx-1">•</span>
                    <span>{internship.location}</span>
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                <p className="text-gray-300 truncate-2-lines">{internship.description}</p>
                <Button
                    variant="outline"
                    size="sm"
                    className="text-purple-300 hover:text-purple-200 hover:bg-purple-500/20 border-purple-500/30"
                    onClick={() => setShowDetails(!showDetails)}
                >
                    {showDetails ? 'Hide Details' : 'Show Details'}
                </Button>
                <AnimatePresence>
                    {showDetails && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-2"
                        >
                            {/* Details content */}
                        </motion.div>
                    )}
                </AnimatePresence>
            </CardContent>
        </Card>
    );
};