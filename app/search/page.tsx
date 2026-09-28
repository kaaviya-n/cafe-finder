import type { Metadata } from "next";
import { mockCafes, SEARCH_LOCATION } from "@/lib/mockCafes";
import { SearchView } from "./SearchView";

export const metadata: Metadata = { title: "Search" };

export default function SearchPage() {
  return <SearchView cafes={mockCafes} location={SEARCH_LOCATION} />;
}
