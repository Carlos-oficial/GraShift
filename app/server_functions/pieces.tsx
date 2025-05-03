'use server';

import mongoClient from '@/lib/mongodb';
import { FitCheckData } from '../(default)/fits/new/add_fit_check';

// Define the Piece type
export interface Piece {
    _id: string;
    name: string | null | undefined;
    category: string | null | undefined;
    colors: string[] | null | undefined;
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

export async function FitchecksByPiece(id: string): Promise<FitCheckData[] | null> {
    const client = await mongoClient.connect();
    try {
        const database = client.db('Alfaiate'); // Replace 'alfaiate' with your database name
        const collection = database.collection('fit_checks'); // Replace 'pieces' with your collection name

        const fitChecks = await collection.find({ pieces: { $in: [id] } }); // Find fit checks where the piece id is in its piece list


        const fitChecksArray = await fitChecks.toArray(); // Convert the cursor to an array
        const formattedFitChecks = fitChecksArray.map(fitCheck => ({
            ...fitCheck,
            _id: fitCheck._id.toString(), // Convert ObjectId to string
            note: fitCheck.note, // Map the 'note' field
            image: fitCheck.image, // Map the 'image' field
            ocasion: fitCheck.ocasion, // Map the 'ocasion' field
            weather: fitCheck.weather, // Map the 'weather' field
        }));
        return formattedFitChecks; // Ensure the returned data has the correct type

    } catch (error) {
        console.error('Failed to fetch pieces from MongoDB:', error);
        throw error;
    } finally {
        await client.close();
    }
} 