import { Button } from "@/components/ui/button";
import { Home, Search, Bike } from "lucide-react";

interface NotFoundProps {
  onBack?: () => void;
}

const NotFound = ({ onBack }: NotFoundProps) => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
          <div className="w-24 h-24 bg-gradient-hero rounded-full flex items-center justify-center mb-6">
            <Bike className="w-12 h-12 text-white" />
          </div>
          
          <h1 className="text-6xl font-bold text-foreground mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-foreground mb-4">Page Not Found</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-md">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              onClick={onBack || (() => window.location.reload())}
              className="flex items-center justify-center"
            >
              <Home className="w-4 h-4 mr-2" />
              Return to Home
            </Button>
            
            <Button 
              variant="outline"
              onClick={() => {
                const searchInput = document.querySelector('input[placeholder="Search vehicles..."]');
                if (searchInput) {
                  searchInput.focus();
                }
              }}
            >
              <Search className="w-4 h-4 mr-2" />
              Search Vehicles
            </Button>
          </div>
          
          <div className="mt-12 p-6 bg-secondary/20 rounded-lg max-w-lg">
            <h3 className="text-lg font-semibold text-foreground mb-2">Need Help?</h3>
            <p className="text-muted-foreground mb-4">
              If you believe this is an error, please contact our support team or try searching for what you need.
            </p>
            <Button variant="link" className="p-0 h-auto">
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;