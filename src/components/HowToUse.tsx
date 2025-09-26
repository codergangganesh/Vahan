import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, User, Bike, Calendar, CreditCard, CheckCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const HowToUse = () => {
  const { user } = useAuth();
  
  // Don't render if user is not logged in
  if (!user) {
    return null;
  }

  const steps = [
    {
      id: 1,
      icon: User,
      title: "Create Account",
      description: "Sign up with your email and create a secure password to access all features."
    },
    {
      id: 2,
      icon: Search,
      title: "Search Vehicles",
      description: "Use our powerful search filters to find bikes, scooters, or electric vehicles."
    },
    {
      id: 3,
      icon: Bike,
      title: "View Details",
      description: "Explore detailed specifications, pricing, and reviews for your selected vehicle."
    },
    {
      id: 4,
      icon: Calendar,
      title: "Book Test Ride",
      description: "Schedule a convenient time to test ride your favorite vehicle."
    },
    {
      id: 5,
      icon: CreditCard,
      title: "Make Payment",
      description: "Complete your purchase securely through our trusted payment gateway."
    },
    {
      id: 6,
      icon: CheckCircle,
      title: "Receive Vehicle",
      description: "Get your new vehicle delivered or pick it up from our authorized dealer."
    }
  ];

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How to Use Vahan Bazar
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Follow these simple steps to find and buy your perfect two-wheeler
          </p>
        </div>

        {/* Step-by-step guide */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <Card key={step.id} className="border-0 bg-background shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-hero rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-center text-xl">
                    <span className="inline-flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full text-sm font-bold mr-2">
                      {step.id}
                    </span>
                    {step.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Flowchart visualization */}
        <Card className="border-0 bg-background shadow-lg max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Complete Process Flow</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              {/* Flowchart steps */}
              <div className="relative">
                {/* Connecting lines */}
                <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-hero transform -translate-x-1/2 z-0 hidden md:block"></div>
                
                <div className="space-y-8 relative z-10">
                  {steps.map((step, index) => {
                    const IconComponent = step.icon;
                    return (
                      <div key={step.id} className="flex items-center">
                        <div className="flex-1 hidden md:block"></div>
                        <div className="w-16 h-16 bg-gradient-hero rounded-2xl flex items-center justify-center flex-shrink-0">
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>
                        <div className="ml-6 flex-1">
                          <div className="bg-secondary/20 rounded-lg p-4">
                            <h3 className="font-bold text-lg flex items-center">
                              <span className="inline-flex items-center justify-center w-6 h-6 bg-primary text-primary-foreground rounded-full text-xs font-bold mr-2">
                                {step.id}
                              </span>
                              {step.title}
                            </h3>
                            <p className="text-muted-foreground mt-1">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <Button variant="hero" size="lg">
                Get Started Now
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default HowToUse;