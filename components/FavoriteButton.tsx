"use client";

import { useState } from "react";
import { Heart } from "lucide-react";

type Props = {
  cafeName: string;
  initialSaved: boolean;
  // "icon" is the bare heart on cards; "button" is the labelled Save button on the detail page
  variant?: "icon" | "button";
  className?: string;
};

// Local state only; persisting favorites comes with the API work
export function FavoriteButton({
  cafeName,
  initialSaved,
  variant = "icon",
  className = "",
}: Props) {
  const [saved, setSaved] = useState(initialSaved);
  const label = saved
    ? `Remove ${cafeName} from favorites`
    : `Save ${cafeName} to favorites`;

  const heart = (
    <Heart
      className={variant === "icon" ? "size-[18px]" : "size-4"}
      strokeWidth={1.75}
      fill={saved ? "currentColor" : "none"}
    />
  );

  if (variant === "button") {
    return (
      <button
        type="button"
        aria-pressed={saved}
        aria-label={label}
        onClick={() => setSaved(!saved)}
        className={`inline-flex h-11 items-center justify-center gap-2 rounded-md border border-line bg-white px-5 text-[15px] font-semibold hover:bg-surface ${saved ? "text-brand" : "text-ink"} ${className}`}
      >
        {heart}
        {saved ? "Saved" : "Save"}
      </button>
    );
  }

  return (
    <button
      type="button"
      aria-pressed={saved}
      aria-label={label}
      onClick={() => setSaved(!saved)}
      className={`rounded-full p-0.5 ${saved ? "text-brand" : "text-[#8a8a8a] hover:text-brand"} ${className}`}
    >
      {heart}
    </button>
  );
}
