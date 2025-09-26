import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { 
  Heart, 
  Star, 
  Fuel, 
  Zap, 
  ArrowLeft, 
  Share2, 
  Phone,
  MapPin,
  Calendar,
  Settings,
  Award,
  Shield,
  Eye
} from "lucide-react";
import { useApp } from '@/context/AppContext';
import EMICalculator from './EMICalculator';
import BookingForm from './BookingForm';
import Vehicle360View from './Vehicle360View';

const VehicleDetails = ({ vehicleId, onBack }) => {
  const { getVehicleById, wishlist, toggleWishlist } = useApp();
  const [showBookingForm, setShowBookingForm] = useState(false);
  
  const vehicle = getVehicleById(vehicleId);
  
  if (!vehicle) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground">Vehicle not found</p>
        <Button onClick={onBack} className="mt-4">Go Back</Button>
      </div>
    );
  }

  const isInWishlist = wishlist.includes(vehicle.id);

  const formatPrice = (price) => {
    if (price >= 100000) {
      return `₹${(price / 100000).toFixed(1)}L`;
    }
    return `₹${(price / 1000).toFixed(0)}K`;
  };

  if (showBookingForm) {
    return (
      <BookingForm 
        vehicle={vehicle}
        onBack={() => setShowBookingForm(false)}
        onClose={() => setShowBookingForm(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      {/* Header */}
      <div className="bg-gradient-hero text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={onBack}
              className="text-white hover:bg-white/20"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Vehicles
            </Button>
            <div className="flex items-center gap-2">
              <Button variant="ghost" className="text-white hover:bg-white/20">
                <Share2 className="w-4 h-4" />
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => toggleWishlist(vehicle.id)}
                className={`text-white hover:bg-white/20 ${isInWishlist ? 'text-accent' : ''}`}
              >
                <Heart className={`w-4 h-4 ${isInWishlist ? 'fill-current' : ''}`} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Main Vehicle Section - Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Left Column - Vehicle Image and Key Info */}
            <div className="space-y-6">
              {/* Vehicle Image */}
              <Card className="p-6 shadow-xl border-0 bg-gradient-to-br from-white to-secondary/30">
                <div className="relative">
                  <img 
                    src={vehicle.image} 
                    alt={vehicle.name}
                    className="w-full h-96 object-cover rounded-xl brightness-100 contrast-100"
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {vehicle.isNew && <Badge className="bg-accent text-accent-foreground">New Launch</Badge>}
                    {vehicle.discount && (
                      <Badge className="bg-destructive text-destructive-foreground">
                        {vehicle.discount}% Off
                      </Badge>
                    )}
                    {vehicle.fuelType === "Electric" && (
                      <Badge className="bg-primary text-primary-foreground">
                        <Zap className="w-3 h-3 mr-1" />
                        Electric
                      </Badge>
                    )}
                  </div>
                </div>
              </Card>

              {/* Quick Specs */}
              <Card className="p-6 shadow-xl border-0 bg-gradient-to-br from-white to-secondary/30">
                <h3 className="text-xl font-bold mb-4">Key Specifications</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 p-3 bg-secondary/10 rounded-lg">
                    <Fuel className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Mileage</p>
                      <p className="font-semibold">{vehicle.mileage} {vehicle.fuelType === 'Electric' ? 'km/charge' : 'km/l'}</p>
                    </div>
                  </div>
                  {vehicle.engineCapacity && (
                    <div className="flex items-center gap-2 p-3 bg-secondary/10 rounded-lg">
                      <Settings className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Engine</p>
                        <p className="font-semibold">{vehicle.engineCapacity}cc</p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-2 p-3 bg-secondary/10 rounded-lg">
                    <Award className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Fuel Type</p>
                      <p className="font-semibold">{vehicle.fuelType}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-secondary/10 rounded-lg">
                    <Star className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Rating</p>
                      <p className="font-semibold">{vehicle.rating}/5</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Right Column - Vehicle Details and Actions */}
            <div className="space-y-6">
              {/* Vehicle Info */}
              <Card className="p-6 shadow-xl border-0 bg-gradient-to-br from-white to-secondary/30">
                <div className="mb-4">
                  <div className="text-sm text-muted-foreground mb-1">{vehicle.brand}</div>
                  <h1 className="text-3xl font-bold text-card-foreground mb-2">{vehicle.name}</h1>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-accent text-accent" />
                      <span className="font-medium">{vehicle.rating}</span>
                      <span className="text-muted-foreground">({vehicle.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Award className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Top Rated</span>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-3xl font-bold text-card-foreground">
                      {formatPrice(vehicle.price)}
                    </span>
                    {vehicle.originalPrice && (
                      <span className="text-lg text-muted-foreground line-through">
                        {formatPrice(vehicle.originalPrice)}
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">Ex-showroom Delhi</div>
                </div>

                <p className="text-muted-foreground mb-6">{vehicle.description}</p>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button 
                    variant="hero"
                    size="lg" 
                    className="w-full py-6 text-lg hover:shadow-lg transition-all duration-300"
                    onClick={() => setShowBookingForm(true)}
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    Book Test Ride
                  </Button>
                  
                  <Button variant="accent" size="lg" className="w-full py-6 text-lg">
                    <Phone className="w-5 h-5 mr-2" />
                    Get Best Price
                  </Button>
                  
                  <Button variant="outline" size="lg" className="w-full py-6 text-lg border-2 hover:shadow-md transition-all">
                    <MapPin className="w-5 h-5 mr-2" />
                    Find Dealers
                  </Button>
                </div>
              </Card>

              {/* EMI Calculator */}
              <EMICalculator vehiclePrice={vehicle.price} />
            </div>
          </div>

          {/* Additional Sections - Full Width */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Reviews Section */}
            <Card className="p-6 shadow-xl border-0 bg-gradient-to-br from-white to-secondary/30">
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <Star className="w-5 h-5 mr-2 text-yellow-500" />
                Customer Reviews
              </h3>
              <div className="space-y-4">
                <div className="p-5 bg-secondary/10 rounded-xl">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-5 h-5 fill-accent text-accent" />
                      ))}
                    </div>
                    <span className="font-bold">Excellent Performance</span>
                  </div>
                  <p className="text-muted-foreground">
                    "Great bike with excellent fuel efficiency and smooth riding experience. Highly recommended!"
                  </p>
                  <div className="text-sm text-muted-foreground mt-3">- Verified Buyer</div>
                </div>
              </div>
            </Card>

            {/* Gallery Section */}
            <Card className="p-6 shadow-xl border-0 bg-gradient-to-br from-white to-secondary/30">
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                Photo Gallery
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <img src={vehicle.image} alt={vehicle.name} className="w-full h-48 object-cover rounded-lg" />
                <img src={vehicle.image} alt={vehicle.name} className="w-full h-48 object-cover rounded-lg" />
              </div>
            </Card>

            {/* 360° View Section */}
            <Card className="p-6 shadow-xl border-0 bg-gradient-to-br from-white to-secondary/30">
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <Eye className="w-5 h-5 mr-2" />
                360° View
              </h3>
              <div className="bg-muted rounded-lg p-4 h-full">
                <Vehicle360View 
                  vehicleId={vehicle.id}
                  vehicleName={vehicle.name}
                  baseImage={vehicle.image}
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetails;