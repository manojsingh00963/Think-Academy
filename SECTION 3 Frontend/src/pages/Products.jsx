import { useProducts } from '../context/ProductContext';
import { FaSearch, FaPlus, FaSync } from 'react-icons/fa';

const Products = () => {
  const { products, loadMore, searchProducts, search, loading } = useProducts();

  return (
    <div className="p-4 bg-blue-100 max-w-6xl min-h-screen mx-auto">
      {/* Search Bar */}
      <div className="flex w-[40%] items-center mb-4 border rounded-md p-2 shadow-md">
        <FaSearch className="text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => searchProducts(e.target.value)}
          className="w-full p-2 outline-none"
        />
            </div>
        {loading ? (
          <FaSync className=" animate-spin text-blue-500" />
        ) : (
          <button
            onClick={loadMore}
            className=" bg-blue-900 cursor-pointer hover:bg-blue-700 text-white py-2 px-4 rounded-md flex items-center"
          >
            <FaPlus className="mr-2" /> Load More
          </button>
        )}

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product._id} className="border rounded-lg p-4 shadow-md">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover rounded-md mb-2"
            />
            <h3 className="font-semibold">{product.name}</h3>
            <p className="text-gray-600">{product.description}</p>
            <p className="font-bold text-blue-500">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
