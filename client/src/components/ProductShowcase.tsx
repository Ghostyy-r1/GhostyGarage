import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowRight, Award, Star, Tag } from "lucide-react";

interface ProductCardProps {
  id: number;
  name: string;
  image: string;
  price: number;
  category: string;
  rating: number;
  featured?: boolean;
  sale?: boolean;
  salePercentage?: number;
  delay: number;
}

const ProductCard = ({ 
  name, 
  image, 
  price, 
  category, 
  rating, 
  featured = false, 
  sale = false, 
  salePercentage = 0, 
  delay 
}: ProductCardProps) => {
  const salePrice = sale ? price * (1 - salePercentage / 100) : price;
  
  // Generate stars based on rating
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star 
          key={i} 
          className={`h-4 w-4 ${i < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-400"}`} 
        />
      );
    }
    return stars;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      className="h-full"
    >
      <Card className="h-full overflow-hidden group hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 flex flex-col">
        <div className="relative overflow-hidden pt-[56.25%]">
          <div 
            className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
            style={{ backgroundImage: `url(${image})` }}
          />
          
          {featured && (
            <div className="absolute top-2 left-2">
              <Badge variant="default" className="bg-primary hover:bg-primary text-white flex items-center gap-1">
                <Award className="h-3 w-3" />
                Featured
              </Badge>
            </div>
          )}
          
          {sale && (
            <div className="absolute top-2 right-2">
              <Badge variant="destructive" className="hover:bg-red-500 flex items-center gap-1">
                <Tag className="h-3 w-3" />
                {salePercentage}% OFF
              </Badge>
            </div>
          )}
        </div>
        
        <CardHeader className="p-4 pb-0 flex-grow">
          <div className="flex justify-between items-start">
            <div>
              <Badge variant="outline" className="mb-2 text-xs">
                {category}
              </Badge>
              <CardTitle className="text-lg md:text-xl group-hover:text-primary transition-colors">
                {name}
              </CardTitle>
            </div>
          </div>
          <div className="flex mt-2">
            {renderStars()}
          </div>
        </CardHeader>
        
        <CardContent className="p-4 pt-2">
          <CardDescription className="text-sm min-h-[40px]">
            Premium quality motorcycle gear and accessories
          </CardDescription>
        </CardContent>
        
        <CardFooter className="p-4 pt-0 flex justify-between items-center">
          <div className="flex flex-col">
            {sale ? (
              <>
                <span className="text-lg font-bold text-primary">${salePrice.toFixed(2)}</span>
                <span className="text-sm line-through text-gray-500">${price.toFixed(2)}</span>
              </>
            ) : (
              <span className="text-lg font-bold text-primary">${price.toFixed(2)}</span>
            )}
          </div>
          <Button size="sm" className="group-hover:bg-primary transition-colors">
            <span className="mr-2">View</span>
            <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export function ProductShowcase() {
  const products = [
    {
      id: 1,
      name: "Ghost Rider Leather Jacket",
      image: "https://picsum.photos/id/1015/600/400",
      price: 399.99,
      category: "Apparel",
      rating: 5,
      featured: true,
      sale: false,
      salePercentage: 0
    },
    {
      id: 2,
      name: "Phantom Motorcycle Helmet",
      image: "https://picsum.photos/id/1058/600/400",
      price: 259.99,
      category: "Safety",
      rating: 4,
      featured: false,
      sale: true,
      salePercentage: 15
    },
    {
      id: 3,
      name: "Cruiser Riding Gloves",
      image: "https://picsum.photos/id/96/600/400",
      price: 79.99,
      category: "Accessories",
      rating: 4,
      featured: false,
      sale: false,
      salePercentage: 0
    },
    {
      id: 4,
      name: "Nighthawk Riding Boots",
      image: "https://picsum.photos/id/103/600/400",
      price: 189.99,
      category: "Footwear",
      rating: 5,
      featured: false,
      sale: true,
      salePercentage: 20
    },
    {
      id: 5,
      name: "Shadow Motorcycle Cover",
      image: "https://picsum.photos/id/133/600/400",
      price: 69.99,
      category: "Accessories",
      rating: 3,
      featured: false,
      sale: false,
      salePercentage: 0
    },
    {
      id: 6,
      name: "Chrome Engine Guards",
      image: "https://picsum.photos/id/212/600/400",
      price: 149.99,
      category: "Parts",
      rating: 4,
      featured: true,
      sale: false,
      salePercentage: 0
    },
    {
      id: 7,
      name: "Midnight Saddlebags",
      image: "https://picsum.photos/id/21/600/400",
      price: 229.99,
      category: "Storage",
      rating: 5,
      featured: false,
      sale: true,
      salePercentage: 10
    },
    {
      id: 8,
      name: "Biker's Maintenance Kit",
      image: "https://picsum.photos/id/28/600/400",
      price: 119.99,
      category: "Tools",
      rating: 4,
      featured: false,
      sale: false,
      salePercentage: 0
    },
  ];

  return (
    <section className="w-full py-16 bg-gradient-to-b from-black to-gray-900">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary"
          >
            Premium Gear
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
          >
            Shop Our <span className="text-primary">Featured Products</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-[700px] text-muted-foreground md:text-xl/relaxed"
          >
            Discover our hand-picked selection of premium motorcycle gear and accessories for the ultimate riding experience.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              image={product.image}
              price={product.price}
              category={product.category}
              rating={product.rating}
              featured={product.featured}
              sale={product.sale}
              salePercentage={product.salePercentage}
              delay={index}
            />
          ))}
        </div>
        
        <div className="mt-12 flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white gap-2">
              View All Products
              <ArrowRight className="h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}