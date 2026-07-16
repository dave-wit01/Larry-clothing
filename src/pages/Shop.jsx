export default function Shop() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-primary mb-8">Shop Our Collection</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((product) => (
          <div key={product} className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition">
            <div className="bg-gray-200 h-64"></div>
            <div className="p-4">
              <h3 className="font-semibold text-primary">Product {product}</h3>
              <p className="text-secondary font-bold">$49.99</p>
              <button className="w-full mt-4 bg-primary text-white py-2 rounded hover:bg-accent transition">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
