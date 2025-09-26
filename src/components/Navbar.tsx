import { Button } from "@/components/ui/button";
import { Search, User, Heart, Menu, ShoppingCart, X, LogOut, Calendar } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import ProfileDropdown from "./ProfileDropdown";

interface NavbarProps {
  onNavigate?: (page: string) => void;
  onSearch?: () => void;
}

const Navbar = ({ onNavigate, onSearch }: NavbarProps) => {
  const { searchVehicles, wishlist, toggleWishlist } = useApp();
  const { user, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const handleCategoryClick = (category: string) => {
    if (!user) {
      handleNavigation('login');
      return;
    }
    searchVehicles('', category, '');
    onSearch?.();
    window.scrollTo(0, 0);
    setIsMenuOpen(false);
  };

  const handleNavigation = (page: string) => {
    // If user is not logged in and trying to access protected pages, redirect to login
    const protectedPages = ['sell', 'book-test-ride', 'upcoming', 'compare', 'view-all', 'search'];
    if (!user && protectedPages.includes(page)) {
      onNavigate?.('login');
      return;
    }
    
    onNavigate?.(page);
    window.scrollTo(0, 0);
    setIsMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      await signOut();
      handleNavigation('home');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const navItems = [
    { label: 'Browse Bikes', onClick: () => handleCategoryClick('bike') },
    { label: 'Scooters', onClick: () => handleCategoryClick('scooter') },
    { label: 'Electric', onClick: () => handleCategoryClick('ev') },
    { label: 'Upcoming', onClick: () => handleNavigation('upcoming') },
    { label: 'Compare', onClick: () => handleNavigation('compare') },
    { label: 'View All', onClick: () => handleNavigation('view-all') },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-soft">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-hero rounded-lg flex items-center justify-center">
              <span ><img src="logovahan.jpg" alt="" /></span>
            </div>
            <span className="text-xl font-bold text-foreground">Vahan Bazar</span>
          </div>

          {/* Desktop Navigation - Only show when user is logged in */}
          {user && (
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item, index) => (
                <button
                  key={index}
                  onClick={item.onClick}
                  className="text-foreground hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-accent/10 active:bg-accent/20"
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}

          {/* Right Actions */}
          <div className="flex items-center space-x-2">
            {user && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="hidden md:flex"
                onClick={() => {
                  onSearch?.();
                  window.scrollTo(0, 0);
                }}
              >
                <Search className="w-4 h-4" />
              </Button>
            )}
            
            {user && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative hover:bg-accent/10"
                onClick={() => {
                  // Toggle wishlist for the current vehicle if applicable
                  // In a real app, you'd want to pass a specific vehicle ID
                  toggleWishlist('current-vehicle-id');
                }}
              >
                <Heart 
                  className={`w-4 h-4 ${wishlist.length > 0 ? 'fill-primary text-primary' : ''}`} 
                />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Button>
            )}

            {/* Action Buttons */}
            <div className="hidden md:flex items-center space-x-2">
              {user ? (
                <>
                  <Button 
                    variant="hero"
                    onClick={() => handleNavigation('sell')}
                  >
                    Sell Your Bike
                  </Button>
                  <Button 
                    variant="outline"
                    className="border-2 border-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-md hover:shadow-lg"
                    onClick={() => handleNavigation('book-test-ride')}
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Book Test Ride
                  </Button>
                  <ProfileDropdown onNavigate={handleNavigation} onLogout={handleLogout} />
                </>
              ) : (
                <Button 
                  variant="accent" 
                  onClick={() => handleNavigation('login')}
                >
                  <User className="w-4 h-4 mr-2" />
                  Login / Sign Up
                </Button>
              )}
            </div>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-background border-t border-border py-2 absolute top-16 left-0 right-0 shadow-lg z-50">
            <div className="flex flex-col space-y-1 px-4 pb-4">
              {/* Show navigation items only when user is logged in */}
              {user && (
                <>
                  {navItems.map((item, index) => (
                    <button
                      key={index}
                      onClick={item.onClick}
                      className="text-left px-4 py-2 text-foreground hover:bg-accent/10 rounded-md"
                    >
                      {item.label}
                    </button>
                  ))}
                  <Button 
                    variant="ghost" 
                    className="justify-start px-4"
                    onClick={() => handleNavigation('sell')}
                  >
                    Sell Your Bike
                  </Button>
                  <Button 
                    variant="outline"
                    className="justify-start px-4 border-2 border-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                    onClick={() => handleNavigation('book-test-ride')}
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Book Test Ride
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="justify-start px-4"
                    onClick={() => {
                      onSearch?.();
                      window.scrollTo(0, 0);
                      setIsMenuOpen(false);
                    }}
                  >
                    Search Vehicles
                  </Button>
                </>
              )}
              
              {/* Mobile User Authentication */}
              {user ? (
                <div className="flex items-center justify-between px-4 py-2">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span className="text-sm font-medium truncate max-w-[120px]">
                      {user.email}
                    </span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={handleLogout}
                  >
                    <LogOut className="w-4 h-4 mr-1" />
                    Logout
                  </Button>
                </div>
              ) : (
                <Button 
                  variant="accent" 
                  className="justify-start px-4"
                  onClick={() => handleNavigation('login')}
                >
                  <User className="w-4 h-4 mr-2" />
                  Login / Sign Up
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;