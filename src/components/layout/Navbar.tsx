import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, User, Menu, X, Search, Heart, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

const navLinks = [
  { name: "Home", nameBn: "\u09b9\u09cb\u09ae", path: "/" },
  { name: "Shop", nameBn: "\u09b6\u09aa", path: "/shop" },
  { name: "Collections", nameBn: "\u0995\u09be\u09b2\u09c7\u0995\u09b6\u09a8", path: "/collections" },
  { name: "About", nameBn: "\u0986\u09ae\u09be\u09a6\u09c7\u09b0 \u09b8\u09ae\u09cd\u09aa\u09b0\u09cd\u0995\u09c7", path: "/about" },
  { name: "Contact", nameBn: "\u09af\u09cb\u0997\u09be\u09af\u09cb\u0997", path: "/contact" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-md border-b border-border">
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground py-2 text-center text-sm font-body">
        <span className="hidden sm:inline">
          \u2728 {t("Free Shipping on orders above \u20b92,999", "\u20b92,999-\u098f\u09b0 \u0989\u09aa\u09b0\u09c7 \u09ac\u09bf\u09a8\u09be\u09ae\u09c2\u09b2\u09cd\u09af\u09c7 \u09b6\u09bf\u09aa\u09bf\u0982")} |{" "}
        </span>
        <span>{t("Authentic Handloom Sarees", "\u0986\u09b8\u09b2 \u09b9\u09cd\u09af\u09be\u09a8\u09cd\u09a1\u09b2\u09c1\u09ae \u09b6\u09be\u09dc\u09c0")}</span>
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
                \u09ac\u09bf\u09ae\u09b2 \u09b6\u09be\u09dc\u09c0 \u09b8\u09cd\u099f\u09cb\u09b0
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
                {t(link.name, link.nameBn)}
              </Link>
            ))}
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-2 lg:gap-4">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="p-2 hover:bg-muted rounded-full transition-colors flex items-center gap-1"
              aria-label="Toggle language"
              title={language === "en" ? "\u09ac\u09be\u0982\u09b2\u09be\u09af\u09bc \u09a6\u09c7\u0996\u09c1\u09a8" : "Switch to English"}
            >
              <Globe className="h-5 w-5 text-foreground/70" />
              <span className="text-xs font-body font-semibold text-foreground/70 hidden sm:inline">
                {language === "en" ? "\u09ac\u09be\u0982" : "EN"}
              </span>
            </button>

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
                <span>{t("Login", "\u09b2\u0997\u0987\u09a8")}</span>
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
            {/* Mobile Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="px-4 py-3 rounded-lg font-body text-sm font-medium hover:bg-muted flex items-center gap-2 transition-colors"
            >
              <Globe className="h-4 w-4" />
              {language === "en" ? "\u09ac\u09be\u0982\u09b2\u09be\u09af\u09bc \u09a6\u09c7\u0996\u09c1\u09a8" : "Switch to English"}
            </button>

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
                <span>{t(link.name, link.nameBn)}</span>
                {language === "en" && (
                  <span className="text-muted-foreground ml-2">({link.nameBn})</span>
                )}
              </Link>
            ))}
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="px-4 py-3 rounded-lg font-body text-sm font-medium hover:bg-muted flex items-center gap-2"
            >
              <User className="h-4 w-4" />
              {t("Login / Sign Up", "\u09b2\u0997\u0987\u09a8 / \u09b8\u09be\u0987\u09a8 \u0986\u09aa")}
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};
