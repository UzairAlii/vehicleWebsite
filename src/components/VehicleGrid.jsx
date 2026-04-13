import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import VehicleCard from './VehicleCard';
import SkeletonCard from './SkeletonCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const VehicleGrid = ({ vehicles, isLoading, currentPage, totalPages, setCurrentPage }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6 max-w-[1400px] mx-auto">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto px-6 space-y-20 pb-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnimatePresence mode="popLayout">
          {vehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </AnimatePresence>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-8">
        <button
          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
          className="p-2 text-[#444444] hover:text-white disabled:opacity-30 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-6">
          {Array.from({ length: totalPages }).map((_, i) => {
            const pageNum = i + 1;
            // Simplified pagination for this project
            if (pageNum === 1 || pageNum === totalPages || (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)) {
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`text-[11px] font-bold tracking-[0.2em] transition-all duration-300 pb-1 border-b-2 ${
                    currentPage === pageNum ? 'text-white border-white' : 'text-[#444444] border-transparent hover:text-white'
                  }`}
                >
                  {pageNum.toString().padStart(2, '0')}
                </button>
              );
            }
            if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
              return <span key={pageNum} className="text-[#222222]">...</span>;
            }
            return null;
          })}
        </div>

        <button
          onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
          disabled={currentPage === totalPages}
          className="p-2 text-[#444444] hover:text-white disabled:opacity-30 transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default VehicleGrid;
