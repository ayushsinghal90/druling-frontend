import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center gap-2">
            <Logo className="h-12 w-12 text-black" />
            <span className="text-2xl font-bold text-black">druling</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-black">Features</a>
            <a href="#pricing" className="text-gray-600 hover:text-black">Pricing</a>
            <Link
              to="/login"
              className="text-black bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg font-medium"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-black text-white hover:bg-gray-900 px-4 py-2 rounded-lg font-medium"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg text-gray-600 hover:text-black hover:bg-gray-100"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 inset-x-0 bg-white border-b border-gray-100 shadow-lg">
          <div className="px-4 py-2 space-y-1">
            <a
              href="#features"
              className="block px-4 py-2 text-gray-600 hover:text-black hover:bg-gray-50 rounded-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#pricing"
              className="block px-4 py-2 text-gray-600 hover:text-black hover:bg-gray-50 rounded-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </a>
            <Link
              to="/login"
              className="block px-4 py-2 text-gray-600 hover:text-black hover:bg-gray-50 rounded-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              to="/register"
              className="block px-4 py-2 text-black hover:bg-gray-100 rounded-lg font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;