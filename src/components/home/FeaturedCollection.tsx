import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/ui/ProductCard";
import { sarees } from "@/lib/data";
import { Button } from "@/components/ui/button";

export const FeaturedCollection = () => {
  const featuredSarees = sarees.filter((s) => s.isFeatured).slice(0, 4);

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-accent font-semibold tracking-wider uppercase text-sm font-body">
            Curated Selection
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mt-2 mb-4">
            Featured Collection
          </h2>
          <p className="text-muted-foreground font-body">
            Handpicked sarees that showcase the finest craftsmanship and timeless elegance
          </p>
        </div>

        {/* Divider */}
        <div className="divider-ornate mb-12" />

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {featuredSarees.map((saree, index) => (
            <div
              key={saree.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProductCard saree={saree} />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link to="/shop">
            <Button size="lg" className="btn-primary px-8 font-body group">
              View All Sarees
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
