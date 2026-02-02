import { Award, Truck, Shield, Sparkles } from "lucide-react";

const features = [
  {
    icon: Award,
    title: "Authentic Handloom",
    titleBn: "খাঁটি হাতের তাঁত",
    description: "Each saree is handcrafted by skilled artisans using traditional techniques passed down through generations.",
  },
  {
    icon: Shield,
    title: "Quality Assured",
    titleBn: "গুণমান নিশ্চিত",
    description: "We guarantee the authenticity and quality of every saree. Each piece undergoes rigorous quality checks.",
  },
  {
    icon: Truck,
    title: "Free Delivery",
    titleBn: "বিনামূল্যে ডেলিভারি",
    description: "Enjoy free shipping on orders above ₹2,999. Careful packaging ensures your saree arrives in perfect condition.",
  },
  {
    icon: Sparkles,
    title: "Exclusive Designs",
    titleBn: "এক্সক্লুসিভ ডিজাইন",
    description: "Discover unique designs you won't find elsewhere. We work directly with weavers to bring you exclusive pieces.",
  },
];

export const WhyChooseUs = () => {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-accent font-semibold tracking-wider uppercase text-sm font-body">
            Our Promise
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mt-2 mb-4">
            Why Choose Us
          </h2>
          <p className="text-muted-foreground font-body">
            Experience the difference of shopping with a brand that values tradition and quality
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="text-center p-6 rounded-lg bg-card shadow-soft hover:shadow-medium transition-all duration-300 animate-fade-in-up group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 text-accent mb-4 group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                <feature.icon className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-display font-semibold text-foreground mb-1">
                {feature.title}
              </h3>
              <p className="text-sm text-primary font-body mb-2">{feature.titleBn}</p>
              <p className="text-sm text-muted-foreground font-body leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
