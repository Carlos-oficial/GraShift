import Image from "next/image";
import clientPromise from "@/lib/mongodb";

export  default async function Home() {
  const client = await clientPromise;

  const db = client.db("Alfaiate");

  const fits = await db

      .collection("Fits")

      .find({})

      .toArray();
  return (
      <p>{JSON.stringify(fits)}</p>
  );
}
