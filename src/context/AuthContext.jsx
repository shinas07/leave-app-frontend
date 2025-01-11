import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../service/api';
import { encryptToken, decryptToken } from '../utils/tokenUtils';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const encryptedAccessToken = localStorage.getItem('access_token');
        if (encryptedAccessToken) {
          const accessToken = decryptToken(encryptedAccessToken);
          const response = await api.get('auth/user/'); // Adjust this endpoint as needed
          setUser(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch user:', error);
        // If token decryption fails or is invalid, clear storage
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (email, password, userType) => {
    try {
      const response = await api.post('auth/login/', { email, password, userType });
      if (response.status === 200) {
        const { access, refresh } = response.data.tokens;
        const userEmail = response.data.user.email;

           // Encrypt tokens before storing
        const encryptedAccess = encryptToken(access);
        const encryptedRefresh = encryptToken(refresh);

        localStorage.setItem('access_token',encryptedAccess); // Store access token in localStorage
        localStorage.setItem('refresh_token',encryptedRefresh);
        localStorage.setItem('user', JSON.stringify(userEmail));
        setUser(userEmail);
        const token = localStorage.getItem('access_token')
        return { success: true };
      }
      return { success: false, error: response.data.error };
    } catch (error) {
      console.log(error)
      return { success: false, error: error.response?.data?.error || 'Login failed' };
    }
  };

  const logout = async () => {
    try {
      const encryptedRefreshToken = localStorage.getItem('refresh_token');
      if (encryptedRefreshToken) {
        const refresh_token = decryptToken(encryptedRefreshToken);
        await api.post('auth/logout/', { refresh_token });
      }
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token'); 
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
      {loading ? <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>: children}
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