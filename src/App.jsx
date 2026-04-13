import React, { useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams, Navigate } from 'react-router-dom';
import Header from './components/Header';
import QuickSelection from './components/QuickSelection';
import VehicleGrid from './components/VehicleGrid';
import ErrorState from './components/ErrorState';
import Footer from './components/Footer';
import DashboardLayout from './components/DashboardLayout';
import { VehicleProvider, useVehicles } from './context/VehicleContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { VEHICLES } from './data/vehicles';

// Pages
import Login from './pages/Login';
import Signup from './pages/Signup';

const ITEMS_PER_PAGE = 8;

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" />;
  return children;
};

const ListingPage = () => {
  const { categoryId } = useParams();
  const { 
    debouncedSearchTerm, 
    sortOption, 
    isLoading, 
    hasError, 
    currentPage, 
    setCurrentPage,
    setSearchTerm,
    simulateFetch
  } = useVehicles();

  const selectedCategory = useMemo(() => {
    if (!categoryId) return '';
    if (categoryId === 'under-50k') return 'UNDER $50K';
    return categoryId;
  }, [categoryId]);

  const filteredVehicles = useMemo(() => {
    let result = VEHICLES.filter((vehicle) => {
      const matchesSearch = vehicle.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
      let matchesCategory = true;
      if (selectedCategory === 'UNDER $50K') {
        matchesCategory = vehicle.price < 50000;
      } else if (selectedCategory) {
        matchesCategory = vehicle.category === selectedCategory;
      }
      return matchesSearch && matchesCategory;
    });

    result = [...result].sort((a, b) => {
      if (sortOption === 'PRICE_LH') return a.price - b.price;
      if (sortOption === 'PRICE_HL') return b.price - a.price;
      if (sortOption === 'NAME_AZ') return a.name.localeCompare(b.name);
      return 0;
    });

    return result;
  }, [debouncedSearchTerm, selectedCategory, sortOption]);

  const totalPages = Math.ceil(filteredVehicles.length / ITEMS_PER_PAGE);
  const paginatedVehicles = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredVehicles.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredVehicles, currentPage]);

  return (
    <>
      <QuickSelection 
        selectedCategory={selectedCategory} 
        totalCount={VEHICLES.length}
        filteredCount={filteredVehicles.length}
      />

      {(hasError || (filteredVehicles.length === 0 && !isLoading)) ? (
        <ErrorState onRetry={() => setSearchTerm('')} />
      ) : (
        <VehicleGrid 
          vehicles={paginatedVehicles} 
          isLoading={isLoading}
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      )}
    </>
  );
};

const AppContent = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <DashboardLayout>
        {isAuthenticated && <Header />}
        <main className="flex-1">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={
              <ProtectedRoute>
                <ListingPage />
              </ProtectedRoute>
            } />
            <Route path="/category/:categoryId" element={
              <ProtectedRoute>
                <ListingPage />
              </ProtectedRoute>
            } />
          </Routes>
        </main>
        {isAuthenticated && <Footer />}
      </DashboardLayout>
    </Router>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <VehicleProvider>
        <AppContent />
      </VehicleProvider>
    </AuthProvider>
  );
};

export default App;
