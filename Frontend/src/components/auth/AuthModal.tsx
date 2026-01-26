import React, { useState } from 'react';
import { X, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import API_BASE_URL, { API_ENDPOINTS } from '@/config/api';
import { getCurrentUser } from '@/lib/getCurrentUser';

type User = {
  email: string;
  firstName: string;
  lastName: string;
  location: string;
  phone: number;
  id: number;
}

interface AuthModalProps {
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'login' | 'signup';
}

const AuthModal = ({ setUser, isOpen, onClose, defaultMode = 'login' }) => {
  const [mode, setMode] = useState<'login' | 'signup'>(defaultMode);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    location: ''
  });

  const { login, signup, isLoading, error, clearError } = useAuth();
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) clearError();
  };

  const user = getCurrentUser()
  getCurrentUser().then(user => {
    console.log("User:", user);
    // setUser(user)
  });
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (mode === 'login') {
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.auth.signin}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });

        if (response.status === 200) {
          toast({
            title: 'Login successful',
            description: 'Welcome back!',
            variant: 'default',
          });

          // Fetch user and set state before reload
          getCurrentUser().then(user => {
            if (user) setUser(user);
          });

          setTimeout(() => {
            window.location.reload();
          }, 2500);
        } else {
          toast({
            title: 'Login failed',
            description: 'Invalid credentials!',
            variant: 'default',
          });
          const errorData = await response.json();
          setFormData(prev => ({ ...prev, error: errorData.message || 'Login failed' }));
        }
      } else {
        // Handle signup
        const success = await signup(formData);
        if (success) {
          toast({
            title: 'Account created!',
            description: 'Your account has been created and you are now logged in.',
          });
          getCurrentUser().then(user => {
            if (user) setUser(user);
          });
          onClose();
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            phone: '',
            location: ''
          });
        }
      }
    } catch (error) {
      console.error('Submit error:', error);
      setFormData(prev => ({ ...prev, error: 'Network error. Please try again.' }));
    }
  };

  const toggleMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
    clearError();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center h-screen bg-black/50 backdrop-blur-sm">
      <div className="bg-card w-full max-w-md mx-4 rounded-2xl shadow-strong border border-border overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-primary p-6 text-primary-foreground relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <h2 className="text-2xl font-heading font-bold">
            {mode === 'login' ? 'Welcome Back' : 'Join Team Krishi'}
          </h2>
          <p className="text-primary-foreground/90 mt-1">
            {mode === 'login' 
              ? 'Sign in to access your agricultural insights' 
              : 'Start your precision agriculture journey'
            }
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {mode === 'signup' && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                  placeholder="John"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-foreground mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                  placeholder="Doe"
                />
              </div>
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 pr-10 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {mode === 'signup' && (
            <>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-foreground mb-2">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                  placeholder="City, State"
                />
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-primary text-primary-foreground py-3 rounded-lg font-semibold hover:shadow-glow transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
          >
            {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            <span>{mode === 'login' ? 'Sign In' : 'Create Account'}</span>
          </button>

          <div className="text-center pt-4 border-t border-border">
            <p className="text-muted-foreground text-sm">
              {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}
              <button
                type="button"
                onClick={toggleMode}
                className="text-primary hover:text-primary-glow font-medium ml-1 transition-colors"
              >
                {mode === 'login' ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;