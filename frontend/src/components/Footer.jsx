import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-start gap-8">
        
        {/* Branding & Description */}
        <div className="w-full md:w-1/3 flex flex-col gap-4">
          <h1 
            className="font-montserrat text-3xl font-extrabold tracking-tighter cursor-pointer"
            onClick={() => navigate("/")}
          >
            <span className="text-[#ef4444]">Quick</span>
            <span className="text-white">Stay</span>
          </h1>
          <p className="text-gray-400 text-sm leading-relaxed">
            Discover the perfect place to stay, anywhere in the world. Whether you are looking for a cozy cabin or a luxurious villa, QuickStay has you covered.
          </p>
        </div>

        {/* Quick Links Grid */}
        <div className="w-full md:w-2/3 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-lg mb-2">Support</h3>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">Help Center</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">Safety Information</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">Cancellation Options</a>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-lg mb-2">Company</h3>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">About Us</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">Careers</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">Investors</a>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-lg mb-2">Hosting</h3>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">List your property</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">Host resources</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">Community forum</a>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-lg mb-2">Legal</h3>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">Sitemap</a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} QuickStay, Inc. All rights reserved.
        </p>
        
        <div className="flex gap-6">
          <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
            <FaFacebook size={20} />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
            <FaTwitter size={20} />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
            <FaInstagram size={20} />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
            <FaLinkedin size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
