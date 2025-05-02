'use server';

import mongoClient from '@/lib/mongodb';


export interface Fit {
    _id: string;
    name: string;
    description: string;
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