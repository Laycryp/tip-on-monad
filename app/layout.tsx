export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL ?? "http://localhost:3000"),
  title: "tip on monad",
  description: "Farcaster Mini App on Monad Testnet",
  openGraph: {
    title: "tip on monad",
    description: "tips • share • simple",
    images: ["/og"], // ← يولّد PNG
  },
  twitter: {
    card: "summary_large_image",
    title: "tip on monad",
    description: "tips • share • simple",
    images: ["/og"], // ← نفس المسار
  },
};

import "./globals.css";
import Providers from "./providers";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-dvh">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
