// src/components/ApplicationStatus.tsx
import * as React from 'react';
import type { Application, Internship } from '../types';
import { cn } from '../lib/utils';

type StatusType = 'pending' | 'accepted' | 'rejected';

interface ApplicationStatusProps {
    applications: Application[];
    internships: Internship[];
}

const ApplicationStatusComponent: React.FC<ApplicationStatusProps> = ({ applications, internships }) => {
    const getStatusColor = (status: StatusType) => {
        switch (status) {
            case 'accepted':
                return 'bg-green-100 text-green-800';
            case 'rejected':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-yellow-100 text-yellow-800';
        }
    };

    const getStatusText = (status: StatusType) => {
        switch (status) {
            case 'accepted':
                return 'Accepted';
            case 'rejected':
                return 'Rejected';
            default:
                return 'Pending';
        }
    };

    if (applications.length === 0) {
        return (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
                <p className="text-gray-500">You haven't applied to any internships yet.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {applications.map((application) => {
                const internship = internships.find(i => i.id === application.internshipId);
                if (!internship) return null;

                return (
                    <div key={application.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-semibold text-gray-900">{internship.title}</h3>
                                <p className="text-sm text-gray-600">{internship.location}</p>
                            </div>
                            <span className={cn(
                                "px-3 py-1 rounded-full text-xs font-medium",
                                getStatusColor(application.status as StatusType)
                            )}>
                                {getStatusText(application.status as StatusType)}
                            </span>
                        </div>
                        <div className="mt-4 space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Applied on:</span>
                                <span className="text-gray-900">
                                    {new Date(application.appliedAt).toLocaleDateString()}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Duration:</span>
                                <span className="text-gray-900">{internship.duration}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Salary:</span>
                                <span className="text-gray-900">{internship.salary}</span>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export { ApplicationStatusComponent as ApplicationStatus };