import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { sarees } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingBag, Minus, Plus, Truck, Shield, RotateCcw, ChevronLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ProductCard } from "@/components/ui/ProductCard";

const ProductDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
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
      title: "Added to Cart",
      description: `${saree.name} (Qty: ${quantity}) has been added to your cart.`,
    });
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast({
      title: isWishlisted ? "Removed from Wishlist" : "Added to Wishlist",
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
            Back to Shop
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
          </div>

          {/* Product Details */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            {/* Badges */}
            <div className="flex gap-2 mb-4">
              {saree.isNew && (
                <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-wider rounded">
                  New Arrival
                </span>
              )}
              {discount > 0 && (
                <span className="px-3 py-1 bg-accent text-accent-foreground text-xs font-semibold rounded">
                  {discount}% Off
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
                ₹{saree.price.toLocaleString()}
              </span>
              {saree.originalPrice && (
                <span className="text-xl text-muted-foreground line-through font-body">
                  ₹{saree.originalPrice.toLocaleString()}
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
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-body">Fabric</p>
                <p className="font-semibold text-foreground font-body">{saree.fabric}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-body">Color</p>
                <p className="font-semibold text-foreground font-body">{saree.color}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-body">Occasion</p>
                <p className="font-semibold text-foreground font-body">{saree.occasion}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-body">Length</p>
                <p className="font-semibold text-foreground font-body">{saree.length}</p>
              </div>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm font-medium text-foreground font-body">Quantity:</span>
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
                Add to Cart
              </Button>
              <Button
                size="lg"
                variant="outline"
                className={`font-body ${isWishlisted ? "border-primary text-primary" : ""}`}
                onClick={handleWishlist}
              >
                <Heart className={`mr-2 h-5 w-5 ${isWishlisted ? "fill-primary" : ""}`} />
                {isWishlisted ? "Wishlisted" : "Wishlist"}
              </Button>
            </div>

            {/* Features */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-muted-foreground font-body">
                <Truck className="h-5 w-5 text-accent" />
                <span>Free shipping on orders above ₹2,999</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground font-body">
                <Shield className="h-5 w-5 text-accent" />
                <span>100% Authentic Handloom Guaranteed</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground font-body">
                <RotateCcw className="h-5 w-5 text-accent" />
                <span>Easy 7-day returns & exchanges</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedSarees.length > 0 && (
          <section className="mt-16 lg:mt-24">
            <h2 className="text-2xl font-display font-bold text-foreground mb-8">
              You May Also Like
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
