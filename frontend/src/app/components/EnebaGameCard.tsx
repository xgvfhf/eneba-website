import React from "react";
import { ShoppingCart } from "lucide-react";

export type EnebaGameCardProps = {
  id: string;
  title: string;
  image: string;
  platform: string;
  likes: number;
  likedByMe: boolean;
  originalPrice: number;
  discountedPrice: number;
  cashback: number;
  currencySymbol: string;
  onToggleLike?: (id: string) => void | Promise<void>;
};

export function EnebaGameCard(props: EnebaGameCardProps) {
  const {
    id,
    title,
    image,
    platform,
    likes,
    likedByMe,
    originalPrice,
    discountedPrice,
    cashback,
    currencySymbol,
    onToggleLike,
  } = props;

  const handleLikeClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!onToggleLike) return;
    await onToggleLike(id);
  };

  return (
    <div className="group bg-gradient-to-b from-[#4a3066] to-[#3a2555] rounded-2xl overflow-hidden hover:ring-2 hover:ring-purple-400/60 transition-all cursor-pointer shadow-lg hover:shadow-[0_0_25px_rgba(168,85,247,0.4)] relative">
      {/* Изображение с кнопкой лайка */}
      <div className="relative overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-56 object-cover block group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        
        {/* ❤️ Кнопка лайка */}
        <button
          type="button"
          onClick={handleLikeClick}
          className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full px-3 py-1.5 bg-black/40 backdrop-blur-sm text-white hover:bg-black/60 transition-colors"
          aria-label={likedByMe ? "Unlike" : "Like"}
          title={likedByMe ? "Unlike" : "Like"}
        >
          <span className="text-lg leading-none">
            {likedByMe ? "♥" : "♡"}
          </span>
          <span className="text-sm font-medium">{likes}</span>
        </button>
      </div>
      
      {/* Информация о игре */}
      <div className="p-4">
        <h3 className="text-white font-semibold text-base line-clamp-2 min-h-[2.5rem] leading-tight mb-3">
          {title}
        </h3>
        
        <div className="text-emerald-400 text-sm font-medium mb-4 uppercase tracking-wide">
          {platform}
        </div>
        
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-white text-2xl font-bold">
            {currencySymbol}{discountedPrice.toFixed(2)}
          </span>
          
          {originalPrice > discountedPrice && (
            <span className="text-white/50 text-sm line-through">
              {currencySymbol}{originalPrice.toFixed(2)}
            </span>
          )}
        </div>
        
        <div className="text-white/60 text-xs">
          Cashback: {currencySymbol}{cashback.toFixed(2)}
        </div>
      </div>

      {/* Кнопка "Купить" - поднимается снизу при наведении */}
      <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
        <button className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-3.5 px-4 flex items-center justify-center gap-2 shadow-lg transition-colors">
          <ShoppingCart className="w-5 h-5" />
          <span>Add to cart</span>
        </button>
      </div>
    </div>
  );
}