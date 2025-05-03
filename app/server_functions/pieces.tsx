'use server';

import mongoClient from '@/lib/mongodb';
import { FitCheckData } from '../(default)/fits/new/add_fit_check';
import FitCheck, { IFitCheck } from '@/models/fit_check';

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

export async function FitchecksByPiece(id: string): Promise<(IFitCheck & { _id: string })[] | null> {
    return FitCheck.find({ pieces: { $in: [id] } }).exec();
    
}



//server function that creates a new piece with id
async function createPiece(piece: Omit<Piece, '_id'>): Promise<Piece> {
    const client = await mongoClient.connect();
    try {
        const database = client.db('Alfaiate'); // Replace 'alfaiate' with your database name
        const collection = database.collection('pieces'); // Replace 'pieces' with your collection name

        const result = await collection.insertOne(piece);
        if (!result.acknowledged) {
            throw new Error('Failed to create a new piece');
        }

        return {
            _id: result.insertedId.toString(), // Convert ObjectId to string
            name: piece.name || null,
            category: piece.category || null,
            colors: [piece.color],
            description: piece.description || null,
            imageUrl: piece.imageUrl,
            material: piece.material || null,
            ...piece, // Include any additional properties
        };
    } catch (error) {
        console.error('Failed to create a new piece in MongoDB:', error);
        throw error;
    } finally {
        await client.close();
    }
}

