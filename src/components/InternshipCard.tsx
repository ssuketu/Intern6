// components/InternshipCard.tsx
import * as React from 'react';
import { Internship } from '../types';
import { Button } from '@/components/ui';
import { cn } from '@/lib/utils';

interface InternshipCardProps {
    internship: Internship;
    onApply: (internshipId: string) => void;
}

export const InternshipCard: React.FC<InternshipCardProps> = ({ internship, onApply }) => {
    return (
        <div className="border rounded-lg p-4 space-y-4">
            <div>
                <h3 className="font-semibold text-lg">{internship.title}</h3>
                <p className="text-sm text-gray-600">{internship.location}</p>
            </div>
            
            <p className="text-gray-700">{internship.description}</p>
            
            <div>
                <h4 className="font-medium mb-2">Requirements:</h4>
                <ul className="list-disc list-inside space-y-1">
                    {internship.requirements.map((requirement: string, index: number) => (
                        <li key={index} className="text-sm text-gray-600">{requirement}</li>
                    ))}
                </ul>
            </div>
            
            <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Duration: {internship.duration}</span>
                <span className="text-gray-600">Salary: {internship.salary}</span>
            </div>
            
            <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                    Deadline: {new Date(internship.deadline).toLocaleDateString()}
                </span>
                <Button
                    onClick={() => onApply(internship.id)}
                    className={cn(
                        "px-4 py-2 rounded-md",
                        internship.status === 'closed' ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white'
                    )}
                    disabled={internship.status === 'closed'}
                >
                    {internship.status === 'closed' ? 'Closed' : 'Apply Now'}
                </Button>
            </div>
        </div>
    );
};