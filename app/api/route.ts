import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../../lib/mongodb";

import { NextApiRequest, NextApiResponse } from 'next';

export async function GET(
    req: NextRequest,
    { params }: { params: { page: number } },
) {
    try {

        const client = await clientPromise;

        const db = client.db("Alfaiate");

        const fits = await db

            .collection("Fits")

            .find({})

            .toArray();

        return NextResponse.json(fits)
    } catch (error) {
        return NextResponse.json(
            {
                message: (error as Error).message,
            },

        );
    }
}
