"use client";

import ClothingGraph from "./graph";

export const sampleGraphData = {
    nodes: [
      {
        id: 'shirt_1',
        type: 'clothing',
        name: 'White Shirt',
        image: '/uploads/jacket.jpg'
      },
      {
        id: 'jeans_1',
        type: 'clothing',
        name: 'Blue Jeans',
        image: '/uploads/pants.jpg'
      },
      {
        id: 'outfit_1',
        type: 'outfit',
        name: 'Outfit 1'
      }
    ],
    links: [
      { source: 'shirt_1', target: 'outfit_1' },
      { source: 'jeans_1', target: 'outfit_1' }
    ]
  };

export  default function GraphView() {
  
    const handleClothingClick = (id : String) => {
      console.log('Show outfits with:', id);
      // Maybe open a drawer or modal here
    };

    return (
  
      <div className="fixed overflow-visible">
          < ClothingGraph data={sampleGraphData} onClothingClick={handleClothingClick} />
      </div>
    );
  }