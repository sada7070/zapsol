import { ModeToggle } from "./modeToggle";

export function Navbar() {
    return <div className="flex justify-between px-10 py-4 border-b-2 border-b-zinc-800">
        <p className="text-4xl">ZAPSOL</p>
        <div className="py-1">
            <ModeToggle />
        </div>

    </div>
}