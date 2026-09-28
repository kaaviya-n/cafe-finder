"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Search, UserRound } from "lucide-react";
import { isNavActive } from "./Header";

const TABS = [
  { href: "/search", label: "Search", Icon: Search },
  { href: "/favorites", label: "Favorites", Icon: Heart },
];

const tabClass = "flex flex-col items-center justify-center gap-1 text-[11px]";

export function TabBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 grid h-16 grid-cols-3 border-t border-line bg-white pb-[env(safe-area-inset-bottom)] md:hidden">
      {TABS.map(({ href, label, Icon }) => {
        const active = isNavActive(pathname, href);
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={`${tabClass} ${active ? "font-semibold text-brand" : "text-muted"}`}
          >
            <Icon className="size-5" strokeWidth={active ? 2.25 : 1.75} />
            {label}
          </Link>
        );
      })}
      <button type="button" className={`${tabClass} text-muted`}>
        <UserRound className="size-5" strokeWidth={1.75} />
        Log in
      </button>
    </nav>
  );
}
