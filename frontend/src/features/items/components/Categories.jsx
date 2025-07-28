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
        <div className="border border-stroke-weak rounded-xl px-5 py-2 flex items-start" key={item.name}>
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