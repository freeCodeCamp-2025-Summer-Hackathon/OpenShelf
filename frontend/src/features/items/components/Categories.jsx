import React from 'react';

function Categories() {
  const categories = [
    { name: "Books", icon: "categories-books.png" },
    { name: "Games", icon: "categories-games.png" },
    { name: "Tools", icon: "categories-tools.png" },
    { name: "Outdoors", icon: "categories-outdoors.png" }
  ];
  return (
    <div className="font-semibold text-[22pt] font-display-3xl">
      <span>What do you want to find?</span>
      <CategoryCards categories={categories} />
    </div>
  );
}

function CategoryCards({ categories }) {
  return (
    <div className="flex flex-row gap-[25px] overflow-x-scroll mt-[15px] items-start">
      {categories.map((item) => (
        <div className="border border-[#D3D3FF] shadow-[0_0_10px_5px_#D3D3FF] rounded-[8.8px] h-[130px] flex-none basis-[215px] p-[10px_20px] flex items-start" key={item.name}>
          <div className="w-[80px]">
            <span className="m-[0_25px_0_0] p-0 font-display-2xl">{item.name}</span>
          </div>
          <div className="h-[100px] w-[100px] flex items-end justify-end">
            <img src={item.icon}/>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Categories;