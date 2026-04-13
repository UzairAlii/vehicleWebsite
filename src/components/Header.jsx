import React, { useState } from 'react';
import { Search, User, LogOut, Menu, X } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useVehicles } from '../context/VehicleContext';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const { searchTerm, setSearchTerm, sortOption, setSortOption } = useVehicles();
  const { logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { label: 'ALL CARS', path: '/' },
    { label: 'SUV', path: '/category/SUV' },
    { label: 'SEDAN', path: '/category/SEDAN' },
    { label: 'ELECTRIC', path: '/category/ELECTRIC' },
    { label: 'UNDER $50K', path: '/category/under-50k' },
  ];

  return (
    <header className="border-b border-[#222222] bg-black sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-4">
        {/* Logo */}
        <NavLink to="/" className="text-xl sm:text-2xl font-black tracking-tighter text-white shrink-0">
          AUTOV<span className="italic text-[#444444]">AULT</span>
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-6 text-[10px] font-bold tracking-[0.2em] text-[#888888] uppercase">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                `pb-1 border-b-2 transition-all duration-300 ${isActive ? 'text-white border-white' : 'border-transparent hover:text-white'}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Search & Actions (Desktop) */}
        <div className="flex-1 max-w-xl hidden md:flex items-center gap-3">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#444444] group-focus-within:text-white transition-colors" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="SEARCH CARS..."
              className="w-full bg-[#0A0A0A] border border-[#222222] py-2.5 pl-11 pr-4 text-[10px] font-bold tracking-[0.2em] text-white placeholder:text-[#222222] focus:outline-none focus:border-white/10 transition-all rounded-xl"
            />
          </div>
          
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="bg-black border border-[#222222] text-[9px] font-bold tracking-[0.1em] text-[#888888] px-3 py-2.5 focus:outline-none rounded-xl uppercase appearance-none cursor-pointer hover:border-white/10 transition-colors"
          >
            <option value="NAME_AZ">A-Z</option>
            <option value="PRICE_LH">PRICE: L-H</option>
            <option value="PRICE_HL">PRICE: H-L</option>
          </select>

          <div className="flex items-center gap-2">
            <button className="p-2 text-[#444444] hover:text-white transition-colors">
              <User className="w-4 h-4" />
            </button>
            <button onClick={handleLogout} className="p-2 text-[#444444] hover:text-red-500 transition-colors">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile Actions Button */}
        <div className="flex md:hidden items-center gap-2">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-[#888888] hover:text-white transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 w-full bg-[#0A0A0A] border-b border-[#222222] md:hidden overflow-hidden"
          >
            <div className="p-6 space-y-6">
              {/* Mobile Search */}
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#444444]" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="SEARCH FOR A CAR..."
                  className="w-full bg-black border border-[#222222] py-4 pl-12 pr-4 text-xs text-white rounded-2xl focus:outline-none"
                />
              </div>

              {/* Mobile Navigation */}
              <nav className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) => 
                      `text-[11px] font-bold tracking-[0.3em] uppercase py-2 ${isActive ? 'text-white' : 'text-[#444444]'}`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </nav>

              <div className="pt-6 border-t border-[#222222] flex items-center justify-between">
                <div className="flex items-center gap-4">
                   <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="bg-black border border-[#222222] text-[10px] font-bold tracking-[0.1em] text-[#888888] px-4 py-2 rounded-xl uppercase"
                  >
                    <option value="NAME_AZ">A-Z</option>
                    <option value="PRICE_LH">L-H</option>
                    <option value="PRICE_HL">H-L</option>
                  </select>
                </div>
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-red-500 uppercase"
                >
                  <LogOut className="w-4 h-4" /> LOGOUT
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
