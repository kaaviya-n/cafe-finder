import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-2 px-4 py-16 text-center">
      <h1 className="text-2xl font-bold tracking-tight">Page not found</h1>
      <p className="text-sm text-muted">
        We couldn&apos;t find that cafe or page.
      </p>
      <Link
        href="/search"
        className="mt-3 rounded-md bg-brand px-5 py-2.5 text-[15px] font-semibold text-white hover:bg-brand-hover"
      >
        Back to search
      </Link>
    </div>
  );
}
