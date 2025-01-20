import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MenuItem = ({ item }) => (
  <div className="rounded-lg shadow-md overflow-hidden bg-white">
    <img
      src={`${item.img}.png`}
      alt={item.name}
      className="w-full h-48 object-cover object-center"
    />
    <div className="p-4">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
          {item.tags && item.tags.length > 0 && (
            <span className="inline-block bg-gray-200 text-gray-700 text-xs rounded-full px-2 py-1 mt-1">
              {item.tags[0]}
            </span>
          )}
        </div>
        <span className="text-lg font-semibold text-primary-600">${item.price}</span>
      </div>
      <p className="text-gray-600 text-sm">{item.description}</p>
    </div>
  </div>
);

const MenuSection = ({ title, items }) => (
  <section className="mb-12">
     <h2 className="text-3xl font-serif text-dark-700 mb-4 text-center relative after:content-[''] after:block after:w-20 after:h-1 after:mx-auto after:bg-red-500 after:mt-2">
        {title}
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <MenuItem key={item.id} item={item} />
      ))}
    </div>
  </section>
);


const FeatureSection = () => {

  const signatureItems = {
     pizzas: [
      {
        id: 1,
        name: "Margherita Pizza",
        description: "Classic pizza with tomatoes, mozzarella, and basil.",
        price: 8.99,
          img: 'margherita-pizza',
           tags: ["Classic"],

      },
      {
         id: 2,
        name: "Pepperoni Pizza",
        description: "Pizza topped with pepperoni and cheese.",
        price: 9.49,
            img: 'pepperoni-pizza',
          tags: ["Classic"],
      },
      {
        id: 3,
        name: "Cheese Pizza",
        description: "Classic cheese pizza with a golden crust.",
        price: 7.99,
          img: 'cheese-pizza',
          tags: ["Classic"],
      },
    ],
     sides: [
        {
          id: 4,
          name: "Mozzarella Sticks",
          description: "Crispy fried mozzarella with marinara sauce.",
           price: 5.99,
              img: 'mozzarella-sticks',
           tags: ["Appetizers"],

        },
          {
            id: 5,
            name: "Garlic Bread",
             description: "Toasted bread with garlic butter and herbs.",
             price: 3.99,
                 img: 'garlic-bread',
                 tags: ["Appetizers"],
          },
       {
         id: 6,
          name: "Chicken Wings",
            description: "Spicy buffalo chicken wings with ranch dressing.",
              price: 7.99,
               img: 'chicken-wings',
             tags: ["Appetizers"],

       },
     ],
       desserts: [
        {
          id: 7,
          name: "Pudding",
             description: "Pudding med karamel.",
               price: 5.00,
                 img: 'pudding',
               tags: ["Desserts"],
        },
          {
            id: 8,
            name: "Chocolate Cake",
            description: "Rich and moist chocolate layer cake.",
            price: 4.99,
              img: 'chocolate-cake',
                tags: ["Desserts"],
          },
           {
            id: 9,
             name: "Ice Cream Sundae",
                description: "Vanilla ice cream with chocolate sauce and nuts.",
                price: 3.99,
                   img: 'ice-cream-sundae',
                 tags: ["Desserts"],
           }
     ]

  };


  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <MenuSection title="Our Signature Pizzas" items={signatureItems.pizzas} />
            <MenuSection title="Appetizers" items={signatureItems.sides} />
            <MenuSection title="Desserts" items={signatureItems.desserts} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FeatureSection;