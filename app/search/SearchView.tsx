"use client";

import { useRef, useState } from "react";
import { LocateFixed } from "lucide-react";
import type { Cafe } from "@/lib/mockCafes";
import { CafeCard, CafeCardSkeleton } from "./CafeCard";

const FILTERS = ["Wifi", "Quiet", "Outdoor seating", "Open now", "Price"];

type View = "list" | "map";

export function SearchView({
  cafes,
  location,
}: {
  cafes: Cafe[];
  location: string;
}) {
  // Chips only toggle visually for now; filtering comes with the API
  const [activeFilters, setActiveFilters] = useState<string[]>(["Wifi"]);
  // Mobile only: desktop always shows list and map side by side
  const [view, setView] = useState<View>("list");
  const [activeId, setActiveId] = useState<string | null>(null);
  const cardRefs = useRef(new Map<string, HTMLLIElement>());

  const activeCafe = cafes.find((cafe) => cafe.id === activeId);
  const resultCount = `${cafes.length} cafes found near "${location}"`;

  function toggleFilter(filter: string) {
    setActiveFilters((current) =>
      current.includes(filter)
        ? current.filter((f) => f !== filter)
        : [...current, filter]
    );
  }

  function selectPin(id: string) {
    setActiveId(id);
    cardRefs.current
      .get(id)
      ?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  return (
    // On desktop the page fills the viewport below the header so list and map scroll independently
    <div className="flex flex-1 flex-col lg:h-[calc(100dvh-4rem)]">
      <form
        role="search"
        onSubmit={(e) => e.preventDefault()}
        className="flex gap-2 border-b border-line px-4 py-3 md:gap-3 md:px-8 md:py-4"
      >
        <input
          type="search"
          name="q"
          aria-label="Search by city or address"
          placeholder="Search by city or address"
          className="h-11 min-w-0 flex-1 rounded-md border border-line bg-surface px-3.5 text-[15px] placeholder:text-muted/80 focus:border-brand focus:outline-none"
        />
        <button
          type="button"
          aria-label="Near me"
          className="inline-flex h-11 shrink-0 items-center gap-2 rounded-md border border-line bg-white px-3 text-[15px] font-semibold hover:bg-surface md:px-4"
        >
          <LocateFixed className="size-4" strokeWidth={1.75} />
          <span className="hidden sm:inline">Near me</span>
        </button>
        <button
          type="submit"
          className="h-11 shrink-0 rounded-md bg-brand px-4 text-[15px] font-semibold text-white hover:bg-brand-hover md:px-6"
        >
          Search
        </button>
      </form>

      <div className="flex [scrollbar-width:none] items-center gap-2 overflow-x-auto border-b border-line px-4 py-3 md:px-8">
        <span className="shrink-0 pr-1 text-[13px] text-muted">Filters:</span>
        {FILTERS.map((filter) => {
          const on = activeFilters.includes(filter);
          return (
            <button
              key={filter}
              type="button"
              aria-pressed={on}
              onClick={() => toggleFilter(filter)}
              className={`h-8 shrink-0 rounded-full border px-3 text-[13px] ${
                on
                  ? "border-brand bg-brand-soft font-semibold text-brand"
                  : "border-line bg-white text-ink/85 hover:border-stroke"
              }`}
            >
              {filter}
            </button>
          );
        })}
      </div>

      {/* Mobile results bar with list/map toggle */}
      <div className="flex items-center justify-between gap-3 border-b border-line/70 px-4 py-2 lg:hidden">
        <p className="truncate text-[13px] text-ink/80">{resultCount}</p>
        <div
          role="tablist"
          aria-label="Results view"
          className="flex shrink-0 rounded-md border border-line bg-surface p-0.5"
        >
          {(["list", "map"] as const).map((v) => (
            <button
              key={v}
              type="button"
              role="tab"
              aria-selected={view === v}
              onClick={() => setView(v)}
              className={`rounded px-3 py-1 text-[13px] capitalize ${
                view === v ? "bg-white font-semibold shadow-sm" : "text-muted"
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col lg:grid lg:grid-cols-[440px_1fr]">
        <section
          aria-label="Results list"
          className={`${view === "map" ? "hidden" : "flex"} min-h-0 flex-col border-line lg:flex lg:border-r`}
        >
          <p className="hidden border-b border-line/70 px-5 py-2.5 text-[13px] text-ink/80 lg:block">
            {resultCount}
          </p>
          <ul className="flex-1 space-y-2.5 p-3 lg:overflow-y-auto">
            {cafes.map((cafe) => (
              <li
                key={cafe.id}
                ref={(el) => {
                  if (el) cardRefs.current.set(cafe.id, el);
                  else cardRefs.current.delete(cafe.id);
                }}
              >
                <CafeCard
                  cafe={cafe}
                  active={cafe.id === activeId}
                  onHover={setActiveId}
                />
              </li>
            ))}
            <li>
              <CafeCardSkeleton />
            </li>
          </ul>
        </section>

        <section
          aria-label="Results map"
          className={`${view === "list" ? "hidden" : "flex"} min-h-[60dvh] flex-1 bg-canvas p-3 md:p-4 lg:flex lg:min-h-0`}
        >
          <div className="relative flex flex-1 items-center justify-center rounded-lg border border-dashed border-stroke">
            <p className="px-6 text-center text-[13px] text-muted/80">
              [Map view — pins mark each result, click a pin to highlight its
              card]
            </p>
            {cafes.map((cafe, i) => (
              <MapPin
                key={cafe.id}
                cafe={cafe}
                index={i + 1}
                active={cafe.id === activeId}
                onSelect={selectPin}
              />
            ))}
            {/* On mobile the list is hidden in map view, so preview the selected cafe over the map */}
            {activeCafe && (
              <div className="absolute inset-x-3 bottom-3 lg:hidden">
                <CafeCard cafe={activeCafe} active />
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

function MapPin({
  cafe,
  index,
  active,
  onSelect,
}: {
  cafe: Cafe;
  index: number;
  active: boolean;
  onSelect: (id: string) => void;
}) {
  return (
    <button
      type="button"
      aria-label={`${index}. ${cafe.name}`}
      aria-pressed={active}
      onClick={() => onSelect(cafe.id)}
      style={{ left: `${cafe.pin.x}%`, top: `${cafe.pin.y}%` }}
      // A rotated square with one sharp corner gives the teardrop pin pointing left
      className={`absolute flex size-6 -translate-1/2 rotate-45 items-center justify-center rounded-full rounded-bl-none bg-brand text-white shadow-sm transition-[scale] ${
        active ? "z-10 scale-125 ring-2 ring-white" : "hover:scale-110"
      }`}
    >
      <span className="-rotate-45 text-[10px] font-bold">{index}</span>
    </button>
  );
}
