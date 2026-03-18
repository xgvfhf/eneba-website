import { getClientId } from "../utils/clientId";

const API_BASE = "https://localhost:7052"; // <-- твой BACKEND

export type OfferDto = {
  id: number;
  title: string;
  gameName: string;
  region: string;
  price: number;
  oldPrice?: number | null;
  discountPercent?: number | null;
  imageUrl: string;
  cashback?: number | null;

  likes?: number;
  likedByMe?: boolean;
};

export async function fetchOffers(search: string) {
  const clientId = getClientId();

  const url = new URL(`${API_BASE}/list`);
  if (search.trim()) url.searchParams.set("search", search.trim());
  url.searchParams.set("clientId", clientId);

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return (await res.json()) as OfferDto[];
}

export async function toggleLike(offerId: number) {
  const clientId = getClientId();

  const url = new URL(`${API_BASE}/likes/toggle`);
  url.searchParams.set("offerId", String(offerId));
  url.searchParams.set("clientId", clientId);

  const res = await fetch(url.toString(), { method: "POST" });
  if (!res.ok) throw new Error(`Like error: ${res.status}`);

  return (await res.json()) as {
    offerId: number;
    liked: boolean;
    likes: number;
  };
}

export async function fetchLikedOffers() {
  const clientId = localStorage.getItem("clientId")!;
  const res = await fetch(
    `${API_BASE}/likes?clientId=${clientId}`
  );

  if (!res.ok) throw new Error("Failed to load liked offers");
  return res.json();
}

