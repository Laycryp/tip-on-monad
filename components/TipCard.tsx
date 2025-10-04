"use client";

import { useEffect, useState } from "react";
import { useAccount, useSendTransaction } from "wagmi";
import { parseEther } from "viem";

export default function TipCard() {
  const { address } = useAccount();
  const [amount, setAmount] = useState("0.1");
  const [status, setStatus] = useState<"idle"|"pending"|"sent"|"error">("idle");
  const [err, setErr] = useState("");
  const to = (process.env.NEXT_PUBLIC_TIP_ADDRESS || "").trim();
  const { sendTransactionAsync } = useSendTransaction();

  useEffect(() => {
    const last = globalThis?.localStorage?.getItem("lastTipAmount");
    if (last) setAmount(last);
  }, []);

  const canTip = Boolean(address && to && amount && Number(amount) > 0);

  const tip = async () => {
    try {
      setErr(""); setStatus("pending");
      const hash = await sendTransactionAsync({
        to: to as `0x${string}`,
        value: parseEther(amount),
      });
      console.log("tx", hash);
      try { globalThis?.localStorage?.setItem("lastTipAmount", amount); } catch {}
      setStatus("sent");
    } catch (e: any) {
      setErr(e?.shortMessage || e?.message || "Failed to send tip");
      setStatus("error");
    }
  };

  return (
    <div className="m-card p-4">
      <h3 className="text-lg font-semibold mb-2">Send a Tip</h3>
      <p className="m-hint mb-2">Tips go to <code>{to || "TIP ADDRESS NOT SET"}</code></p>

      <div className="flex gap-2 items-center">
        <input
          className="m-input"
          placeholder="0.1"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          inputMode="decimal"
        />
        <button
          className="m-btn whitespace-nowrap"
          disabled={!canTip || status === "pending"}
          onClick={tip}
          title={!to ? "Set NEXT_PUBLIC_TIP_ADDRESS in .env.local" : ""}
        >
          {status === "pending" ? "Sending..." : "Tip MON"}
        </button>
      </div>

      {status === "sent" && <p className="text-sm text-emerald-400 mt-2">Tip sent 🎉</p>}
      {err && <p className="text-sm text-red-400 mt-2">{err}</p>}
    </div>
  );
}
