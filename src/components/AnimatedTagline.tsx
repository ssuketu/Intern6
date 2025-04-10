// src/components/AnimatedTagline.tsx
import * as React from 'react';

export const AnimatedTagline = () => {
    const [tagline, setTagline] = React.useState('');
    const [index, setIndex] = React.useState(0);
    const phrases = [
        'Connecting Students with Opportunities',
        'Find Your Perfect Internship',
        'Launch Your Career Here',
        'Your Future Starts Now',
    ];
    const typingSpeed = 50;
    const pauseDuration = 1500;

    React.useEffect(() => {
        let currentPhrase = phrases[index];
        let i = 0;
        let isTyping = true;
        let timeoutId: number;

        const type = () => {
            if (isTyping) {
                setTagline(currentPhrase.substring(0, i + 1));
                i++;
                if (i > currentPhrase.length) {
                    isTyping = false;
                    timeoutId = window.setTimeout(erase, pauseDuration);
                } else {
                    timeoutId = window.setTimeout(type, typingSpeed);
                }
            }
        };

        const erase = () => {
            setTagline(currentPhrase.substring(0, i - 1));
            i--;
            if (i < 0) {
                isTyping = true;
                setIndex((prevIndex) => (prevIndex + 1) % phrases.length);
                timeoutId = window.setTimeout(type, typingSpeed);
            } else {
                timeoutId = window.setTimeout(erase, typingSpeed / 2);
            }
        };

        timeoutId = window.setTimeout(type, typingSpeed);

        return () => {
            if (timeoutId) {
                window.clearTimeout(timeoutId);
            }
        };
    }, [index, phrases]);

    return (
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            {tagline}
        </h1>
    );
};