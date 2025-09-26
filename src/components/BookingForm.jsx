import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, ArrowLeft, User, Phone, Mail, MapPin, Clock, CheckCircle, Fuel, Zap } from "lucide-react";

const BookingForm = ({ vehicle, onBack, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    preferredDate: '',
    preferredTime: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true);
    }, 1000);
  };

  const formatPrice = (price) => {
    if (price >= 100000) {
      return `₹${(price / 100000).toFixed(1)}L`;
    }
    return `₹${(price / 1000).toFixed(0)}K`;
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 flex items-center justify-center p-4">
        <Card className="p-8 max-w-md mx-auto text-center shadow-xl border-0 bg-gradient-to-br from-white to-secondary/30">
          <div className="bg-green-500/10 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-card-foreground mb-2">Booking Confirmed!</h2>
          <p className="text-muted-foreground mb-6">
            Your test ride for {vehicle.name} has been scheduled. 
            We'll contact you within 24 hours to confirm the details.
          </p>
          <div className="space-y-3">
            <Button variant="hero" className="w-full py-6 text-lg" onClick={onClose}>
              Continue Browsing
            </Button>
            <Button variant="outline" className="w-full py-6 text-lg" onClick={onBack}>
              Back to Vehicle Details
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      {/* Header */}
      <div className="bg-gradient-hero text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Vehicle Details
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Book Your Test Ride</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Experience the {vehicle.name} firsthand. Book a free test ride today!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <Card className="p-6 md:p-8 shadow-xl border-0 bg-gradient-to-br from-white to-secondary/30">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-muted-foreground mb-2 flex items-center">
                        <User className="w-4 h-4 mr-2" />
                        Full Name *
                      </label>
                      <div className="relative">
                        <Input
                          required
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="pl-10 py-5 text-base"
                          placeholder="Enter your full name"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-muted-foreground mb-2 flex items-center">
                        <Phone className="w-4 h-4 mr-2" />
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Input
                          required
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="pl-10 py-5 text-base"
                          placeholder="Enter your phone number"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-muted-foreground mb-2 flex items-center">
                        <Mail className="w-4 h-4 mr-2" />
                        Email Address *
                      </label>
                      <div className="relative">
                        <Input
                          required
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="pl-10 py-5 text-base"
                          placeholder="Enter your email address"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-muted-foreground mb-2 flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        City *
                      </label>
                      <div className="relative">
                        <Input
                          required
                          value={formData.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          className="pl-10 py-5 text-base"
                          placeholder="Enter your city"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-muted-foreground mb-2">
                        Preferred Date *
                      </label>
                      <Input
                        required
                        type="date"
                        value={formData.preferredDate}
                        onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="py-5 text-base"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-muted-foreground mb-2 flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        Preferred Time *
                      </label>
                      <Select value={formData.preferredTime} onValueChange={(value) => handleInputChange('preferredTime', value)}>
                        <SelectTrigger className="py-5 text-base">
                          <SelectValue placeholder="Select time slot" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="09:00">9:00 AM</SelectItem>
                          <SelectItem value="10:00">10:00 AM</SelectItem>
                          <SelectItem value="11:00">11:00 AM</SelectItem>
                          <SelectItem value="12:00">12:00 PM</SelectItem>
                          <SelectItem value="14:00">2:00 PM</SelectItem>
                          <SelectItem value="15:00">3:00 PM</SelectItem>
                          <SelectItem value="16:00">4:00 PM</SelectItem>
                          <SelectItem value="17:00">5:00 PM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                      Additional Message
                    </label>
                    <Textarea
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Any specific requirements or questions?"
                      rows={4}
                      className="text-base p-4"
                    />
                  </div>

                  <div className="bg-secondary/10 p-5 rounded-lg border border-secondary/20">
                    <p className="text-sm text-muted-foreground">
                      By booking a test ride, you agree to our terms and conditions. 
                      A valid driving license is required for the test ride.
                    </p>
                  </div>

                  <Button type="submit" variant="hero" size="lg" className="w-full py-6 text-lg">
                    <Calendar className="w-5 h-5 mr-2" />
                    Confirm Test Ride Booking
                  </Button>
                </form>
              </Card>
            </div>

            {/* Vehicle Summary */}
            <div>
              <Card className="p-6 shadow-xl border-0 bg-gradient-to-br from-white to-secondary/30 sticky top-4">
                <h3 className="text-xl font-bold mb-6 pb-2 border-b">Vehicle Summary</h3>
                
                <div className="mb-6">
                  <div className="relative rounded-xl overflow-hidden shadow-md">
                    <img 
                      src={vehicle.image} 
                      alt={vehicle.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h4 className="text-white font-bold text-lg">{vehicle.name}</h4>
                      <p className="text-white/90 text-sm">{vehicle.brand}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center pb-3 border-b">
                    <span className="text-muted-foreground flex items-center">
                      <span className="bg-primary/10 p-2 rounded-lg mr-3">
                        <MapPin className="w-4 h-4 text-primary" />
                      </span>
                      Brand
                    </span>
                    <span className="font-semibold text-lg">{vehicle.brand}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b">
                    <span className="text-muted-foreground flex items-center">
                      <span className="bg-primary/10 p-2 rounded-lg mr-3">
                        <Calendar className="w-4 h-4 text-primary" />
                      </span>
                      Model
                    </span>
                    <span className="font-semibold text-lg">{vehicle.name}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b">
                    <span className="text-muted-foreground flex items-center">
                      <span className="bg-primary/10 p-2 rounded-lg mr-3">
                        <span className="text-primary font-bold">₹</span>
                      </span>
                      Price
                    </span>
                    <span className="font-bold text-xl text-primary">{formatPrice(vehicle.price)}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b">
                    <span className="text-muted-foreground flex items-center">
                      <span className="bg-primary/10 p-2 rounded-lg mr-3">
                        <Fuel className="w-4 h-4 text-primary" />
                      </span>
                      Fuel Type
                    </span>
                    <span className="font-semibold text-lg">{vehicle.fuelType}</span>
                  </div>
                  {vehicle.mileage && (
                    <div className="flex justify-between items-center pb-3 border-b">
                      <span className="text-muted-foreground flex items-center">
                        <span className="bg-primary/10 p-2 rounded-lg mr-3">
                          <Zap className="w-4 h-4 text-primary" />
                        </span>
                        Mileage
                      </span>
                      <span className="font-semibold text-lg">{vehicle.mileage} {vehicle.fuelType === 'Electric' ? 'km/charge' : 'km/l'}</span>
                    </div>
                  )}
                </div>

                <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">Test ride duration</p>
                      <p className="text-sm text-muted-foreground">Approximately 30 minutes</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;