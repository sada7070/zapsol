import { Github, Twitter, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
    return (
        <footer>
            <div className="border-t border-t-zinc-800 py-8 px-6 md:px-10 flex justify-between items-center">
                <div>
                    <p className="text-2xl">ZAPSOL</p>
                    <p className="text-sm text-zinc-400 pt-2">@2025 All Rights Reserved</p>
                </div>
                <div className="flex gap-3 md:gap-4">
                    <Link href="https://x.com/sada_7070?t=cv-feOIf_1NdjFMh-BNTPA&s=09" target='_blank'>
                        <span className='hover:cursor-pointer hover:text-zinc-400'><Twitter /></span>
                    </Link>

                    <Link href="https://github.com/sada7070/" target='_blank'>
                        <span className='hover:cursor-pointer hover:text-zinc-400'><Github /></span>
                    </Link>

                    <Link href="https://www.linkedin.com/in/sada70/" target='_blank'>
                        <span className='hover:cursor-pointer hover:text-zinc-400'><Linkedin /></span>
                    </Link>

                    <Link href="https://mail.google.com/mail/?view=cm&fs=1&to=sadashivamurthysp10656@gmail.com" target='_blank'>
                        <span className='hover:cursor-pointer hover:text-zinc-400'><Mail /></span>
                    </Link>                    
                </div>

            </div>
        </footer>
    )
}