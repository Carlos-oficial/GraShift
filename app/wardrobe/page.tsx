'use client';
import React, { useEffect, useState } from 'react';
import { fetchPieces } from '../server_functions/pieces';

const WardrobePage = () => {
    const [pieces, setPieces] = useState<any>([]);

    useEffect(() => {
        fetchPieces().then((data) => {
            setPieces(data);
        }).catch((error) => {
            console.error('Error fetching pieces:', error);
        });
        
        
    }, []);

    return (
        <div>
            <h1>Wardrobe Page</h1>
            <p>Welcome to the wardrobe section of the app.</p>
            <ul>
                {pieces.map((piece: any) => (
                    <li key={piece._id}>
                        <h2>{JSON.stringify(piece)}</h2>
                        <h2>{piece.name}</h2>
                        {piece.pictureUrl && (
                            <img
                                src={piece.pictureUrl}
                                alt={piece.name}
                                style={{ width: '200px', height: 'auto' }}
                            />
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default WardrobePage;
