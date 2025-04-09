import React from 'react';
import { HomePage } from './HomePage';
import { SettingsPage } from './SettingsPage';
import { ApplicationStatus } from './ApplicationStatus';
import { InternshipManagement } from './InternshipManagement';

export const InternshipMatchingPlatform: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
            <HomePage />
            <SettingsPage />
            <ApplicationStatus />
            <InternshipManagement />
        </div>
    );
}; 