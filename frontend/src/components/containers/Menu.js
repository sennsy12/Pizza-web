import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPizzaSlice, FaGlassWhiskey, FaHamburger, FaUtensils, FaIceCream, FaListAlt } from 'react-icons/fa';
import { fetchMenuItems } from '../handlers/menuHandler';

const MenuItem = ({ item }) => (
  <div className="rounded-xl shadow-md overflow-hidden bg-white">
    <img
      src={`${item.img}.png`}
      alt={item.name}
      className="w-full h-48 sm:h-56 object-cover object-center"
    />
    <div className="p-4">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
          {item.tags && item.tags.length > 0 && (
            <span className="inline-block bg-gray-200 text-gray-700 text-xs rounded-full px-2 py-1 mt-1">
              {item.tags[0]} {/* Assuming the first tag is the primary one */}
            </span>
          )}
        </div>
        <span className="text-lg font-semibold text-primary-600">${item.price}</span>
      </div>
      <p className="text-gray-600 text-sm">{item.description}</p>
    </div>
  </div>
);

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = ['All', 'Appetizers', 'Pizza', 'Hamburgers', 'Desserts', 'Beverages'];

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const items = await fetchMenuItems();
        setMenuItems(items);
      } catch (err) {
        console.error('Error fetching menu items:', err);
        setError('Failed to load menu items');
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  const filteredItems = activeCategory === 'All'
    ? menuItems
    : menuItems.filter(item => item.category === activeCategory);

  const icons = {
    All: <FaListAlt className="mr-2" />,
    Appetizers: <FaUtensils className="mr-2" />,
    Pizza: <FaPizzaSlice className="mr-2" />,
    Hamburgers: <FaHamburger className="mr-2" />,
    Desserts: <FaIceCream className="mr-2" />,
    Beverages: <FaGlassWhiskey className="mr-2" />,
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading menu...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800">Our Delicious Menu</h1>
          <div className="hidden md:flex space-x-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 ${
                  activeCategory === category ? 'bg-primary-100 text-primary-700 font-semibold' : ''
                } flex items-center text-sm sm:text-base`}
              >
                {icons[category]}
                <span>{category}</span>
              </button>
            ))}
          </div>
          <div className="md:hidden">
            <select
              className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline text-sm"
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </nav>

      <div className="container mx-auto mt-6 px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">{activeCategory}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredItems.map((item) => (
                <MenuItem key={item.id} item={item} />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Menu;