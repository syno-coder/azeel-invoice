import { Link } from "@tanstack/react-router";
import { FileText, Twitter, Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
  const cols = [
    { title: "Product", links: [["Generator","/invoice"],["Templates","/templates"],["Dashboard","/dashboard"]] },
    { title: "Company", links: [["About","/about"],["Contact","/contact"],["FAQ","/faq"]] },
    { title: "Legal", links: [["Privacy","/privacy"],["Terms","/terms"]] },
  ] as const;

  return (
    <footer className="relative mt-20 border-t bg-card/50">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-primary opacity-60" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground">
              <FileText className="h-5 w-5" />
            </div>
            <span className="font-display text-lg font-bold">Azeel <span className="text-gradient">Invoice Easil</span></span>
          </Link>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            Create professional invoices in seconds. PDF export, GST support, dashboards, and beautiful templates — all in one place.
          </p>
          <form className="mt-5 flex max-w-sm gap-2" onSubmit={e => e.preventDefault()}>
            <input type="email" placeholder="you@company.com"
              className="w-full rounded-full border bg-background px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" />
            <button className="rounded-full bg-gradient-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-glow">
              Subscribe
            </button>
          </form>
        </div>

        {cols.map(c => (
          <div key={c.title}>
            <h4 className="mb-4 text-sm font-semibold">{c.title}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {c.links.map(([label, to]) => (
                <li key={to}><Link to={to} className="story-link">{label}</Link></li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h4 className="mb-4 text-sm font-semibold">Connect</h4>
          <div className="flex gap-3">
            {[Twitter, Github, Linkedin, Mail].map((I, i) => (
              <a key={i} href="#" aria-label="social"
                className="flex h-9 w-9 items-center justify-center rounded-full border hover-lift">
                <I className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <p>© {new Date().getFullYear()} Azeel Invoice Easil. All rights reserved.</p>
          <p>Made with <span className="text-gradient font-semibold">love</span> for modern businesses.</p>
        </div>
      </div>
    </footer>
  );
}
