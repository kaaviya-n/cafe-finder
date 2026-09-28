"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Coffee } from "lucide-react";

const NAV_LINKS = [
  { href: "/search", label: "Search" },
  { href: "/favorites", label: "Favorites" },
];

export function isNavActive(pathname: string, href: string) {
  // Cafe detail pages are reached from search, so they keep Search active
  if (href === "/search") {
    return pathname.startsWith("/search") || pathname.startsWith("/cafe");
  }
  return pathname.startsWith(href);
}

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 h-16 shrink-0 border-b border-line bg-white">
      <div className="flex h-full items-center justify-between px-4 md:px-8">
        <Link href="/search" className="flex items-center gap-2.5">
          <Coffee className="size-6 text-brand" strokeWidth={1.75} />
          <span className="flex flex-col">
            <span className="text-xl leading-6 font-bold tracking-tight">
              Cafe Finder
            </span>
            <span className="text-[10px] leading-3 text-muted">
              by iTravDev
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-7">
          <nav className="hidden items-center gap-7 text-[15px] md:flex">
            {NAV_LINKS.map(({ href, label }) => {
              const active = isNavActive(pathname, href);
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={
                    active
                      ? "font-semibold text-ink"
                      : "text-brand hover:text-brand-hover"
                  }
                >
                  {label}
                </Link>
              );
            })}
            <button type="button" className="text-brand hover:text-brand-hover">
              Log in
            </button>
          </nav>
          <span
            aria-hidden
            className="size-9 rounded-full border border-line bg-surface"
          />
        </div>
      </div>
    </header>
  );
}
