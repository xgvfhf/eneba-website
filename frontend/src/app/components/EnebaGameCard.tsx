import { Heart } from "lucide-react";
import { Badge } from "@/app/components/ui/badge";

interface EnebaGameCardProps {
  id: string;
  title: string;
  image: string;
  originalPrice: number;
  discountedPrice: number;
  cashback: number;
  platform: string;
  likes: number;
  currencySymbol?: string;
}

export function EnebaGameCard({
  title,
  image,
  originalPrice,
  discountedPrice,
  cashback,
  platform,
  likes,
  currencySymbol = "€",
}: EnebaGameCardProps) {
  return (
    <div className="bg-[#2a1f4a] rounded-lg overflow-hidden hover:ring-2 hover:ring-purple-400/50 transition-all cursor-pointer shadow-lg">
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-900">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        <Badge className="absolute bottom-3 left-3 bg-[#00d4aa] hover:bg-[#00d4aa] text-white text-[10px] font-bold px-2.5 py-0.5 flex items-center gap-1 shadow-md">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="6" cy="6" r="5" fill="white" />
            <path d="M6 2L7.5 5L11 5.5L8.5 8L9 11.5L6 9.5L3 11.5L3.5 8L1 5.5L4.5 5L6 2Z" fill="#00d4aa" />
          </svg>
          CASHBACK
        </Badge>
      </div>
      
      <div className="p-3.5">
        <h3 className="text-white text-sm font-medium mb-2.5 line-clamp-2 min-h-[2.5rem] leading-tight">
          {title}
        </h3>
        
        <div className="flex items-center gap-1 mb-3">
          <span className="text-[#00d4aa] text-[11px] font-medium">{platform}</span>
        </div>
        
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-white/40 text-[11px] line-through">
            {currencySymbol}{originalPrice.toFixed(2)}
          </span>
          <div className="flex items-center gap-1.5">
            <span className="text-white text-xl font-bold">
              {currencySymbol}{discountedPrice.toFixed(2)}
            </span>
            <div className="w-4 h-4 rounded-full bg-[#00d4aa] flex items-center justify-center">
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 4L3 6L7 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
        
        <div className="text-white/50 text-[11px] mb-3">
          Cashback: {currencySymbol}{cashback.toFixed(2)}
        </div>
        
        <div className="flex items-center gap-1 text-white/50 text-[11px]">
          <Heart className="w-3 h-3" />
          <span>{likes}</span>
        </div>
      </div>
    </div>
  );
}