import { useState } from "react";
import { EnebaHeader } from "@/app/components/EnebaHeader";
import { EnebaGameCard } from "@/app/components/EnebaGameCard";

// Используем прямые URL изображений для возможности локального запуска
const splitFictionImage = "https://images.unsplash.com/photo-1602610423018-9b72909e9f80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWRlbyUyMGdhbWUlMjBjb250cm9sbGVyJTIwZ2FtaW5nfGVufDF8fHx8MTc2OTA0MDY5NHww&ixlib=rb-4.1.0&q=80&w=1080";
const redDeadImage = "https://images.unsplash.com/photo-1761926639381-498725d1d059?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZXN0ZXJuJTIwY293Ym95JTIwZ2FtZXxlbnwxfHx8fDE3NjkwNDA2OTR8MA&ixlib=rb-4.1.0&q=80&w=1080";
const fifa23Image = "https://images.unsplash.com/photo-1634813052369-3584119ccd2a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NjZXIlMjBmb290YmFsbCUyMHN0YWRpdW18ZW58MXx8fHwxNzY4OTk4MjczfDA&ixlib=rb-4.1.0&q=80&w=1080";

interface Game {
  id: string;
  title: string;
  image: string;
  originalPrice: number;
  discountedPrice: number;
  cashback: number;
  platform: string;
  likes: number;
}

const mockGames: Game[] = [
  {
    id: "1",
    title: "Split Fiction EA App Key (PC) GLOBAL",
    image: splitFictionImage,
    originalPrice: 42.50,
    discountedPrice: 40.93,
    cashback: 0.41,
    platform: "GLOBAL",
    likes: 826,
  },
  {
    id: "2",
    title: "Red Dead Redemption 2 (PC) Rockstar Key GLOBAL",
    image: redDeadImage,
    originalPrice: 59.99,
    discountedPrice: 34.99,
    cashback: 0.35,
    platform: "GLOBAL",
    likes: 2453,
  },
  {
    id: "3",
    title: "FIFA 23 (PC) Origin Key GLOBAL",
    image: fifa23Image,
    originalPrice: 69.99,
    discountedPrice: 29.99,
    cashback: 0.30,
    platform: "GLOBAL",
    likes: 1876,
  },
  {
    id: "4",
    title: "Split Fiction (Xbox Series X|S) XBOX LIVE Key EUROPE",
    image: splitFictionImage,
    originalPrice: 43.75,
    discountedPrice: 34.14,
    cashback: 0.34,
    platform: "EUROPE",
    likes: 900,
  },
  {
    id: "5",
    title: "Red Dead Redemption 2 Ultimate Edition (PC) Rockstar Key",
    image: redDeadImage,
    originalPrice: 89.99,
    discountedPrice: 45.99,
    cashback: 0.46,
    platform: "GLOBAL",
    likes: 1654,
  },
  {
    id: "6",
    title: "FIFA 23 Ultimate Edition (PC) Origin Key GLOBAL",
    image: fifa23Image,
    originalPrice: 99.99,
    discountedPrice: 39.99,
    cashback: 0.40,
    platform: "GLOBAL",
    likes: 2201,
  },
  {
    id: "7",
    title: "Split Fiction (Xbox Series X|S) XBOX LIVE Key GLOBAL",
    image: splitFictionImage,
    originalPrice: 43.82,
    discountedPrice: 35.15,
    cashback: 0.35,
    platform: "GLOBAL",
    likes: 1039,
  },
  {
    id: "8",
    title: "Red Dead Redemption 2 (PS4) PSN Key EUROPE",
    image: redDeadImage,
    originalPrice: 54.99,
    discountedPrice: 32.49,
    cashback: 0.32,
    platform: "EUROPE",
    likes: 1432,
  },
  {
    id: "9",
    title: "FIFA 23 Standard Edition (PS5) PSN Key USA",
    image: fifa23Image,
    originalPrice: 69.99,
    discountedPrice: 27.99,
    cashback: 0.28,
    platform: "USA",
    likes: 987,
  },
  {
    id: "10",
    title: "Split Fiction Deluxe Edition EA App Key (PC)",
    image: splitFictionImage,
    originalPrice: 54.99,
    discountedPrice: 48.25,
    cashback: 0.48,
    platform: "GLOBAL",
    likes: 654,
  },
  {
    id: "11",
    title: "Red Dead Redemption 2 Special Edition Steam Key",
    image: redDeadImage,
    originalPrice: 79.99,
    discountedPrice: 42.99,
    cashback: 0.43,
    platform: "GLOBAL",
    likes: 2987,
  },
  {
    id: "12",
    title: "FIFA 23 Legacy Edition (Nintendo Switch) eShop",
    image: fifa23Image,
    originalPrice: 49.99,
    discountedPrice: 24.99,
    cashback: 0.25,
    platform: "GLOBAL",
    likes: 743,
  },
  {
    id: "13",
    title: "Split Fiction (PlayStation 5) PSN Key GLOBAL",
    image: splitFictionImage,
    originalPrice: 45.99,
    discountedPrice: 37.99,
    cashback: 0.38,
    platform: "GLOBAL",
    likes: 1123,
  },
  {
    id: "14",
    title: "Red Dead Redemption 2 + Online (Xbox One) Key",
    image: redDeadImage,
    originalPrice: 49.99,
    discountedPrice: 28.99,
    cashback: 0.29,
    platform: "GLOBAL",
    likes: 1876,
  },
  {
    id: "15",
    title: "FIFA 23 Champions Edition (Xbox Series X) Key",
    image: fifa23Image,
    originalPrice: 79.99,
    discountedPrice: 34.99,
    cashback: 0.35,
    platform: "GLOBAL",
    likes: 1543,
  },
  {
    id: "16",
    title: "Split Fiction Collector's Edition (PC) Steam",
    image: splitFictionImage,
    originalPrice: 59.99,
    discountedPrice: 52.99,
    cashback: 0.53,
    platform: "GLOBAL",
    likes: 432,
  },
];

const currencyRates: Record<string, { symbol: string; rate: number }> = {
  EUR: { symbol: "€", rate: 1 },
  USD: { symbol: "$", rate: 1.09 },
  GBP: { symbol: "£", rate: 0.86 },
  RUB: { symbol: "₽", rate: 100.5 },
};

function App() {
  const [searchQuery, setSearchQuery] = useState("split fiction");
  const [language, setLanguage] = useState("en");
  const [currency, setCurrency] = useState("EUR");

  const filteredGames = mockGames.filter((game) =>
    game.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const convertPrice = (price: number) => {
    return price * currencyRates[currency].rate;
  };

  const currencySymbol = currencyRates[currency].symbol;

  return (
    <div className="min-h-screen bg-[#3d2465]">
      <EnebaHeader 
        onSearch={setSearchQuery} 
        searchQuery={searchQuery}
        language={language}
        currency={currency}
        onLanguageChange={setLanguage}
        onCurrencyChange={setCurrency}
      />

      <main className="container mx-auto px-4 py-6">
        {/* Results Count */}
        <div className="text-white/70 text-sm mb-6">
          Results found: {filteredGames.length}
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredGames.map((game) => (
            <EnebaGameCard 
              key={game.id} 
              {...game}
              originalPrice={convertPrice(game.originalPrice)}
              discountedPrice={convertPrice(game.discountedPrice)}
              cashback={convertPrice(game.cashback)}
              currencySymbol={currencySymbol}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;