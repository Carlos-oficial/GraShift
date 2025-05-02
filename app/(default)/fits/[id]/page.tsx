'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Piece } from '@/app/server_functions/pieces';
import { fetchFit } from '@/app/server_functions/fits';

interface Fit {
    id: string;
    name: string;
    note: string;
    pieces: Piece[]; // Add pieces field
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

        const _fetchFit = async () => {
            try {
                const data = await fetchFit(id as string);
                setFit(data);
                return data;
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        _fetchFit()
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
                        <li key={pieceId._id}>{pieceId.name}</li>
                    ))}
                </ul>
            ) : (
                <p>No pieces available</p>
            )}
            <button onClick={() => { }}>Repeat this outfit</button>
        </div>
    );
}