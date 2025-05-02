'use server';

import mongoClient from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { Piece } from './pieces';


export interface Fit {
    _id: string;
    name: string;
    note: string;
}

export async function fetchFits() {
    const client = await mongoClient.connect();
    try {
        const database = client.db('Alfaiate'); // Replace 'alfaiate' with your database name
        const collection = database.collection('fits'); // Replace 'fits' with your collection name

        const fits = await collection.find({}).toArray();
        const formattedFits = fits.map(fit => ({
            ...fit,
            _id: fit._id.toString(), // Convert ObjectId to string
        } as Fit));
        return formattedFits;
    } catch (error) {
        console.error('Failed to fetch fits from MongoDB:', error);
        throw error;
    } finally {
        await client.close();
    }
}

export async function fetchFit(id: string) {
    const client = await mongoClient.connect();
    try {
        const database = client.db('Alfaiate'); // Replace 'alfaiate' with your database name
        const collection = database.collection('fits'); // Replace 'fits' with your collection name
        const piecesCollection = database.collection('pieces'); // Replace 'pieces' with your pieces collection name
        const fit = await collection.findOne({ _id: new ObjectId(id) });
        if (!fit) {
            throw new Error('No fit found with the provided id');
        }

        // Fetch pieces based on the list of ids in the fit
        const pieces = await piecesCollection
            .find({ _id: { $in: fit.pieces.map((pieceId: string) => new ObjectId(pieceId)) } })
            .toArray();

        return {
            ...fit,
            _id: fit._id.toString(), // Convert ObjectId to string
            pieces: pieces.map(piece => ({
                ...piece,
                _id: piece._id.toString(), // Convert ObjectId to string
            } as Piece)),
        } as Fit & { pieces: any[] }; // Adjust the type as needed
    } catch (error) {
        console.error('Failed to fetch fit and pieces from MongoDB:', error);
        throw error;
    } finally {
        await client.close();
    }
}