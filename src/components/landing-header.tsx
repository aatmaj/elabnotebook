"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import * as React from "react";
import { Logo } from "@/components/logo";

const navLinks = [
  { href: "#solution", label: "Platform" },
  { href: "#approach", label: "Approach" },
  { href: "#security", label: "Security" },
];

export function LandingHeader() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-colors duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container flex h-20 items-center">
        <div className="mr-4 flex items-center">
          <Link href="/landing" className="flex items-center gap-2 font-bold text-lg">
            <Logo className="h-6 w-6" />
            <span className="font-semibold">Paramanu</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-6">
          <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-primary text-foreground/60"
              >
                {link.label}
              </Link>
            ))}
             <Button variant="ghost" asChild size="sm">
                <Link href="https://formflow-328038258032.europe-west1.run.app/" target="_blank" rel="noopener noreferrer">Login</Link>
            </Button>
          </nav>
        </div>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" className="ml-2 md:hidden">
              <Menu />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
                <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
            </SheetHeader>
            <div className="p-4">
              <Link
                href="/landing"
                className="flex items-center gap-2 font-bold text-lg"
                onClick={() => setIsOpen(false)}
              >
                <Logo className="h-6 w-6" />
                <span className="font-semibold">Paramanu</span>
              </Link>
              <nav className="mt-8 flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-lg font-medium transition-colors hover:text-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                 <Button variant="outline" asChild>
                    <Link href="https://formflow-328038258032.europe-west1.run.app/" target="_blank" rel="noopener noreferrer">Login</Link>
                 </Button>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
