import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import pizzaromaLogo from './pizzaromaLogo.png';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener('scroll', handleScroll);
    return () => document.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const handleNavigation = (path) => {
    window.scrollTo(0, 0);
    navigate(path);
    setIsOpen(false);
  };

  return (
    <nav className={`bg-gradient-to-r from-[#943E3C]/90 to-[#4A5D4F]/90 backdrop-blur-sm fixed w-full z-50 ${
      scrolled ? 'shadow-lg' : ''
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <button onClick={() => handleNavigation('/home')} className="flex items-center">
              <img
                src={pizzaromaLogo}
                alt="Pizzaroma Logo"
                className="h-10 w-10 object-contain"
              />
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {['Home', 'Menu', 'Reservation', 'Takeaway'].map((item) => (
              <motion.div
                key={item}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <button
                  onClick={() => handleNavigation(`/${item.toLowerCase()}`)}
                  className="text-[#F5F5F5] hover:bg-[#943E3C]/70 px-3 py-2 rounded-full text-sm font-medium transition-colors duration-200"
                >
                  {item}
                </button>
              </motion.div>
            ))}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <button
                onClick={() => handleNavigation('/login')}
                className="text-[#F5F5F5] hover:bg-[#943E3C]/70 px-3 py-2 rounded-full text-sm font-medium transition-colors duration-200"
              >
                Login
              </button>
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-[#F5F5F5] hover:bg-[#943E3C]/70 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden bg-gradient-to-r from-[#943E3C]/90 to-[#4A5D4F]/90`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          {['Home', 'Menu', 'Reservation', 'Takeaway'].map((item) => (
            <button
              key={item}
              onClick={() => handleNavigation(`/${item.toLowerCase()}`)}
              className="text-[#F5F5F5] hover:bg-[#943E3C]/70 block w-full text-left px-3 py-2 rounded-md text-base font-medium"
            >
              {item}
            </button>
          ))}
          <button
            onClick={() => handleNavigation('/login')}
            className="text-[#F5F5F5] hover:bg-[#943E3C]/70 block w-full text-left px-3 py-2 rounded-md text-base font-medium"
          >
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;