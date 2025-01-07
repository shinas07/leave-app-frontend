import React, { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import api from '../service/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on initial load
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const accessToken = Cookies.get('access_token');
        if (accessToken) {
          const response = await api.get('auth/user/'); // Adjust this endpoint as needed
          setUser(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (email, password, userType) => {
    try {
      const response = await api.post('auth/login/', { email, password, userType });
      console.log(response.data)
      if (response.status === 200) {
        // Store tokens in cookies
        Cookies.set('access_token', response.data.tokens.access, { expires: 1 });
        Cookies.set('refresh_token', response.data.tokens.refresh, { expires: 7 });
        setUser(response.data.user);
        return { success: true };
      }
      return { success: false, error: response.data.error };
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Login failed' };
    }
  };

  const logout = async () => {
    try {
      await api.post('auth/logout/');
      Cookies.remove('access_token');
      Cookies.remove('refresh_token');
      setUser(null);
      return { success: true };
    } catch (error) {
      console.error('Logout failed:', error);
      return { success: false, error: error.response?.data?.error || 'Logout failed' };
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 