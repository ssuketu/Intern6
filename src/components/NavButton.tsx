// src/components/NavButton.tsx
import React from 'react';
import { Button } from '@/components/ui';
import { cn } from '@/lib/utils';

interface NavButtonProps {
    onClick: () => void;
    isActive: boolean;
    children: React.ReactNode;
}

export const NavButton: React.FC<NavButtonProps> = ({ onClick, isActive, children }) => (
    <Button
        onClick={onClick}
        className={cn(
            'text-gray-300 hover:text-white transition-colors',
            isActive ? 'text-white font-semibold' : 'text-gray-300'
        )}
        variant="ghost"
    >
        {children}
    </Button>
);