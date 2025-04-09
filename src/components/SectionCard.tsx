// src/components/SectionCard.tsx
import React from 'react';
import { Card } from '@/components/ui';

interface SectionCardProps {
    children: React.ReactNode;
}

export const SectionCard: React.FC<SectionCardProps> = ({ children }) => (
    <Card className="bg-white/5 backdrop-blur-md rounded-xl shadow-lg border border-white/10">
        {children}
    </Card>
);