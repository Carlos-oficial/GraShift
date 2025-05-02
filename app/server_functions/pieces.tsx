'use server';

import mongoClient from '@/lib/mongodb';

// Define the Piece type
export interface Piece {
    _id: string;
    name: string | null | undefined;
    category: string | null | undefined;
    color: string[] | null | undefined;
    description: string | null | undefined;
    imageUrl: string;
    material: string | null | undefined;
    [key: string]: any | null | undefined; // Adjust this to match the actual structure of your pieces
}

export async function fetchPieces(): Promise<Piece[]> {
    const client = await mongoClient.connect();
    try {
        const database = client.db('Alfaiate'); // Replace 'alfaiate' with your database name
        const collection = database.collection('pieces'); // Replace 'pieces' with your collection name

        const pieces = await collection.find({}).toArray(); // Fetch all pieces
        const formattedPieces = pieces.map(piece => ({
            ...piece,
            _id: piece._id.toString(), // Convert ObjectId to string
        })) as Piece[];
        return formattedPieces;
    } catch (error) {
        console.error('Failed to fetch pieces from MongoDB:', error);
        throw error;
    } finally {
        await client.close();
    }
}