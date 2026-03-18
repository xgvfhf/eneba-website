import { Search, Heart, ShoppingCart, User, X, ChevronDown } from "lucide-react";
import { Input } from "@/app/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

interface EnebaHeaderProps {
  onSearch: (query: string) => void;
  searchQuery: string;
  language: string;
  currency: string;
  onLanguageChange: (language: string) => void;
  onCurrencyChange: (currency: string) => void;

  //  новые пропсы — НЕобязательные
  savedCount?: number;
  pulse?: boolean;
}

const languages = [
  { code: "en", flag: "🇬🇧", name: "English EU" },
  { code: "ru", flag: "🇷🇺", name: "Русский" },
];

const currencies = ["EUR", "USD", "GBP", "RUB"];

export function EnebaHeader({
  onSearch,
  searchQuery,
  language,
  currency,
  onLanguageChange,
  onCurrencyChange,
  savedCount = 0,
  pulse = false,
}: EnebaHeaderProps) {
  const currentLanguage = languages.find((l) => l.code === language) || languages[0];
  const navigate = useNavigate();

  const hasSaved = savedCount > 0;

  return (
    <header className="bg-[#5b3a9e] text-white py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-4">
          {/* Logo */}
          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex items-center cursor-pointer"
            aria-label="Go to home"
          >
            <svg width="120" height="32" viewBox="0 0 120 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M8 16C8 11.5817 11.5817 8 16 8C20.4183 8 24 11.5817 24 16C24 20.4183 20.4183 24 16 24C11.5817 24 8 20.4183 8 16Z"
                fill="url(#gradient)"
              />
              <defs>
                <linearGradient id="gradient" x1="8" y1="8" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FF6B6B" />
                  <stop offset="0.25" stopColor="#FFD93D" />
                  <stop offset="0.5" stopColor="#6BCF7F" />
                  <stop offset="0.75" stopColor="#4D96FF" />
                  <stop offset="1" stopColor="#B565D8" />
                </linearGradient>
              </defs>
            </svg>
            <span className="ml-2 text-2xl font-bold">eneba</span>
          </button>

          {/* Search */}
          <div className="flex-1 max-w-xl relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/70" />
            <Input
              type="text"
              placeholder=""
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
              className="pl-10 pr-10 py-2 bg-[#6d4db3] text-white placeholder:text-white/70 border-0 focus-visible:ring-1 focus-visible:ring-white/30 rounded"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 hover:bg-white/10 px-2 py-1 rounded transition-colors">
                  <span className="text-lg">{currentLanguage.flag}</span>
                  <span className="hidden md:inline">{currentLanguage.name}</span>
                  <ChevronDown className="w-3 h-3" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-[#5b3a9e] border-white/20 text-white">
                  {languages.map((lang) => (
                    <DropdownMenuItem
                      key={lang.code}
                      onClick={() => onLanguageChange(lang.code)}
                      className="hover:bg-white/10 cursor-pointer focus:bg-white/10 focus:text-white"
                    >
                      <span className="mr-2">{lang.flag}</span>
                      {lang.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <span className="text-white/50">|</span>

              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 hover:bg-white/10 px-2 py-1 rounded transition-colors">
                  <span>{currency}</span>
                  <ChevronDown className="w-3 h-3" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-[#5b3a9e] border-white/20 text-white">
                  {currencies.map((curr) => (
                    <DropdownMenuItem
                      key={curr}
                      onClick={() => onCurrencyChange(curr)}
                      className="hover:bg-white/10 cursor-pointer focus:bg-white/10 focus:text-white"
                    >
                      {curr}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/*  Heart with highlight + badge + optional pulse */}
            <button
              type="button"
              onClick={() => navigate("/saved")}
              className={[
                "relative p-2 rounded transition",
                hasSaved ? "bg-white/15" : "hover:bg-white/10",
              ].join(" ")}
              aria-label="Open saved items"
              title={hasSaved ? `Saved: ${savedCount}` : "Saved items"}
            >
              {/* пульс-эффект когда лайкнули */}
              {pulse && (
                <span className="absolute -top-0.5 -right-0.5 inline-flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-300 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-400" />
                </span>
              )}

              <Heart className={["w-5 h-5", hasSaved ? "text-pink-200" : ""].join(" ")} />

              {hasSaved && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-pink-500 text-[11px] leading-[18px] text-white text-center">
                  {savedCount > 99 ? "99+" : savedCount}
                </span>
              )}
            </button>

            <button type="button" className="p-2 hover:bg-white/10 rounded" aria-label="Cart">
              <ShoppingCart className="w-5 h-5" />
            </button>

            <button
              type="button"
              className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center"
              aria-label="User"
            >
              <User className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
