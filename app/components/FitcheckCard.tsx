import React from 'react';
import Link from 'next/link';

interface FitcheckCardProps {
    imageUrl: string;
    title: string;
    time: string;
}

const FitcheckCard: React.FC<FitcheckCardProps> = ({ imageUrl, title, time }) => {
    return (
        <div>
            <div className="flex flex-col items-center p-4 w-full max-w-xs sm:max-w-sm md:max-w-md hover:opacity-80 lg:max-w-lg cursor-pointer">
                <div className="w-full aspect-[4/5] overflow-hidden">
                    <img
                        src={imageUrl}
                        alt={title}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="flex justify-between items-center w-full mt-4">
                    <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
                    <span className="text-sm text-gray-500">{time}</span>
                </div>
            </div>
        </div>
    );
};

export default FitcheckCard;
