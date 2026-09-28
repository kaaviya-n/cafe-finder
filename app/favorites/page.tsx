import type { Metadata } from "next";
import { mockCafes } from "@/lib/mockCafes";
import { FavoritesGrid } from "./FavoritesGrid";

export const metadata: Metadata = { title: "My Favorites" };

export default function FavoritesPage() {
  const saved = mockCafes.filter((cafe) => cafe.saved);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 md:px-8 md:py-8">
      <FavoritesGrid initialCafes={saved} />
    </div>
  );
}
