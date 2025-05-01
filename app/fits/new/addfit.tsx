'use server'

import clientPromise from '@/lib/mongodb'; // Adjust the path based on your project structure
const fs = require('fs');
const path = require('path');

export async function create(newOutfit: FormData) {
    console.log("Creating outfit:", newOutfit);
    const client = await clientPromise;

    const db = client.db("Alfaiate");
    const collection = db.collection("Fits");
    const outfitData = Object.fromEntries(newOutfit.entries());
    const imageFile = newOutfit.get('image') as File;

    if (imageFile) {

        const imageFolderPath = path.join(process.cwd(), 'public', 'uploads');
        if (!fs.existsSync(imageFolderPath)) {
            fs.mkdirSync(imageFolderPath, { recursive: true });
        }

        const imagePath = path.join(imageFolderPath, imageFile.name);
        const imageBuffer = Buffer.from(await imageFile.arrayBuffer());
        fs.writeFileSync(imagePath, imageBuffer);

        outfitData.imagePath = `/uploads/${imageFile.name}`;
    }
    const result = await collection.insertOne(newOutfit);

    if (!result.acknowledged) {
        throw new Error('Failed to create outfit');
    }

    return newOutfit;
}