import React, { useState, useEffect } from 'react';

const FlipDigit = ({ digit }) => {
    const [flip, setFlip] = useState(false);
    const [nextDigit, setNextDigit] = useState(1);

    useEffect(() => {
        setFlip(true);
        const timer = setTimeout(() =>{
            setNextDigit((nextDigit + 1) % 10);
            setFlip(false)}, 500);
        return () => clearTimeout(timer);
    }, [nextDigit]);

    return (
        <div className="relative w-24 h-32 bg-green-200 rounded-lg overflow-hidden">
            <div className={`absolute w-full h-full transition-all duration-500 ${flip ? 'top-0' : '-top-full'}`}>
                <div className="absolute w-full h-full bg-green-200 flex items-center justify-center text-6xl font-bold text-slate-700">
                    {digit}
                </div>
            </div>
            <div className={`absolute w-full h-full transition-all duration-500 ${flip ? 'top-full' : 'top-0'}`}>
                <div className="absolute w-full h-full bg-green-200 flex items-center justify-center text-6xl font-bold text-slate-700">
                    {nextDigit}
                </div>
            </div>
        </div>
    );
};

export default FlipDigit;

