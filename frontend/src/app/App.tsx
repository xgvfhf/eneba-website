import { useEffect, useState } from "react";
import { EnebaHeader } from "@/app/components/EnebaHeader";
import { EnebaGameCard } from "@/app/components/EnebaGameCard";

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

const currencyRates: Record<string, { symbol: string; rate: number }> = {
  EUR: { symbol: "€", rate: 1 },
  USD: { symbol: "$", rate: 1.09 },
  GBP: { symbol: "£", rate: 0.86 },
  RUB: { symbol: "₽", rate: 100.5 },
};

// Лучше использовать http порт (у тебя он есть в логах: http://localhost:5092)
const API_BASE = "https://localhost:7052";

type OfferDto = {
  id: number;
  title: string;
  gameName: string;
  platform?: string;
  region: string;
  type?: string;
  price: number;
  oldPrice?: number | null;
  discountPercent?: number | null;
  imageUrl: string;
  cashback?: number | null;
};

function App() {
  const [searchQuery, setSearchQuery] = useState("split fiction");
  const [language, setLanguage] = useState("en");
  const [currency, setCurrency] = useState("EUR");

  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const convertPrice = (price: number) => price * currencyRates[currency].rate;
  const currencySymbol = currencyRates[currency].symbol;

  async function loadGames(search: string) {
    setLoading(true);
    setError(null);

    try {
      const url = new URL(`${API_BASE}/list`);
      if (search.trim()) url.searchParams.set("search", search.trim());

      const res = await fetch(url.toString());
      if (!res.ok) throw new Error(`API error: ${res.status}`);

      const data: OfferDto[] = await res.json();

      const mapped: Game[] = data.map((x) => ({
        id: String(x.id),
        title: x.title,
        image: x.imageUrl,
        originalPrice: x.oldPrice ?? x.price,
        discountedPrice: x.price,
        cashback: x.cashback ?? 0,
        platform: x.region, // показываем GLOBAL/EUROPE/USA
        likes: 0, // пока нет в API — можно добавить позже
      }));

      setGames(mapped);
    } catch (e: any) {
      setError(e?.message ?? "Failed to load games");
      setGames([]);
    } finally {
      setLoading(false);
    }
  }

  // первый запрос при загрузке
  useEffect(() => {
    loadGames(searchQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // debounce при вводе
  useEffect(() => {
    const t = setTimeout(() => {
      loadGames(searchQuery);
    }, 300);

    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

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
        <div className="text-white/70 text-sm mb-4">
          Results found: {games.length}
        </div>

        {loading && (
          <div className="text-white/70 mb-4">Loading...</div>
        )}

        {error && (
          <div className="text-red-300 mb-4">Error: {error}</div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {games.map((game) => (
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
