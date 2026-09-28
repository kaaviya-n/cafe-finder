import { Star } from "lucide-react";

export function Stars({
  rating,
  size = 13,
}: {
  rating: number;
  size?: number;
}) {
  const filled = Math.round(rating);
  return (
    <span
      role="img"
      aria-label={`${rating} out of 5 stars`}
      className="inline-flex text-[#6f6f6f]"
    >
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={size}
          strokeWidth={1.5}
          fill={i < filled ? "currentColor" : "none"}
        />
      ))}
    </span>
  );
}

export function Tag({
  children,
  size = "sm",
}: {
  children: React.ReactNode;
  size?: "sm" | "md";
}) {
  const sizing =
    size === "sm" ? "px-2 py-0.5 text-[11px]" : "px-3 py-1 text-[13px]";
  return (
    <span
      className={`inline-flex items-center rounded-full border border-line text-ink/80 ${sizing}`}
    >
      {children}
    </span>
  );
}

// Dashed stand-in for photos and maps until real media is wired up
export function Placeholder({
  label,
  className = "",
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center rounded-lg border border-dashed border-stroke bg-surface text-[11px] text-muted/80 ${className}`}
    >
      {label}
    </div>
  );
}

export function SkeletonBar({ className = "" }: { className?: string }) {
  return <div className={`h-2.5 rounded-sm bg-[#efefed] ${className}`} />;
}
