"use client";

import { Button } from "@/app/components/ui/button";
import ItemCard from "@/app/components/ItemCard";
import Layout from "@/app/components/layout";
import { fetchPieces, Piece } from "@/app/server_functions/pieces";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";



export default function Closet() {
  const [items, setItems] = useState<Piece[]>([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const fetchedItems = await fetchPieces();
      setItems(fetchedItems);
    };
    fetchData();
  }, []);

  const handleNew = () => {
    window.location.href = "/closet/new";
  };

  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.category ?? "other"]) acc[item.category ?? "other"] = [];
    acc[item.category ?? "other"].push(item);
    return acc;
  }, {} as Record<string, typeof items>);
  return (
    <main className="px-4 py-6 space-y-10">
      {/* <p>{JSON.stringify(items)}</p> */}
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

      <div className="fixed bottom-20 left-0 right-0 flex justify-center ">
        <Button variant="default" className="py-10 px-10 text-lg rounded-lg hover:scale-105 transition-transform" onClick={handleNew}>
          <Plus className="h-10 w-10" />
        </Button>
      </div>
    </main>
  );
}