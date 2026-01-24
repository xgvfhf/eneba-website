import { Search, ShoppingCart, User, Menu } from "lucide-react";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";

interface StoreHeaderProps {
  onSearch: (query: string) => void;
  searchQuery: string;
  cartItemCount?: number;
}

export function StoreHeader({ onSearch, searchQuery, cartItemCount = 0 }: StoreHeaderProps) {
  return (
    <header className="bg-gradient-to-r from-purple-700 via-purple-600 to-purple-700 text-white sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4 gap-4">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="md:hidden text-white hover:bg-purple-600">
              <Menu className="w-6 h-6" />
            </Button>
            <h1 className="text-3xl font-bold tracking-tight">
              ENEBA
            </h1>
          </div>
          
          {/* Search Bar */}
          <div className="flex-1 max-w-2xl relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search for games..."
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
              className="pl-10 pr-4 py-6 bg-white text-gray-900 border-0 rounded-lg shadow-md focus-visible:ring-2 focus-visible:ring-purple-300"
            />
          </div>
          
          {/* User Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative text-white hover:bg-purple-600">
              <ShoppingCart className="w-6 h-6" />
              {cartItemCount > 0 && (
                <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
                  {cartItemCount}
                </Badge>
              )}
            </Button>
            
            <Button variant="ghost" size="icon" className="text-white hover:bg-purple-600">
              <User className="w-6 h-6" />
            </Button>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6 pb-4 text-sm">
          <Button variant="ghost" className="text-white hover:bg-purple-600 hover:text-white">
            All Games
          </Button>
          <Button variant="ghost" className="text-white hover:bg-purple-600 hover:text-white">
            PC Games
          </Button>
          <Button variant="ghost" className="text-white hover:bg-purple-600 hover:text-white">
            PlayStation
          </Button>
          <Button variant="ghost" className="text-white hover:bg-purple-600 hover:text-white">
            Xbox
          </Button>
          <Button variant="ghost" className="text-white hover:bg-purple-600 hover:text-white">
            Nintendo
          </Button>
          <Button variant="ghost" className="text-white hover:bg-purple-600 hover:text-white">
            Gift Cards
          </Button>
          <Button variant="ghost" className="text-purple-200 hover:bg-purple-600 hover:text-white font-semibold">
            Sale
          </Button>
        </nav>
      </div>
    </header>
  );
}
