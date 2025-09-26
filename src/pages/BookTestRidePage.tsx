import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { CalendarIcon, Clock, User, Phone, Mail, Bike, CheckCircle, MapPin, Star, Zap, Shield } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useApp } from '@/context/AppContext';

const BookTestRidePage = ({ onBack }) => {
  const { toast } = useToast();
  const { vehicles } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    vehicleId: '',
    date: undefined,
    time: ''
  });
  const [bookings, setBookings] = useState([]);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [confirmationData, setConfirmationData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [timeSlots] = useState([
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
  ]);

  // Load bookings from localStorage on component mount
  useEffect(() => {
    const savedBookings = localStorage.getItem('testRideBookings');
    if (savedBookings) {
      setBookings(JSON.parse(savedBookings));
    }
  }, []);

  // Save bookings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('testRideBookings', JSON.stringify(bookings));
  }, [bookings]);

  // Filter vehicles based on search term
  const filteredVehicles = vehicles.filter(vehicle => 
    vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle vehicle selection
  const handleVehicleSelect = (vehicle) => {
    setSelectedVehicle(vehicle);
    setFormData(prev => ({
      ...prev,
      vehicleId: vehicle.id
    }));
    setSearchTerm('');
  };

  // Handle date selection
  const handleDateSelect = (date) => {
    setFormData(prev => ({
      ...prev,
      date: date
    }));
    setIsCalendarOpen(false);
    
    // Generate available slots for the selected date
    const dateStr = format(date, 'yyyy-MM-dd');
    const bookedSlots = bookings
      .filter(booking => booking.date === dateStr && booking.vehicleId === formData.vehicleId)
      .map(booking => booking.time);
    
    const available = timeSlots.filter(slot => !bookedSlots.includes(slot));
    setAvailableSlots(available);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.phone || !formData.email || 
        !formData.vehicleId || !formData.date || !formData.time) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // Check if slot is already booked
    const dateStr = format(formData.date, 'yyyy-MM-dd');
    const isSlotBooked = bookings.some(booking => 
      booking.date === dateStr && 
      booking.time === formData.time && 
      booking.vehicleId === formData.vehicleId
    );

    if (isSlotBooked) {
      toast({
        title: "Slot Unavailable",
        description: "This time slot is already booked for the selected vehicle. Please choose another time.",
        variant: "destructive"
      });
      return;
    }

    // Create booking
    const newBooking = {
      id: Date.now().toString(),
      ...formData,
      date: dateStr,
      vehicle: selectedVehicle,
      createdAt: new Date().toISOString()
    };

    setBookings(prev => [...prev, newBooking]);
    
    // Show confirmation
    setConfirmationData(newBooking);
    setIsConfirmationOpen(true);
    
    // Reset form
    setFormData({
      name: '',
      phone: '',
      email: '',
      vehicleId: '',
      date: undefined,
      time: ''
    });
    setSelectedVehicle(null);
    setAvailableSlots([]);

    toast({
      title: "Booking Confirmed",
      description: "Your test ride has been successfully booked!"
    });
  };

  // Handle booking cancellation
  const handleCancelBooking = (id) => {
    setBookings(prev => prev.filter(booking => booking.id !== id));
    toast({
      title: "Booking Cancelled",
      description: "Your test ride booking has been cancelled."
    });
  };

  // Get vehicle by ID
  const getVehicleById = (id) => {
    return vehicles.find(vehicle => vehicle.id === id);
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Suggest similar vehicles
  const suggestSimilarVehicles = (vehicleId) => {
    const vehicle = getVehicleById(vehicleId);
    if (!vehicle) return [];
    
    return vehicles
      .filter(v => 
        v.id !== vehicleId && 
        v.category === vehicle.category &&
        Math.abs(v.price - vehicle.price) < 50000
      )
      .slice(0, 3);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">Book Test Ride</h1>
            <p className="text-muted-foreground mt-2">
              Experience your dream vehicle before you buy
            </p>
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Button variant="outline" onClick={onBack} className="flex items-center">
              <CalendarIcon className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="border-0 bg-gradient-to-br from-primary/10 to-primary/5 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="bg-primary/20 p-3 rounded-lg">
                  <Bike className="w-6 h-6 text-primary" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-muted-foreground">Total Vehicles</p>
                  <p className="text-2xl font-bold">{vehicles.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 bg-gradient-to-br from-green-500/10 to-green-500/5 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="bg-green-500/20 p-3 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-muted-foreground">Bookings</p>
                  <p className="text-2xl font-bold">{bookings.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 bg-gradient-to-br from-blue-500/10 to-blue-500/5 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="bg-blue-500/20 p-3 rounded-lg">
                  <Star className="w-6 h-6 text-blue-500" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-muted-foreground">Satisfaction</p>
                  <p className="text-2xl font-bold">4.8/5</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Booking Form */}
        <Card className="mb-8 border-0 shadow-xl bg-gradient-to-br from-white to-secondary/30">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="w-5 h-5 mr-2 text-primary" />
              Schedule Your Test Ride
            </CardTitle>
            <p className="text-muted-foreground">
              Fill in the details below to book your test ride
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                <div>
                  <Label htmlFor="name" className="flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="mt-2"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone" className="flex items-center">
                    <Phone className="w-4 h-4 mr-2" />
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                    className="mt-2"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="email" className="flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                    className="mt-2"
                    required
                  />
                </div>
              </div>
              
              {/* Right Column */}
              <div className="space-y-6">
                <div>
                  <Label htmlFor="vehicle" className="flex items-center">
                    <Bike className="w-4 h-4 mr-2" />
                    Select Vehicle *
                  </Label>
                  <div className="mt-2">
                    {selectedVehicle ? (
                      <div className="flex items-center justify-between p-4 border border-input rounded-lg bg-background shadow-sm">
                        <div className="flex items-center">
                          <div className="bg-muted w-12 h-12 rounded-lg flex items-center justify-center mr-3">
                            <Bike className="h-6 w-6 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="font-medium">{selectedVehicle.name}</p>
                            <p className="text-xs text-muted-foreground">{selectedVehicle.brand}</p>
                          </div>
                        </div>
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setSelectedVehicle(null);
                            setFormData(prev => ({ ...prev, vehicleId: '' }));
                          }}
                        >
                          Change
                        </Button>
                      </div>
                    ) : (
                      <div className="relative">
                        <Input
                          id="vehicle"
                          placeholder="Search for a vehicle..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full"
                          required
                        />
                        {searchTerm && (
                          <div className="absolute z-10 w-full mt-1 bg-background border border-input rounded-lg shadow-lg max-h-60 overflow-auto">
                            {filteredVehicles.length > 0 ? (
                              filteredVehicles.map(vehicle => (
                                <div
                                  key={vehicle.id}
                                  className="flex items-center p-3 hover:bg-muted cursor-pointer border-b last:border-b-0"
                                  onClick={() => handleVehicleSelect(vehicle)}
                                >
                                  <div className="bg-muted w-10 h-10 rounded-md flex items-center justify-center mr-3">
                                    <Bike className="h-5 w-5 text-muted-foreground" />
                                  </div>
                                  <div>
                                    <p className="font-medium">{vehicle.name}</p>
                                    <p className="text-xs text-muted-foreground">{vehicle.brand}</p>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <div className="p-3 text-muted-foreground text-center">
                                No vehicles found
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <Label className="flex items-center">
                    <CalendarIcon className="w-4 h-4 mr-2" />
                    Select Date *
                  </Label>
                  <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal mt-2",
                          !formData.date && "text-muted-foreground"
                        )}
                        disabled={!formData.vehicleId}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.date ? format(formData.date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.date}
                        onSelect={handleDateSelect}
                        initialFocus
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div>
                  <Label htmlFor="time" className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    Select Time *
                  </Label>
                  <select
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background mt-2"
                    disabled={!formData.date}
                    required
                  >
                    <option value="">Select a time slot</option>
                    {availableSlots.length > 0 ? (
                      availableSlots.map((slot, index) => (
                        <option key={index} value={slot}>{slot}</option>
                      ))
                    ) : (
                      <option value="" disabled>
                        {formData.date 
                          ? "No available slots for this date" 
                          : "Please select a date first"}
                      </option>
                    )}
                  </select>
                </div>
              </div>
              
              <div className="md:col-span-2 flex justify-end pt-4">
                <Button type="submit" className="px-8 py-2 text-lg">
                  <Zap className="w-4 h-4 mr-2" />
                  Book Test Ride
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Booking Dashboard */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center">
              <Shield className="w-6 h-6 mr-2 text-primary" />
              Your Upcoming Test Rides <span className="text-muted-foreground text-lg ml-2">({bookings.length})</span>
            </h2>
          </div>
          
          {bookings.length === 0 ? (
            <div className="text-center py-12 bg-secondary/10 rounded-lg">
              <div className="mx-auto bg-muted w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <CalendarIcon className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">
                You haven't booked any test rides yet.
              </p>
              <p className="text-sm mt-2">Book your first test ride using the form above.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookings
                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                .map((booking) => {
                  const vehicle = getVehicleById(booking.vehicleId) || booking.vehicle;
                  const similarVehicles = suggestSimilarVehicles(booking.vehicleId);
                  
                  return (
                    <Card key={booking.id} className="w-full hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-white to-secondary/20">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-bold text-lg">{vehicle?.name || 'Vehicle'}</h3>
                            <p className="text-sm text-muted-foreground">{vehicle?.brand || 'Brand'}</p>
                          </div>
                          <Badge variant="secondary" className="flex items-center">
                            <CalendarIcon className="w-3 h-3 mr-1" />
                            {format(new Date(booking.date), 'MMM dd')}
                          </Badge>
                        </div>
                        
                        <div className="space-y-3 mb-4">
                          <div className="flex items-center text-sm">
                            <User className="w-4 h-4 mr-2 text-muted-foreground" />
                            <span>{booking.name}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                            <span>{booking.time}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Phone className="w-4 h-4 mr-2 text-muted-foreground" />
                            <span>{booking.phone}</span>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <Button 
                            size="sm" 
                            variant="destructive" 
                            onClick={() => handleCancelBooking(booking.id)}
                          >
                            Cancel
                          </Button>
                          <div className="text-right">
                            <p className="font-bold text-primary">
                              {vehicle?.price ? formatCurrency(vehicle.price) : 'Price N/A'}
                            </p>
                          </div>
                        </div>
                        
                        {similarVehicles.length > 0 && (
                          <div className="mt-4 pt-4 border-t">
                            <p className="text-sm font-medium mb-2 flex items-center">
                              <Star className="w-4 h-4 mr-1 text-yellow-500" />
                              Similar Vehicles:
                            </p>
                            <div className="space-y-2">
                              {similarVehicles.map(similar => (
                                <div 
                                  key={similar.id} 
                                  className="flex items-center justify-between text-sm p-2 bg-muted/10 rounded"
                                >
                                  <span>{similar.name}</span>
                                  <Button 
                                    size="sm" 
                                    variant="outline" 
                                    onClick={() => {
                                      handleVehicleSelect(similar);
                                      toast({
                                        title: "Vehicle Selected",
                                        description: `Switched to ${similar.name} for booking`
                                      });
                                    }}
                                  >
                                    Book
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={isConfirmationOpen} onOpenChange={setIsConfirmationOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-center flex-col">
              <div className="bg-green-500/10 p-3 rounded-full mb-4">
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
              Booking Confirmed!
            </DialogTitle>
          </DialogHeader>
          {confirmationData && (
            <div className="space-y-4">
              <p className="text-center text-muted-foreground">
                Thank you for booking a test ride. Here are your details:
              </p>
              
              <div className="bg-muted/10 rounded-lg p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium">Name:</span>
                  <span>{confirmationData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Phone:</span>
                  <span>{confirmationData.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Email:</span>
                  <span>{confirmationData.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Vehicle:</span>
                  <span>{confirmationData.vehicle?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Date:</span>
                  <span>{format(new Date(confirmationData.date), 'PPP')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Time:</span>
                  <span>{confirmationData.time}</span>
                </div>
              </div>
              
              <div className="bg-primary/5 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground flex items-start">
                  <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                  Please arrive 15 minutes before your scheduled time at our showroom.
                </p>
              </div>
              
              <div className="flex justify-center">
                <Button onClick={() => setIsConfirmationOpen(false)}>Close</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BookTestRidePage;