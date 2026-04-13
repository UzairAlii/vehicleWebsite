import React from 'react';
import { motion } from 'framer-motion';

const VehicleCard = ({ vehicle }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -5 }}
      className="group bg-[#111111] border border-[#222222] p-4 transition-all duration-300 hover:border-white/20 rounded-2xl"
    >
      <div className="relative aspect-[4/3] overflow-hidden mb-6 rounded-xl">
        <img
          src={vehicle.image_url}
          alt={vehicle.name}
          className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-500"
        />
      </div>

      <div className="space-y-1 mb-8">
        <h3 className="text-xl font-bold tracking-tighter text-white uppercase italic">
          {vehicle.name}
        </h3>
        <p className="text-[10px] text-[#888888] tracking-widest uppercase">
          {vehicle.subtitle}
        </p>
      </div>

      <div className="flex items-end justify-between pt-4 border-t border-[#222222]">
        <div className="text-2xl font-light tracking-tight text-white">
          ${vehicle.price.toLocaleString()}
        </div>
        <button className="text-[10px] text-[#888888] tracking-widest uppercase hover:text-white transition-colors">
          VIEW DETAILS
        </button>
      </div>
    </motion.div>
  );
};

export default VehicleCard;
