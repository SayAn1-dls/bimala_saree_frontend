import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-saree.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-[100vh] flex items-center overflow-hidden bg-[#FDFBF7]">
      {/* Subtle diagonal texture */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg,#D4AF37 0px,#D4AF37 1px,transparent 1px,transparent 50%)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Left gold accent line */}
      <div className="absolute left-0 top-[15%] bottom-[15%] w-[2px] bg-gradient-to-b from-transparent via-[#D4AF37] to-transparent opacity-50" />

      <div className="container mx-auto px-4 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center py-20 lg:py-0">

          {/* ── Left: Content ── */}
          <div className="order-2 lg:order-1 text-center lg:text-left">

            {/* Eyebrow label */}
            <div className="animate-fade-in-up mb-8">
              <span className="inline-flex items-center gap-3 text-[10px] tracking-[0.28em] uppercase font-body font-semibold text-[#D4AF37]">
                <span className="w-10 h-px bg-[#D4AF37] hidden lg:block" />
                Authentic Handloom Collection
                <span className="w-10 h-px bg-[#D4AF37] hidden lg:block" />
              </span>
            </div>

            {/* Headline */}
            <h1
              className="font-display font-bold text-[#1A1A1A] leading-[1.08] mb-5 animate-fade-in-up"
              style={{ animationDelay: "0.1s", fontSize: "clamp(2.6rem, 5vw, 4.75rem)" }}
            >
              Elegance Woven
              <br />
              <em className="not-italic text-[#D4AF37]">in Every Thread</em>
            </h1>

            {/* Bengali sub-headline */}
            <p
              className="text-2xl md:text-3xl font-display text-[#1A1A1A]/55 mb-7 animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              বিমলা শাড়ি স্টোর
            </p>

            {/* Gold rule */}
            <div
              className="w-14 h-[1.5px] bg-[#D4AF37] mx-auto lg:mx-0 mb-7 animate-fade-in-up"
              style={{ animationDelay: "0.25s" }}
            />

            {/* Body copy */}
            <p
              className="text-[0.95rem] text-[#1A1A1A]/58 max-w-md mx-auto lg:mx-0 mb-10 font-body leading-[1.95] animate-fade-in-up"
              style={{ animationDelay: "0.3s" }}
            >
              Discover our exquisite collection of handcrafted sarees — each piece telling a
              story of Indian heritage and timeless beauty. From Banarasi silks to Bengali Tant,
              find your perfect drape.
            </p>

            {/* CTA row */}
            <div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up"
              style={{ animationDelay: "0.4s" }}
            >
              <Link to="/shop">
                <button className="group inline-flex items-center justify-center gap-3 px-9 py-4 bg-[#1A1A1A] text-[#FDFBF7] text-[11px] tracking-[0.18em] uppercase font-body font-semibold transition-all duration-300 hover:bg-[#D4AF37] hover:text-[#1A1A1A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D4AF37]">
                  Explore Collection
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </Link>
              <Link to="/collections">
                <button className="inline-flex items-center justify-center gap-3 px-9 py-4 border border-[#D4AF37] text-[#1A1A1A] text-[11px] tracking-[0.18em] uppercase font-body font-semibold transition-all duration-300 hover:bg-[#D4AF37]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D4AF37]">
                  View Categories
                </button>
              </Link>
            </div>

            {/* Stats strip */}
            <div
              className="flex flex-wrap justify-center lg:justify-start gap-10 mt-12 pt-8 border-t border-[#D4AF37]/25 animate-fade-in-up"
              style={{ animationDelay: "0.5s" }}
            >
              {[
                { value: "500+", label: "Unique Designs" },
                { value: "100%", label: "Authentic" },
                { value: "10K+", label: "Happy Customers" },
              ].map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <p className="text-[1.75rem] font-display font-bold text-[#D4AF37] leading-none">
                    {stat.value}
                  </p>
                  <p className="text-[9px] text-[#1A1A1A]/45 uppercase tracking-[0.2em] font-body mt-1.5">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Image ── */}
          <div
            className="order-1 lg:order-2 relative animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            {/* Decorative offset frames */}
            <div className="absolute -top-5 -right-5 w-full h-full border border-[#D4AF37]/35 pointer-events-none" />
            <div className="absolute -bottom-5 -left-5 w-full h-full border border-[#D4AF37]/18 pointer-events-none" />

            {/* Hero image */}
            <div
              className="relative overflow-hidden"
              style={{ boxShadow: "0 28px 60px rgba(26,26,26,0.14)" }}
            >
              <img
                src={heroImage}
                alt="Elegant Indian woman wearing traditional silk saree"
                className="w-full h-auto object-cover animate-float"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/18 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Floating price badge */}
            <div
              className="absolute -bottom-6 -left-6 bg-[#FDFBF7] border border-[#D4AF37]/30 px-6 py-4 animate-fade-in-up"
              style={{
                animationDelay: "0.6s",
                boxShadow: "0 8px 32px rgba(212,175,55,0.18)",
              }}
            >
              <p className="text-[9px] text-[#1A1A1A]/45 uppercase tracking-[0.25em] font-body mb-1">
                Starting from
              </p>
              <p className="text-[1.6rem] font-display font-bold text-[#D4AF37] leading-none">
                ₹3,999
              </p>
            </div>

            {/* "Heritage" ribbon */}
            <div className="absolute -top-3 right-8 bg-[#D4AF37] px-5 py-1.5">
              <p className="text-[9px] text-[#1A1A1A] uppercase tracking-[0.25em] font-body font-bold">
                Est. Heritage
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
