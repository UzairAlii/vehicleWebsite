import React from 'react';
import { cn } from '../lib/utils';
import { useNavigate } from 'react-router-dom';

const QuickSelection = ({ selectedCategory, totalCount, filteredCount }) => {
  const categories = ['SUV', 'SEDAN', 'ELECTRIC', 'UNDER $50K'];
  const navigate = useNavigate();

  const handleCategoryClick = (cat) => {
    if (cat === 'UNDER $50K') navigate('/category/under-50k');
    else navigate(`/category/${cat}`);
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8">
        <div className="space-y-4 sm:space-y-6">
          <h2 className="text-[9px] sm:text-[10px] text-[#444444] font-bold tracking-[0.4em] uppercase">
            QUICK SELECTION
          </h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={cn(
                  "px-4 sm:px-8 py-2.5 sm:py-3 text-[9px] sm:text-[11px] font-bold tracking-[0.2em] uppercase border transition-all duration-300 rounded-xl sm:rounded-2xl",
                  selectedCategory === cat 
                    ? "bg-white text-black border-white" 
                    : "bg-transparent text-[#888888] border-[#222222] hover:border-white/20"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="text-[9px] sm:text-[10px] text-[#888888] font-bold tracking-[0.4em] uppercase whitespace-nowrap">
          SHOWING <span className="text-white">{filteredCount}</span> OF <span className="text-white">{totalCount}</span> CARS
        </div>
      </div>
    </div>
  );
};

export default QuickSelection;
