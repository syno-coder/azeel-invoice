import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, FileText } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const nav = [
  { to: "/", label: "Home" },
  { to: "/invoice", label: "Generator" },
  { to: "/templates", label: "Templates" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/about", label: "About" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 w-full transition-all ${scrolled ? "glass shadow-soft" : "bg-transparent"}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
            <FileText className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <div className="font-display text-base font-bold">Azeel <span className="text-gradient">Invoice Easil</span></div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Invoicing SaaS</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {nav.map(n => (
            <Link key={n.to} to={n.to} className="story-link text-sm font-medium text-muted-foreground hover:text-foreground"
              activeProps={{ className: "story-link text-sm font-semibold text-foreground" }}>
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <ThemeToggle />
          <Link to="/invoice" className="rounded-full border px-4 py-2 text-sm font-medium hover:bg-muted">Login</Link>
          <Link to="/invoice" className="rounded-full bg-gradient-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-glow hover-lift">
            Get Started
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button onClick={() => setOpen(v => !v)} className="rounded-full border p-2" aria-label="Open menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t glass lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
            {nav.map(n => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted">{n.label}</Link>
            ))}
            <Link to="/invoice" onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-gradient-primary px-4 py-2 text-center text-sm font-semibold text-primary-foreground">
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
