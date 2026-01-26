import React, { useState, useEffect } from 'react';
import { ChevronDown, LogOut } from 'lucide-react';
import { getCurrentUser, User as UserType } from '@/lib/getCurrentUser';
import API_BASE_URL, { API_ENDPOINTS } from '@/config/api';
import { useToast } from '@/hooks/use-toast';

interface HeaderProps {
  onSignInClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSignInClick }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        // Check for current user on app load
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error('Error checking user session:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkUserSession();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.auth.logout}`, {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        // Clear in-memory user state
        setUser(null);
        setIsDropdownOpen(false);

        // Show logout toast
        toast({
          title: 'Logged out',
          description: 'You have been successfully logged out.',
        });

        // Reload page to restore Sign In state
        window.location.reload();
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsDropdownOpen(false);
    }
  };

  if (isLoading) {
    return (
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Krishi</h1>
            </div>
            <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900">Krishi</h1>
          </div>

          <div className="flex items-center">
            {user ? (
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  onKeyDown={handleKeyDown}
                  className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                  aria-haspopup="true"
                  aria-expanded={isDropdownOpen}
                  aria-label="User menu"
                >
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                    {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>

                {isDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50"
                    role="menu"
                    aria-orientation="vertical"
                  >
                    <div className="px-4 py-3 border-b border-gray-200">
                      <p className="text-sm font-medium text-gray-900">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>

                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition-colors"
                      role="menuitem"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onSignInClick}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Overlay to close dropdown when clicking outside */}
      {isDropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsDropdownOpen(false)}
          aria-hidden="true"
        ></div>
      )}
    </header>
  );
};

export default Header;
