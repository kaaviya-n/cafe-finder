import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { getCafe, mockCafes } from "@/lib/mockCafes";
import { FavoriteButton } from "@/components/FavoriteButton";
import { Placeholder, Stars, Tag } from "@/components/ui";

export function generateStaticParams() {
  return mockCafes.map((cafe) => ({ id: cafe.id }));
}

export async function generateMetadata(
  props: PageProps<"/cafe/[id]">
): Promise<Metadata> {
  const { id } = await props.params;
  return { title: getCafe(id)?.name ?? "Cafe not found" };
}

export default async function CafePage(props: PageProps<"/cafe/[id]">) {
  const { id } = await props.params;
  const cafe = getCafe(id);
  if (!cafe) notFound();

  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(cafe.fullAddress)}`;

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-5 md:px-8 md:py-6">
      <Link
        href="/search"
        className="inline-flex items-center gap-1.5 text-sm text-ink/80 hover:text-brand"
      >
        <ChevronLeft className="size-4" strokeWidth={1.75} />
        Back to results
      </Link>

      <div className="mt-4 grid grid-cols-2 gap-3 md:h-[220px] md:grid-cols-[2fr_1fr] md:grid-rows-2">
        <Placeholder
          label="[Hero photo]"
          className="col-span-2 h-48 md:col-span-1 md:row-span-2 md:h-auto"
        />
        <Placeholder label="[Photo 2]" className="h-24 md:h-auto" />
        <Placeholder label="[Photo 3 · view all]" className="h-24 md:h-auto" />
      </div>

      <div className="mt-5 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h1 className="text-[28px] leading-tight font-bold tracking-tight">
            {cafe.name}
          </h1>
          <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted">
            <span className="inline-flex items-center gap-1">
              <Stars rating={cafe.rating} />
              {cafe.rating.toFixed(1)} ({cafe.reviewCount} reviews)
            </span>
            <span aria-hidden>·</span>
            <span>{cafe.price}</span>
            <span aria-hidden>·</span>
            <span>{cafe.address}</span>
          </p>
          <p
            className={`mt-1 text-sm font-semibold ${cafe.isOpen ? "text-success" : "text-red-700"}`}
          >
            {cafe.isOpen ? "Open now" : "Closed"} · {cafe.statusNote}
          </p>
        </div>
        <div className="flex gap-2.5">
          <FavoriteButton
            cafeName={cafe.name}
            initialSaved={cafe.saved}
            variant="button"
            className="flex-1 md:flex-none"
          />
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 flex-1 items-center justify-center rounded-md bg-brand px-5 text-[15px] font-semibold text-white hover:bg-brand-hover md:flex-none"
          >
            Get directions
          </a>
        </div>
      </div>

      <div className="mt-5 grid gap-8 lg:grid-cols-[1fr_492px]">
        <div className="min-w-0">
          <ul className="flex flex-wrap gap-2">
            {cafe.tags.map((tag) => (
              <li key={tag}>
                <Tag size="md">{tag}</Tag>
              </li>
            ))}
          </ul>

          <section className="mt-6">
            <h2 className="text-base font-semibold">About</h2>
            <p className="mt-1.5 text-sm text-ink/85">{cafe.description}</p>
          </section>

          <section className="mt-6">
            <h2 className="text-base font-semibold">Hours</h2>
            <dl className="mt-1.5 grid grid-cols-[140px_1fr] gap-y-1.5 text-sm text-ink/85">
              {cafe.hours.map(({ days, time }) => (
                <div key={days} className="contents">
                  <dt>{days}</dt>
                  <dd>{time}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="mt-6">
            <div className="flex items-center justify-between border-b border-line/70 pb-3">
              <h2 className="text-base font-semibold">
                Reviews ({cafe.reviewCount})
              </h2>
              <button
                type="button"
                className="text-[13px] font-semibold text-brand hover:text-brand-hover"
              >
                Write a review
              </button>
            </div>
            {cafe.reviews.length > 0 ? (
              <ul className="divide-y divide-line/70">
                {cafe.reviews.map((review) => (
                  <li key={review.id} className="py-3.5">
                    <div className="flex items-center gap-2">
                      <span
                        aria-hidden
                        className="size-7 rounded-full border border-line bg-surface"
                      />
                      <span className="text-sm font-semibold">
                        {review.author}
                      </span>
                      <Stars rating={review.rating} />
                    </div>
                    <p className="mt-1.5 text-sm text-ink/85">{review.text}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="py-3.5 text-sm text-muted">No reviews yet.</p>
            )}
          </section>
        </div>

        <aside className="space-y-4">
          <Placeholder
            label="[Map pin — cafe location]"
            className="h-[200px]"
          />
          <section className="rounded-lg border border-line p-4">
            <h2 className="text-[13px] font-semibold">Contact</h2>
            <address className="mt-2.5 space-y-1.5 text-[13px] text-ink/85 not-italic">
              <p>{cafe.fullAddress}</p>
              <p>
                <a
                  href={`tel:${cafe.phone.replace(/\s/g, "")}`}
                  className="hover:text-brand"
                >
                  {cafe.phone}
                </a>
              </p>
              <p>
                <a
                  href={`https://${cafe.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand"
                >
                  {cafe.website}
                </a>
              </p>
            </address>
          </section>
        </aside>
      </div>
    </div>
  );
}
