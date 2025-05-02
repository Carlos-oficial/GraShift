import ItemCard from "../components/ItemCard";
import Layout from "../components/layout";

const items = [
    { id: '1', title: 'Jacket', category: "Top",imageUrl: '/uploads/jacket.jpg' },
    { id: '2', title: 'Jacket', category: "Top",imageUrl: '/uploads/jacket.jpg' },
    { id: '3', title: 'Jacket', category: "Top",imageUrl: '/uploads/jacket.jpg' },
    { id: '4', title: 'Jacket', category: "Top",imageUrl: '/uploads/jacket.jpg' },
    { id: '5', title: 'Jacket', category: "Top",imageUrl: '/uploads/jacket.jpg' },
    { id: '6', title: 'Jacket', category: "Top",imageUrl: '/uploads/jacket.jpg' },
    { id: '17', title: 'Jacket', category: "Top",imageUrl: '/uploads/jacket.jpg' },
    { id: '28', title: 'Shirt', category: "Bottom",imageUrl: '/uploads/shirt.jpg' },
    { id: '29', title: 'Shirt', category: "Bottom",imageUrl: '/uploads/shirt.jpg' },
    { id: '20', title: 'Shirt', category: "Bottom",imageUrl: '/uploads/shirt.jpg' },
    { id: '21', title: 'Shirt', category: "Bottom",imageUrl: '/uploads/shirt.jpg' },
    { id: '22', title: 'Shirt', category: "Bottom",imageUrl: '/uploads/shirt.jpg' },
    { id: '33', title: 'Pants', category: "Accessories",imageUrl: '/uploads/pants.jpg' },
    { id: '34', title: 'Pants', category: "Accessories",imageUrl: '/uploads/pants.jpg' },
    { id: '35', title: 'Pants', category: "Accessories",imageUrl: '/uploads/pants.jpg' },
    { id: '36', title: 'Pants', category: "Accessories",imageUrl: '/uploads/pants.jpg' },
    { id: '37', title: 'Pants', category: "Accessories",imageUrl: '/uploads/pants.jpg' },
  ];

  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, typeof items>);
  
  export default function Closet() {
    return (
      <main className="px-4 py-6 space-y-10">
        {Object.entries(groupedItems).map(([category, categoryItems]) => (
          <section key={category}>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">{category}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 gap-5">
              {categoryItems.map((item) => (
                <ItemCard
                  key={item.id}
                  id={item.id}
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