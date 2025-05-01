import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import ItemCard from "../components/ItemCard";
import Layout from "../components/layout";

const items = [
    { id: '1', title: 'Jacket', category: "top",imageUrl: '/uploads/jacket.jpg' },
    { id: '2', title: 'Shirt', category: "top",imageUrl: '/uploads/shirt.jpg' },
    { id: '3', title: 'Pants', category: "top",imageUrl: '/uploads/pants.jpg' }
  ];

  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, typeof items>);

export default function Closet() {
    return (    
        <main className="px-4 py-6">
      <Accordion type="multiple" className="w-full">
        {Object.entries(groupedItems).map(([category, categoryItems]) => (
          <AccordionItem key={category} value={category}>
            <AccordionTrigger>{category}</AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-5 mt-2">
                {categoryItems.map((item) => (
                  <ItemCard
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    imageUrl={item.imageUrl}
                  />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </main>
    ) 
    
  }