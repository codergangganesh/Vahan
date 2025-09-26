import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { X, Upload, Edit, Trash2, Eye, Camera, DollarSign, Calendar, Gauge, Fuel, Settings, Search, Lock, User, Key, Tag, Building, Plus, Save, FileText, ArrowLeft, Bike } from "lucide-react";
import { useApp } from '@/context/AppContext';
import { useAuth } from '@/context/AuthContext';

const SellYourBikePage = ({ onBack }) => {
  const { toast } = useToast();
  const { vehicles, setVehicles } = useApp();
  const { user, authenticateSellBike, sellBikeAuth } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    price: '',
    year: '',
    mileage: '',
    fuelType: '',
    engineCapacity: '',
    description: '',
    category: 'bike',
    image: null
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [userListings, setUserListings] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 500000]);
  const [sortBy, setSortBy] = useState('newest');

  // Check if user has access to this page
  useEffect(() => {
    // If user is not authenticated at all, redirect to login
    if (!user) {
      // This should be handled by the App.jsx routing
      return;
    }
    
    // If user is authenticated but not specifically authorized for Sell Your Bike
    if (user && !sellBikeAuth) {
      setShowAuthModal(true);
    }
  }, [user, sellBikeAuth]);

  // Load user listings from localStorage on component mount
  useEffect(() => {
    const savedListings = localStorage.getItem('userListings');
    if (savedListings) {
      setUserListings(JSON.parse(savedListings));
    }
  }, []);

  // Save user listings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('userListings', JSON.stringify(userListings));
  }, [userListings]);

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const result = await authenticateSellBike(authEmail, authPassword);
      if (result.success) {
        setShowAuthModal(false);
        toast({
          title: "Authentication Successful",
          description: "You can now list your bike for sale.",
        });
      } else {
        toast({
          title: "Authentication Failed",
          description: result.error || "Invalid credentials",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Authentication Error",
        description: error.message || "Failed to authenticate",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file
      }));
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.brand || !formData.price || !formData.year) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const newListing = {
      id: editingId || Date.now().toString(),
      ...formData,
      price: Number(formData.price),
      year: Number(formData.year),
      mileage: Number(formData.mileage),
      engineCapacity: Number(formData.engineCapacity),
      createdAt: editingId ? userListings.find(item => item.id === editingId)?.createdAt : new Date().toISOString()
    };

    if (editingId) {
      // Update existing listing
      setUserListings(prev => 
        prev.map(item => item.id === editingId ? newListing : item)
      );
      toast({
        title: "Success",
        description: "Listing updated successfully"
      });
      setEditingId(null);
    } else {
      // Add new listing
      setUserListings(prev => [...prev, newListing]);
      toast({
        title: "Success",
        description: "Bike listing created successfully"
      });
    }

    // Reset form
    setFormData({
      name: '',
      brand: '',
      price: '',
      year: '',
      mileage: '',
      fuelType: '',
      engineCapacity: '',
      description: '',
      category: 'bike',
      image: null
    });
    setImagePreview(null);
  };

  const handleEdit = (listing) => {
    setFormData({
      name: listing.name,
      brand: listing.brand,
      price: listing.price.toString(),
      year: listing.year.toString(),
      mileage: listing.mileage.toString(),
      fuelType: listing.fuelType,
      engineCapacity: listing.engineCapacity.toString(),
      description: listing.description,
      category: listing.category,
      image: null
    });
    setImagePreview(null);
    setEditingId(listing.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    setUserListings(prev => prev.filter(item => item.id !== id));
    toast({
      title: "Deleted",
      description: "Listing removed successfully"
    });
    
    if (editingId === id) {
      setFormData({
        name: '',
        brand: '',
        price: '',
        year: '',
        mileage: '',
        fuelType: '',
        engineCapacity: '',
        description: '',
        category: 'bike',
        image: null
      });
      setImagePreview(null);
      setEditingId(null);
    }
  };

  const filteredListings = userListings.filter(listing => {
    const matchesSearch = listing.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          listing.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || listing.category === filterCategory;
    const matchesPrice = listing.price >= priceRange[0] && listing.price <= priceRange[1];
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Show authentication modal if user is not authorized
  if (!sellBikeAuth && user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Sell Your Bike</h1>
              <p className="text-muted-foreground mt-2">
                Special authentication required to list your vehicle
              </p>
            </div>
            <Button variant="outline" onClick={onBack}>
              Back to Home
            </Button>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-secondary/30">
              <CardHeader className="text-center">
                <div className="mx-auto bg-gradient-hero w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <Lock className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl">Special Authentication Required</CardTitle>
                <CardDescription>
                  To list your bike for sale, please enter the special credentials.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAuthSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="authEmail" className="flex items-center">
                        <User className="w-4 h-4 mr-2" />
                        Email Address
                      </Label>
                      <Input
                        id="authEmail"
                        type="email"
                        value={authEmail}
                        onChange={(e) => setAuthEmail(e.target.value)}
                        placeholder="Enter special email"
                        required
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="authPassword" className="flex items-center">
                        <Key className="w-4 h-4 mr-2" />
                        Password
                      </Label>
                      <Input
                        id="authPassword"
                        type="password"
                        value={authPassword}
                        onChange={(e) => setAuthPassword(e.target.value)}
                        placeholder="Enter special password"
                        required
                        className="mt-2"
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full py-6 text-lg" size="lg">
                    Authenticate & Proceed
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">Sell Your Bike</h1>
            <p className="text-muted-foreground mt-2">
              List your vehicle and get the best price from verified buyers
            </p>
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Button variant="outline" onClick={onBack} className="flex items-center">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-0 bg-gradient-to-br from-primary/10 to-primary/5">
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="bg-primary/20 p-2 rounded-lg">
                  <DollarSign className="w-6 h-6 text-primary" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-muted-foreground">Total Listings</p>
                  <p className="text-2xl font-bold">{userListings.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 bg-gradient-to-br from-green-500/10 to-green-500/5">
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="bg-green-500/20 p-2 rounded-lg">
                  <Tag className="w-6 h-6 text-green-500" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-muted-foreground">Avg. Price</p>
                  <p className="text-2xl font-bold">
                    {userListings.length > 0 
                      ? formatCurrency(userListings.reduce((sum, item) => sum + item.price, 0) / userListings.length) 
                      : '₹0'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 bg-gradient-to-br from-blue-500/10 to-blue-500/5">
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="bg-blue-500/20 p-2 rounded-lg">
                  <Calendar className="w-6 h-6 text-blue-500" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-muted-foreground">Avg. Year</p>
                  <p className="text-2xl font-bold">
                    {userListings.length > 0 
                      ? Math.round(userListings.reduce((sum, item) => sum + item.year, 0) / userListings.length) 
                      : '0'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 bg-gradient-to-br from-purple-500/10 to-purple-500/5">
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="bg-purple-500/20 p-2 rounded-lg">
                  <Bike className="w-6 h-6 text-purple-500" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-muted-foreground">Categories</p>
                  <p className="text-2xl font-bold">
                    {[...new Set(userListings.map(item => item.category))].length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Listing Form */}
        <Card className="mb-8 border-0 shadow-xl bg-gradient-to-br from-white to-secondary/30">
          <CardHeader>
            <CardTitle className="flex items-center">
              {editingId ? (
                <>
                  <Edit className="w-5 h-5 mr-2" />
                  Edit Your Listing
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5 mr-2" />
                  Create New Listing
                </>
              )}
            </CardTitle>
            <CardDescription>
              Fill in the details below to list your vehicle for sale
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                <div>
                  <Label htmlFor="name" className="flex items-center">
                    <Bike className="w-4 h-4 mr-2" />
                    Vehicle Name *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g., Pulsar NS200"
                    required
                    className="mt-2"
                  />
                </div>
                
                <div>
                  <Label htmlFor="brand" className="flex items-center">
                    <Building className="w-4 h-4 mr-2" />
                    Brand *
                  </Label>
                  <Input
                    id="brand"
                    name="brand"
                    value={formData.brand}
                    onChange={handleInputChange}
                    placeholder="e.g., Bajaj"
                    required
                    className="mt-2"
                  />
                </div>
                
                <div>
                  <Label htmlFor="price" className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-2" />
                    Asking Price (₹) *
                  </Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="e.g., 125000"
                    required
                    className="mt-2"
                  />
                </div>
                
                <div>
                  <Label htmlFor="year" className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    Year of Purchase *
                  </Label>
                  <Input
                    id="year"
                    name="year"
                    type="number"
                    value={formData.year}
                    onChange={handleInputChange}
                    placeholder="e.g., 2020"
                    min="1990"
                    max={new Date().getFullYear()}
                    required
                    className="mt-2"
                  />
                </div>
                
                <div>
                  <Label htmlFor="mileage" className="flex items-center">
                    <Gauge className="w-4 h-4 mr-2" />
                    Mileage (kmpl)
                  </Label>
                  <Input
                    id="mileage"
                    name="mileage"
                    type="number"
                    value={formData.mileage}
                    onChange={handleInputChange}
                    placeholder="e.g., 35"
                    className="mt-2"
                  />
                </div>
              </div>
              
              {/* Right Column */}
              <div className="space-y-6">
                <div>
                  <Label htmlFor="fuelType" className="flex items-center">
                    <Fuel className="w-4 h-4 mr-2" />
                    Fuel Type
                  </Label>
                  <Input
                    id="fuelType"
                    name="fuelType"
                    value={formData.fuelType}
                    onChange={handleInputChange}
                    placeholder="e.g., Petrol, Electric"
                    className="mt-2"
                  />
                </div>
                
                <div>
                  <Label htmlFor="engineCapacity" className="flex items-center">
                    <Settings className="w-4 h-4 mr-2" />
                    Engine Capacity (cc)
                  </Label>
                  <Input
                    id="engineCapacity"
                    name="engineCapacity"
                    type="number"
                    value={formData.engineCapacity}
                    onChange={handleInputChange}
                    placeholder="e.g., 200"
                    className="mt-2"
                  />
                </div>
                
                <div>
                  <Label htmlFor="category" className="flex items-center">
                    <Tag className="w-4 h-4 mr-2" />
                    Category
                  </Label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background mt-2"
                  >
                    <option value="bike">Bike</option>
                    <option value="scooter">Scooter</option>
                    <option value="ev">Electric Vehicle</option>
                  </select>
                </div>
                
                <div>
                  <Label htmlFor="image" className="flex items-center">
                    <Camera className="w-4 h-4 mr-2" />
                    Vehicle Image
                  </Label>
                  <div className="flex items-center space-x-4 mt-2">
                    <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted/80 transition-colors">
                      {imagePreview ? (
                        <img 
                          src={imagePreview} 
                          alt="Preview" 
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">Upload Image</span>
                        </div>
                      )}
                      <input 
                        type="file" 
                        className="hidden" 
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </label>
                    {imagePreview && (
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setImagePreview(null);
                          setFormData(prev => ({ ...prev, image: null }));
                        }}
                      >
                        <X className="w-4 h-4 mr-1" />
                        Remove
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Full Width */}
              <div className="md:col-span-2">
                <Label htmlFor="description" className="flex items-center">
                  <FileText className="w-4 h-4 mr-2" />
                  Description
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe your vehicle's condition, features, and any additional details..."
                  rows={4}
                  className="mt-2"
                />
              </div>
              
              <div className="md:col-span-2 flex justify-end space-x-4 pt-4">
                {editingId && (
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => {
                      setEditingId(null);
                      setFormData({
                        name: '',
                        brand: '',
                        price: '',
                        year: '',
                        mileage: '',
                        fuelType: '',
                        engineCapacity: '',
                        description: '',
                        category: 'bike',
                        image: null
                      });
                      setImagePreview(null);
                    }}
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                )}
                <Button type="submit" className="px-8 py-2">
                  {editingId ? (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Update Listing
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 mr-2" />
                      Create Listing
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Live Preview */}
        <div className="mb-8">
          <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
            <DialogTrigger asChild>
              <Button variant="secondary" className="w-full md:w-auto">
                <Eye className="w-4 h-4 mr-2" />
                Preview Your Listing
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="flex items-center">
                  <Eye className="w-5 h-5 mr-2" />
                  Live Preview
                </DialogTitle>
              </DialogHeader>
              <div className="bg-muted/10 rounded-lg p-6">
                <Card className="w-full border-0 shadow-lg">
                  <div className="relative">
                    {imagePreview ? (
                      <img 
                        src={imagePreview} 
                        alt="Vehicle preview" 
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                    ) : (
                      <div className="bg-muted w-full h-48 rounded-t-lg flex items-center justify-center">
                        <span className="text-muted-foreground">No image uploaded</span>
                      </div>
                    )}
                    <Badge className="absolute top-2 right-2" variant="secondary">
                      {formData.category === 'ev' ? 'Electric' : formData.category}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg">{formData.name || 'Vehicle Name'}</h3>
                        <p className="text-sm text-muted-foreground">{formData.brand || 'Brand'}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <p className="text-2xl font-bold text-primary">
                        {formData.price ? formatCurrency(Number(formData.price)) : '₹0'}
                      </p>
                      {formData.year && (
                        <p className="text-sm text-muted-foreground mt-1">{formData.year} Model</p>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between mt-4 pt-4 border-t">
                      <div className="flex space-x-4 text-sm">
                        {formData.mileage && (
                          <span className="flex items-center">
                            <Gauge className="w-4 h-4 mr-1" />
                            {formData.mileage} kmpl
                          </span>
                        )}
                        {formData.engineCapacity && (
                          <span className="flex items-center">
                            <Settings className="w-4 h-4 mr-1" />
                            {formData.engineCapacity} cc
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {formData.fuelType || 'Fuel Type'}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* User Listings */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h2 className="text-2xl font-bold">Your Listings <span className="text-muted-foreground text-lg">({userListings.length})</span></h2>
            
            {/* Filters */}
            <div className="flex flex-col md:flex-row md:items-center gap-4 mt-4 md:mt-0">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search listings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full md:w-48"
                />
              </div>
              
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-2 border border-input rounded-md bg-background"
              >
                <option value="all">All Categories</option>
                <option value="bike">Bike</option>
                <option value="scooter">Scooter</option>
                <option value="ev">Electric Vehicle</option>
              </select>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-input rounded-md bg-background"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
              </select>
            </div>
          </div>
          
          {/* Price Slider */}
          <div className="mb-6 p-4 bg-secondary/10 rounded-lg">
            <div className="flex justify-between mb-2">
              <Label>Price Range</Label>
              <span className="text-sm font-medium">
                {formatCurrency(priceRange[0])} - {formatCurrency(priceRange[1])}
              </span>
            </div>
            <Slider
              defaultValue={[0, 500000]}
              max={500000}
              step={10000}
              value={priceRange}
              onValueChange={setPriceRange}
              className="w-full"
            />
          </div>
          
          {/* Listings Grid */}
          {filteredListings.length === 0 ? (
            <div className="text-center py-12 bg-secondary/10 rounded-lg">
              <div className="mx-auto bg-muted w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">
                {userListings.length === 0 
                  ? "You haven't listed any vehicles yet." 
                  : "No listings match your filters."}
              </p>
              <p className="text-sm mt-2">Create your first listing using the form above.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredListings.map((listing) => (
                <Card key={listing.id} className="w-full hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-white to-secondary/20">
                  <div className="relative">
                    {listing.image ? (
                      <img 
                        src={listing.image} 
                        alt={listing.name} 
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                    ) : (
                      <div className="bg-muted w-full h-48 rounded-t-lg flex items-center justify-center">
                        <Bike className="w-12 h-12 text-muted-foreground" />
                      </div>
                    )}
                    <Badge className="absolute top-2 right-2" variant="secondary">
                      {listing.category === 'ev' ? 'Electric' : listing.category}
                    </Badge>
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute top-2 left-2 bg-white/80 hover:bg-white"
                      onClick={() => handleEdit(listing)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 left-12 bg-white/80 hover:bg-white"
                      onClick={() => handleDelete(listing.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg">{listing.name}</h3>
                        <p className="text-sm text-muted-foreground">{listing.brand}</p>
                      </div>
                      <Badge variant="outline">{listing.year}</Badge>
                    </div>
                    
                    <div className="mt-4">
                      <p className="text-2xl font-bold text-primary">
                        {formatCurrency(listing.price)}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4 pt-4 border-t">
                      <div className="flex space-x-4 text-sm">
                        {listing.mileage && (
                          <span className="flex items-center">
                            <Gauge className="w-4 h-4 mr-1" />
                            {listing.mileage} kmpl
                          </span>
                        )}
                        {listing.engineCapacity && (
                          <span className="flex items-center">
                            <Settings className="w-4 h-4 mr-1" />
                            {listing.engineCapacity} cc
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {listing.fuelType || 'N/A'}
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t">
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {listing.description || 'No description provided'}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellYourBikePage;