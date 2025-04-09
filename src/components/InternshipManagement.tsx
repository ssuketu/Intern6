import * as React from 'react';
import { Internship } from '../types';
import { Button } from '@/components/ui';
import { cn } from '@/lib/utils';

interface InternshipManagementProps {
    internships: Internship[];
    onUpdate: (internship: Internship) => void;
    onDelete: (id: string) => void;
}

export const InternshipManagement: React.FC<InternshipManagementProps> = ({
    internships,
    onUpdate,
    onDelete,
}) => {
    const handleUpdate = (e: React.FormEvent<HTMLFormElement>, id: string) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const updatedInternship: Internship = {
            id,
            employerId: formData.get('employerId') as string,
            title: formData.get('title') as string,
            description: formData.get('description') as string,
            requirements: (formData.get('requirements') as string).split(',').map(r => r.trim()),
            location: formData.get('location') as string,
            duration: formData.get('duration') as string,
            salary: formData.get('salary') as string,
            deadline: formData.get('deadline') as string,
            status: formData.get('status') as 'open' | 'closed'
        };
        onUpdate(updatedInternship);
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">Manage Internships</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {internships.map((internship) => (
                    <div key={internship.id} className="border rounded-lg p-4">
                        <form onSubmit={(e) => handleUpdate(e, internship.id)} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    defaultValue={internship.title}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                    name="description"
                                    defaultValue={internship.description}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Requirements (comma-separated)</label>
                                <input
                                    type="text"
                                    name="requirements"
                                    defaultValue={internship.requirements.join(', ')}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Location</label>
                                <input
                                    type="text"
                                    name="location"
                                    defaultValue={internship.location}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Duration</label>
                                <input
                                    type="text"
                                    name="duration"
                                    defaultValue={internship.duration}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Salary</label>
                                <input
                                    type="text"
                                    name="salary"
                                    defaultValue={internship.salary}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Deadline</label>
                                <input
                                    type="date"
                                    name="deadline"
                                    defaultValue={internship.deadline}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Status</label>
                                <select
                                    name="status"
                                    defaultValue={internship.status}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                >
                                    <option value="open">Open</option>
                                    <option value="closed">Closed</option>
                                </select>
                            </div>
                            <div className="flex justify-between">
                                <Button type="submit" variant="default">
                                    Update
                                </Button>
                                <Button
                                    type="button"
                                    variant="destructive"
                                    onClick={() => onDelete(internship.id)}
                                >
                                    Delete
                                </Button>
                            </div>
                        </form>
                    </div>
                ))}
            </div>
        </div>
    );
}; 