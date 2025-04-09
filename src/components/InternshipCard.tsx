// components/InternshipCard.tsx
import * as React from 'react';
import { Internship } from '../types';
import { Button } from './ui';
import { cn } from '../lib/utils';

interface InternshipCardProps {
    internship: Internship;
    onApply: (internshipId: string) => void;
}

export const InternshipCard: React.FC<InternshipCardProps> = ({ internship, onApply }) => {
    const deadline = new Date(internship.deadline);
    const isExpired = deadline < new Date();

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-4 hover:shadow-md transition-shadow">
            <div>
                <h3 className="font-semibold text-lg text-gray-900">{internship.title}</h3>
                <p className="text-sm text-gray-600">{internship.location}</p>
            </div>
            
            <p className="text-gray-700">{internship.description}</p>
            
            <div>
                <h4 className="font-medium text-gray-900 mb-2">Requirements:</h4>
                <ul className="list-disc list-inside space-y-1">
                    {internship.requirements.map((requirement, index) => (
                        <li key={index} className="text-sm text-gray-600">{requirement}</li>
                    ))}
                </ul>
            </div>
            
            <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Duration: {internship.duration}</span>
                <span className="text-gray-600">Salary: {internship.salary}</span>
            </div>
            
            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <div className="text-sm">
                    <span className={cn(
                        "px-2 py-1 rounded-full text-xs font-medium",
                        isExpired ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
                    )}>
                        {isExpired ? "Expired" : "Open until " + deadline.toLocaleDateString()}
                    </span>
                </div>
                <Button
                    onClick={() => onApply(internship.id)}
                    className={cn(
                        "px-4 py-2 rounded-md",
                        internship.status === 'closed' || isExpired
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-indigo-600 hover:bg-indigo-700 text-white"
                    )}
                    disabled={internship.status === 'closed' || isExpired}
                >
                    {internship.status === 'closed' || isExpired ? 'Closed' : 'Apply Now'}
                </Button>
            </div>
        </div>
    );
};