"use client";

import { PropsWithChildren, useMemo } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http, createConfig, WagmiProvider } from "wagmi";
import { farcasterMiniApp as miniAppConnector } from "@farcaster/miniapp-wagmi-connector";

const monadChainId = Number(process.env.NEXT_PUBLIC_MONAD_CHAIN_ID || "10143");
const monad = {
  id: monadChainId,
  name: "Monad Testnet",
  nativeCurrency: { name: "MON", symbol: "MON", decimals: 18 },
  rpcUrls: {
    default: { http: [process.env.NEXT_PUBLIC_MONAD_RPC || ""] },
    public: { http: [process.env.NEXT_PUBLIC_MONAD_RPC || ""] },
  },
} as const;

export default function Providers({ children }: PropsWithChildren) {
  const qc = useMemo(() => new QueryClient(), []);
  const config = useMemo(
    () =>
      createConfig({
        chains: [monad],
        transports: { [monad.id]: http(monad.rpcUrls.default.http[0]) },
        connectors: [miniAppConnector()],
        ssr: true,
      }),
    []
  );

  return (
    <QueryClientProvider client={qc}>
      <WagmiProvider config={config}>{children}</WagmiProvider>
    </QueryClientProvider>
  );
}
