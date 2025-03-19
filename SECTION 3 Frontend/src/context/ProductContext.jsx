import { createContext, useContext, useState, useEffect } from 'react';
import axios from '../utils/axiosInstance';

const ProductContext = createContext();

// Custom Hook
export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Fetch Products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/products?page=${page}&search=${search}`);
        setProducts((prev) => (page === 1 ? res.data : [...prev, ...res.data]));
      } catch (err) {
        console.error('Error fetching products:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, search]);

  //  Load More Products
  const loadMore = () => setPage((prev) => prev + 1);

  //  Search Products
  const searchProducts = (value) => {
    setSearch(value);
    setPage(1); 
  };

  return (
    <ProductContext.Provider value={{ products, loadMore, searchProducts, search, loading }}>
      {children}
    </ProductContext.Provider>
  );
};
