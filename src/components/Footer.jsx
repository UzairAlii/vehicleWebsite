import React from 'react';

const Footer = () => {
  return (
    <footer className="border-t border-[#222222] bg-black py-12 px-6">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-[10px] text-[#444444] font-bold tracking-[0.2em] uppercase">
          © 2026 LUXEDRIVE - MADE BY SYED UZAIR ALI
        </div>
        
        <div className="flex items-center gap-12 text-[10px] text-[#444444] font-bold tracking-[0.2em] uppercase">
          <a href="#" className="hover:text-white transition-colors">CARS</a>
          <a href="#" className="hover:text-white transition-colors">PRIVATE</a>
          <a href="#" className="hover:text-white transition-colors">RULES</a>
          <a href="#" className="hover:text-white transition-colors">HELP</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
