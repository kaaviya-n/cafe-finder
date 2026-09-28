import Link from "next/link";
import type { Cafe } from "@/lib/mockCafes";
import { FavoriteButton } from "@/components/FavoriteButton";
import { Placeholder, SkeletonBar, Stars, Tag } from "@/components/ui";

type Props = {
  cafe: Cafe;
  active?: boolean;
  onHover?: (id: string | null) => void;
};

export function CafeCard({ cafe, active = false, onHover }: Props) {
  const tags = cafe.tags
    .filter((tag) => tag !== "Power outlets")
    .map((tag) => (tag === "Outdoor seating" ? "Outdoor" : tag));

  return (
    <article
      onMouseEnter={() => onHover?.(cafe.id)}
      onMouseLeave={() => onHover?.(null)}
      className={`relative flex gap-3 rounded-lg border bg-white p-3 transition-colors ${
        active
          ? "border-brand ring-1 ring-brand"
          : "border-line hover:border-stroke"
      }`}
    >
      <Placeholder label="[Photo]" className="h-[84px] w-[100px] shrink-0" />
      <div className="min-w-0 flex-1 pt-1">
        <h3 className="truncate pr-6 text-[15px] leading-5 font-semibold">
          <Link
            href={`/cafe/${cafe.id}`}
            className="after:absolute after:inset-0"
          >
            {cafe.name}
          </Link>
        </h3>
        <p className="mt-0.5 flex items-center gap-1 text-[13px] text-muted">
          <Stars rating={cafe.rating} />
          {cafe.rating.toFixed(1)} ({cafe.reviewCount}) · {cafe.distanceMi} mi
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
          <Tag>{cafe.price}</Tag>
        </div>
      </div>
      <FavoriteButton
        cafeName={cafe.name}
        initialSaved={cafe.saved}
        className="absolute top-2.5 right-2.5 z-10"
      />
    </article>
  );
}

export function CafeCardSkeleton() {
  return (
    <div
      aria-hidden
      className="flex animate-pulse gap-3 rounded-lg border border-line/70 p-3"
    >
      <div className="h-[84px] w-[100px] shrink-0 rounded-lg border border-dashed border-line" />
      <div className="flex-1 space-y-3 pt-1">
        <SkeletonBar className="w-3/4" />
        <SkeletonBar className="h-2 w-1/2 opacity-60" />
      </div>
    </div>
  );
}
