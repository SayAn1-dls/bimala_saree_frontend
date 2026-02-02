import { Link } from "react-router-dom";
import { Heart, ShoppingBag } from "lucide-react";
import { Saree } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  saree: Saree;
  className?: string;
}

export const ProductCard = ({ saree, className }: ProductCardProps) => {
  const discount = saree.originalPrice
    ? Math.round(((saree.originalPrice - saree.price) / saree.originalPrice) * 100)
    : 0;

  return (
    <div className={cn("group card-premium", className)}>
      {/* Image Container */}
      <div className="product-image-wrapper aspect-[3/4] bg-muted relative">
        <img
          src={saree.image}
          alt={saree.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {saree.isNew && (
            <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-wider rounded">
              New
            </span>
          )}
          {discount > 0 && (
            <span className="px-3 py-1 bg-accent text-accent-foreground text-xs font-semibold rounded">
              {discount}% Off
            </span>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="p-2 bg-background/90 backdrop-blur-sm rounded-full hover:bg-primary hover:text-primary-foreground transition-colors shadow-md">
            <Heart className="h-4 w-4" />
          </button>
        </div>

        {/* Add to Cart Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <Button className="w-full btn-gold gap-2 font-body">
            <ShoppingBag className="h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <Link to={`/product/${saree.id}`}>
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1 font-body">
            {saree.fabric} • {saree.occasion}
          </p>
          <h3 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
            {saree.name}
          </h3>
          <p className="text-sm text-muted-foreground font-body mb-2">
            {saree.nameBn}
          </p>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-primary font-display">
              ₹{saree.price.toLocaleString()}
            </span>
            {saree.originalPrice && (
              <span className="text-sm text-muted-foreground line-through font-body">
                ₹{saree.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
};
