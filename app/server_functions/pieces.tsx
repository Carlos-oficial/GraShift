'use server';

import mongoClient from '@/lib/mongodb';

export async function fetchPieces() {
    const client = await mongoClient.connect();
    try {
        const database = client.db('Alfaiate'); // Replace 'alfaiate' with your database name
        const collection = database.collection('pieces'); // Replace 'pieces' with your collection name

        const pieces = await collection.find({}).toArray();
        const formattedPieces = pieces.map(piece => ({
            ...piece,
            _id: piece._id.toString(), // Convert ObjectId to string
        }));
        return formattedPieces;
    } catch (error) {
        console.error('Failed to fetch pieces from MongoDB:', error);
        throw error;
    } finally {
        await client.close();
    }
}