import React from "react";

export default function LeatherGoodsGrid() {
  const items = [
    { label: "Women's", img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=600&fit=crop" },
    { label: "Women's", img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=600&fit=crop" },
    { label: "Women's", img: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&h=600&fit=crop" },
    { label: "Women's", img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&h=600&fit=crop" },
  ];

  return (
    <>
      <div className="max-w-4xl mx-auto px-6 pt-8 pb-6 text-center">
        <p className="text-sm md:text-base text-gray-600 mb-2">Women</p>
        <h2 className="text-2xl md:text-4xl font-normal">Iconic Leather Goods</h2>
      </div>

      <div className="max-w-4xl mx-auto px-6">
        <div className="grid grid-cols-2 gap-4 md:gap-6">
          {items.map((item, idx) => (
            <div key={idx} className="flex flex-col">
              <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
                <img
                  src={item.img}
                  alt={item.label}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <p className="mt-3 text-sm md:text-base text-gray-800 text-center">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 pt-8 pb-6">
        <button className="w-full bg-gray-200 hover:bg-gray-300 transition-colors rounded-full py-4 px-6 text-base md:text-lg text-gray-800 text-left">
          Discover the Collection...
        </button>
      </div>

      <div className="flex justify-center gap-1.5 pb-10">
        {[...Array(6)].map((_, i) => (
          <span
            key={i}
            className={`w-1.5 h-1.5 rounded-full ${i === 0 ? "bg-black" : "bg-gray-300"}`}
          />
        ))}
      </div>
    </>
  );
}