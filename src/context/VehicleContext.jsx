import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { VEHICLES } from '../data/vehicles';

const VehicleContext = createContext();

export const useVehicles = () => {
  const context = useContext(VehicleContext);
  if (!context) {
    throw new Error('useVehicles must be used within a VehicleProvider');
  }
  return context;
};

// Custom Debounce Hook inside context file for utility
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

export const VehicleProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('NAME_AZ');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Function to simulate API fetch
  const simulateFetch = () => {
    setIsLoading(true);
    setHasError(false);
    setTimeout(() => {
      if (searchTerm.toLowerCase() === 'error') {
        setHasError(true);
      }
      setIsLoading(false);
    }, 1200);
  };

  // Re-run simulation when filters change (simulating a network request per filter)
  useEffect(() => {
    simulateFetch();
    setCurrentPage(1); // Reset to page 1 on filter change
  }, [debouncedSearchTerm]);

  return (
    <VehicleContext.Provider value={{
      searchTerm,
      setSearchTerm,
      sortOption,
      setSortOption,
      isLoading,
      hasError,
      currentPage,
      setCurrentPage,
      debouncedSearchTerm,
      simulateFetch
    }}>
      {children}
    </VehicleContext.Provider>
  );
};
