"use client";

import ItemCard from "../components/ItemCard";
import Layout from "../components/layout";
import { fetchPieces, Piece } from "../server_functions/pieces";
import { useEffect, useState } from "react";



export default function Closet() {
  const [items, setItems] = useState<Piece[]>([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const fetchedItems = await fetchPieces();
      setItems(fetchedItems);
    };
    fetchData();
  }, []);

  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.category ?? "other"]) acc[item.category ?? "other"] = [];
    acc[item.category ?? "other"].push(item);
    return acc;
  }, {} as Record<string, typeof items>);
  return (
    <main className="px-4 py-6 space-y-10">
      {Object.entries(groupedItems).map(([category, categoryItems]) => (
        <section key={category}>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">{category}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 gap-5">
            {categoryItems.map((item) => (
              <ItemCard
                key={item._id}
                id={item._id}
                title={item.title}
                imageUrl={item.imageUrl}
              />
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}