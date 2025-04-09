// src/components/LoginModal.tsx
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button, Input } from './ui';

interface LoginModalProps {
    onLogin: (email: string) => void;
    onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ onLogin, onClose }) => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLoginClick = () => {
        setIsLoading(true);
        setTimeout(() => {
            onLogin(email);
            setIsLoading(false);
        }, 1000);
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="w-[350px] bg-white/5 backdrop-blur-md shadow-lg border border-white/10">
                <CardHeader>
                    <CardTitle className="text-2xl font-semibold text-white">
                        Login
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                        Enter your email to log in.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <Input
                            type="email"
                            placeholder="you@example.com"
                            className="bg-black/20 text-white border-purple-500/30"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <div className="flex gap-2">
                            <Button
                                onClick={onClose}
                                className="flex-1 bg-gray-500/90 text-white hover:bg-gray-500 transition-colors"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleLoginClick}
                                className="flex-1 bg-purple-500/90 text-white hover:bg-purple-500 transition-colors"
                                disabled={isLoading || !email.trim()}
                            >
                                {isLoading ? 'Logging in...' : 'Login'}
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};