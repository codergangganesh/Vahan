import React from 'react';
import VehicleCard from './VehicleCard';
import { useApp } from '@/context/AppContext';
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const SearchResults = ({ onViewDetails, onBack }) => {
  const { filteredVehicles, searchQuery, selectedCategory, selectedBudget } = useApp();

  const getFilterText = () => {
    const filters = [];
    if (searchQuery) filters.push(`"${searchQuery}"`);
    if (selectedCategory && selectedCategory !== 'all') {
      if (selectedCategory === 'ev') filters.push('Electric vehicles');
      else filters.push(selectedCategory + 's');
    }
    if (selectedBudget) {
      switch (selectedBudget) {
        case 'under-50k': filters.push('Under ₹50K'); break;
        case '50k-1l': filters.push('₹50K - ₹1L'); break;
        case '1l-2l': filters.push('₹1L - ₹2L'); break;
        case 'above-2l': filters.push('Above ₹2L'); break;
      }
    }
    return filters.length > 0 ? ` for ${filters.join(', ')}` : '';
  };

  const clearFilters = () => {
    // This would need to be implemented in the parent component
    // For now, we'll just go back to home
    if (onBack) onBack();
  };

  return (
    <section className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div className="mb-4 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Search Results
              {getFilterText() && (
                <span className="text-primary">{getFilterText()}</span>
              )}
            </h2>
            <p className="text-muted-foreground text-lg">
              Found {filteredVehicles.length} vehicles matching your criteria
            </p>
          </div>
          <Button 
            variant="outline" 
            onClick={clearFilters}
            className="flex items-center"
          >
            <X className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>

        {filteredVehicles.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No vehicles found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search criteria or browse our featured vehicles
            </p>
            <Button onClick={clearFilters} variant="hero">
              Browse All Vehicles
            </Button>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredVehicles.map((vehicle) => (
                <div key={vehicle.id} className="animate-fade-in">
                  <VehicleCard {...vehicle} onViewDetails={onViewDetails} />
                </div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <Button 
                variant="outline" 
                onClick={clearFilters}
                className="flex items-center mx-auto"
              >
                <X className="w-4 h-4 mr-2" />
                Clear Search & Back to Home
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchResults;