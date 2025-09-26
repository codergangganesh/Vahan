import { Button } from "@/components/ui/button";
import { TrendingUp, Shield, Zap } from "lucide-react";
import SearchFilters from "./SearchFilters";
import heroBike from "@/assets/hero-bike.jpg";
import { useAuth } from "@/context/AuthContext";

const HeroSection = ({ onSearch }) => {
  const { user } = useAuth();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(59, 130, 246, 0.8), rgba(251, 146, 60, 0.8)), url(${heroBike})`
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Your Perfect Ride
            <br />
            <span className="bg-gradient-to-r from-white to-accent-light bg-clip-text text-transparent">
              Awaits You
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto">
            Discover, compare, and buy the best two-wheelers from trusted dealers. 
            From bikes to scooters and EVs - find your ride today!
          </p>

          {/* Search Bar - Only show when user is logged in */}
          {user ? (
            <SearchFilters className="max-w-4xl mx-auto mb-8" onSearch={onSearch} />
          ) : (
            <div className="max-w-4xl mx-auto mb-8">
              <Button 
                variant="hero" 
                size="lg" 
                className="text-lg px-8 py-6"
                onClick={onSearch}
              >
                Login to Search Vehicles
              </Button>
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center animate-slide-up">
              <TrendingUp className="w-8 h-8 text-accent-light mx-auto mb-3" />
              <div className="text-2xl font-bold text-white mb-1">10K+</div>
              <div className="text-white/80">Vehicles Sold</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center animate-slide-up delay-200">
              <Shield className="w-8 h-8 text-accent-light mx-auto mb-3" />
              <div className="text-2xl font-bold text-white mb-1">200+</div>
              <div className="text-white/80">Trusted Dealers</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center animate-slide-up delay-400">
              <Zap className="w-8 h-8 text-accent-light mx-auto mb-3" />
              <div className="text-2xl font-bold text-white mb-1">50K+</div>
              <div className="text-white/80">Happy Customers</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;