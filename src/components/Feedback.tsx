import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, User, Calendar, MessageCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const Feedback = () => {
  const { user } = useAuth();
  
  // Don't render if user is not logged in
  if (!user) {
    return null;
  }

  const feedbackItems = [
    {
      id: 1,
      name: "Rajesh Kumar",
      rating: 5,
      date: "2024-09-15",
      comment: "Found my dream bike within a week! The process was smooth and the customer support was excellent.",
      vehicle: "Yamaha FZ-S V4"
    },
    {
      id: 2,
      name: "Priya Sharma",
      rating: 4,
      date: "2024-09-10",
      comment: "Great platform for comparing different models. Sold my old scooter quickly at a fair price.",
      vehicle: "Honda Activa 6G"
    },
    {
      id: 3,
      name: "Amit Patel",
      rating: 5,
      date: "2024-09-05",
      comment: "The test ride booking feature saved me so much time. Highly recommended for bike enthusiasts!",
      vehicle: "Bajaj Pulsar NS200"
    },
    {
      id: 4,
      name: "Sneha Reddy",
      rating: 4,
      date: "2024-08-28",
      comment: "Easy to use interface and genuine listings. Will definitely use again for my next purchase.",
      vehicle: "TVS Jupiter"
    },
    {
      id: 5,
      name: "Vikram Singh",
      rating: 5,
      date: "2024-08-20",
      comment: "Impressive collection of electric vehicles. The filtering options made my search very efficient.",
      vehicle: "Okinawa iPraise+"
    },
    {
      id: 6,
      name: "Anjali Mehta",
      rating: 4,
      date: "2024-08-15",
      comment: "Good experience overall. The vehicle details were accurate and the dealer was trustworthy.",
      vehicle: "Royal Enfield Classic 350"
    }
  ];

  const renderStars = (rating) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`w-4 h-4 ${i < rating ? 'fill-yellow-500 text-yellow-500' : 'text-gray-300'}`} 
          />
        ))}
      </div>
    );
  };

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Customer Feedback
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hear what our customers have to say about their experience with Vahan Bazar
          </p>
        </div>

        {/* Side-flow animation container */}
        <div className="relative overflow-hidden py-8">
          {/* First row of feedback cards */}
          <div className="animate-flow-left whitespace-nowrap mb-6">
            <div className="inline-flex space-x-6">
              {[...feedbackItems, ...feedbackItems].map((feedback, index) => (
                <Card key={`${feedback.id}-${index}`} className="inline-block w-80 mx-2 border-0 bg-background shadow-lg">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-hero rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-bold text-foreground">{feedback.name}</h4>
                          <p className="text-xs text-muted-foreground">{feedback.vehicle}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{feedback.date}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-3">
                      {renderStars(feedback.rating)}
                    </div>
                    <p className="text-muted-foreground text-sm">
                      "{feedback.comment}"
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Second row of feedback cards (opposite direction) */}
          <div className="animate-flow-right whitespace-nowrap">
            <div className="inline-flex space-x-6">
              {[...feedbackItems.slice().reverse(), ...feedbackItems.slice().reverse()].map((feedback, index) => (
                <Card key={`reverse-${feedback.id}-${index}`} className="inline-block w-80 mx-2 border-0 bg-background shadow-lg">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-hero rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-bold text-foreground">{feedback.name}</h4>
                          <p className="text-xs text-muted-foreground">{feedback.vehicle}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{feedback.date}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-3">
                      {renderStars(feedback.rating)}
                    </div>
                    <p className="text-muted-foreground text-sm">
                      "{feedback.comment}"
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Stats section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
          <Card className="text-center border-0 bg-background shadow-lg">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">4.8/5</h3>
              <p className="text-muted-foreground">Average Rating</p>
            </CardContent>
          </Card>
          <Card className="text-center border-0 bg-background shadow-lg">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">15,000+</h3>
              <p className="text-muted-foreground">Happy Customers</p>
            </CardContent>
          </Card>
          <Card className="text-center border-0 bg-background shadow-lg">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">98%</h3>
              <p className="text-muted-foreground">Satisfaction Rate</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Feedback;