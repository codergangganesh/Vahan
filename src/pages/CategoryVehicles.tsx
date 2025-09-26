import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Filter, Search } from "lucide-react";
import VehicleCard from "@/components/VehicleCard";
import { useApp } from "@/context/AppContext";

interface CategoryVehiclesProps {
  categoryName: string;
  onBack: () => void;
  onViewDetails?: (vehicleId: string) => void;
}

const CategoryVehicles: React.FC<CategoryVehiclesProps> = ({ categoryName, onBack, onViewDetails }) => {
  const { vehicles } = useApp();
  
  // Filter vehicles based on category
  const categoryVehicles = vehicles.filter(vehicle => {
    // Special handling for "Electric Vehicles" category
    if (categoryName === "Electric Vehicles") {
      return vehicle.fuelType === "Electric";
    }
    // Special handling for "Sport Bikes" category
    else if (categoryName === "Sport Bikes") {
      return vehicle.category === "bike" && vehicle.engineCapacity && vehicle.engineCapacity >= 200;
    }
    // Special handling for "Scooters" category
    else if (categoryName === "Scooters") {
      return vehicle.category === "scooter";
    }
    // For "Upcoming Launches", we'll show all vehicles for now
    else if (categoryName === "Upcoming Launches") {
      return true;
    }
    // Default case
    return vehicle.category === categoryName.toLowerCase();
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="icon" onClick={onBack}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{categoryName}</h1>
            <p className="text-muted-foreground">
              {categoryVehicles.length} vehicles found
            </p>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <input
              type="text"
              placeholder="Search vehicles..."
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background"
            />
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter & Sort
          </Button>
        </div>

        {/* Vehicles Grid */}
        {categoryVehicles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categoryVehicles.map((vehicle) => (
              <VehicleCard 
                key={vehicle.id} 
                {...vehicle} 
                onViewDetails={onViewDetails}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">No vehicles found</h3>
            <p className="text-muted-foreground">
              We couldn't find any vehicles in the {categoryName} category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryVehicles;