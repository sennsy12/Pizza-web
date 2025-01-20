import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaPhone, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const Footer = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    window.scrollTo(0, 0);
    navigate(path);
  };

  return (
    <footer className="bg-gradient-to-r from-[#943E3C]/90 to-[#4A5D4F]/90 backdrop-blur-sm text-[#F5F5F5] mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

           {/* Pizzaroma */}
          <div className="px-4">
            <h5 className="text-xl font-semibold mb-4 text-[#F5F5F5]">Pizzaroma</h5>
              <p className="text-[#F5F5F5]/90 mb-4">Authentic Italian pizza made with passion since 1995. Our commitment to quality ingredients and traditional recipes makes every slice special.</p>
                <div className="flex space-x-3 mt-3">
                 <a href="https://facebook.com" className="text-[#F5F5F5]/90 hover:text-[#F5F5F5] transition-colors" target="_blank" rel="noopener noreferrer">
                    <FaFacebookF size={20} />
                    </a>
                <a href="https://instagram.com" className="text-[#F5F5F5]/90 hover:text-[#F5F5F5] transition-colors" target="_blank" rel="noopener noreferrer">
                    <FaInstagram size={20} />
                    </a>
                </div>
           </div>

         {/* Quick Links */}
          <div className="px-4">
            <h5 className="text-xl font-semibold mb-4 text-[#F5F5F5]">Quick Links</h5>
            <ul className="list-none">
              <li className="mb-2"><button onClick={() => handleNavigation('/menu')} className="text-[#F5F5F5]/90 hover:text-[#F5F5F5] transition-colors no-underline">Our Menu</button></li>
              <li className="mb-2"><button onClick={() => handleNavigation('/reservation')} className="text-[#F5F5F5]/90 hover:text-[#F5F5F5] transition-colors no-underline">Book a Table</button></li>
              <li className="mb-2"><button onClick={() => handleNavigation('/takeaway')} className="text-[#F5F5F5]/90 hover:text-[#F5F5F5] transition-colors no-underline">Order Takeaway</button></li>
              <li className="mb-2"><button onClick={() => handleNavigation('/about')} className="text-[#F5F5F5]/90 hover:text-[#F5F5F5] transition-colors no-underline">About Us</button></li>
            </ul>
          </div>

            {/* Opening Hours */}
          <div className="px-4">
              <h5 className="text-xl font-semibold mb-4 text-[#F5F5F5]">Opening Hours</h5>
               <ul className="list-none text-[#F5F5F5]/90">
                  <li className="flex items-center mb-2">
                  <FaClock className="mr-2"/>Mon - Thu: 11:00 - 22:00
                  </li>
                    <li className="flex items-center mb-2">
                  <FaClock className="mr-2"/>Fri - Sat: 11:00 - 23:00
                    </li>
                    <li className="flex items-center mb-2">
                    <FaClock className="mr-2" />Sunday: 12:00 - 22:00
                 </li>
                 </ul>
            </div>

            {/* Contact Us */}
            <div className="px-4">
            <h5 className="text-xl font-semibold mb-4 text-[#F5F5F5]">Contact Us</h5>
            <ul className="list-none text-[#F5F5F5]/90">
                <li className="flex items-center mb-2">
                 <FaPhone className="mr-2"/>
                    <a href="tel:+441234567890" className="text-[#F5F5F5]/90 hover:text-[#F5F5F5] no-underline transition-colors">+44 123 456 7890</a>
                 </li>
                   <li className="flex items-center mb-2">
                    <FaMapMarkerAlt className="mr-2" />
                   123 Pizza Street, London, UK
                   </li>
              </ul>
           </div>

        </div>
      </div>

        <div className="bg-gradient-to-r from-[#943E3C]/95 to-[#4A5D4F]/95 py-4">
        <div className="container mx-auto px-4">
          <div className="text-center">
          <span className="text-sm text-[#F5F5F5]/90">© {new Date().getFullYear()} Pizzaroma. All rights reserved.</span>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;