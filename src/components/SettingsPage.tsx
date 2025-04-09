// src/components/SettingsPage.tsx
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button, Input, Textarea } from '@/components/ui';

export const SettingsPage = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState({
        name: 'John Doe',
        email: 'john.doe@example.com',
        major: 'Engineering',
        skills: 'JavaScript, React, Node.js',
        education: 'BS in Engineering',
        resume: 'https://example.com/resume.pdf',
    });

    const handleEdit = () => setIsEditing(true);
    const handleSave = () => setIsEditing(false);
    const handleCancel = () => setIsEditing(false);

    return (
        <div className="space-y-6">
            <Card className="bg-white/5 backdrop-blur-md rounded-xl shadow-lg border border-white/10">
                <CardHeader>
                    <CardTitle className="text-2xl font-semibold text-white">
                        Profile Settings
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                        Manage your profile information.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {isEditing ? (
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-gray-300 block">Name</label>
                                <Input
                                    id="name"
                                    value={profile.name}
                                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                    className="bg-black/20 text-white border-purple-500/30"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-gray-300 block">Email</label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={profile.email}
                                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                    className="bg-black/20 text-white border-purple-500/30"
                                    disabled
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="major" className="text-gray-300 block">Major</label>
                                <Input
                                    id="major"
                                    value={profile.major}
                                    onChange={(e) => setProfile({ ...profile, major: e.target.value })}
                                    className="bg-black/20 text-white border-purple-500/30"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="skills" className="text-gray-300 block">Skills</label>
                                <Textarea
                                    id="skills"
                                    value={profile.skills}
                                    onChange={(e) => setProfile({ ...profile, skills: e.target.value })}
                                    className="bg-black/20 text-white border-purple-500/30"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="education" className="text-gray-300 block">Education</label>
                                <Input
                                    id="education"
                                    value={profile.education}
                                    onChange={(e) => setProfile({ ...profile, education: e.target.value })}
                                    className="bg-black/20 text-white border-purple-500/30"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="resume" className="text-gray-300 block">Resume</label>
                                <Input
                                    id="resume"
                                    type="url"
                                    value={profile.resume}
                                    onChange={(e) => setProfile({ ...profile, resume: e.target.value })}
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
                                    onClick={handleSave}
                                    className="bg-purple-500/90 text-white hover:bg-purple-500 transition-colors"
                                >
                                    Save
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-300">Name:</span>
                                <span className="text-white font-medium">{profile.name}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-300">Email:</span>
                                <span className="text-white font-medium">{profile.email}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-300">Major:</span>
                                <span className="text-white font-medium">{profile