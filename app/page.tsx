"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { Coffee } from "lucide-react";

export default function Home() {
  const { data, isLoading } = useQuery({
    queryKey: ["test"],
    queryFn: async () => "hello, Mic testing....1...2...3...",
  });

  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-3xl flex-1 flex-col items-center justify-between bg-white px-16 py-32 sm:items-start dark:bg-black">
        <Image
          className="h-5 w-[100px] dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <p>{isLoading ? "Loading..." : data}</p>
        <Coffee size={20} color="#78350F" />
      </main>
    </div>
  );
}
