"use client";
import React from 'react';
import Link from 'next/link';
import { WbSunny as WbSunnyIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material';

const FitCheckDetails: React.FC = () => {
    // Example data
    const fitCheck = {
        image: '/uploads/jacket.jpg',
        title: 'Casual Summer Outfit',
        date: '2023-03-15',
        weather: 'Sunny',
        clothes: ['White T-Shirt', 'Blue Jeans', 'Sneakers', 'Sunglasses'],
    };

    return (
        <div className="p-4">
            {/* Back Button */}
            <Link href="/diary" passHref>
                <button className="p-2">
                    <ArrowBackIcon />
                </button>
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                {/* Image Section */}
                <div>
                    <img
                        src={fitCheck.image}
                        alt={fitCheck.title}
                        className="w-full aspect-[4/5] object-cover"
                    />
                </div>

                {/* Details Section */}
                <div>
                    {/* Title and Date */}
                    <h1 className="text-xl font-bold">{fitCheck.title}</h1>
                    <p className="text-sm text-gray-500">{fitCheck.date}</p>

                    {/* Weather */}
                    <div className="flex items-center mt-2">
                        <WbSunnyIcon className="mr-2" />
                        <p>{fitCheck.weather}</p>
                    </div>

                    {/* Clothes List */}
                    <h2 className="text-lg font-semibold mt-4">Outfit Details</h2>
                    <ul className="list-none mt-2">
                        {fitCheck.clothes.map((item, index) => (
                            <li key={index} className="py-1">
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default FitCheckDetails;
