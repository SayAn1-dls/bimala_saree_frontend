import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, User, Menu, X, Search, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", nameBn: "হোম", path: "/" },
  { name: "Shop", nameBn: "শপ", path: "/shop" },
  { name: "Collections", nameBn: "কালেকশন", path: "/collections" },
  { name: "About", nameBn: "আমাদের সম্পর্কে", path: "/about" },
  { name: "Contact", nameBn: "যোগাযোগ", path: "/contact" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-md border-b border-border">
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground py-2 text-center text-sm font-body">
        <span className="hidden sm:inline">✨ Free Shipping on orders above ₹2,999 | </span>
        <span>Authentic Handloom Sarees</span>
      </div>

      {/* Main Navbar */}
      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 hover:bg-muted rounded-md transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="flex flex-col items-center">
              <span className="text-xl lg:text-2xl font-display font-bold text-primary">
                বিমল শাড়ী স্টোর
              </span>
              <span className="text-[10px] lg:text-xs text-muted-foreground tracking-[0.2em] uppercase">
                Premium Sarees
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "nav-link text-sm font-medium font-body uppercase tracking-wider",
                  location.pathname === link.path && "active"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-2 lg:gap-4">
            <button className="p-2 hover:bg-muted rounded-full transition-colors hidden sm:block">
              <Search className="h-5 w-5 text-foreground/70" />
            </button>
            <button className="p-2 hover:bg-muted rounded-full transition-colors hidden sm:block">
              <Heart className="h-5 w-5 text-foreground/70" />
            </button>
            <Link to="/cart" className="p-2 hover:bg-muted rounded-full transition-colors relative">
              <ShoppingBag className="h-5 w-5 text-foreground/70" />
              <span className="absolute -top-1 -right-1 h-5 w-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                0
              </span>
            </Link>
            <Link to="/login">
              <Button variant="ghost" size="sm" className="hidden sm:flex items-center gap-2 font-body">
                <User className="h-4 w-4" />
                <span>Login</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-300",
            isOpen ? "max-h-96 pb-4" : "max-h-0"
          )}
        >
          <div className="flex flex-col gap-2 pt-4 border-t border-border">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "px-4 py-3 rounded-lg font-body text-sm font-medium transition-colors",
                  location.pathname === link.path
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-muted"
                )}
              >
                <span>{link.name}</span>
                <span className="text-muted-foreground ml-2">({link.nameBn})</span>
              </Link>
            ))}
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="px-4 py-3 rounded-lg font-body text-sm font-medium hover:bg-muted flex items-center gap-2"
            >
              <User className="h-4 w-4" />
              Login / Sign Up
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};
