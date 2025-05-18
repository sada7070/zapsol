import { useState } from "react"
import { Button } from "./ui/button";

export function CreateMint() {
    const [ tokenName, setTokenName ] = useState("");
    const [ tokenSymbol, setTokenSymbol ] = useState("");
    const [ tokenImage, setTokenImage ] = useState("");
    const [ initialTokenSupply, setInitialTokenSupply ] = useState(0);

    async function createMint() {

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