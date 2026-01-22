import { ShoppingCart, Star } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";

interface GameCardProps {
  id: string;
  title: string;
  image: string;
  originalPrice: number;
  discountedPrice: number;
  discount: number;
  platform: string;
  region: string;
  rating?: number;
  reviewCount?: number;
}

export function GameCard({
  title,
  image,
  originalPrice,
  discountedPrice,
  discount,
  platform,
  region,
  rating,
  reviewCount,
}: GameCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 group">
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {discount > 0 && (
          <Badge className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white font-bold">
            -{discount}%
          </Badge>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[3rem]">
          {title}
        </h3>
        
        <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
          <span>{platform}</span>
          <span>•</span>
          <span>{region}</span>
        </div>
        
        {rating && (
          <div className="flex items-center gap-1 mb-3">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{rating}</span>
            <span className="text-sm text-gray-500">({reviewCount})</span>
          </div>
        )}
        
        <div className="flex items-end justify-between mt-auto">
          <div className="flex flex-col">
            {discount > 0 && (
              <span className="text-sm text-gray-400 line-through">
                ${originalPrice.toFixed(2)}
              </span>
            )}
            <span className="text-2xl font-bold text-purple-600">
              ${discountedPrice.toFixed(2)}
            </span>
          </div>
          
          <Button 
            size="sm" 
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}
