import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, User, Menu, X, Search, Heart, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

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
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 w-full bg-[#FDFBF7]/96 backdrop-blur-md border-b border-[#D4AF37]/20">
      {/* ── Announcement bar ── */}
      <div className="bg-[#1A1A1A] text-[#FDFBF7] py-2 text-center text-[10px] font-body tracking-[0.22em] uppercase">
        <span className="hidden sm:inline">
          ✦&nbsp;
          {t(
            "Free Shipping on orders above ₹2,999",
            "₹2,999-এর উপরে বিনামূল্যে শিপিং"
          )}
          &nbsp;|&nbsp;
        </span>
        <span>{t("Authentic Handloom Sarees", "আসল হ্যান্ডলুম শাড়ি")}</span>
      </div>

      {/* ── Main nav ── */}
      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-[#1A1A1A]/65 hover:text-[#D4AF37] transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Logo */}
          <Link to="/" className="flex flex-col items-center lg:items-start">
            <span className="text-xl lg:text-2xl font-display font-bold text-[#1A1A1A] tracking-tight">
              বিমলা শাড়ি স্টোর
            </span>
            <span className="text-[9px] text-[#D4AF37] tracking-[0.32em] uppercase font-body font-semibold">
              Premium Sarees
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "text-[11px] font-body font-semibold uppercase tracking-[0.14em] relative group transition-colors duration-200",
                  location.pathname === link.path
                    ? "text-[#D4AF37]"
                    : "text-[#1A1A1A]/65 hover:text-[#1A1A1A]"
                )}
              >
                {t(link.name, link.nameBn)}
                {/* underline indicator */}
                <span
                  className={cn(
                    "absolute -bottom-1 left-0 h-[1.5px] bg-[#D4AF37] transition-all duration-300",
                    location.pathname === link.path
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  )}
                />
              </Link>
            ))}
          </div>

          {/* Right action cluster */}
          <div className="flex items-center gap-2 lg:gap-3">

            {/* Language toggle — boutique pill */}
            <button
              onClick={toggleLanguage}
              title={language === "en" ? "বাংলায় দেখুন" : "Switch to English"}
              className="inline-flex items-center gap-1.5 px-3 py-[7px] border border-[#D4AF37]/55 text-[#1A1A1A] hover:bg-[#D4AF37] hover:text-[#1A1A1A] hover:border-[#D4AF37] transition-all duration-250 font-body text-[9px] tracking-[0.18em] uppercase font-bold"
            >
              <Globe className="h-3 w-3" />
              <span className="hidden sm:inline">
                {language === "en" ? "বাং" : "EN"}
              </span>
            </button>

            <button className="p-2 text-[#1A1A1A]/55 hover:text-[#D4AF37] transition-colors hidden sm:block" aria-label="Search">
              <Search className="h-5 w-5" />
            </button>

            <button className="p-2 text-[#1A1A1A]/55 hover:text-[#D4AF37] transition-colors hidden sm:block" aria-label="Wishlist">
              <Heart className="h-5 w-5" />
            </button>

            <Link to="/cart" className="relative p-2 text-[#1A1A1A]/55 hover:text-[#D4AF37] transition-colors" aria-label="Cart">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-[18px] w-[18px] bg-[#D4AF37] text-[#1A1A1A] text-[8px] font-bold rounded-full flex items-center justify-center leading-none">
                0
              </span>
            </Link>

            {/* Login button — premium boutique */}
            <Link to="/login" className="hidden sm:block">
              <button className="inline-flex items-center gap-2 px-4 py-[9px] bg-[#1A1A1A] text-[#FDFBF7] text-[9px] tracking-[0.18em] uppercase font-body font-bold hover:bg-[#D4AF37] hover:text-[#1A1A1A] transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D4AF37]">
                <User className="h-3.5 w-3.5" />
                <span>{t("Login", "লগইন")}</span>
              </button>
            </Link>
          </div>
        </div>

        {/* ── Mobile nav drawer ── */}
        <div
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-300",
            isOpen ? "max-h-96 pb-4" : "max-h-0"
          )}
        >
          <div className="flex flex-col gap-1 pt-4 border-t border-[#D4AF37]/20">
            {/* Mobile language toggle */}
            <button
              onClick={toggleLanguage}
              className="px-4 py-3 text-sm font-body font-medium flex items-center gap-2 text-[#1A1A1A]/65 hover:text-[#D4AF37] hover:bg-[#D4AF37]/6 transition-colors tracking-wide"
            >
              <Globe className="h-4 w-4" />
              {language === "en" ? "বাংলায় দেখুন" : "Switch to English"}
            </button>

            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "px-4 py-3 text-sm font-body font-medium transition-colors tracking-wide",
                  location.pathname === link.path
                    ? "text-[#D4AF37] bg-[#D4AF37]/6"
                    : "text-[#1A1A1A]/65 hover:text-[#1A1A1A] hover:bg-[#1A1A1A]/5"
                )}
              >
                <span>{t(link.name, link.nameBn)}</span>
                {language === "en" && (
                  <span className="text-[#1A1A1A]/32 ml-2 text-xs">({link.nameBn})</span>
                )}
              </Link>
            ))}

            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="px-4 py-3 text-sm font-body font-medium flex items-center gap-2 text-[#1A1A1A]/65 hover:text-[#D4AF37] hover:bg-[#D4AF37]/6 transition-colors tracking-wide"
            >
              <User className="h-4 w-4" />
              {t("Login / Sign Up", "লগইন / সাইন আপ")}
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};
