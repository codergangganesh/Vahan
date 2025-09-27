import React, { useState } from 'react';
import { AppProvider } from './context/AppContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Toaster } from './components/ui/toaster';
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection.jsx";
import FeaturedVehicles from "./components/FeaturedVehicles";
import Categories from "./components/Categories";
import WhyChooseUs from "./components/WhyChooseUs";
import AboutUs from "./components/AboutUs";
import Feedback from "./components/Feedback";
import ContactInfo from "./components/ContactInfo";
import HowToUse from "./components/HowToUse";
import Footer from "./components/Footer";
import VehicleDetails from "./components/VehicleDetails";
import SearchResults from "./components/SearchResults";
import UpcomingVehicles from "./pages/UpcomingVehicles";
import CompareVehicles from "./pages/CompareVehicles";
import CategoryVehicles from "./pages/CategoryVehicles";
import SellYourBikePage from "./pages/SellYourBikePage";
import BookTestRidePage from "./pages/BookTestRidePage";
import ViewAllVehicles from "./pages/ViewAllVehicles";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";

import { useApp } from './context/AppContext';

// Type definition for HeroSection props
interface HeroSectionProps {
  onSearch?: () => void;
}

function AppContent() {
  console.log('AppContent rendered');
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { searchVehicles } = useApp();
  const { user, loading } = useAuth();

  // Handle navigation
  const handleViewDetails = (vehicleId: string) => {
    if (!user) {
      setCurrentView('login');
      return;
    }
    setSelectedVehicleId(vehicleId);
    setCurrentView('details');
  };

  const handleNavigate = (page: string) => {
    // Handle special navigation cases
    if (page.startsWith('category?category=')) {
      if (!user) {
        setCurrentView('login');
        return;
      }
      const category = page.split('=')[1];
      setSelectedCategory(category);
      setCurrentView('category');
      return;
    }
    
    // If user is not logged in and trying to access protected pages, redirect to login
    const protectedPages = ['sell', 'book-test-ride', 'upcoming', 'compare', 'view-all', 'search', 'details'];
    if (!user && protectedPages.includes(page)) {
      setCurrentView('login');
      return;
    }
    
    setCurrentView(page);
  };

  const handleSearch = () => {
    if (!user) {
      setCurrentView('login');
      return;
    }
    setCurrentView('search');
  };

  const handleCategorySelect = (categoryName: string) => {
    if (!user) {
      setCurrentView('login');
      return;
    }
    setSelectedCategory(categoryName);
    setCurrentView('category');
  };

  const handleViewAll = () => {
    if (!user) {
      setCurrentView('login');
      return;
    }
    setCurrentView('view-all');
  };

  const handleClearSearch = () => {
    // Clear all filters and go back to home
    searchVehicles('', '', '');
    setCurrentView('home');
  };

  const handleLoginSuccess = () => {
    setCurrentView('home');
  };

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (currentView) {
      case 'login':
        return <LoginPage onLoginSuccess={handleLoginSuccess} />;
      
      case 'details':
        return (
          <VehicleDetails 
            vehicleId={selectedVehicleId}
            onBack={() => setCurrentView('home')}
          />
        );
      case 'search':
        return (
          <div className="min-h-screen bg-background">
            <Navbar onNavigate={handleNavigate} onSearch={handleSearch} />
            <div className="pt-16">
              <SearchResults onViewDetails={handleViewDetails} onBack={handleClearSearch} />
            </div>
          </div>
        );
      case 'category':
        return (
          <CategoryVehicles 
            categoryName={selectedCategory}
            onBack={() => setCurrentView('home')}
            onViewDetails={handleViewDetails}
          />
        );
      case 'upcoming':
        return (
          <UpcomingVehicles onBack={() => setCurrentView('home')} />
        );
      case 'compare':
        return (
          <CompareVehicles onBack={() => setCurrentView('home')} />
        );
      case 'sell':
        return (
          <SellYourBikePage onBack={() => setCurrentView('home')} />
        );
      case 'book-test-ride':
        return (
          <BookTestRidePage onBack={() => setCurrentView('home')} />
        );
      case 'view-all':
        return (
          <ViewAllVehicles 
            onBack={() => setCurrentView('home')} 
            onViewDetails={handleViewDetails} 
          />
        );
      default:
        return (
          <div className="min-h-screen bg-background">
            <Navbar onNavigate={handleNavigate} onSearch={handleSearch} />
            <HeroSection onSearch={handleSearch} />
            {user && (
              <>
                <Categories onCategorySelect={handleCategorySelect} />
                <FeaturedVehicles onViewDetails={handleViewDetails} onViewAll={handleViewAll} />
                <WhyChooseUs />
                <HowToUse />
                <Feedback />
                <AboutUs />
                <ContactInfo />
              </>
            )}
            <Footer onNavigate={handleNavigate} />
          </div>
        );
    }
  };

  return renderContent();
}

function App() {
  console.log('App rendered');
  return (
    <AuthProvider>
      <AppProvider>
        <AppContent />
        <Toaster />
      </AppProvider>
    </AuthProvider>
  );
}

export default App;