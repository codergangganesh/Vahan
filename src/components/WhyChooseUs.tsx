import { Card, CardContent } from "@/components/ui/card";
import { Shield, Zap, Award, Heart } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const WhyChooseUs = () => {
  const { user } = useAuth();
  
  // Don't render if user is not logged in
  if (!user) {
    return null;
  }

  const features = [
    {
      icon: Shield,
      title: "Trusted Dealers",
      description: "All our dealers are verified and trusted by thousands of customers"
    },
    {
      icon: Zap,
      title: "Fast Delivery",
      description: "Quick delivery across India with real-time tracking"
    },
    {
      icon: Award,
      title: "Best Prices",
      description: "Guaranteed best prices with price match promise"
    },
    {
      icon: Heart,
      title: "24/7 Support",
      description: "Round the clock customer support for all your queries"
    }
  ];

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Choose Vahan Bazar?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're committed to providing you with the best vehicle buying experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="border-0 bg-background hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-hero rounded-lg flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;