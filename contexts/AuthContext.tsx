import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiService from '../src/services/apiService';

interface AuthContextProps {
  isAuthorized: boolean;
  user: any;
  login: (token: string, user: any) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
  isAuthorized: false,
  user: null,
  login: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadToken = async () => {
      const token = await AsyncStorage.getItem('token');
      const userInfo = await AsyncStorage.getItem('user');

      if (token) {
        setIsAuthorized(true);
        setUser(JSON.parse(userInfo || "{}"));
      }
    };

    loadToken();
  }, []);

  const login = async (token: string, user: any) => {
    await AsyncStorage.setItem('token', token);
    await AsyncStorage.setItem('user', JSON.stringify(user));
    setIsAuthorized(true);
    setUser(user);
  };

  const logout = async () => {
    await apiService.post('v1/auth/logout');
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
    setIsAuthorized(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthorized, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
