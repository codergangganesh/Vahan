import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { useApp } from '@/context/AppContext';
import { Search, Filter, X } from "lucide-react";

const ViewAllVehicles = ({ onBack, onViewDetails }) => {
  const { vehicles } = useApp();
  const [filteredVehicles, setFilteredVehicles] = useState(vehicles);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [sortBy, setSortBy] = useState('newest');

  // Filter and sort vehicles
  useEffect(() => {
    let result = [...vehicles];

    // Apply search filter
    if (searchTerm) {
      result = result.filter(vehicle => 
        vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory !== 'all') {
      if (selectedCategory === 'ev') {
        result = result.filter(vehicle => vehicle.fuelType === 'Electric');
      } else {
        result = result.filter(vehicle => vehicle.category === selectedCategory);
      }
    }

    // Apply price filter
    result = result.filter(vehicle => 
      vehicle.price >= priceRange[0] && vehicle.price <= priceRange[1]
    );

    // Apply sorting
    switch (sortBy) {
      case 'price-low-high':
        result = result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        result = result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result = result.sort((a, b) => 
          new Date(b.createdAt || '2020-01-01').getTime() - new Date(a.createdAt || '2020-01-01').getTime()
        );
        break;
      case 'oldest':
        result = result.sort((a, b) => 
          new Date(a.createdAt || '2020-01-01').getTime() - new Date(b.createdAt || '2020-01-01').getTime()
        );
        break;
      default:
        break;
    }

    setFilteredVehicles(result);
  }, [vehicles, searchTerm, selectedCategory, priceRange, sortBy]);

  // Group vehicles by category
  const getGroupedVehicles = () => {
    const groups = {};
    filteredVehicles.forEach(vehicle => {
      const category = vehicle.category;
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(vehicle);
    });
    return groups;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setPriceRange([0, 1000000]);
    setSortBy('newest');
  };

  // Get category display name
  const getCategoryName = (category) => {
    switch (category) {
      case 'bike': return 'Bikes';
      case 'scooter': return 'Scooters';
      case 'ev': return 'Electric Vehicles';
      default: return category;
    }
  };

  const groupedVehicles = getGroupedVehicles();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">All Vehicles</h1>
            <p className="text-muted-foreground mt-2">
              Browse our complete collection of vehicles
            </p>
          </div>
          <Button variant="outline" onClick={onBack}>
            Back to Home
          </Button>
        </div>

        {/* Filters Section */}
        <div className="mb-8 p-6 bg-muted/10 rounded-lg">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h2 className="text-xl font-semibold flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              Filters
            </h2>
            <Button 
              variant="outline" 
              onClick={clearFilters}
              className="flex items-center"
            >
              <X className="w-4 h-4 mr-2" />
              Clear All
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Search */}
            <div>
              <label className="text-sm font-medium mb-2 block">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or brand..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="text-sm font-medium mb-2 block">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-input rounded-md bg-background"
              >
                <option value="all">All Categories</option>
                <option value="bike">Bike</option>
                <option value="scooter">Scooter</option>
                <option value="ev">Electric Vehicle</option>
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label className="text-sm font-medium mb-2 block">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-input rounded-md bg-background"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                Price Range: {formatCurrency(priceRange[0])} - {formatCurrency(priceRange[1])}
              </label>
              <Slider
                defaultValue={[0, 1000000]}
                max={1000000}
                step={10000}
                value={priceRange}
                onValueChange={setPriceRange}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-muted-foreground">
            Showing {filteredVehicles.length} of {vehicles.length} vehicles
          </p>
        </div>

        {/* Categorized Vehicle Sections */}
        {filteredVehicles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No vehicles found matching your criteria.</p>
            <p className="text-sm mt-2">Try adjusting your filters or search terms.</p>
            <Button variant="outline" onClick={clearFilters} className="mt-4">
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="space-y-16">
            {Object.keys(groupedVehicles).map((category) => {
              const vehiclesInCategory = groupedVehicles[category] || [];
              
              return (
                <section key={category}>
                  <h2 className="text-2xl font-bold mb-6 pb-2 border-b">
                    {getCategoryName(category)} <span className="text-muted-foreground text-lg">({vehiclesInCategory.length})</span>
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {vehiclesInCategory.map((vehicle) => (
                      <Card 
                        key={vehicle.id} 
                        className="w-full hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => onViewDetails(vehicle.id)}
                      >
                        <div className="relative">
                          <img 
                            src={vehicle.image} 
                            alt={vehicle.name} 
                            className="w-full h-48 object-cover rounded-t-lg"
                          />
                          <Badge className="absolute top-2 right-2" variant="secondary">
                            {vehicle.category === 'ev' ? 'Electric' : vehicle.category}
                          </Badge>
                          {vehicle.isNew && (
                            <Badge className="absolute top-2 left-2" variant="default">
                              New
                            </Badge>
                          )}
                          {vehicle.discount && (
                            <Badge className="absolute bottom-2 right-2" variant="destructive">
                              {vehicle.discount}% OFF
                            </Badge>
                          )}
                        </div>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-bold text-lg">{vehicle.name}</h3>
                              <p className="text-sm text-muted-foreground">{vehicle.brand}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-lg">{formatCurrency(vehicle.price)}</p>
                              {vehicle.originalPrice && vehicle.originalPrice > vehicle.price && (
                                <p className="text-xs text-muted-foreground line-through">
                                  {formatCurrency(vehicle.originalPrice)}
                                </p>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between mt-4 pt-4 border-t">
                            <div className="flex space-x-4 text-sm">
                              {vehicle.mileage && (
                                <span>{vehicle.mileage} kmpl</span>
                              )}
                              {vehicle.engineCapacity && (
                                <span>{vehicle.engineCapacity} cc</span>
                              )}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {vehicle.fuelType}
                            </div>
                          </div>
                          
                          <div className="flex items-center mt-3">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <span 
                                  key={i} 
                                  className={`text-lg ${i < Math.floor(vehicle.rating) ? 'text-yellow-500' : 'text-muted'}`}
                                >
                                  ★
                                </span>
                              ))}
                            </div>
                            <span className="text-sm text-muted-foreground ml-2">
                              ({vehicle.reviews})
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewAllVehicles;