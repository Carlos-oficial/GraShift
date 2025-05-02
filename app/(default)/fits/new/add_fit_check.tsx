'use server'

import clientPromise from '@/lib/mongodb'; // Adjust the path based on your project structure
const fs = require('fs');
const path = require('path');

interface weatherData {
    tempmax: number;
    tempmin: number;
    feelslikemax: number;
    feelslikemin: number;
    condition: string;
    note: string;
    icon: string;
    [key: string]: any; // To allow additional properties if needed
}

interface FitCheckData {
    note: string | null | undefined;
    image: File;
    ocasion: string | null | undefined;
    weather: weatherData | null | undefined;
    [key: string]: any; // To allow additional properties if needed
}

export async function create(fitCheck: FitCheckData) {
    console.log("Creating outfit:", fitCheck);
    const client = await clientPromise.connect();

    const db = client.db("Alfaiate");
    const collection = db.collection("fit_checks");
    const imageFile = fitCheck.image;

    if (imageFile) {
        const imageFolderPath = path.join(process.cwd(), 'public', 'uploads');
        if (!fs.existsSync(imageFolderPath)) {
            fs.mkdirSync(imageFolderPath, { recursive: true });
        }

        const imagePath = path.join(imageFolderPath, imageFile.name);
        const imageBuffer = Buffer.from(await imageFile.arrayBuffer());
        fs.writeFileSync(imagePath, imageBuffer);

        fitCheck.imagePath = `/uploads/${imageFile.name}`;
    }
    const result = await collection.insertOne(fitCheck);

    if (!result.acknowledged) {
        throw new Error('Failed to create outfit');
    }

    return fitCheck;
}