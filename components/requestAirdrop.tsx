"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { toast } from "sonner"


export function RequestAirdrop() {
    const [ amount, setAmount ] = useState<number | null>(null);
    const [ loading, setLoading ] = useState(false);
    const wallet = useWallet();
    const { connection } = useConnection();

    async function requestAirdrop() {
        if(!wallet.publicKey) {
            return toast("Wallet not found!", {
                description: "Connect your wallet to recieve Airdrop."
            });
        }
        if(amount == null) {
            return toast("Amount of SOL not selected!", {
                description: "Select the SOL amount among the given."
            });
        }
        try {
            setLoading(true);
            const sig = await connection.requestAirdrop(wallet.publicKey, amount * LAMPORTS_PER_SOL);

            await connection.confirmTransaction(sig, "confirmed");
            alert(`✅ Airdropped ${amount} SOL to ${wallet.publicKey.toBase58()}`);
        }catch(err: any) {
            console.error("Airdrop failed:", err);
            alert("❌ Airdrop failed: " + (err.message || err));
        } finally {
            setLoading(false);
        }
    }

    return <div className="flex justify-center items-center flex-col mt-6">
        <div className="text-3xl font-bold">
            Airdrop yourself with some SOL
        </div>
        <div className="flex mt-20 gap-4">
            {wallet.publicKey ? (
            <p className="py-1 text-lg">
                Your public Key : {wallet.publicKey.toBase58()}
            </p>
            ) : null}
        </div>

        <div className="flex justify-start items-start mt-10 gap-4">
            <p className="py-1 text-lg">Amount of SOL :</p>
            <Button onClick={() => setAmount(0.5)}
                    variant='outline' 
                    className={`p-5 ${amount === 0.5 ? '!bg-zinc-400 dark:!bg-zinc-600' : ''}`}>0.5</Button>

            <Button onClick={() => setAmount(1.0)}
                    variant='outline' 
                    className={`p-5 ${amount === 1.0 ? '!bg-zinc-400 dark:!bg-zinc-600' : ''}`}>1.0</Button>

            <Button onClick={() => setAmount(1.5)}
                    variant='outline' 
                    className={`p-5 ${amount === 1.5 ? '!bg-zinc-400 dark:!bg-zinc-600' : ''}`}>1.5</Button>

            <Button onClick={() => setAmount(2.0)}
                    variant='outline' 
                    className={`p-5 ${amount === 2.0 ? '!bg-zinc-400 dark:!bg-zinc-600' : ''}`}>2.0</Button>

        </div>

        <Button 
            onClick={requestAirdrop}
            className="mt-20"
            disabled={loading}
        >
            { loading ? "Airdropping...." : "Airdrop Now!" }
        </Button>
    </div>
}