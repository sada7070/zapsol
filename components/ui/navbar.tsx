import { ModeToggle } from "./modeToggle";

export function Navbar() {
    return <div className="flex justify-between items-center px-6 md:px-10 py-4 border-b-2 border-b-zinc-800">
        <p className="text-4xl">ZAPSOL</p>
        <div>
            <ModeToggle />
        </div>

    </div>
}