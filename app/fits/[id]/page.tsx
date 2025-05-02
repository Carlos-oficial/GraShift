'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface Fit {
    id: string;
    name: string;
    note: string;
    pieces: string[]; // Add pieces field
    image: string; // Add image field
}

export default function FitPage() {
    const router = useRouter();
    const { id } = router.query;
    const [fit, setFit] = useState<Fit | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        const fetchFit = async () => {
            try {
                const response = await fetch(`/api/fits/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch fit');
                }
                const data: Fit = await response.json();
                setFit(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchFit();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!fit) return <p>No fit found</p>;

    return (
        <div>
            <h1>{fit.name}</h1>
            <p>{fit.note}</p>
            {fit.image && <img src={fit.image} alt={fit.name} />}
            <h2>Pieces</h2>
            {fit.pieces.length > 0 ? (
                <ul>
                    {fit.pieces.map((pieceId) => (
                        <li key={pieceId}>{pieceId}</li>
                    ))}
                </ul>
            ) : (
                <p>No pieces available</p>
            )}
            <button onClick={()=>{}}>Repeat this outfit</button>
        </div>
    );
}