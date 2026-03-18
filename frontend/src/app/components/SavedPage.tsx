import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EnebaHeader } from "@/app/components/EnebaHeader";
import { EnebaGameCard } from "@/app/components/EnebaGameCard";
import { fetchOffers, toggleLike, OfferDto } from "@/app/api/offers";

export default function SavedPage() {
  const navigate = useNavigate();

  const [items, setItems] = useState<OfferDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // тот же clientId, что используешь для лайков
  const clientId = useMemo(() => {
    const existing = localStorage.getItem("clientId");
    if (existing) return existing;

    const id = crypto.randomUUID();
    localStorage.setItem("clientId", id);
    return id;
  }, []);

  const savedCount = items.length;

  async function loadSaved() {
    setLoading(true);
    setError(null);

    try {
      //  берём ВСЁ из /list?clientId=...
      // там уже есть likes + likedByMe
      const all = await fetchOffers("", clientId);

      //  оставляем только лайкнутые
      const likedOnly = all.filter((x) => x.likedByMe);

      setItems(likedOnly);
    } catch (e: any) {
      setError(e?.message ?? "Failed to load saved items");
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  //  Теперь лайк на saved странице работает: снимает лайк и удаляет карточку
  async function onToggleLike(offerId: string) {
    try {
      const r = await toggleLike(Number(offerId)); // toggleLike должен использовать clientId внутри (см. ниже)

      setItems((prev) => {
        // если лайк сняли — убираем из saved списка
        if (!r.liked) return prev.filter((x) => x.id !== r.offerId);

        // если вдруг лайк поставили (редко на saved, но пусть будет)
        return prev.map((x) =>
          x.id === r.offerId ? { ...x, likes: r.likes, likedByMe: r.liked } : x
        );
      });
    } catch (e: any) {
      setError(e?.message ?? "Failed to toggle like");
    }
  }

  useEffect(() => {
    loadSaved();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientId]);

  return (
    <div className="min-h-screen bg-[#3d2465]">
      <EnebaHeader
        onSearch={() => {}}
        searchQuery={""}
        language={"en"}
        currency={"EUR"}
        onLanguageChange={() => {}}
        onCurrencyChange={() => {}}
        savedCount={savedCount}
      />

      <main className="container mx-auto px-4 py-6">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-4 text-white/80 hover:text-white underline"
        >
          ← Back
        </button>

        <h1 className="text-white text-xl mb-4">Saved items</h1>

        {loading && <div className="text-white/70">Loading...</div>}
        {error && <div className="text-red-300">Error: {error}</div>}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {items.map((x) => (
            <EnebaGameCard
              key={x.id}
              id={String(x.id)}
              title={x.title}
              image={x.imageUrl}
              platform={x.region}
              likes={x.likes ?? 0}                 //  теперь не 0, если бэк отдаёт
              likedByMe={x.likedByMe ?? true}      //   реальное состояние
              originalPrice={x.oldPrice ?? x.price}
              discountedPrice={x.price}
              cashback={x.cashback ?? 0}
              currencySymbol={"€"}
              onToggleLike={onToggleLike}          // теперь кликается и снимается
            />
          ))}
        </div>
      </main>
    </div>
  );
}
