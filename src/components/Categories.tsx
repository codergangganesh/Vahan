import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Bike, Zap, Calendar } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface CategoriesProps {
  onCategorySelect?: (category: string) => void;
}

const Categories = ({ onCategorySelect }: CategoriesProps) => {
  const { user } = useAuth();
  
  // Don't render if user is not logged in
  if (!user) {
    return null;
  }

  const categories = [
    {
      id: "bike",
      title: "Bikes",
      description: "Explore our collection of powerful motorcycles",
      icon: Bike,
      color: "bg-blue-500",
    },
    {
      id: "scooter",
      title: "Scooters",
      description: "Find the perfect scooter for your daily commute",
      icon: Bike,
      color: "bg-green-500",
    },
    {
      id: "ev",
      title: "Electric",
      description: "Discover eco-friendly electric vehicles",
      icon: Zap,
      color: "bg-purple-500",
    },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Browse by Category
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find your perfect ride from our carefully curated categories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Card 
                key={category.id} 
                className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-0 bg-gradient-to-br from-background to-secondary/20"
                onClick={() => onCategorySelect?.(category.id)}
              >
                <CardContent className="p-8 text-center">
                  <div className={`w-16 h-16 ${category.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">
                    {category.title}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {category.description}
                  </p>
                  <Button variant="ghost" className="group-hover:bg-accent/10">
                    Explore Now
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories;