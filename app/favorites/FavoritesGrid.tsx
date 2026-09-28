"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";
import type { Cafe } from "@/lib/mockCafes";
import { SkeletonBar, Stars } from "@/components/ui";

// Unsaving removes the card from local state so the empty state can be seen
export function FavoritesGrid({ initialCafes }: { initialCafes: Cafe[] }) {
  const [cafes, setCafes] = useState(initialCafes);

  function unsave(id: string) {
    setCafes((current) => current.filter((cafe) => cafe.id !== id));
  }

  return (
    <>
      <h1 className="text-2xl font-bold tracking-tight">My Favorites</h1>
      <p className="mt-0.5 text-[13px] text-muted">
        {cafes.length} saved {cafes.length === 1 ? "cafe" : "cafes"}
      </p>

      {cafes.length > 0 ? (
        <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cafes.map((cafe) => (
            <li
              key={cafe.id}
              className="overflow-hidden rounded-lg border border-line bg-white"
            >
              <div className="flex h-[130px] items-center justify-center border-b border-line bg-surface text-[11px] text-muted/80">
                [Photo]
              </div>
              <div className="p-3.5">
                <div className="flex items-start justify-between gap-2">
                  <h2 className="text-[15px] font-semibold">{cafe.name}</h2>
                  <button
                    type="button"
                    aria-label={`Remove ${cafe.name} from favorites`}
                    onClick={() => unsave(cafe.id)}
                    className="text-brand hover:text-brand-hover"
                  >
                    <Heart className="size-[18px]" fill="currentColor" />
                  </button>
                </div>
                <p className="mt-0.5 flex items-center gap-1 text-[13px] text-muted">
                  <Stars rating={cafe.rating} />
                  {cafe.rating.toFixed(1)} · {cafe.distanceMi} mi
                </p>
                <Link
                  href={`/cafe/${cafe.id}`}
                  className="mt-2 inline-flex items-center gap-1 text-[13px] font-semibold text-brand hover:text-brand-hover"
                >
                  View details
                  <ArrowRight className="size-3.5" strokeWidth={2} />
                </Link>
              </div>
            </li>
          ))}
          <li
            aria-hidden
            className="animate-pulse overflow-hidden rounded-lg border border-dashed border-line"
          >
            <div className="h-[130px] border-b border-dashed border-line bg-surface/60" />
            <div className="space-y-3 p-3.5">
              <SkeletonBar className="w-3/5" />
              <SkeletonBar className="h-2 w-2/5 opacity-60" />
            </div>
          </li>
        </ul>
      ) : (
        <div className="mt-6 rounded-lg border border-dashed border-line px-4 py-5 text-center text-[13px] text-muted">
          No favorites yet.{" "}
          <Link
            href="/search"
            className="font-semibold text-brand hover:text-brand-hover"
          >
            Search for cafes
          </Link>{" "}
          and tap the heart to save them here.
        </div>
      )}
    </>
  );
}
