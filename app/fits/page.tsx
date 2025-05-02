'use client';

import React, { useEffect } from 'react';
import { fetchFits, Fit } from '../server_functions/fits';



const FitsPage = () => {


    const [fits, setFits] = React.useState<Fit[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    useEffect(() => {
        const _fetchFits = async () => {
            try {
                const data = await fetchFits()
                setFits(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        _fetchFits();
    }, []);

    return (
        <div>
            <h1>All Fits</h1>
            <ul>
                {fits.map((fit) => (
                    <a href={`/fit/${fit._id}`} key={fit._id}>

                        <li>
                            <h2>{fit.name}</h2>
                            <p>{fit.description}</p>
                        </li>
                    </a>

                ))}
            </ul>
        </div>
    );
};

export default FitsPage;