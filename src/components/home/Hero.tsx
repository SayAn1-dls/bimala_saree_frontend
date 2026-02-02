import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-saree.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center hero-gradient overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <div className="animate-fade-in-up">
              <span className="inline-block px-4 py-2 bg-accent/20 text-accent-foreground text-sm font-semibold tracking-wider uppercase rounded-full mb-6 font-body">
                ✨ Authentic Handloom Collection
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-foreground leading-tight mb-4 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              Elegance Woven in
              <span className="block text-gradient-primary">Every Thread</span>
            </h1>
            
            <p className="text-3xl md:text-4xl font-display text-primary/80 mb-6 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              বিমল শাড়ী স্টোর
            </p>
            
            <p className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 font-body leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              Discover our exquisite collection of handcrafted sarees, each piece telling a story of Indian heritage and timeless beauty. From Banarasi silks to Bengali Tant, find your perfect drape.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
              <Link to="/shop">
                <Button size="lg" className="btn-primary px-8 font-body group">
                  Explore Collection
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/collections">
                <Button size="lg" variant="outline" className="btn-outline-gold px-8 font-body">
                  View Categories
                </Button>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 mt-10 pt-8 border-t border-border animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
              <div className="text-center">
                <p className="text-2xl font-display font-bold text-primary">500+</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-body">Unique Designs</p>
              </div>
              <div className="w-px bg-border" />
              <div className="text-center">
                <p className="text-2xl font-display font-bold text-primary">100%</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-body">Authentic</p>
              </div>
              <div className="w-px bg-border" />
              <div className="text-center">
                <p className="text-2xl font-display font-bold text-primary">10K+</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-body">Happy Customers</p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="order-1 lg:order-2 relative animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="relative">
              {/* Decorative Frame */}
              <div className="absolute -inset-4 border-2 border-accent/30 rounded-lg transform rotate-3" />
              <div className="absolute -inset-4 border-2 border-primary/20 rounded-lg transform -rotate-2" />
              
              {/* Main Image */}
              <div className="relative overflow-hidden rounded-lg shadow-elegant">
                <img
                  src={heroImage}
                  alt="Elegant Indian woman wearing traditional silk saree"
                  className="w-full h-auto object-cover animate-float"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 via-transparent to-transparent" />
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-4 -left-4 bg-card p-4 rounded-lg shadow-medium animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-body">Starting from</p>
                <p className="text-2xl font-display font-bold text-primary">₹3,999</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
