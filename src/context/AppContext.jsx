import React, { createContext, useContext, useState } from 'react';
import heroBike from '../assets/hero-bike.jpg';
import electricScooter from '../assets/electric-scooter.jpg';
import classicBike from '../assets/classic-bike.jpg';
import sportBike from '../assets/sport-bike.jpg';
import electricScooter2 from '../assets/electric-scooter-2.jpg';
import cruiserBike from '../assets/cruiser-bike.jpg';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

const vehiclesData = [
  {
    id: "1",
    name: "Pulsar NS200",
    brand: "Bajaj",
    price: 125000,
    originalPrice: 140000,
    image: heroBike,
    rating: 4.5,
    reviews: 1240,
    mileage: 35,
    fuelType: "Petrol",
    engineCapacity: 200,
    category: "bike",
    isNew: true,
    discount: 11,
    description: "The Bajaj Pulsar NS200 is a naked sport motorcycle that offers excellent performance and style.",
    specifications: {
      maxPower: "24.5 PS @ 9750 rpm",
      maxTorque: "18.5 Nm @ 8000 rpm",
      transmission: "6-speed manual",
      fuelCapacity: "12 liters",
      weight: "152 kg"
    }
  },
  {
    id: "2", 
    name: "Ather 450X",
    brand: "Ather",
    price: 150000,
    image: electricScooter,
    rating: 4.7,
    reviews: 856,
    mileage: 85,
    fuelType: "Electric",
    category: "scooter",
    isNew: false,
    description: "Smart electric scooter with advanced features and connected technology.",
    specifications: {
      maxPower: "6.4 kW",
      maxTorque: "26 Nm",
      range: "116 km",
      chargingTime: "5.4 hours",
      weight: "108 kg"
    }
  },
  {
    id: "3",
    name: "Royal Enfield Classic 350",
    brand: "Royal Enfield",
    price: 175000,
    image: classicBike,
    rating: 4.3,
    reviews: 2100,
    mileage: 40,
    fuelType: "Petrol",
    engineCapacity: 350,
    category: "bike",
    isNew: false,
    description: "Classic styling meets modern engineering in this timeless motorcycle.",
    specifications: {
      maxPower: "20.2 PS @ 6100 rpm",
      maxTorque: "27 Nm @ 4000 rpm",
      transmission: "5-speed manual",
      fuelCapacity: "13 liters",
      weight: "195 kg"
    }
  },
  {
    id: "4",
    name: "Honda Activa 6G",
    brand: "Honda",
    price: 75000,
    image: electricScooter2,
    rating: 4.4,
    reviews: 3200,
    mileage: 60,
    fuelType: "Petrol",
    engineCapacity: 110,
    category: "scooter",
    isNew: false,
    description: "India's most trusted scooter with proven reliability and fuel efficiency.",
    specifications: {
      maxPower: "7.79 PS @ 8000 rpm",
      maxTorque: "8.79 Nm @ 5250 rpm",
      transmission: "CVT",
      fuelCapacity: "5.3 liters",
      weight: "118 kg"
    }
  },
  {
    id: "5",
    name: "Kawasaki Ninja 300",
    brand: "Kawasaki",
    price: 320000,
    originalPrice: 340000,
    image: sportBike,
    rating: 4.6,
    reviews: 892,
    mileage: 32,
    fuelType: "Petrol",
    engineCapacity: 296,
    category: "bike",
    isNew: true,
    discount: 6,
    description: "Twin-cylinder sport bike delivering exciting performance and handling.",
    specifications: {
      maxPower: "39 PS @ 11000 rpm",
      maxTorque: "27 Nm @ 10000 rpm",
      transmission: "6-speed manual",
      fuelCapacity: "17 liters",
      weight: "172 kg"
    }
  },
  {
    id: "6",
    name: "Harley Davidson Street 750",
    brand: "Harley Davidson",
    price: 520000,
    image: cruiserBike,
    rating: 4.2,
    reviews: 445,
    mileage: 28,
    fuelType: "Petrol",
    engineCapacity: 750,
    category: "bike",
    isNew: false,
    description: "American cruiser motorcycle with distinctive styling and sound.",
    specifications: {
      maxPower: "53 PS @ 8000 rpm",
      maxTorque: "59 Nm @ 4000 rpm",
      transmission: "6-speed manual",
      fuelCapacity: "13.1 liters",
      weight: "233 kg"
    }
  },
  {
    id: "7",
    name: "TVS iQube Electric",
    brand: "TVS",
    price: 115000,
    image: electricScooter,
    rating: 4.5,
    reviews: 674,
    mileage: 75,
    fuelType: "Electric",
    category: "scooter",
    isNew: true,
    description: "Connected electric scooter with smart features and reliable performance.",
    specifications: {
      maxPower: "4.4 kW",
      maxTorque: "140 Nm",
      range: "100 km",
      chargingTime: "4.5 hours",
      weight: "118 kg"
    }
  },
  {
    id: "8",
    name: "Honda CB350RS",
    brand: "Honda",
    price: 195000,
    image: heroBike,
    rating: 4.4,
    reviews: 1156,
    mileage: 38,
    fuelType: "Petrol",
    engineCapacity: 350,
    category: "bike",
    isNew: false,
    description: "Modern classic motorcycle with retro styling and contemporary features.",
    specifications: {
      maxPower: "21 PS @ 5500 rpm",
      maxTorque: "30 Nm @ 3000 rpm",
      transmission: "5-speed manual",
      fuelCapacity: "15 liters",
      weight: "181 kg"
    }
  },
  {
    id: "9",
    name: "Yamaha R15 V4",
    brand: "Yamaha",
    price: 185000,
    image: sportBike,
    rating: 4.6,
    reviews: 1890,
    mileage: 40,
    fuelType: "Petrol",
    engineCapacity: 155,
    category: "bike",
    isNew: true,
    description: "Track-bred supersport motorcycle with advanced features and performance.",
    specifications: {
      maxPower: "18.4 PS @ 10000 rpm",
      maxTorque: "14.2 Nm @ 7500 rpm",
      transmission: "6-speed manual",
      fuelCapacity: "11 liters",
      weight: "142 kg"
    }
  },
  {
    id: "10",
    name: "Suzuki Burgman Street 125",
    brand: "Suzuki",
    price: 85000,
    image: electricScooter2,
    rating: 4.3,
    reviews: 1245,
    mileage: 55,
    fuelType: "Petrol",
    engineCapacity: 124,
    category: "scooter",
    isNew: false,
    description: "Maxi-scooter with premium features and comfortable riding experience.",
    specifications: {
      maxPower: "8.7 PS @ 6750 rpm",
      maxTorque: "10 Nm @ 5500 rpm",
      transmission: "CVT",
      fuelCapacity: "5.6 liters",
      weight: "108 kg"
    }
  },
  {
    id: "11",
    name: "KTM Duke 390",
    brand: "KTM",
    price: 285000,
    originalPrice: 295000,
    image: heroBike,
    rating: 4.5,
    reviews: 1567,
    mileage: 25,
    fuelType: "Petrol",
    engineCapacity: 373,
    category: "bike",
    isNew: false,
    discount: 3,
    description: "Ready to race naked bike with Austrian engineering and performance.",
    specifications: {
      maxPower: "43 PS @ 9000 rpm",
      maxTorque: "37 Nm @ 7000 rpm",
      transmission: "6-speed manual",
      fuelCapacity: "13.4 liters",
      weight: "149 kg"
    }
  },
  {
    id: "12",
    name: "Bajaj Chetak Electric",
    brand: "Bajaj",
    price: 125000,
    image: electricScooter,
    rating: 4.4,
    reviews: 892,
    mileage: 95,
    fuelType: "Electric",
    category: "scooter",
    isNew: true,
    description: "Premium electric scooter with modern design and smart connectivity.",
    specifications: {
      maxPower: "4.08 kW",
      maxTorque: "16 Nm",
      range: "90 km",
      chargingTime: "5 hours",
      weight: "118 kg"
    }
  },
  {
    id: "13",
    name: "Hero Splendor Plus",
    brand: "Hero",
    price: 68000,
    image: classicBike,
    rating: 4.2,
    reviews: 4560,
    mileage: 70,
    fuelType: "Petrol",
    engineCapacity: 97,
    category: "bike",
    isNew: false,
    description: "India's most fuel-efficient motorcycle with proven reliability.",
    specifications: {
      maxPower: "8.02 PS @ 8000 rpm",
      maxTorque: "8.05 Nm @ 6000 rpm",
      transmission: "4-speed manual",
      fuelCapacity: "9.5 liters",
      weight: "97 kg"
    }
  },
  {
    id: "14",
    name: "Vespa VXL 150",
    brand: "Vespa",
    price: 135000,
    image: cruiserBike,
    rating: 4.3,
    reviews: 756,
    mileage: 45,
    fuelType: "Petrol",
    engineCapacity: 150,
    category: "scooter",
    isNew: false,
    description: "Italian premium scooter with iconic design and superior build quality.",
    specifications: {
      maxPower: "11.6 PS @ 7250 rpm",
      maxTorque: "11.5 Nm @ 5500 rpm",
      transmission: "CVT",
      fuelCapacity: "7 liters",
      weight: "114 kg"
    }
  },
  {
    id: "15",
    name: "Revolt RV400",
    brand: "Revolt",
    price: 145000,
    image: electricScooter,
    rating: 4.1,
    reviews: 423,
    mileage: 150,
    fuelType: "Electric",
    category: "bike",
    isNew: true,
    description: "AI-enabled electric motorcycle with swappable battery technology.",
    specifications: {
      maxPower: "3 kW",
      maxTorque: "170 Nm",
      range: "150 km",
      chargingTime: "4.5 hours",
      weight: "108 kg"
    }
  }
];

