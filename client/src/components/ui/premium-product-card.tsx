import { useState } from 'react';
import { motion } from 'framer-motion';
import { ThreeDCard } from './3d-card';
import { Badge } from './badge';
import { Button } from './button';
import { StarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PremiumProductCardProps {
  id: number;
  name: string;
  image: string;
  price: number;
  category: string;
  rating: number;
  featured?: boolean;
  sale?: boolean;
  salePercentage?: number;
  className?: string;
  onViewDetails?: (id: number) => void;
}

export function PremiumProductCard({
  id,
  name,
  image,
  price,
  category,
  rating,
  featured = false,
  sale = false,
  salePercentage = 0,
  className,
  onViewDetails,
}: PremiumProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Calculate sale price if on sale
  const salePrice = sale ? price * (1 - salePercentage / 100) : price;

  return (
    <ThreeDCard
      className={cn(
        "group relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300",
        isHovered ? "shadow-xl scale-[1.02]" : "",
        className
      )}
      rotationIntensity={10}
      glareEnabled={true}
      glareColor="rgba(150, 100, 255, 0.4)"
    >
      <div
        className="relative h-full flex flex-col"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image container with overlay effects */}
        <div className="relative overflow-hidden h-56">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 ease-in-out"
            style={{
              transform: isHovered ? 'scale(1.1)' : 'scale(1)',
            }}
          />
          
          {/* Premium gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-70" />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {featured && (
              <Badge className="bg-purple-600 hover:bg-purple-500 px-2.5 py-1 text-white font-medium">
                Featured
              </Badge>
            )}
            {sale && (
              <Badge className="bg-red-500 hover:bg-red-400 px-2.5 py-1 text-white font-medium">
                {salePercentage}% OFF
              </Badge>
            )}
          </div>
          
          {/* Category pill */}
          <div className="absolute top-3 right-3">
            <Badge variant="outline" className="bg-black/40 backdrop-blur-sm border-purple-400/30 text-white">
              {category}
            </Badge>
          </div>
        </div>
        
        {/* Content section */}
        <div className="flex flex-col flex-grow p-4 bg-gradient-to-b from-gray-900 to-black border-t border-purple-500/30">
          <h3 className="font-bold text-lg text-white truncate">{name}</h3>
          
          {/* Rating */}
          <div className="flex items-center mt-1 mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  className={cn(
                    "h-4 w-4",
                    i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-600"
                  )}
                />
              ))}
            </div>
            <span className="text-xs text-gray-400 ml-1">({rating.toFixed(1)})</span>
          </div>
          
          {/* Price */}
          <div className="flex items-baseline mt-auto">
            {sale ? (
              <>
                <span className="text-xl font-bold text-white">${salePrice.toFixed(2)}</span>
                <span className="text-sm text-gray-400 line-through ml-2">
                  ${price.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-xl font-bold text-white">${price.toFixed(2)}</span>
            )}
          </div>
          
          {/* Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="mt-4"
          >
            <Button 
              variant="default" 
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
              onClick={() => onViewDetails?.(id)}
            >
              View Details
            </Button>
          </motion.div>
        </div>
      </div>
    </ThreeDCard>
  );
}