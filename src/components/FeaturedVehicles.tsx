import VehicleCard from "./VehicleCard";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { useAuth } from "@/context/AuthContext";

interface FeaturedVehiclesProps {
  onViewDetails?: (vehicleId: string) => void;
  onViewAll?: () => void;
}

const FeaturedVehicles = ({ onViewDetails, onViewAll }: FeaturedVehiclesProps) => {
  const { vehicles } = useApp();
  const { user } = useAuth();
  
  // Don't render if user is not logged in
  if (!user) {
    return null;
  }
  
  // Show first 8 vehicles as featured
  const featuredVehicles = vehicles.slice(0, 8);

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Featured Vehicles
            </h2>
            <p className="text-muted-foreground text-lg">
              Discover the most popular bikes and scooters
            </p>
          </div>
          
          <div className="hidden md:flex items-center gap-2">
            <Button variant="outline" size="icon">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Vehicle Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {featuredVehicles.map((vehicle) => (
            <div key={vehicle.id} className="animate-fade-in">
              <VehicleCard {...vehicle} onViewDetails={onViewDetails} />
            </div>
          ))}
        </div>

        {/* View All */}
        <div className="text-center">
          <Button variant="hero" size="lg" onClick={onViewAll}>
            View All Vehicles
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedVehicles;