'use client'

import ClothingGraph, { ClothingNode } from "./graph";
export const sampleGraphData = {
  nodes: [
    {
      id: 'fleece',
      type: 'clothing',
      name: 'Green Fleece',
      image: '/uploads/jacket.jpg'
    },
    {
      id: 'black_pants',
      type: 'clothing',
      name: 'Black Pants',
      image: '/uploads/pants.jpg'
    },
    {
      id: 'brown_pants',
      type: 'clothing',
      name: 'brown Pants',
      image: '/uploads/brown_pants.jpg'
    },
    {
      id: 'pecoat',
      type: 'clothing',
      name: 'Beije Pecoat',
      image: '/uploads/pecoat.jpg'
    },







    {
      id: 'outfit_1',
      type: 'outfit',
      name: 'Outfit 1',
      image: '/uploads/fit1.jpg'
    },
    {
      id: 'outfit_2',
      type: 'outfit',
      name: 'Outfit 2',
      image: '/uploads/fit2.jpg'
    },
    {
      id: 'outfit_3',
      type: 'outfit',
      name: 'Outfit 3',
      image: '/uploads/fit3.jpg'
    },
    {
      id: 'outfit_4',
      type: 'outfit',
      name: 'Outfit 4',
      image: '/uploads/fit4.jpg'
    },
    {
      id: 'outfit_5',
      type: 'outfit',
      name: 'Outfit 5',
      image: '/uploads/fit5.jpg'
    },
    {
      id: 'outfit_6',
      type: 'outfit',
      name: 'Outfit 6',
      image: '/uploads/fit6.jpg'
    },
    {
      id: 'outfit_7',
      type: 'outfit',
      name: 'Outfit 7',
      image: '/uploads/fit7.jpg'
    },
    {
      id: 'outfit_8',
      type: 'outfit',
      name: 'Outfit 8',
      image: '/uploads/fit8.jpg'
    }
  ] as ClothingNode[],
  links: [
    { source: 'fleece', target: 'outfit_8' },
    { source: 'brown_pants', target: 'outfit_8' },
    { source: 'black_pants', target: 'outfit_1' },
    { source: 'black_pants', target: 'outfit_3' },
    { source: 'black_pants', target: 'outfit_4' },
    { source: 'black_pants', target: 'outfit_5' },
    { source: 'black_pants', target: 'outfit_6' },
    { source: 'brown_pants', target: 'outfit_7' },
    { source: 'pecoat', target: 'outfit_1' },
    { source: 'pecoat', target: 'outfit_3' }

  ]
  };

export  default function GraphView() {
  
    const handleClothingClick = (id : String) => {
      console.log('Show outfits with:', id);
      // Maybe open a drawer or modal here
    };

    return (
  
      <div className="fixed overflow-visible">
          < ClothingGraph data={sampleGraphData }  />
      </div>
    );
  }//onClothingClick={handleClothingClick}