export const AppProvider = ({ children }) => {
  const [vehicles, setVehicles] = useState(vehiclesData);
  const [filteredVehicles, setFilteredVehicles] = useState(vehiclesData);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBudget, setSelectedBudget] = useState('');
  const [wishlist, setWishlist] = useState([]);
  const [currentPage, setCurrentPage] = useState('home');

  const filterVehicles = (query, category, budget) => {
    let filtered = vehicles;

    // Filter by search query
    if (query) {
      filtered = filtered.filter(vehicle => 
        vehicle.name.toLowerCase().includes(query.toLowerCase()) ||
        vehicle.brand.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Filter by category
    if (category && category !== 'all') {
      if (category === 'ev') {
        filtered = filtered.filter(vehicle => vehicle.fuelType === 'Electric');
      } else {
        filtered = filtered.filter(vehicle => vehicle.category === category);
      }
    }

    // Filter by budget
    if (budget) {
      switch (budget) {
        case 'under-50k':
          filtered = filtered.filter(vehicle => vehicle.price < 50000);
          break;
        case '50k-1l':
          filtered = filtered.filter(vehicle => vehicle.price >= 50000 && vehicle.price <= 100000);
          break;
        case '1l-2l':
          filtered = filtered.filter(vehicle => vehicle.price > 100000 && vehicle.price <= 200000);
          break;
        case 'above-2l':
          filtered = filtered.filter(vehicle => vehicle.price > 200000);
          break;
      }
    }

    setFilteredVehicles(filtered);
  };

  const searchVehicles = (query, category, budget) => {
    setSearchQuery(query);
    setSelectedCategory(category);
    setSelectedBudget(budget);
    filterVehicles(query, category, budget);
  };

  const toggleWishlist = (vehicleId) => {
    setWishlist(prev => 
      prev.includes(vehicleId) 
        ? prev.filter(id => id !== vehicleId)
        : [...prev, vehicleId]
    );
  };

  const getVehicleById = (id) => {
    return vehicles.find(vehicle => vehicle.id === id);
  };

  const value = {
    vehicles,
    filteredVehicles,
    searchQuery,
    selectedCategory,
    selectedBudget,
    wishlist,
    currentPage,
    setCurrentPage,
    searchVehicles,
    toggleWishlist,
    getVehicleById,
    filterVehicles
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};