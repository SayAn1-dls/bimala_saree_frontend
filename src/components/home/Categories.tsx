import { Link } from "react-router-dom";
import saree1 from "@/assets/saree-1.jpg";
import saree2 from "@/assets/saree-2.jpg";
import saree5 from "@/assets/saree-5.jpg";
import saree6 from "@/assets/saree-6.jpg";

const categories = [
  {
    name: "Silk Sarees",
    nameBn: "সিল্ক শাড়ি",
    description: "Luxurious silk collection",
    image: saree1,
    link: "/shop?fabric=Silk",
  },
  {
    name: "Wedding Collection",
    nameBn: "বিয়ের শাড়ি",
    description: "For your special day",
    image: saree2,
    link: "/shop?occasion=Wedding",
  },
  {
    name: "Designer Sarees",
    nameBn: "ডিজাইনার শাড়ি",
    description: "Exclusive designs",
    image: saree5,
    link: "/shop?filter=designer",
  },
  {
    name: "Cotton Sarees",
    nameBn: "কটন শাড়ি",
    description: "Everyday elegance",
    image: saree6,
    link: "/shop?fabric=Cotton",
  },
];

export const Categories = () => {
  return (
    <section className="py-16 lg:py-24 bg-secondary">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-accent font-semibold tracking-wider uppercase text-sm font-body">
            Shop by Category
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mt-2 mb-4">
            Explore Our Collections
          </h2>
          <p className="text-muted-foreground font-body">
            From traditional silk to comfortable cotton, find your perfect match
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.name}
              to={category.link}
              className="group relative overflow-hidden rounded-lg aspect-[3/4] animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <img
                src={category.image}
                alt={category.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-background">
                <p className="text-sm text-accent mb-1 font-body">{category.nameBn}</p>
                <h3 className="text-xl font-display font-bold mb-1 group-hover:text-accent transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-background/70 font-body">{category.description}</p>
                
                {/* Underline Animation */}
                <div className="mt-3 flex items-center gap-2 text-accent text-sm font-medium">
                  <span className="font-body">Explore</span>
                  <div className="w-4 h-0.5 bg-accent transform transition-all duration-300 group-hover:w-8" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
