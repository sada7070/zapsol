import { ModeToggle } from "./modeToggle";
import { WalletButton } from "@/components/walletMultiButton";

export function Navbar() {
    return <div className="flex justify-between items-center px-6 md:px-10 border-b-2 border-b-zinc-800">
        <p className="text-4xl">ZAPSOL</p>
        <div>
            <div className="flex gap-4">
                <span className="pt-6">
                    <ModeToggle />
                </span>
                <span className="mb-4">
                    <WalletButton />
                </span>
            </div>
        </div>

    </div>
}