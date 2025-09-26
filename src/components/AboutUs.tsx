import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Target, Lightbulb, Award } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const AboutUs = () => {
  const { user } = useAuth();
  
  // Don't render if user is not logged in
  if (!user) {
    return null;
  }

  const features = [
    {
      icon: Users,
      title: "Our Mission",
      description: "To revolutionize the two-wheeler marketplace by connecting buyers and sellers through a transparent, trustworthy, and technology-driven platform."
    },
    {
      icon: Target,
      title: "Our Vision",
      description: "To become India's most preferred destination for buying and selling two-wheelers, known for our customer-centric approach and innovative solutions."
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We continuously strive to bring cutting-edge technology and user-friendly features to enhance your vehicle buying experience."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Committed to delivering excellence in every interaction, ensuring complete satisfaction for both buyers and sellers."
    }
  ];

  const team = [
    {
      name: "Mannam Ganesh Babu",
      role: "CEO & Founder",
      description: "Visionary leader with over 15 years of experience in the automotive industry."
    },
    {
      name: "Sanniboyina Kavya",
      role: "Backend Developer",
      description: "Expert in building scalable backend systems and API development."
    },
    {
      name: "Kondapalli Praneeth",
      role: "Frontend Developer",
      description: "Specializes in creating intuitive and responsive user interfaces."
    },
    {
      name: "Gorla Nikhil",
      role: "UI/UX Designer",
      description: "Passionate about creating beautiful and functional user experiences."
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            About Vahan Bazar
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            India's premier two-wheeler marketplace connecting buyers and sellers with trusted dealers nationwide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-4">Our Story</h3>
            <p className="text-muted-foreground mb-4">
              Founded in 2024, Vahan Bazar emerged from a simple idea: to make buying and selling two-wheelers 
              easier, more transparent, and more trustworthy. Our team of passionate automotive enthusiasts 
              and technology experts came together to create a platform that addresses the pain points of 
              traditional vehicle marketplaces.
            </p>
            <p className="text-muted-foreground mb-4">
              Today, we're proud to serve thousands of customers across India, helping them find their 
              perfect ride while ensuring a seamless and secure transaction process.
            </p>
            <p className="text-muted-foreground">
              Our commitment to innovation, customer satisfaction, and ethical business practices continues 
              to drive us forward as we expand our services and reach more customers every day.
            </p>
          </div>
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">Our Values</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3"></div>
                <span className="text-muted-foreground">Transparency in all transactions</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3"></div>
                <span className="text-muted-foreground">Customer-first approach</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3"></div>
                <span className="text-muted-foreground">Innovation and technology</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3"></div>
                <span className="text-muted-foreground">Trust and reliability</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3"></div>
                <span className="text-muted-foreground">Sustainability and eco-friendliness</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="border-0 bg-secondary/20 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-hero rounded-lg flex items-center justify-center mb-4">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mb-16">
          <h3 className="text-2xl font-bold text-foreground mb-8 text-center">Our Team</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <Card key={index} className="border-0 bg-secondary/20 text-center">
                <CardContent className="p-6">
                  <div className="w-20 h-20 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-foreground">{member.name}</h4>
                  <p className="text-primary mb-2">{member.role}</p>
                  <p className="text-muted-foreground text-sm">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;