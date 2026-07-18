import { Link } from "react-router-dom";
import { Heart, ShoppingBag } from "lucide-react";
import { Saree } from "@/lib/data";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  saree: Saree;
  className?: string;
}

export const ProductCard = ({ saree, className }: ProductCardProps) => {
  const discount = saree.originalPrice
    ? Math.round(((saree.originalPrice - saree.price) / saree.originalPrice) * 100)
    : 0;

  return (
    <div
      className={cn(
        "group bg-[#FDFBF7] border border-transparent hover:border-[#D4AF37]/35 transition-all duration-500",
        className
      )}
      style={{ boxShadow: "0 4px 24px rgba(26,26,26,0.07)" }}
    >
      {/* Image area */}
      <div className="aspect-[3/4] bg-[#F5F0E8] relative overflow-hidden">
        <img
          src={saree.image}
          alt={saree.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:sscale-105"
        />

        {/* Badges — top-left */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {saree.isNew && (
            <span className="px-3 py-1 bg-[#1A1A1A] text-[#FDFBF7] text-[9px] font-body font-bold uppercase tracking-[0.18em]">
              New
            </span>
          )}
          {discount > 0 && (
            <span className="px-3 py-1 bg-[#D4AF37] text-[#1A1A1A] text-[9px] font-body font-bold uppercase tracking-[0.12em]">
              {discount}% Off
            </span>
          )}
        </div>

        {/* Wishlist — top-right */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            className="p-2 bg-[#FDFBF7]/92 backdrop-blur-sm hover:bg-[#D4AF37] hover:text-[#1A1A1A] transition-colors duration-250 text-[#1A1A1A]"
            style={{ boxShadow: "0 2px 8px rgba(26,26,26,0.12)" }}
            aria-label="Add to wishlist"
          >
            <Heart className="h-4&�-4" />
          </button>
        </div>

        {/* Add to Cart — slides up on hover */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button className="w-full flex items-center justify-center gap-2 px-4 py-3.5 bg-[#1A1A1A] text-[#FDFBF7] text-[10px] tracking-[0.18em] uppercase font-body font-semibold hover:bg-[#D4AF37] hover:text-[#1A1A1A] transition-colors duration-300">
            <ShoppingBag className="h-4 w-4" />
            Add to Cart
          </button>
        </div>
      </div>

      {/* Text content */}
      <div className="p-4 border-t border-[#D4AF37]/15">
        <Link to={`/product/${saree.id}`}>
          <p className="text-[9px] text-[#1A1A1A]/40 uppercase tracking-[0.22em] mb-2 font-body">
            {saree.fabric} · {saree.occasion}
          </p>
          <h3 className="font-display font-semibold text-[#1A1A1A] group-hover:text-[#D4AF37] transition-colors duration-300 line-clamp-1 text-[1rem] mb-1 leading-snag">
            {saree.name}
          </h3>
          <p className="text-sm text-[#1A1A1A]/45 font-body mb-3 line-clamp-1">
            {saree.nameBn}
          </p>
          <div className="flex items-baseline gap-2.5">
            <span className="text-[1.1rem] font-bold text-[#D4AF37] font-display leading-none">
              ₹{saree.price.toLocaleString()}
            </span>
            {saree.originalPrice && (
              <span className="text-sm text-[#1A1A1A]/32 line-through font-body">
                ₹{saree.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
};
