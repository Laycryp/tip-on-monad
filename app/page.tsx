"use client";

import { useEffect } from "react";
import { sdk } from "@farcaster/miniapp-sdk";
import BalanceCard from "@/components/BalanceCard";
import TipCard from "@/components/TipCard";
import ShareButton from "@/components/ShareButton";

export default function Home() {
  useEffect(() => {
    const onReady = async () => {
      try { await sdk.actions.ready(); } catch {}
    };
    onReady();
  }, []);

  return (
    <main className="min-h-dvh p-5">
      <div className="max-w-xl mx-auto grid gap-4">
        <header className="mt-2">
          <h1 className="m-title">tip on monad</h1>
          <p className="opacity-75 text-sm mt-2">Auto balance • Tips • Share</p>
        </header>

        <BalanceCard />
        <TipCard />

        <div className="m-card p-4">
          <ShareButton />
          <p className="m-hint mt-2">Clean OG preview • minimal icons • no balance dependency.</p>
        </div>

        <footer className="m-hint mt-4">
          Set <code>NEXT_PUBLIC_TIP_ADDRESS</code> in <code>.env.local</code>.
        </footer>
      </div>
    </main>
  );
}
