"use client";

import { useState, useMemo } from "react";
import { sdk } from "@farcaster/miniapp-sdk";

const MINIAPP_URL =
  "https://farcaster.xyz/miniapps/VM6YbTJ7-uDa/tip-on-monad"; // بطاقة الميني آب
const DEFAULT_TEXT = "I'm trying a Monad Mini App! ⚡️";

export default function ShareButton() {
  const [busy, setBusy] = useState(false);

  // جهّز نص المشاركة (يحاول سحب آخر مبلغ tip محفوظ)
  const shareText = useMemo(() => {
    try {
      const last = globalThis?.localStorage?.getItem("lastTipAmount");
      const amt = last && Number(last) > 0 ? ` I just tipped ${last} MON` : "";
      return `${DEFAULT_TEXT}${amt}`;
    } catch {
      return DEFAULT_TEXT;
    }
  }, []);

  const share = async () => {
    if (busy) return;
    setBusy(true);
    try {
      // داخل Farcaster Mini App: استخدم SDK (يُظهر بطاقة تلقائيًا عند تمرير embeds)
      if (sdk?.actions?.composeCast) {
        await sdk.actions.composeCast({ text: shareText, embeds: [MINIAPP_URL] });
        return;
      }
      // خارج Farcaster (متصفح عادي): افتح Warpcast compose بالرابط الصحيح
      const u = new URL("https://warpcast.com/~/compose");
      u.searchParams.set("text", shareText);
      u.searchParams.append("embeds[]", MINIAPP_URL);
      window.open(u.toString(), "_blank", "noopener,noreferrer");
    } catch {
      // تجاهل الخطأ بهدوء؛ بإمكانك إضافة toast هنا
    } finally {
      setBusy(false);
    }
  };

  return (
    <button
      onClick={share}
      className="m-btn w-full disabled:opacity-60 bg-[#6E34B8] text-white rounded-2xl py-2 shadow hover:opacity-90"
      disabled={busy}
      aria-label="Share on Farcaster"
      title="Share on Farcaster"
    >
      {busy ? "Sharing…" : "Share on Farcaster"}
    </button>
  );
}
