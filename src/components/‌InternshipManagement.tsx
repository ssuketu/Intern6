// src/components/InternshipManagement.tsx
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button, Input, Textarea } from '@/components/ui';
import { Internship } from '../types/types';

interface InternshipManagementProps {
    internships: Internship[];
    onUpdate: (id: string, updates: Partial<Internship>) => void;
    onDelete: (id: string) => void;
}

export const InternshipManagement: React.FC<InternshipManagementProps> = ({ internships, onUpdate, onDelete }) => {
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editedInternship, setEditedInternship] = useState<Partial<Internship>>({});

    const handleEdit = (internship: Internship) => {
        setEditingId(internship.id);
        setEditedInternship(internship);
    };

    const handleSave = (id: string) => {
        onUpdate(id, editedInternship);
        setEditingId(null);
        setEditedInternship({});
    };

    const handleCancel = () => {
        setEditingId(null);
        setEditedInternship({});
    };

    return (
        <div className="space-y-6">
            <Card className="bg-white/5 backdrop-blur-md rounded-xl shadow-lg border border-white/10">
                <CardHeader>
                    <CardTitle className="text-2xl font-semibold text-white">
                        Manage Internships
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                        View and manage your posted internships.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {internships.length === 0 ? (
                        <p className="text-gray-400">You have not posted any internships yet.</p>
                    ) : (
                        <div className="space-y-4">
                            {internships.map((internship) => (
                                <Card key={internship.id} className="bg-black/20 border-purple-500/30">
                                    <CardHeader>
                                        <CardTitle className="text-lg font-medium text-white">
                                            {internship.title}
                                        </CardTitle>
                                        <CardDescription className="text-gray-400">
                                            {internship.company} - {internship.location}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        {editingId === internship.id ? (
                                            <div className="space-y-4">
                                                <div className="space-y-2">
                                                    <label htmlFor={`title-${internship.id}`} className="text-gray-300 block">Title</label>
                                                    <Input
                                                        id={`title-${internship.id}`}
                                                        value={editedInternship.title || internship.title}
                                                        onChange={(e) => setEditedInternship({ ...editedInternship, title: e.target.value })}
                                                        className="bg-black/20 text-white border-purple-500/30"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label htmlFor={`location-${internship.id}`} className="text-gray-300 block">Location</label>
                                                    <Input
                                                        id={`location-${internship.id}`}
                                                        value={editedInternship.location || internship.location}
                                                        onChange={(e) => setEditedInternship({ ...editedInternship, location: e.target.value })}
                                                        className="bg-black/20 text-white border-purple-500/30"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label htmlFor={`description-${internship.id}`} className="text-gray-300 block">Description</label>
                                                    <Textarea
                                                        id={`description-${internship.id}`}
                                                        value={editedInternship.description || internship.description}
                                                        onChange={(e) => setEditedInternship({ ...editedInternship, description: e.target.value })}
                                                        className="bg-black/20 text-white border-purple-500/30"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label htmlFor={`requirements-${internship.id}`} className="text-gray-300 block">Requirements</label>
                                                    <Textarea
                                                        id={`requirements-${internship.id}`}
                                                        value={editedInternship.requirements?.join('\n') || internship.requirements.join('\n')}
                                                        onChange={(e) =>
                                                            setEditedInternship({
                                                                ...editedInternship,
                                                                requirements: e.target.value.split('\n').map(r => r.trim()),
                                                            })
                                                        }
                                                        className="bg-black/20 text-white border-purple-500/30"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label htmlFor={`duration-${internship.id}`} className="text-gray-300 block">Duration</label>
                                                    <Input
                                                        id={`duration-${internship.id}`}
                                                        value={editedInternship.duration || internship.duration}
                                                        onChange={(e) => setEditedInternship({ ...editedInternship, duration: e.target.value })}
                                                        className="bg-black/20 text-white border-purple-500/30"
                                                    />
                                                </div>
                                                <div className="flex justify-end gap-4 mt-4">
                                                    <Button
                                                        onClick={handleCancel}
                                                        className="bg-gray-500/90 text-white hover:bg-gray-500 transition-colors"
                                                    >
                                                        Cancel
                                                    </Button>
                                                    <Button
                                                        onClick={() => handleSave(internship.id)}
                                                        className="bg-purple-500/90 text-white hover:bg-purple-500 transition-colors"
                                                    >
                                                        Save
                                                    </Button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="space-y-2">
                                                <p className="text-gray-300">{internship.description}</p>
                                                <p className="text-gray-300">
                                                    <span className="font-medium text-purple-300">Duration:</span> {internship.duration}
                                                </p>
                                                <div className="flex gap-2">
                                                    {internship.skills.map((skill) => (
                                                        <span
                                                            key={skill}
                                                            className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded"
                                                        >
                                                            {skill}
                                                        </span>
                                                    ))}
                                                </div>
                                                <div className="flex gap-4 mt-4">
                                                    <Button
                                                        onClick={() => handleEdit(internship)}
                                                        className="bg-blue-500/90 text-white hover:bg-blue-500 transition-colors"
                                                    >
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        onClick={() => onDelete(internship.id)}
                                                        className="bg-red-500/90 text-white hover:bg-red-500 transition-colors"
                                                    >
                                                        Delete
                                                    </Button>
                                                </div>
                                            </div>
                                        )}
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