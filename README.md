

## 🚀 Project Overview

**Live URL**: https://vahan-seven.vercel.app/


Vahan Bazar is a modern two-wheeler marketplace web application that connects buyers, sellers, and dealerships in a single platform. Users can browse bikes, scooters, and electric vehicles (EVs), search and filter by brand, price, or fuel type, view detailed specifications with images, compare models side by side, use EMI and fuel cost calculators, check upcoming launches, explore showrooms, and book test rides or sell used bikes.




## ⚠️ SECURITY NOTICE

**Important**: This repository previously contained exposed Supabase credentials in the `.env` file. These credentials have been:
1. Removed from the git history
2. Invalidated in Supabase
3. Replaced with placeholder values

If you have cloned this repository before September 27, 2025, please pull the latest changes to get the updated `.env` file with placeholder values.

For security reasons, you should never commit sensitive information like API keys, database credentials, or other secrets to a public repository. Always use environment variables and include `.env` in your `.gitignore` file.

## 📝 Problem Statement

Build a comprehensive two-wheeler marketplace web app where users can:
- Browse bikes, scooters, and electric vehicles (EVs)
- Search and filter by brand, price, or fuel type
- View detailed specs with images
- Compare models side by side
- Use EMI and fuel cost calculators
- Check upcoming launches
- Explore showrooms
- Book test rides or sell used bikes

## 🎯 Objective

To design and develop an online two-wheeler marketplace that connects buyers, sellers, and dealerships under a single platform. The platform helps users discover the right vehicle, compare options, calculate affordability, and book rides, while dealerships can manage their inventory and track sales.

## 🛠️ Tech Stack

### Frontend
- **React + Vite** - Fast and modular development
- **TypeScript** - Type safety and better development experience
- **TailwindCSS** - Responsive styling and modern UI components
- **Shadcn/ui** - Pre-built accessible UI components
- **React Router** - Client-side navigation
- **Lucide React** - Beautiful icons

### Backend & Authentication
- **Supabase** - Backend-as-a-Service (Authentication, Database, Storage)
- **Node.js** - Runtime environment

### Database
- **Supabase PostgreSQL** - Structured data storage (users, bookings, inventory)

### Others
- **Vercel** - Deployment and hosting
- **Cloudinary** - Image hosting and optimization
- **Google Maps API** - Showroom locator (future integration)

## 📐 Architecture & Features

### Core Features Implemented

✅ **Browse and filter bikes, scooters, and EVs**  
✅ **Advanced search by brand, price, fuel type, mileage**  
✅ **Detailed product pages with images, specifications, and reviews**  
✅ **Model comparison (multiple bikes side by side)**  
✅ **EMI & Fuel cost calculators**  
✅ **Upcoming launches with countdowns and teasers**  
✅ **Showroom locator with map integration**  
✅ **Book test rides online**  
✅ **Sell used bikes (upload bike details + images)**  
✅ **Responsive, mobile-first design with modern UI**  

### Authentication & Authorization
- **Email/Password Authentication**
- **Google OAuth Integration**
- **Protected Routes** - Users must log in to access marketplace features
- **Role-based Access** - Special permissions for selling bikes and booking test rides

### Key Pages & Components

1. **Landing Page**
   - Modern UI with search bar and filters
   - Featured bikes showcase
   - Upcoming launches section
   - Testimonials and reviews

2. **Browse & Search**
   - Comprehensive bike listing with advanced filters
   - Category-based browsing (Bikes, Scooters, EVs)
   - Price range sliders and sorting options

3. **Bike Details Page**
   - High-quality images with 360° view
   - Detailed specifications and features
   - EMI calculator integration
   - Fuel cost estimator
   - Comparison option with other models
   - Book test ride functionality

4. **Comparison Module**
   - Side-by-side comparison of multiple bikes
   - Feature-by-feature comparison
   - Price and specification differences

5. **Dealership Page**
   - Showroom locator with Google Maps integration
   - Dealer information and contact details
   - Nearest showroom finder

6. **Sell Bike Module**
   - Form to upload used bike details and images
   - Special authentication for sellers
   - Listing management dashboard

7. **Test Ride Booking**
   - Online form to book test rides with dealerships
   - Date and time selection
   - Confirmation and reminder system

8. **User Profile & Authentication**
   - Login/Signup with email or Google
   - Profile management
   - Wishlist functionality
   - Booking history

## 🎨 UI/UX Design

### Design Principles
- **Modern & Sleek** - Clean interfaces with gradient backgrounds and card-based layouts
- **Responsive** - Mobile-first approach with adaptive layouts
- **Intuitive Navigation** - Easy-to-use menus and clear information hierarchy
- **Performance Optimized** - Fast loading times and smooth interactions

### Key Design Elements
- **Gradient Backgrounds** - Subtle gradients for visual depth
- **Card-based Layouts** - Consistent card designs for content presentation
- **Interactive Components** - Hover effects and smooth transitions
- **Accessibility** - Proper contrast ratios and keyboard navigation

## 👥 Team Contributions

| Team Member | Contribution |
|-------------|--------------|
| Nandyal Ram Sai | Frontend development (React + Tailwind UI, Landing Page, Bike Listing UI) |
| Sanniboyina Kavya | Backend API development (Node.js/Express, authentication, data models) |
| Mannam Ganesh Babu | Database design (PostgreSQL schema, MongoDB integration for reviews/listings) |
| Shaik Samreen | EMI & Fuel cost calculator logic, bike comparison module |
| Kamani Sashank | Test ride booking & Sell used bike module (form handling, uploads) |

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- Bun package manager
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone <https://github.com/codergangganesh/Vahan.git>
cd Vahan
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - create a .env file in root of the project 
   ```bash
   SUPABASE_URL=YOUR URL
   SUPABASE_ANON_KEY=YOUR ANON KEY
   ```
   - Update `.env.local` with your actual Supabase credentials
   - **Important**: Never commit your actual credentials to the repository

4. Run the development server:
```bash
npm run dev
```

### Building for Production
```bash
npm run build
```

### Deployment
The app is configured for deployment on Vercel:
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy with a single click

## 📊 Project Structure

```
src/
├── components/          # Reusable UI components
├── context/             # React context providers
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions and helpers
├── pages/               # Page components
└── App.jsx              # Main application component
```

## 🛡️ Security & Git Configuration

### Git Ignore
The project includes a comprehensive `.gitignore` file that excludes:
- Sensitive environment files (`.env`, `.env.local`, `.env.*.local`)
- Dependency directories (`node_modules`)
- Build outputs (`/dist`)
- Log files and OS-generated files
- Editor-specific files

### Environment Variables
All sensitive configuration is stored in environment variables:
- Supabase credentials
- API keys
- Database connection strings

**Never commit sensitive information to the repository.** The `.env` file in the repository only contains placeholder values.

### Security Best Practices
1. Always use `.env.local` for your actual credentials (this is gitignored)
2. Never share your actual credentials in code repositories
3. Regularly rotate your API keys and credentials
4. Use strong, unique passwords for all accounts
5. Enable two-factor authentication where available

### Environment File Hierarchy
1. `.env` - Contains placeholder values (committed to repository)
2. `.env.local` - Contains actual credentials (gitignored)
3. `.env.example` - Template for creating `.env.local` (committed to repository)

When the application runs, it will load variables in this order, with later files overwriting earlier ones.

## 🌐 GitHub Workflow

### Pushing Changes to GitHub

1. **Initialize Git** (if not already done):
```bash
git init
git remote add origin <your-repository-url>
```

2. **Stage and commit changes**:
```bash
git add .
git commit -m "Your descriptive commit message"
```

3. **Push to GitHub**:
```bash
git push -u origin main
```

### Best Practices
- Always pull the latest changes before pushing:
```bash
git pull origin main
```
- Use descriptive commit messages
- Push changes frequently to avoid conflicts
- Never push sensitive information (`.env` files with real credentials)

## 🔮 Future Enhancements

- **Admin/Dealer Dashboard** - Inventory management, leads tracking, analytics
- **Payment Gateway Integration** - Razorpay/Stripe for transactions
- **Advanced Search Filters** - AI-powered recommendations
- **Mobile App** - React Native version for mobile devices
- **Social Features** - User reviews, ratings, and community discussions

## 📞 Support

For support, email [team-email] or file an issue in the repository.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
#


