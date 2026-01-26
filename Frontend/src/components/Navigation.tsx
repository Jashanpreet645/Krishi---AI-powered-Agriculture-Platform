import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, User, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import AuthModal from '@/components/auth/AuthModal';
import { getCurrentUser } from '@/lib/getCurrentUser';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [showUserMenu, setShowUserMenu] = useState(false);

  const { user, logout, setUser } = useAuth();
  const navigate = useNavigate();

  const handleAuthClick = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">K</span>
              </div>
              <span className="font-heading font-bold text-xl text-foreground">
                Krishi
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link
                to="/"
                className="text-foreground hover:text-primary transition-colors duration-300 font-medium"
                onClick={(e) => {
                  if (window.location.pathname === '/') {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
              >
                Home
              </Link>
              <div className="relative group">
                <button className="text-foreground hover:text-primary transition-colors duration-300 font-medium flex items-center space-x-1">
                  <span>Features</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-56 bg-card border border-border rounded-lg shadow-medium opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <Link to="/crop-recommendation" className="block px-4 py-3 text-sm text-foreground hover:bg-muted transition-colors">
                    Crop Recommendation
                  </Link>
                  <Link to="/fertilizer-recommendation" className="block px-4 py-3 text-sm text-foreground hover:bg-muted transition-colors">
                    Fertilizer Analysis
                  </Link>
                  <Link to="/disease-detection" className="block px-4 py-3 text-sm text-foreground hover:bg-muted transition-colors">
                    Disease Detection
                  </Link>
                </div>
              </div>
              {/* Removed About link */}
              {/* <a href="#about" className="text-foreground hover:text-primary transition-colors duration-300 font-medium">
                About
              </a> */}
              <a
                href="#contact"
                className="text-foreground hover:text-primary transition-colors duration-300 font-medium"
                onClick={(e) => {
                  e.preventDefault();
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Contact
              </a>
            </div>
          </div>

          {/* Auth Section */}
          <div className="hidden md:block">
            <span className="text-foreground font-medium"></span>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground hover:text-primary transition-colors duration-300"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-card border-t border-border">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link to="/" className="block px-3 py-2 text-foreground hover:bg-muted rounded-md">
              Home
            </Link>
            <Link to="/crop-recommendation" className="block px-3 py-2 text-foreground hover:bg-muted rounded-md">
              Crop Recommendation
            </Link>
            <Link to="/fertilizer-recommendation" className="block px-3 py-2 text-foreground hover:bg-muted rounded-md">
              Fertilizer Analysis
            </Link>
            <Link to="/disease-detection" className="block px-3 py-2 text-foreground hover:bg-muted rounded-md">
              Disease Detection
            </Link>
            {/* Removed About link */}
            {/* <a href="#about" className="block px-3 py-2 text-foreground hover:bg-muted rounded-md">
              About
            </a> */}
            <a
              href="#contact"
              className="block px-3 py-2 text-foreground hover:bg-muted rounded-md"
              onClick={(e) => {
                e.preventDefault();
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Contact
            </a>
            <div className="pt-4 pb-3 border-t border-border mt-4">
              <span className="block px-3 py-2 text-foreground font-medium">Krishi</span>
            </div>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      <AuthModal
        setUser={setUser}
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        defaultMode={authMode}
      />
    </nav>
  );
};

export default Navigation;