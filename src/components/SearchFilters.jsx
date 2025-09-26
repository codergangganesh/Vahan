import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, X } from "lucide-react";
import { useApp } from '@/context/AppContext';

const SearchFilters = ({ className = "", onSearch = () => {} }) => {
  const { searchVehicles } = useApp();
  const [localQuery, setLocalQuery] = useState('');
  const [localCategory, setLocalCategory] = useState('');
  const [localBudget, setLocalBudget] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Debounce search to avoid too many requests
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localQuery || localCategory || localBudget) {
        handleRealTimeSearch();
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [localQuery, localCategory, localBudget]);

  const handleRealTimeSearch = () => {
    setIsSearching(true);
    searchVehicles(localQuery, localCategory, localBudget);
    // Only call onSearch if we have actual search terms
    if (localQuery || localCategory || localBudget) {
      onSearch();
    }
    setIsSearching(false);
  };

  const handleManualSearch = () => {
    setIsSearching(true);
    searchVehicles(localQuery, localCategory, localBudget);
    onSearch();
    setIsSearching(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleManualSearch();
    }
  };

  const clearFilters = () => {
    setLocalQuery('');
    setLocalCategory('');
    setLocalBudget('');
    searchVehicles('', '', '');
  };

  return (
    <div className={`bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-large ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-2 relative">
          <Input 
            placeholder="Search by brand, model, or keyword..." 
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="h-12 text-lg border-0 shadow-none focus:ring-2 focus:ring-primary pr-10"
          />
          {localQuery && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
              onClick={() => setLocalQuery('')}
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
        <Select value={localCategory} onValueChange={setLocalCategory}>
          <SelectTrigger className="h-12 border-0 shadow-none">
            <SelectValue placeholder="Vehicle Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Vehicles</SelectItem>
            <SelectItem value="bike">Bikes</SelectItem>
            <SelectItem value="scooter">Scooters</SelectItem>
            <SelectItem value="ev">Electric</SelectItem>
          </SelectContent>
        </Select>
        <Select value={localBudget} onValueChange={setLocalBudget}>
          <SelectTrigger className="h-12 border-0 shadow-none">
            <SelectValue placeholder="Budget" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="under-50k">Under ₹50K</SelectItem>
            <SelectItem value="50k-1l">₹50K - ₹1L</SelectItem>
            <SelectItem value="1l-2l">₹1L - ₹2L</SelectItem>
            <SelectItem value="above-2l">Above ₹2L</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        <Button 
          variant="hero" 
          size="lg" 
          className="flex-1 h-12 text-lg"
          onClick={handleManualSearch}
          disabled={isSearching}
        >
          <Search className="w-5 h-5 mr-2" />
          {isSearching ? 'Searching...' : 'Search Vehicles'}
        </Button>
        <Button 
          variant="accent" 
          size="lg" 
          className="h-12 text-lg"
          onClick={clearFilters}
        >
          Clear Filters
        </Button>
      </div>
    </div>
  );
};

export default SearchFilters;