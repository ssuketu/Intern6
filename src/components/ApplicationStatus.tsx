// src/components/ApplicationStatus.tsx
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui';
import { Application, Internship } from '../types/types';

interface ApplicationStatusProps {
    applications: Application[];
    internships: Internship[];
}

export const ApplicationStatus: React.FC<ApplicationStatusProps> = ({ applications, internships }) => {
    const getInternshipTitle = (internshipId: string) => {
        const internship = internships.find((i) => i.id === internshipId);
        return internship ? internship.title : 'Unknown Internship';
    };

    return (
        <div className="space-y-6">
            <Card className="bg-white/5 backdrop-blur-md rounded-xl shadow-lg border border-white/10">
                <CardHeader>
                    <CardTitle className="text-2xl font-semibold text-white">
                        Application Status
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                        View the status of your internship applications.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {applications.length === 0 ? (
                        <p className="text-gray-400">You have no applications yet.</p>
                    ) : (
                        <div className="space-y-4">
                            {applications.map((application) => (
                                <Card key={application.id} className="bg-black/20 border-purple-500/30">
                                    <CardHeader>
                                        <CardTitle className="text-lg font-medium text-white">
                                            Application for: {getInternshipTitle(application.internshipId)}
                                        </CardTitle>
                                        <CardDescription className="text-gray-400">
                                            Applied on: {new Date(application.applyDate).toLocaleDateString()}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex items-center gap-2">
                                            <span className="text-gray-300">Status:</span>
                                            <span
                                                className={cn(
                                                    'font-medium',
                                                    application.status === 'pending' && 'text-yellow-400',
                                                    application.status === 'reviewed' && 'text-blue-400',
                                                    application.status === 'accepted' && 'text-green-400',
                                                    application.status === 'rejected' && 'text-red-400',
                                                )}
                                            >
                                                {application.status}
                                            </span>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};