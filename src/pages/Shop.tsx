import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { ProductCard } from "@/components/ui/ProductCard";
import { sarees, fabrics, colors, occasions, priceRanges } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Filter, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const Shop = () => {
  const [searchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFabrics, setSelectedFabrics] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<{ min: number; max: number } | null>(null);
  const [sortBy, setSortBy] = useState("featured");
  const [expandedSections, setExpandedSections] = useState<string[]>(["fabric", "color", "occasion", "price"]);

  // Apply filters
  const filteredSarees = useMemo(() => {
    let result = [...sarees];

    if (selectedFabrics.length > 0) {
      result = result.filter((s) => selectedFabrics.includes(s.fabric));
    }
    if (selectedColors.length > 0) {
      result = result.filter((s) => selectedColors.includes(s.color));
    }
    if (selectedOccasions.length > 0) {
      result = result.filter((s) => selectedOccasions.includes(s.occasion));
    }
    if (selectedPriceRange) {
      result = result.filter(
        (s) => s.price >= selectedPriceRange.min && s.price <= selectedPriceRange.max
      );
    }

    // Sort
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
    }

    return result;
  }, [selectedFabrics, selectedColors, selectedOccasions, selectedPriceRange, sortBy]);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]
    );
  };

  const clearFilters = () => {
    setSelectedFabrics([]);
    setSelectedColors([]);
    setSelectedOccasions([]);
    setSelectedPriceRange(null);
  };

  const hasActiveFilters =
    selectedFabrics.length > 0 ||
    selectedColors.length > 0 ||
    selectedOccasions.length > 0 ||
    selectedPriceRange !== null;

  const FilterSection = ({
    title,
    section,
    children,
  }: {
    title: string;
    section: string;
    children: React.ReactNode;
  }) => (
    <div className="border-b border-border pb-4">
      <button
        onClick={() => toggleSection(section)}
        className="flex items-center justify-between w-full py-2 font-display font-semibold text-foreground"
      >
        {title}
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform",
            expandedSections.includes(section) && "rotate-180"
          )}
        />
      </button>
      {expandedSections.includes(section) && <div className="mt-2 space-y-2">{children}</div>}
    </div>
  );

  return (
    <Layout>
      {/* Hero Banner */}
      <section className="bg-gradient-hero py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
            Our Collection
          </h1>
          <p className="text-lg text-muted-foreground font-body">
            আমাদের সংগ্রহ থেকে আপনার পছন্দের শাড়ি খুঁজে নিন
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 lg:px-8 py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="font-body"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
              {hasActiveFilters && (
                <span className="ml-2 px-2 py-0.5 bg-primary text-primary-foreground text-xs rounded-full">
                  Active
                </span>
              )}
            </Button>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-border rounded-md px-3 py-2 font-body text-sm bg-background"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          {/* Sidebar Filters */}
          <aside
            className={cn(
              "lg:w-64 flex-shrink-0",
              showFilters ? "block" : "hidden lg:block"
            )}
          >
            <div className="sticky top-24 bg-card rounded-lg p-6 shadow-soft">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display font-bold text-lg">Filters</h2>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-primary hover:underline font-body"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Fabric Filter */}
              <FilterSection title="Fabric" section="fabric">
                {fabrics.map((fabric) => (
                  <label
                    key={fabric}
                    className="flex items-center gap-2 cursor-pointer font-body text-sm"
                  >
                    <Checkbox
                      checked={selectedFabrics.includes(fabric)}
                      onCheckedChange={(checked) => {
                        setSelectedFabrics((prev) =>
                          checked
                            ? [...prev, fabric]
                            : prev.filter((f) => f !== fabric)
                        );
                      }}
                    />
                    {fabric}
                  </label>
                ))}
              </FilterSection>

              {/* Color Filter */}
              <FilterSection title="Color" section="color">
                {colors.map((color) => (
                  <label
                    key={color}
                    className="flex items-center gap-2 cursor-pointer font-body text-sm"
                  >
                    <Checkbox
                      checked={selectedColors.includes(color)}
                      onCheckedChange={(checked) => {
                        setSelectedColors((prev) =>
                          checked
                            ? [...prev, color]
                            : prev.filter((c) => c !== color)
                        );
                      }}
                    />
                    {color}
                  </label>
                ))}
              </FilterSection>

              {/* Occasion Filter */}
              <FilterSection title="Occasion" section="occasion">
                {occasions.map((occasion) => (
                  <label
                    key={occasion}
                    className="flex items-center gap-2 cursor-pointer font-body text-sm"
                  >
                    <Checkbox
                      checked={selectedOccasions.includes(occasion)}
                      onCheckedChange={(checked) => {
                        setSelectedOccasions((prev) =>
                          checked
                            ? [...prev, occasion]
                            : prev.filter((o) => o !== occasion)
                        );
                      }}
                    />
                    {occasion}
                  </label>
                ))}
              </FilterSection>

              {/* Price Filter */}
              <FilterSection title="Price Range" section="price">
                {priceRanges.map((range) => (
                  <label
                    key={range.label}
                    className="flex items-center gap-2 cursor-pointer font-body text-sm"
                  >
                    <Checkbox
                      checked={
                        selectedPriceRange?.min === range.min &&
                        selectedPriceRange?.max === range.max
                      }
                      onCheckedChange={(checked) => {
                        setSelectedPriceRange(
                          checked ? { min: range.min, max: range.max } : null
                        );
                      }}
                    />
                    {range.label}
                  </label>
                ))}
              </FilterSection>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Desktop Sort */}
            <div className="hidden lg:flex items-center justify-between mb-6">
              <p className="text-muted-foreground font-body">
                Showing <span className="font-semibold text-foreground">{filteredSarees.length}</span> sarees
              </p>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-border rounded-md px-3 py-2 font-body text-sm bg-background"
              >
                <option value="featured">Sort by: Featured</option>
                <option value="newest">Sort by: Newest</option>
                <option value="price-low">Sort by: Price (Low to High)</option>
                <option value="price-high">Sort by: Price (High to Low)</option>
              </select>
            </div>

            {/* Active Filters */}
            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedFabrics.map((f) => (
                  <span
                    key={f}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-secondary rounded-full text-sm font-body"
                  >
                    {f}
                    <button
                      onClick={() =>
                        setSelectedFabrics((prev) => prev.filter((x) => x !== f))
                      }
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
                {selectedColors.map((c) => (
                  <span
                    key={c}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-secondary rounded-full text-sm font-body"
                  >
                    {c}
                    <button
                      onClick={() =>
                        setSelectedColors((prev) => prev.filter((x) => x !== c))
                      }
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
                {selectedOccasions.map((o) => (
                  <span
                    key={o}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-secondary rounded-full text-sm font-body"
                  >
                    {o}
                    <button
                      onClick={() =>
                        setSelectedOccasions((prev) => prev.filter((x) => x !== o))
                      }
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
                {selectedPriceRange && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-secondary rounded-full text-sm font-body">
                    ₹{selectedPriceRange.min.toLocaleString()} - ₹
                    {selectedPriceRange.max === Infinity
                      ? "Above"
                      : selectedPriceRange.max.toLocaleString()}
                    <button onClick={() => setSelectedPriceRange(null)}>
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
              </div>
            )}

            {/* Products */}
            {filteredSarees.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSarees.map((saree, index) => (
                  <div
                    key={saree.id}
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <ProductCard saree={saree} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-xl font-display text-foreground mb-2">
                  No sarees found
                </p>
                <p className="text-muted-foreground font-body">
                  Try adjusting your filters to find what you're looking for.
                </p>
                <Button onClick={clearFilters} className="mt-4 font-body">
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
