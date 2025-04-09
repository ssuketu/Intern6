// src/components/ApplicationStatus.tsx
import * as React from 'react';
import type { Application, Internship } from '../types';
import { Button } from '@/components/ui';
import { cn } from '@/lib/utils';

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

    return (
        <div className="space-y-4">
            {applications.map((application) => {
                const internship = internships.find(i => i.id === application.internshipId);
                return (
                    <div key={application.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="font-semibold">{internship?.title}</h3>
                                <p className="text-sm text-gray-600">{internship?.location}</p>
                            </div>
                            <span className={cn(
                                "px-2 py-1 rounded-full text-xs font-medium",
                                getStatusColor(application.status as StatusType)
                            )}>
                                {application.status}
                            </span>
                        </div>
                        <div className="mt-2 text-sm text-gray-500">
                            Applied on: {new Date(application.appliedAt).toLocaleDateString()}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export { ApplicationStatusComponent as ApplicationStatus };