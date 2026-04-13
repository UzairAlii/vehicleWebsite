import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      setIsAuthenticated(true);
      setUser({ email: 'luxury@autovault.com' }); // Mock user
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Mock login logic
    localStorage.setItem('auth_token', 'mock_premium_token');
    setIsAuthenticated(true);
    setUser({ email });
    return true;
  };

  const signup = (userData) => {
    console.log('User Registered:', userData);
    localStorage.setItem('auth_token', 'mock_premium_token');
    setIsAuthenticated(true);
    setUser({ email: userData.email });
    return true;
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, signup, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
