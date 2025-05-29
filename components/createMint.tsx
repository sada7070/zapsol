import { useState } from "react"
import { Button } from "./ui/button";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Keypair, SystemProgram, Transaction } from "@solana/web3.js";
import { createInitializeMetadataPointerInstruction, createInitializeMintInstruction, getMinimumBalanceForRentExemptMint, getOrCreateAssociatedTokenAccount, LENGTH_SIZE, MINT_SIZE, TOKEN_2022_PROGRAM_ID, TYPE_SIZE } from "@solana/spl-token";
import { toast } from "sonner";
import { createInitializeInstruction, pack, TokenMetadata } from "@solana/spl-token-metadata";

export function CreateMint() {
    const [ tokenName, setTokenName ] = useState("");
    const [ tokenSymbol, setTokenSymbol ] = useState("");
    const [ tokenImage, setTokenImage ] = useState("");
    const [ initialTokenSupply, setInitialTokenSupply ] = useState(0);

    const wallet = useWallet();
    const { connection } = useConnection();

    async function createMint() {
       try {
            // creating account for new token
            const mintKeypair = Keypair.generate();

            if(!wallet.publicKey) {
                return toast("Acoount not found.")
            }

            const metadata: TokenMetadata = {
                mint: mintKeypair.publicKey,
                name: tokenName,
                symbol: tokenSymbol,
                uri: tokenImage,
                additionalMetadata: [['new-field', 'new-value']],
            }

            const metadataLen = TYPE_SIZE + LENGTH_SIZE + pack(metadata).length;
            const lamports = await getMinimumBalanceForRentExemptMint(connection);
            const totalLamports = lamports + metadataLen;

            const transaction = new Transaction().add(
                SystemProgram.createAccount({
                    fromPubkey: wallet.publicKey,
                    newAccountPubkey: mintKeypair.publicKey,
                    space: MINT_SIZE,
                    lamports: totalLamports,
                    programId: TOKEN_2022_PROGRAM_ID,
                }),
                createInitializeMetadataPointerInstruction(
                    mintKeypair.publicKey,
                    wallet.publicKey,
                    mintKeypair.publicKey,
                    TOKEN_2022_PROGRAM_ID
                ),
                createInitializeMintInstruction(
                    mintKeypair.publicKey,
                    9,                                          // digits
                    wallet.publicKey,                           // mint-authority pubkey 
                    wallet.publicKey,                           // freez-authority pubkey
                    TOKEN_2022_PROGRAM_ID
                ),
                createInitializeInstruction({
                    programId: TOKEN_2022_PROGRAM_ID,
                    mint: mintKeypair.publicKey,
                    metadata: mintKeypair.publicKey,
                    name: tokenName,
                    symbol: tokenSymbol,
                    uri: tokenImage,
                    mintAuthority: wallet.publicKey,
                    updateAuthority: wallet.publicKey,
                }),
        );

        transaction.feePayer = wallet.publicKey;
        transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
        transaction.partialSign(mintKeypair);

        await wallet.sendTransaction(transaction, connection);

        // 1. Get/Create Associated Token Account for the wallet
        const tokenAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            wallet,
            mintKeypair.publicKey,
            wallet.publicKey,
            false,
            undefined,
            undefined,
            TOKEN_2022_PROGRAM_ID
        );

        alert(`Token mint created at ${mintKeypair.publicKey.toBase58()}`);

       }catch {

       }
    }

    return <div className="flex flex-col justify-center items-center ">
        <p className="text-3xl font-bold mt-4">Token Launchpad</p>
        <p className="text-xl mt-4">Create your own Fungable Tokens and share with your friends!</p>

        <div className="flex flex-col mt-14 ">
            <div className="flex items-center">
                <p className="text-lg pr-2">Token Name : </p>
                <input  type="text"
                        placeholder="Enter the token name..."
                        className="ml-3.5 border-2 rounded-md py-1 px-2 border-zinc-400 dark:border-zinc-400 placeholder-neutral-300 dark:placeholder-neutral-700" 
                        onChange={(e) => {
                            setTokenName(e.target.value);
                        }}
                />
            </div>
           
           <div className="flex mt-4 items-center">
                <p className="pr-2 text-lg">Token Symbol : </p>
                <input  type="text"
                        placeholder="Enter the token Symbol..."
                        className="ml-0.5 border-2 rounded-md py-1 px-2 border-zinc-400 dark:border-zinc-400 placeholder-neutral-300 dark:placeholder-neutral-700"
                        onChange={(e) => {
                            setTokenSymbol(e.target.value);
                        }}
                />
            </div>

            <div className="flex mt-4 items-center">
                <p className="pr-2 text-lg">Token Image : </p>
                <input  type="text"
                        placeholder="Enter the image URL..."
                        className="ml-3 border-2 rounded-md py-1 px-2 border-zinc-400 dark:border-zinc-400 placeholder-neutral-300 dark:placeholder-neutral-700"
                        onChange={(e) => {
                            setTokenImage(e.target.value);
                        }}
                />
            </div>

            <div className="flex mt-4 items-center">
                <p className="pr-2 text-lg">Inital supply : </p>
                <input  type="text"
                        placeholder="Initial supply of token..."
                        className="ml-4 border-2 rounded-md py-1 px-2 border-zinc-400 dark:border-zinc-400 placeholder-neutral-300 dark:placeholder-neutral-700"
                        onChange={(e) => {
                            setInitialTokenSupply(Number(e.target.value));
                        }}
                />
            </div>
        </div>
        
        <Button onClick={createMint} size='lg' className="mt-10">Create Token!</Button>
    </div>
}