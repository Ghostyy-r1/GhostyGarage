import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Award,
  Star,
  Tag,
  Truck,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  Filter,
  Search,
  Heart
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductDetails {
  description: string;
  colors?: string[];
  material?: string;
  availability: "In Stock" | "Low Stock" | "Out of Stock";
  shippingTime: string;
}

interface ProductCardProps {
  id: number;
  name: string;
  image: string;
  price: number;
  category: string;
  subcategory?: string;
  rating: number;
  reviewCount: number;
  featured?: boolean;
  sale?: boolean;
  salePercentage?: number;
  isNew?: boolean;
  details: ProductDetails;
  delay: number;
}

const ProductCard = ({
  id,
  name,
  image,
  price,
  category,
  subcategory,
  rating,
  reviewCount,
  featured = false,
  sale = false,
  salePercentage = 0,
  isNew = false,
  details,
  delay
}: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const salePrice = sale ? price * (1 - salePercentage / 100) : price;

  // Generate stars based on rating
  const renderStars = () => {
    return (
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={14}
            className={cn(
              "mr-0.5",
              i < Math.floor(rating) ? "text-yellow-500 fill-yellow-500" : "text-gray-400"
            )}
          />
        ))}
        <span className="ml-1 text-xs text-gray-400">({reviewCount})</span>
      </div>
    );
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "In Stock":
        return "text-green-500";
      case "Low Stock":
        return "text-yellow-500";
      case "Out of Stock":
        return "text-red-500";
      default:
        return "text-gray-400";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: delay * 0.1
      }}
      className="h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className="h-full overflow-hidden group border-gray-800/50 bg-gradient-to-b from-gray-900/90 via-gray-900 to-black backdrop-blur-sm hover:shadow-xl hover:shadow-purple-500/20 hover:border-purple-500/30 transition-all duration-300 flex flex-col">
        <div className="relative overflow-hidden pt-[80%]">
          <motion.div
            animate={{
              scale: isHovered ? 1.08 : 1,
            }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${image})` }}
          />

          {/* Badges container */}
          <div className="absolute top-3 left-3 flex flex-col space-y-2">
            {featured && (
              <Badge
                variant="default"
                className="bg-purple-600 hover:bg-purple-700 text-white font-medium flex items-center gap-1"
              >
                <Award className="h-3 w-3" />
                Featured
              </Badge>
            )}

            {isNew && (
              <Badge
                variant="default"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium"
              >
                New Arrival
              </Badge>
            )}
          </div>

          {sale && (
            <div className="absolute top-3 right-3">
              <Badge
                variant="destructive"
                className="font-medium bg-red-600 hover:bg-red-700 flex items-center gap-1"
              >
                <Tag className="h-3 w-3" />
                {salePercentage}% OFF
              </Badge>
            </div>
          )}

          {/* Quick actions */}
          <motion.div 
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"
            animate={{
              y: isHovered ? 0 : 50
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-center">
              <Button
                size="sm"
                variant="outline"
                className="bg-gray-900/70 backdrop-blur-sm border-gray-700 hover:bg-purple-600 hover:text-white hover:border-purple-600 text-xs rounded-full"
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <Heart className={cn(
                  "h-3.5 w-3.5 mr-1",
                  isFavorite ? "fill-red-500 text-red-500" : ""
                )} />
                <span>Save</span>
              </Button>

              <Button
                size="sm"
                className="bg-purple-600 hover:bg-purple-700 text-white text-xs rounded-full"
              >
                <ShoppingCart className="h-3.5 w-3.5 mr-1" />
                <span>Add to Cart</span>
              </Button>
            </div>
          </motion.div>
        </div>

        <CardHeader className="p-4 pb-2 flex-grow">
          <div className="space-y-1">
            <div className="flex justify-between items-start">
              <Badge variant="outline" className="border-gray-700 text-xs font-normal bg-gray-800/50 text-gray-300">
                {category}
                {subcategory && ` • ${subcategory}`}
              </Badge>
            </div>

            <CardTitle className="text-base md:text-lg mt-2 line-clamp-2 group-hover:text-purple-400 transition-colors">
              {name}
            </CardTitle>

            <div className="flex mt-1">
              {renderStars()}
            </div>
          </div>
        </CardHeader>

        <CardContent className="px-4 py-2">
          <CardDescription className="text-xs text-gray-400 line-clamp-2">
            {details.description}
          </CardDescription>

          <div className="mt-2 flex items-center text-xs">
            <Truck className="h-3.5 w-3.5 text-gray-500 mr-1.5" />
            <span className={cn(
              "text-xs",
              getAvailabilityColor(details.availability)
            )}>
              {details.availability} • {details.shippingTime}
            </span>
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-2 flex justify-between items-center border-t border-gray-800/60 mt-auto">
          <div className="flex flex-col">
            {sale ? (
              <>
                <div className="flex items-center">
                  <span className="text-lg font-bold text-purple-400">${salePrice.toFixed(2)}</span>
                  <span className="text-xs bg-red-600/20 text-red-400 font-medium rounded-sm px-1.5 ml-2">
                    SAVE ${(price - salePrice).toFixed(2)}
                  </span>
                </div>
                <span className="text-sm line-through text-gray-500">${price.toFixed(2)}</span>
              </>
            ) : (
              <span className="text-lg font-bold text-purple-400">${price.toFixed(2)}</span>
            )}
          </div>

          <Button 
            size="sm" 
            className="bg-gray-800 text-white border border-gray-700 hover:bg-purple-600 hover:border-purple-600 transition-colors rounded-lg"
          >
            <span className="mr-1">Details</span>
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export function ProductShowcase() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 8;

  // Expanded product data with more details
  const products: ProductCardProps[] = [
    {
      id: 1,
      name: "Ghost Rider Premium Leather Jacket",
      image: "https://picsum.photos/id/1015/800/1000",
      price: 399.99,
      category: "Apparel",
      subcategory: "Jackets",
      rating: 4.9,
      reviewCount: 128,
      featured: true,
      sale: false,
      isNew: true,
      details: {
        description: "Premium quality full-grain leather jacket with CE-rated armor and reflective detailing for maximum visibility at night.",
        colors: ["Black", "Brown", "Red"],
        material: "Full-grain leather",
        availability: "In Stock",
        shippingTime: "Ships in 1-2 days"
      },
      delay: 0
    },
    {
      id: 2,
      name: "Phantom X9 Full-Face Helmet DOT/ECE Certified",
      image: "https://picsum.photos/id/1058/800/1000",
      price: 259.99,
      category: "Safety",
      subcategory: "Helmets",
      rating: 4.7,
      reviewCount: 95,
      featured: false,
      sale: true,
      salePercentage: 15,
      details: {
        description: "Aerodynamic full-face helmet with advanced ventilation system, anti-fog visor, and integrated Bluetooth communication system.",
        colors: ["Matte Black", "White", "Gray"],
        material: "Fiberglass composite",
        availability: "In Stock",
        shippingTime: "Ships in 1-2 days"
      },
      delay: 1
    },
    {
      id: 3,
      name: "Pro Rider Racing Gloves with Knuckle Protection",
      image: "https://picsum.photos/id/96/800/1000",
      price: 79.99,
      category: "Accessories",
      subcategory: "Gloves",
      rating: 4.5,
      reviewCount: 82,
      featured: false,
      sale: false,
      details: {
        description: "Touchscreen-compatible racing gloves with goatskin leather, reinforced palm, and carbon fiber knuckle protection for maximum safety.",
        colors: ["Black/Red", "Black/Blue", "All Black"],
        material: "Goatskin leather, carbon fiber",
        availability: "In Stock",
        shippingTime: "Ships in 1-2 days"
      },
      delay: 2
    },
    {
      id: 4,
      name: "Nighthawk Waterproof Riding Boots with Ankle Protection",
      image: "https://picsum.photos/id/103/800/1000",
      price: 189.99,
      category: "Footwear",
      subcategory: "Boots",
      rating: 4.8,
      reviewCount: 76,
      featured: false,
      sale: true,
      salePercentage: 20,
      details: {
        description: "Oil-resistant, non-slip touring boots with waterproof membrane, ankle protection, and shift pad for all-day comfort.",
        colors: ["Black"],
        material: "Full-grain leather, Gore-Tex",
        availability: "Low Stock",
        shippingTime: "Ships in 1-2 days"
      },
      delay: 3
    },
    {
      id: 5,
      name: "All-Weather Motorcycle Cover with Lock Pocket",
      image: "https://picsum.photos/id/133/800/1000",
      price: 69.99,
      category: "Accessories",
      subcategory: "Storage",
      rating: 4.3,
      reviewCount: 51,
      featured: false,
      sale: false,
      details: {
        description: "Heavy-duty, UV-resistant cover with heat-resistant panels, lock holes, and vents to prevent condensation during long-term storage.",
        colors: ["Black/Silver"],
        material: "210D Oxford polyester",
        availability: "In Stock",
        shippingTime: "Ships in 1-2 days"
      },
      delay: 4
    },
    {
      id: 6,
      name: "Chrome Engine Guards with Integrated Highway Pegs",
      image: "https://picsum.photos/id/212/800/1000",
      price: 149.99,
      category: "Parts",
      subcategory: "Protection",
      rating: 4.6,
      reviewCount: 43,
      featured: true,
      sale: false,
      details: {
        description: "Heavy-duty chrome engine guards with integrated highway pegs, engineered for perfect fitment and maximum protection.",
        colors: ["Chrome", "Black"],
        material: "Steel, chrome-plated",
        availability: "In Stock",
        shippingTime: "Ships in 2-3 days"
      },
      delay: 5
    },
    {
      id: 7,
      name: "Lockable Saddlebags with Quick-Release System",
      image: "https://picsum.photos/id/21/800/1000",
      price: 229.99,
      category: "Storage",
      subcategory: "Bags",
      rating: 4.9,
      reviewCount: 37,
      featured: false,
      sale: true,
      salePercentage: 10,
      details: {
        description: "Weather-resistant, lockable saddlebags with quick-release system, reflective piping, and reinforced mounting points.",
        colors: ["Black"],
        material: "Ballistic nylon, ABS backing",
        availability: "In Stock",
        shippingTime: "Ships in 1-2 days"
      },
      delay: 6
    },
    {
      id: 8,
      name: "Ultimate Motorcycle Maintenance Toolkit",
      image: "https://picsum.photos/id/28/800/1000",
      price: 119.99,
      category: "Tools",
      subcategory: "Maintenance",
      rating: 4.7,
      reviewCount: 62,
      featured: false,
      sale: false,
      details: {
        description: "Comprehensive toolkit with 45+ specialized tools for motorcycle maintenance, packed in a compact roll-up case.",
        material: "Chrome vanadium steel",
        availability: "In Stock",
        shippingTime: "Ships in 1-2 days"
      },
      delay: 7
    },
    {
      id: 9,
      name: "Bluetooth Motorcycle Communication System",
      image: "https://picsum.photos/id/160/800/1000",
      price: 199.99,
      category: "Electronics",
      subcategory: "Communication",
      rating: 4.8,
      reviewCount: 74,
      featured: true,
      sale: false,
      isNew: true,
      details: {
        description: "4-rider intercom with 1.2km range, advanced noise cancellation, smartphone connectivity, and 15-hour battery life.",
        colors: ["Black"],
        material: "ABS plastic",
        availability: "In Stock",
        shippingTime: "Ships in 1-2 days"
      },
      delay: 0
    },
    {
      id: 10,
      name: "Armored Motorcycle Riding Pants",
      image: "https://picsum.photos/id/318/800/1000",
      price: 169.99,
      category: "Apparel",
      subcategory: "Pants",
      rating: 4.5,
      reviewCount: 49,
      featured: false,
      sale: true,
      salePercentage: 25,
      details: {
        description: "Abrasion-resistant riding pants with removable armor, waterproof liner, and adjustable fit for all-season comfort.",
        colors: ["Black", "Khaki"],
        material: "Cordura fabric, CE armor",
        availability: "In Stock",
        shippingTime: "Ships in 1-2 days"
      },
      delay: 1
    },
    {
      id: 11,
      name: "Anti-Theft Motorcycle Alarm System",
      image: "https://picsum.photos/id/201/800/1000",
      price: 89.99,
      category: "Electronics",
      subcategory: "Security",
      rating: 4.2,
      reviewCount: 28,
      featured: false,
      sale: false,
      details: {
        description: "Shock-sensitive alarm with remote, ignition cut-off, and smartphone alerts when your motorcycle is disturbed.",
        colors: ["Black"],
        material: "ABS plastic, stainless steel",
        availability: "Low Stock",
        shippingTime: "Ships in 1-2 days"
      },
      delay: 2
    },
    {
      id: 12,
      name: "Premium LED Motorcycle Auxiliary Lights",
      image: "https://picsum.photos/id/36/800/1000",
      price: 149.99,
      category: "Parts",
      subcategory: "Lighting",
      rating: 4.7,
      reviewCount: 56,
      featured: false,
      sale: false,
      isNew: true,
      details: {
        description: "Waterproof, CNC-machined housing with powerful LED light output, custom mounting brackets, and wiring harness.",
        colors: ["Chrome", "Black"],
        material: "Aluminum, polycarbonate lens",
        availability: "In Stock",
        shippingTime: "Ships in 2-3 days"
      },
      delay: 3
    }
  ];

  // Filter products by category
  const filterProducts = () => {
    if (activeCategory === "All") {
      return products;
    }
    return products.filter(product => product.category === activeCategory);
  };

  const filteredProducts = filterProducts();

  // Get unique categories
  const categories = ["All", ...Array.from(new Set(products.map(p => p.category)))];

  // Get current page products
  const currentProducts = filteredProducts.slice(
    currentPage * productsPerPage,
    (currentPage + 1) * productsPerPage
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(0, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(totalPages - 1, prev + 1));
  };

  // Reset to first page when changing category
  useEffect(() => {
    setCurrentPage(0);
  }, [activeCategory]);

  return (
    <section className="w-full py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block rounded-full bg-purple-900/30 px-4 py-1 text-sm text-purple-400 font-medium"
          >
            RIDER EQUIPMENT
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-white"
          >
            Shop Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Premium Collection</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-[700px] text-gray-400 md:text-lg"
          >
            Discover our curated selection of high-quality motorcycle gear, apparel, and accessories designed for safety, style, and the ultimate riding experience.
          </motion.p>

          {/* Category Tabs */}
          <div className="mt-4 w-full flex justify-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-gray-900/70 backdrop-blur-md rounded-full p-1.5 border border-gray-800 overflow-x-auto hide-scrollbar"
            >
              <div className="flex space-x-1">
                {categories.map((category, index) => (
                  <motion.button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      "px-4 py-1.5 text-sm font-medium rounded-full transition-all whitespace-nowrap",
                      activeCategory === category
                        ? "bg-purple-600 text-white shadow-md" 
                        : "text-gray-400 hover:text-white hover:bg-gray-800"
                    )}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Product Search & Filter Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col md:flex-row justify-between items-center mb-8 px-1"
        >
          <div className="flex items-center bg-gray-800/50 border border-gray-700 rounded-full px-3 py-1.5 mb-4 md:mb-0 w-full md:w-auto max-w-xs">
            <Search className="h-4 w-4 text-gray-500 mr-2" />
            <input 
              type="text" 
              placeholder="Search products..." 
              className="bg-transparent text-sm text-gray-300 focus:outline-none w-full" 
            />
          </div>

          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-gray-800/50 border-gray-700 text-gray-300 hover:bg-gray-700 text-xs rounded-full"
            >
              <Filter className="h-3.5 w-3.5 mr-1.5" />
              Filters
            </Button>

            <div className="text-sm text-gray-400">
              Showing <span className="font-medium text-purple-400">{currentProducts.length}</span> of <span className="font-medium text-purple-400">{filteredProducts.length}</span> products
            </div>
          </div>
        </motion.div>

        {/* Products Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeCategory}-${currentPage}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {currentProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                {...product}
                delay={index}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevPage}
              disabled={currentPage === 0}
              className="border-gray-700 bg-gray-800/50 text-white hover:bg-purple-600 hover:border-purple-600 disabled:opacity-50"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>

            <div className="flex items-center space-x-1">
              {Array.from({ length: totalPages }).map((_, index) => (
                <Button
                  key={index}
                  variant={currentPage === index ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(index)}
                  className={cn(
                    "h-8 w-8 p-0",
                    currentPage === index 
                      ? "bg-purple-600 hover:bg-purple-700 text-white" 
                      : "border-gray-700 bg-gray-800/50 text-white hover:bg-gray-700"
                  )}
                >
                  {index + 1}
                </Button>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleNextPage}
              disabled={currentPage === totalPages - 1}
              className="border-gray-700 bg-gray-800/50 text-white hover:bg-purple-600 hover:border-purple-600 disabled:opacity-50"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        )}

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 p-6 md:p-8 rounded-xl bg-gradient-to-r from-purple-900/40 to-indigo-900/40 border border-purple-800/30 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full filter blur-3xl -z-10 transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-600/10 rounded-full filter blur-3xl -z-10 transform -translate-x-1/2 translate-y-1/2"></div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Join Our Premium Riders Club</h3>
              <p className="text-gray-300">Get exclusive deals, early access to new products, and member-only perks.</p>
            </div>

            <Button 
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white border-none whitespace-nowrap"
            >
              Become a Member
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </motion.div>

        {/* View All Products Button */}
        <div className="mt-12 flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white gap-2 border-none"
            >
              View All Products
              <ArrowRight className="h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </div>

      <style>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <style>{`
        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
        }
      `}</style>
    </section>
  );
}