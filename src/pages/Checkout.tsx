import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, Truck, Shield } from "lucide-react";
import saree1 from "@/assets/saree-1.jpg";
import saree4 from "@/assets/saree-4.jpg";

interface CartItem {
  id: string;
  name: string;
  nameBn: string;
  price: number;
  image: string;
  quantity: number;
  fabric: string;
}

const initialCart: CartItem[] = [
  {
    id: "1",
    name: "Royal Red Banarasi Silk",
    nameBn: "রয়্যাল রেড বেনারসি সিল্ক",
    price: 15999,
    image: saree1,
    quantity: 1,
    fabric: "Silk",
  },
  {
    id: "4",
    name: "Coral Pink Tussar",
    nameBn: "প্রবাল গোলাপী তুসার",
    price: 8999,
    image: saree4,
    quantity: 2,
    fabric: "Tussar Silk",
  },
];

const Checkout = () => {
  const { toast } = useToast();
  const [cart, setCart] = useState<CartItem[]>(initialCart);
  const [step, setStep] = useState(1);
  const [couponCode, setCouponCode] = useState("");
  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
  });

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 2999 ? 0 : 99;
  const total = subtotal + shipping;

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    toast({ title: "Item Removed", description: "Item has been removed from cart." });
  };

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === "WELCOME10") {
      toast({ title: "Coupon Applied!", description: "10% discount applied to your order." });
    } else {
      toast({ title: "Invalid Coupon", description: "Please enter a valid coupon code.", variant: "destructive" });
    }
  };

  const handlePlaceOrder = () => {
    toast({
      title: "Order Placed Successfully!",
      description: "Thank you for your order. You will receive a confirmation email shortly.",
    });
  };

  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-hero py-8 lg:py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground text-center">
            {step === 1 ? "Shopping Cart" : step === 2 ? "Shipping Address" : "Payment"}
          </h1>
          
          {/* Progress Steps */}
          <div className="flex justify-center items-center gap-4 mt-6">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold font-body text-sm ${
                    s <= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {s}
                </div>
                {s < 3 && (
                  <div
                    className={`w-12 h-1 mx-2 ${
                      s < step ? "bg-primary" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 lg:py-12">
        <div className="container mx-auto px-4 lg:px-8">
          {cart.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-xl font-display font-bold mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground font-body mb-6">
                Looks like you haven't added any sarees yet.
              </p>
              <Link to="/shop">
                <Button className="btn-primary font-body">
                  Continue Shopping
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {step === 1 && (
                  <div className="bg-card rounded-xl shadow-soft overflow-hidden">
                    <div className="p-4 lg:p-6 border-b border-border">
                      <h2 className="font-display font-semibold text-lg">
                        Cart Items ({cart.reduce((acc, item) => acc + item.quantity, 0)})
                      </h2>
                    </div>
                    <div className="divide-y divide-border">
                      {cart.map((item) => (
                        <div key={item.id} className="p-4 lg:p-6 flex gap-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-24 h-32 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h3 className="font-display font-semibold text-foreground">
                              {item.name}
                            </h3>
                            <p className="text-sm text-muted-foreground font-body">
                              {item.nameBn}
                            </p>
                            <p className="text-xs text-muted-foreground font-body mt-1">
                              {item.fabric}
                            </p>
                            <div className="flex items-center justify-between mt-4">
                              <div className="flex items-center border border-border rounded-lg">
                                <button
                                  onClick={() => updateQuantity(item.id, -1)}
                                  className="p-2 hover:bg-muted transition-colors"
                                >
                                  <Minus className="h-3 w-3" />
                                </button>
                                <span className="px-3 font-semibold font-body text-sm">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.id, 1)}
                                  className="p-2 hover:bg-muted transition-colors"
                                >
                                  <Plus className="h-3 w-3" />
                                </button>
                              </div>
                              <p className="font-display font-bold text-primary">
                                ₹{(item.price * item.quantity).toLocaleString()}
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-muted-foreground hover:text-destructive transition-colors"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="bg-card rounded-xl p-6 shadow-soft">
                    <h2 className="font-display font-semibold text-lg mb-6">
                      Shipping Address
                    </h2>
                    <div className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="font-body">Full Name</Label>
                          <Input
                            value={address.fullName}
                            onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                            className="input-elegant font-body"
                            placeholder="Your full name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="font-body">Phone Number</Label>
                          <Input
                            value={address.phone}
                            onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                            className="input-elegant font-body"
                            placeholder="+91 98765 43210"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="font-body">Address Line 1</Label>
                        <Input
                          value={address.addressLine1}
                          onChange={(e) => setAddress({ ...address, addressLine1: e.target.value })}
                          className="input-elegant font-body"
                          placeholder="House/Flat No., Street"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="font-body">Address Line 2</Label>
                        <Input
                          value={address.addressLine2}
                          onChange={(e) => setAddress({ ...address, addressLine2: e.target.value })}
                          className="input-elegant font-body"
                          placeholder="Landmark (Optional)"
                        />
                      </div>
                      <div className="grid sm:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label className="font-body">City</Label>
                          <Input
                            value={address.city}
                            onChange={(e) => setAddress({ ...address, city: e.target.value })}
                            className="input-elegant font-body"
                            placeholder="City"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="font-body">State</Label>
                          <Input
                            value={address.state}
                            onChange={(e) => setAddress({ ...address, state: e.target.value })}
                            className="input-elegant font-body"
                            placeholder="State"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="font-body">Pincode</Label>
                          <Input
                            value={address.pincode}
                            onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                            className="input-elegant font-body"
                            placeholder="700001"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="bg-card rounded-xl p-6 shadow-soft">
                    <h2 className="font-display font-semibold text-lg mb-6">
                      Payment Method
                    </h2>
                    <div className="space-y-4">
                      <label className="flex items-center gap-3 p-4 border border-border rounded-lg cursor-pointer hover:border-primary transition-colors">
                        <input type="radio" name="payment" defaultChecked className="h-4 w-4 text-primary" />
                        <span className="font-body">Cash on Delivery (COD)</span>
                      </label>
                      <label className="flex items-center gap-3 p-4 border border-border rounded-lg cursor-pointer hover:border-primary transition-colors">
                        <input type="radio" name="payment" className="h-4 w-4 text-primary" />
                        <span className="font-body">UPI / Net Banking</span>
                      </label>
                      <label className="flex items-center gap-3 p-4 border border-border rounded-lg cursor-pointer hover:border-primary transition-colors">
                        <input type="radio" name="payment" className="h-4 w-4 text-primary" />
                        <span className="font-body">Credit / Debit Card</span>
                      </label>
                    </div>
                  </div>
                )}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-card rounded-xl p-6 shadow-soft sticky top-24">
                  <h2 className="font-display font-semibold text-lg mb-4">
                    Order Summary
                  </h2>

                  {/* Coupon */}
                  {step === 1 && (
                    <div className="flex gap-2 mb-6">
                      <Input
                        placeholder="Coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="input-elegant font-body"
                      />
                      <Button variant="outline" onClick={applyCoupon} className="font-body">
                        Apply
                      </Button>
                    </div>
                  )}

                  <div className="space-y-3 py-4 border-y border-border">
                    <div className="flex justify-between font-body text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>₹{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-body text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className={shipping === 0 ? "text-green-600" : ""}>
                        {shipping === 0 ? "Free" : `₹${shipping}`}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between py-4 font-display font-bold text-lg">
                    <span>Total</span>
                    <span className="text-primary">₹{total.toLocaleString()}</span>
                  </div>

                  {step < 3 ? (
                    <Button
                      className="w-full btn-gold font-body"
                      onClick={() => setStep(step + 1)}
                    >
                      {step === 1 ? "Proceed to Checkout" : "Continue to Payment"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      className="w-full btn-primary font-body"
                      onClick={handlePlaceOrder}
                    >
                      Place Order
                    </Button>
                  )}

                  {step > 1 && (
                    <Button
                      variant="ghost"
                      className="w-full mt-2 font-body"
                      onClick={() => setStep(step - 1)}
                    >
                      Back
                    </Button>
                  )}

                  {/* Trust Badges */}
                  <div className="mt-6 pt-6 border-t border-border space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground font-body">
                      <Truck className="h-4 w-4 text-accent" />
                      <span>Free shipping above ₹2,999</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground font-body">
                      <Shield className="h-4 w-4 text-accent" />
                      <span>Secure payment</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Checkout;
