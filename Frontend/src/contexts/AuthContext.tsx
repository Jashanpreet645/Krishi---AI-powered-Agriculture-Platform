import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import authService, { User } from '@/services/authService';
import API_BASE_URL, { API_ENDPOINTS } from '@/config/api';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'CLEAR_ERROR' }
  | { type: 'SET_LOADING'; payload: boolean };

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  signup: (data: any) => Promise<boolean>;
  logout: () => void;
  clearError: () => void;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, isLoading: true, error: null };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  });

  useEffect(() => {
    // Check if user is already authenticated on app load
    // Remove token check since we rely on HTTP-only cookies now
    dispatch({ type: 'SET_LOADING', payload: false });
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // We no longer use this login method since AuthModal directly calls API with credentials: 'include' and reloads page
    return false;
  };

  const signup = async (data: any): Promise<boolean> => {
    dispatch({ type: 'LOGIN_START' });
    
    try {
      const response = await authService.signup(data);
      
      if (response.success && response.user) {
        dispatch({ type: 'LOGIN_SUCCESS', payload: response.user });
        return true;
      } else {
        dispatch({ type: 'LOGIN_FAILURE', payload: response.message });
        return false;
      }
    } catch (error) {
      dispatch({ 
        type: 'LOGIN_FAILURE', 
        payload: error instanceof Error ? error.message : 'Signup failed' 
      });
      return false;
    }
  };

  const logout = async () => {
    try {
      await fetch(`${API_BASE_URL}${API_ENDPOINTS.auth.logout}`, {
        method: 'POST',
        credentials: 'include',
      });
      dispatch({ type: 'LOGOUT' });
      window.location.reload();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const setUser = (user: User | null) => {
    if (user) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
    } else {
      dispatch({ type: 'LOGOUT' });
    }
  };

  const value: AuthContextType = {
    ...state,
    login,
    signup,
    logout,
    clearError,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};