import React, { useContext, useState } from 'react';
import { InternshipContext } from '../contexts/InternshipContext';
import { AuthContext } from '../contexts/AuthContext';
import { Internship, Application } from '../types';
import { toast } from 'sonner';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button, Input, Textarea } from './ui';

const InternshipManagement: React.FC = () => {
    const { internships, applications, addInternship, updateApplicationStatus } = useContext(InternshipContext);
    const { user } = useContext(AuthContext);
    const [newInternship, setNewInternship] = useState<Omit<Internship, 'id' | 'createdAt' | 'postedBy'>>({
        title: '',
        company: '',
        description: '',
        requirements: [],
        location: '',
        duration: '',
        stipend: 0,
    });

    const handleAddInternship = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await addInternship({
                ...newInternship,
                postedBy: user?.id || '',
            });
            setNewInternship({
                title: '',
                company: '',
                description: '',
                requirements: [],
                location: '',
                duration: '',
                stipend: 0,
            });
            toast.success('Internship posted successfully!');
        } catch (error) {
            toast.error('Failed to post internship');
        }
    };

    const handleUpdateStatus = async (applicationId: string, status: 'accepted' | 'rejected') => {
        try {
            await updateApplicationStatus(applicationId, status);
            toast.success(`Application ${status} successfully!`);
        } catch (error) {
            toast.error('Failed to update application status');
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Internship Management</h1>
            
            {/* Post New Internship Form */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">Post New Internship</h2>
                <form onSubmit={handleAddInternship} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            type="text"
                            value={newInternship.title}
                            onChange={(e) => setNewInternship({ ...newInternship, title: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Company</label>
                        <input
                            type="text"
                            value={newInternship.company}
                            onChange={(e) => setNewInternship({ ...newInternship, company: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            value={newInternship.description}
                            onChange={(e) => setNewInternship({ ...newInternship, description: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Requirements (comma-separated)</label>
                        <input
                            type="text"
                            value={newInternship.requirements.join(', ')}
                            onChange={(e) => setNewInternship({ ...newInternship, requirements: e.target.value.split(',').map(r => r.trim()) })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Location</label>
                        <input
                            type="text"
                            value={newInternship.location}
                            onChange={(e) => setNewInternship({ ...newInternship, location: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Duration</label>
                        <input
                            type="text"
                            value={newInternship.duration}
                            onChange={(e) => setNewInternship({ ...newInternship, duration: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Stipend</label>
                        <input
                            type="number"
                            value={newInternship.stipend}
                            onChange={(e) => setNewInternship({ ...newInternship, stipend: Number(e.target.value) })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Post Internship
                    </button>
                </form>
            </div>

            {/* Applications List */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Applications</h2>
                <div className="space-y-4">
                    {applications.map((application) => {
                        const internship = internships.find(i => i.id === application.internshipId);
                        return (
                            <div key={application.id} className="border rounded-lg p-4">
                                <h3 className="font-medium">{internship?.title}</h3>
                                <p className="text-gray-600">{internship?.company}</p>
                                <p className="text-sm text-gray-500 mt-2">Status: {application.status}</p>
                                <div className="mt-4 space-x-2">
                                    <button
                                        onClick={() => handleUpdateStatus(application.id, 'accepted')}
                                        className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700"
                                        disabled={application.status !== 'pending'}
                                    >
                                        Accept
                                    </button>
                                    <button
                                        onClick={() => handleUpdateStatus(application.id, 'rejected')}
                                        className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700"
                                        disabled={application.status !== 'pending'}
                                    >
                                        Reject
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default InternshipManagement; 