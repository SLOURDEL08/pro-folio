import React from 'react';

export const MasonryGrid = () => {
  const gridItems = [
    {
      id: 1,
      title: "Card 1",
      size: "row-span-1"
    },
    {
      id: 2,
      title: "Card 2",
      size: "row-span-2"
    },
    {
      id: 3,
      title: "Card 3",
      size: "row-span-4"
    },
    {
      id: 4,
      title: "Card 4",
      size: "row-span-3"
    },
    {
      id: 5,
      title: "Card 5",
      size: "row-span-1"
    },
    {
      id: 6,
      title: "Card 6",
      size: "row-span-1"
    }
  ];

  return (
    <div className="grid grid-cols-3 gap-6 auto-rows-[200px] -mx-24">
      {gridItems.map((item) => (
        <div 
          key={item.id}
          className={`bg-black rounded-2xl p-6 shadow-lg ${item.size}`}
        >
          {item.title}
        </div>
      ))}
    </div>
  );
};

export default MasonryGrid;