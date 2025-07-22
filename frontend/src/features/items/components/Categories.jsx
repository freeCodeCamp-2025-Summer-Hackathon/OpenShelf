import React from 'react';

function Categories() {
  const categories = [
    { name: "Books", icon: "frontend\public\categories-books.png" },
    { name: "Games", icon: "frontend\public\categories-games.png" },
    { name: "Tools", icon: "frontend\public\categories-tools.png" },
    { name: "Outdoors", icon: "frontend\public\categories-outdoors.png" }
  ];
  return (
    <div className="font-semibold text-[22pt]">
      <span>What do you want to find?</span>
      <CategoryCards categories={categories} />
    </div>
  );
}

function CategoryCards({ categories }) {
  return (
    <div className="flex flex-row gap-[25px] overflow-x-scroll mt-[15px]">
      {categories.map((item) => (
        <div className="border border-[#D9D9D9] rounded-[8.8px] h-[100px] flex-none basis-[225px] p-[17px_25px] flex items-start" key={item.name}>
          <div className="w-[125px]">
            <span className="m-[0_25px_0_0] p-0">{item.name}</span>
          </div>
          <div className="h-[100px] w-[100px] flex items-end justify-end">
            <img src={item.icon} className="border border-green-500" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Categories;