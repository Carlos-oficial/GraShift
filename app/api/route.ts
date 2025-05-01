import clientPromise from "../../lib/mongodb";

import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {

    try {

        const client = await clientPromise;

        const db = client.db("Alfaiate");

        const fits = await db

            .collection("Fits")

            .find({})

            .toArray();

        res.json("fits");

    } catch (e) {

        console.error(e);

    }

}

