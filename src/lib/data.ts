import saree1 from "@/assets/saree-1.jpg";
import saree2 from "@/assets/saree-2.jpg";
import saree3 from "@/assets/saree-3.jpg";
import saree4 from "@/assets/saree-4.jpg";
import saree5 from "@/assets/saree-5.jpg";
import saree6 from "@/assets/saree-6.jpg";

export interface Saree {
  id: string;
  name: string;
  nameBn: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  fabric: string;
  color: string;
  occasion: string;
  length: string;
  description: string;
  inStock: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
}

export const sarees: Saree[] = [
  {
    id: "1",
    name: "Royal Red Banarasi Silk",
    nameBn: "রয়্যাল রেড বেনারসি সিল্ক",
    price: 15999,
    originalPrice: 19999,
    image: saree1,
    images: [saree1],
    fabric: "Silk",
    color: "Red",
    occasion: "Wedding",
    length: "6.3 meters",
    description: "Exquisite handwoven Banarasi silk saree with intricate golden zari work. Perfect for weddings and special occasions.",
    inStock: true,
    isNew: true,
    isFeatured: true,
  },
  {
    id: "2",
    name: "Emerald Green Kanjivaram",
    nameBn: "পান্না সবুজ কাঞ্জিভরম",
    price: 22999,
    originalPrice: 27999,
    image: saree2,
    images: [saree2],
    fabric: "Silk",
    color: "Green",
    occasion: "Festival",
    length: "6.3 meters",
    description: "Traditional Kanjivaram silk saree with temple border design and rich golden borders. A timeless piece for celebrations.",
    inStock: true,
    isFeatured: true,
  },
  {
    id: "3",
    name: "Purple Chanderi Silk",
    nameBn: "বেগুনি চান্দেরি সিল্ক",
    price: 12999,
    image: saree3,
    images: [saree3],
    fabric: "Chanderi Silk",
    color: "Purple",
    occasion: "Party",
    length: "5.5 meters",
    description: "Elegant Chanderi silk saree with silver embroidery and delicate shimmering border. Perfect for evening parties.",
    inStock: true,
    isNew: true,
  },
  {
    id: "4",
    name: "Coral Pink Tussar",
    nameBn: "প্রবাল গোলাপী তুসার",
    price: 8999,
    originalPrice: 11999,
    image: saree4,
    images: [saree4],
    fabric: "Tussar Silk",
    color: "Pink",
    occasion: "Casual",
    length: "5.5 meters",
    description: "Beautiful Tussar silk saree with hand-painted Madhubani art patterns. Celebrates traditional Indian craft.",
    inStock: true,
    isFeatured: true,
  },
  {
    id: "5",
    name: "Navy Blue Patola",
    nameBn: "নেভি নীল পাটোলা",
    price: 28999,
    image: saree5,
    images: [saree5],
    fabric: "Silk",
    color: "Blue",
    occasion: "Wedding",
    length: "6.3 meters",
    description: "Luxurious Patola silk saree with geometric patterns and rich golden borders. A prized possession for any wardrobe.",
    inStock: true,
    isNew: true,
  },
  {
    id: "6",
    name: "Bengal Tant Cotton",
    nameBn: "বাংলা তাঁত কটন",
    price: 3999,
    originalPrice: 4999,
    image: saree6,
    images: [saree6],
    fabric: "Cotton",
    color: "Beige",
    occasion: "Daily Wear",
    length: "5.5 meters",
    description: "Traditional Bengali Tant cotton saree with red border and traditional motifs. Comfortable for everyday elegance.",
    inStock: true,
    isFeatured: true,
  },
];

export const categories = [
  { name: "Silk Sarees", count: 45 },
  { name: "Cotton Sarees", count: 32 },
  { name: "Wedding Collection", count: 28 },
  { name: "Festival Special", count: 36 },
  { name: "Daily Wear", count: 52 },
];

export const fabrics = ["Silk", "Cotton", "Chanderi Silk", "Tussar Silk", "Linen", "Georgette"];
export const colors = ["Red", "Green", "Purple", "Pink", "Blue", "Beige", "Gold", "Maroon", "Orange"];
export const occasions = ["Wedding", "Festival", "Party", "Casual", "Daily Wear", "Office"];
export const priceRanges = [
  { label: "Under ₹5,000", min: 0, max: 5000 },
  { label: "₹5,000 - ₹10,000", min: 5000, max: 10000 },
  { label: "₹10,000 - ₹20,000", min: 10000, max: 20000 },
  { label: "Above ₹20,000", min: 20000, max: Infinity },
];
