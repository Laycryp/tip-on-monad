"use client";

import { useEffect, useMemo, useState } from "react";
import { useAccount } from "wagmi";
import { createPublicClient, http, formatEther, getAddress } from "viem";

const monad = {
  id: Number(process.env.NEXT_PUBLIC_MONAD_CHAIN_ID || "10143"),
  name: "Monad Testnet",
  nativeCurrency: { name: "MON", symbol: "MON", decimals: 18 },
  rpcUrls: {
    default: { http: [process.env.NEXT_PUBLIC_MONAD_RPC || ""] },
    public:  { http: [process.env.NEXT_PUBLIC_MONAD_RPC || ""] },
  },
} as const;

export default function BalanceCard() {
  const { address: connected } = useAccount();
  const [other, setOther] = useState("");
  const [loading, setLoading] = useState(false);
  const [bal, setBal] = useState<{ addr: string; value: string } | null>(null);
  const [err, setErr] = useState("");

  const client = useMemo(
    () => createPublicClient({ chain: monad, transport: http(monad.rpcUrls.default.http[0]) }),
    []
  );

  const fetchBalance = async (addr: string) => {
    setErr(""); setBal(null);
    try {
      const clean = getAddress(addr);
      setLoading(true);
      const wei = await client.getBalance({ address: clean });
      setBal({ addr: clean, value: `${formatEther(wei)} MON` });
    } catch (e: any) {
      setErr(e?.message ?? "Failed to fetch balance");
    } finally { setLoading(false); }
  };

  useEffect(() => { if (connected) fetchBalance(connected); }, [connected]);

  return (
    <div className="m-card p-4">
      <h3 className="text-lg font-semibold mb-2">Wallet Balance (Monad)</h3>

      <div className="text-sm mb-2 space-y-1">
        <div>Connected: <b>{connected ?? "Not connected"}</b></div>
        {bal && (
          <>
            <div>Address: <code className="break-all">{bal.addr}</code></div>
            <div>Balance: <b className="text-[var(--monad-accent)]">{bal.value}</b></div>
          </>
        )}
      </div>

      <div className="mt-2 grid gap-2">
        <div className="flex gap-2 items-center">
          <input
            className="m-input"
            placeholder="0xCheckAnotherAddress"
            value={other}
            onChange={(e) => setOther(e.target.value)}
          />
          <button
            className="m-btn whitespace-nowrap"
            disabled={loading || !other}
            onClick={() => fetchBalance(other)}
          >
            {loading ? "Checking..." : "Check"}
          </button>
        </div>
        {err && <p className="text-sm text-red-400">{err}</p>}
        {!bal && !err && (
          <p className="m-hint">Connect inside Farcaster to auto-load your balance.</p>
        )}
      </div>
    </div>
  );
}
