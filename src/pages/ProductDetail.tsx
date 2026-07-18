import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { sarees } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingBag, Minus, Plus, Truck, Shield, RotateCcw, ChevronLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ProductCard } from "@/components/ui/ProductCard";
import { VirtualTryOn } from "@/components/product/VirtualTryOn";
import { useLanguage } from "@/contexts/LanguageContext";

const ProductDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const { t } = useLanguage();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const saree = sarees.find((s) => s.id === id);

  if (!saree) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-display font-bold mb-4">Product Not Found</h1>
          <Link to="/shop">
            <Button className="font-body">Back to Shop</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const discount = saree.originalPrice
    ? Math.round(((saree.originalPrice - saree.price) / saree.originalPrice) * 100)
    : 0;

  const relatedSarees = sarees.filter((s) => s.id !== id && s.fabric === saree.fabric).slice(0, 4);

  const handleAddToCart = () => {
    toast({
      title: t("Added to Cart", "\u0995\u09be\u09b0\u09cd\u099f\u09c7 \u09af\u09cb\u0997 \u09b9\u09af\u09bc\u09c7\u099b\u09c7"),
      description: `${saree.name} (Qty: ${quantity}) has been added to your cart.`,
    });
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast({
      title: isWishlisted
        ? t("Removed from Wishlist", "\u0989\u0987\u09b6\u09b2\u09bf\u09b8\u09cd\u099f \u09a5\u09c7\u0995\u09c7 \u09b8\u09b0\u09be\u09a8\u09cb \u09b9\u09af\u09bc\u09c7\u099b\u09c7")
        : t("Added to Wishlist", "\u0989\u0987\u09b6\u09b2\u09bf\u09b8\u09cd\u099f\u09c7 \u09af\u09cb\u0997 \u09b9\u09af\u09bc\u09c7\u099b\u09c7"),
      description: saree.name,
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-body text-sm"
          >
            <ChevronLeft className="h-4 w-4" />
            {t("Back to Shop", "\u09a6\u09cb\u0995\u09be\u09a8\u09c7 \u09ab\u09bf\u09b0\u09c7 \u09af\u09be\u09a8")}
          </Link>
        </nav>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-[3/4] overflow-hidden rounded-lg bg-muted">
              <img
                src={saree.images[selectedImage] || saree.image}
                alt={saree.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Thumbnails */}
            {saree.images.length > 1 && (
              <div className="flex gap-3">
                {saree.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-28 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? "border-primary" : "border-transparent"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Virtual Try-On */}
            <VirtualTryOn
              sareeImage={saree.images[selectedImage] || saree.image}
              sareeName={saree.name}
            />
          </div>

          {/* Product Details */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            {/* Badges */}
            <div className="flex gap-2 mb-4">
              {saree.isNew && (
                <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-wider rounded">
                  {t("New Arrival", "\u09a8\u09a4\u09c1\u09a8 \u098f\u09b8\u09c7\u099b\u09c7")}
                </span>
              )}
              {discount > 0 && (
                <span className="px-3 py-1 bg-accent text-accent-foreground text-xs font-semibold rounded">
                  {discount}% {t("Off", "\u099b\u09be\u09dc")}
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-2xl lg:text-3xl font-display font-bold text-foreground mb-2">
              {saree.name}
            </h1>
            <p className="text-lg text-primary font-display mb-4">{saree.nameBn}</p>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-display font-bold text-primary">
                \u20b9{saree.price.toLocaleString()}
              </span>
              {saree.originalPrice && (
                <span className="text-xl text-muted-foreground line-through font-body">
                  \u20b9{saree.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-muted-foreground font-body leading-relaxed mb-6">
              {saree.description}
            </p>

            {/* Details */}
            <div className="grid grid-cols-2 gap-4 mb-6 py-6 border-y border-border">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-body">
                  {t("Fabric", "\u0995\u09be\u09aa\u09dc")}
                </p>
                <p className="font-semibold text-foreground font-body">{saree.fabric}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-body">
                  {t("Color", "\u09b0\u0999")}
                </p>
                <p className="font-semibold text-foreground font-body">{saree.color}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-body">
                  {t("Occasion", "\u0989\u09aa\u09b2\u0995\u09cd\u09b7")}
                </p>
                <p className="font-semibold text-foreground font-body">{saree.occasion}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-body">
                  {t("Length", "\u09a6\u09c8\u09b0\u09cd\u0998\u09cd\u09af")}
                </p>
                <p className="font-semibold text-foreground font-body">{saree.length}</p>
              </div>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm font-medium text-foreground font-body">
                {t("Quantity:", "\u09aa\u09b0\u09bf\u09ae\u09be\u09a3:")}
              </span>
              <div className="flex items-center border border-border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-muted transition-colors"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-4 py-2 font-semibold font-body">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:bg-muted transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button
                size="lg"
                className="flex-1 btn-gold font-body"
                onClick={handleAddToCart}
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                {t("Add to Cart", "\u0995\u09be\u09b0\u09cd\u099f\u09c7 \u09af\u09cb\u0997 \u0995\u09b0\u09c1\u09a8")}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className={`font-body ${isWishlisted ? "border-primary text-primary" : ""}`}
                onClick={handleWishlist}
              >
                <Heart className={`mr-2 h-5 w-5 ${isWishlisted ? "fill-primary" : ""}`} />
                {isWishlisted
                  ? t("Wishlisted", "\u0989\u0987\u09b6\u09b2\u09bf\u09b8\u09cd\u099f\u09c7 \u0986\u099b\u09c7")
                  : t("Wishlist", "\u0989\u0987\u09b6\u09b2\u09bf\u09b8\u09cd\u099f")}
              </Button>
            </div>

            {/* Features */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-muted-foreground font-body">
                <Truck className="h-5 w-5 text-accent" />
                <span>{t("Free shipping on orders above \u20b92,999", "\u20b92,999-\u098f\u09b0 \u0989\u09aa\u09b0\u09c7 \u09ac\u09bf\u09a8\u09be\u09ae\u09c2\u09b2\u09cd\u09af\u09c7 \u09b6\u09bf\u09aa\u09bf\u0982")}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground font-body">
                <Shield className="h-5 w-5 text-accent" />
                <span>{t("100% Authentic Handloom Guaranteed", "\u09e7\u09e6\u09e6% \u0986\u09b8\u09b2 \u09b9\u09cd\u09af\u09be\u09a8\u09cd\u09a1\u09b2\u09c1\u09ae \u0997\u09cd\u09af\u09be\u09b0\u09be\u09a8\u09cd\u099f\u09bf")}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground font-body">
                <RotateCcw className="h-5 w-5 text-accent" />
                <span>{t("Easy 7-day returns & exchanges", "\u09b8\u09b9\u099c \u09ed \u09a6\u09bf\u09a8\u09c7\u09b0 \u09b0\u09bf\u099f\u09be\u09b0\u09cd\u09a8 \u0993 \u098f\u0995\u09cd\u09b8\u099a\u09c7\u099e\u09cd\u099c")}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedSarees.length > 0 && (
          <section className="mt-16 lg:mt-24">
            <h2 className="text-2xl font-display font-bold text-foreground mb-8">
              {t("You May Also Like", "\u0986\u09aa\u09a8\u09bf \u098f\u099f\u09bf\u0993 \u09aa\u099b\u09a8\u09cd\u09a6 \u0995\u09b0\u09a4\u09c7 \u09aa\u09be\u09b0\u09c7\u09a8")}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedSarees.map((s) => (
                <ProductCard key={s.id} saree={s} />
              ))}
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetail;
