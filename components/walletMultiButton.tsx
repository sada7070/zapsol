"use client";

import dynamic from "next/dynamic";

// Dynamically import the button to avoid SSR issues
const WalletMultiButton = dynamic(
  async () => (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

export function WalletButton() {
  return (
    <div className="mt-4">
      <WalletMultiButton />
    </div>
  );
}
