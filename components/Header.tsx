import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet";
import { Menu, Wallet } from "lucide-react";
import Image from "next/image";
import * as motion from "motion/react-client";

export function Header() {
  const navLinks = [
    { name: "HOME", href: "#home" },
    { name: "ABOUT", href: "#about" },
    { name: "HOW TO BUY", href: "#howtobuy" },
    { name: "TOKENOMICS", href: "#tokenomics" },
    { name: "ROADMAP", href: "#roadmap" },
  ];

  return (
    <header className="fixed top-6 left-0 w-full z-[9999] px-4 pointer-events-none">
      <div className="container mx-auto max-w-6xl pointer-events-auto">
        <div className="bg-white/90 backdrop-blur-md border-4 border-black rounded-full shadow-[4px_4px_0_0_#000] px-4 py-3 md:px-8 md:py-4 flex items-center justify-between transition-all hover:shadow-[6px_6px_0_0_#000] hover:-translate-y-1">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-10 h-10 md:w-12 md:h-12 border-2 border-black rounded-full overflow-hidden bg-[#7DD3FC]">
              <Image src="/logo.png" alt="Logo" fill className="object-cover" />
            </div>
            <span className="hidden md:block font-black text-xl tracking-tighter">
              PENGU
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-bold text-black hover:text-[#0ea5e9] transition-colors uppercase tracking-wide"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Button className="hidden md:flex bg-[#F59E0B] text-black border-2 border-black shadow-[2px_2px_0_0_#000] hover:translate-y-[2px] hover:shadow-none hover:bg-[#F59E0B]/90 font-black rounded-xl">
              <Wallet className="mr-2 h-4 w-4" />
              CONNECT
            </Button>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden border-2 border-black rounded-lg hover:bg-[#FFE8D6]"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[300px] bg-[#FFE8D6] border-l-4 border-black p-0"
              >
                <div className="flex flex-col h-full p-6">
                  <div className="flex items-center gap-2 mb-8">
                    <div className="relative w-12 h-12 border-2 border-black rounded-full overflow-hidden bg-[#7DD3FC]">
                      <Image
                        src="/logo.png"
                        alt="Logo"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="font-black text-2xl tracking-tighter">
                      PENGU
                    </span>
                  </div>

                  <nav className="flex flex-col gap-4">
                    {navLinks.map((link) => (
                      <a
                        key={link.name}
                        href={link.href}
                        className="text-2xl font-black text-black hover:text-[#0ea5e9] transition-colors uppercase border-b-2 border-black/10 pb-2"
                      >
                        {link.name}
                      </a>
                    ))}
                  </nav>

                  <div className="mt-auto">
                    <Button className="w-full bg-[#F59E0B] text-black border-4 border-black shadow-[4px_4px_0_0_#000] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#000] font-black text-lg py-6 rounded-xl">
                      <Wallet className="mr-2 h-5 w-5" />
                      CONNECT WALLET
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
