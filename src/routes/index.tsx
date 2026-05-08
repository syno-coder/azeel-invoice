import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import {
  Sparkles, FileText, Download, Printer, Palette, QrCode, Globe2, MoonStar,
  Users, History, BarChart3, Smartphone, CloudUpload, Mail, ArrowRight,
  ShieldCheck, Zap, CheckCircle2, Star
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Azeel Invoice Easil — Create Professional Invoices in Seconds" },
      { name: "description", content: "Free, fast, and beautiful invoice generator with PDF export, GST support, dashboard analytics, and modern templates." },
    ],
  }),
  component: Index,
});

const features = [
  { icon: Zap, title: "Instant Invoice Generator", desc: "Beautiful invoices in under 60 seconds." },
  { icon: FileText, title: "GST Calculator", desc: "Automatic tax math with multi-tier support." },
  { icon: Download, title: "PDF Download", desc: "High-quality A4 PDFs powered by jsPDF." },
  { icon: Printer, title: "Print Ready", desc: "Pixel-perfect printable invoices." },
  { icon: Palette, title: "6+ Templates", desc: "Modern, Minimal, Corporate, Elegant, Dark, Creative." },
  { icon: QrCode, title: "QR Payments", desc: "UPI / link based QR for instant pay." },
  { icon: Globe2, title: "Multi Currency", desc: "USD, EUR, INR, GBP, AED — and more." },
  { icon: MoonStar, title: "Dark Mode", desc: "System aware, glassmorphic UI." },
  { icon: Users, title: "Client Management", desc: "Reusable client profiles." },
  { icon: History, title: "Invoice History", desc: "Saved locally, always available." },
  { icon: BarChart3, title: "Analytics Dashboard", desc: "Revenue, paid, pending, overdue." },
  { icon: Smartphone, title: "Mobile Responsive", desc: "Looks gorgeous on any device." },
  { icon: CloudUpload, title: "Cloud Ready", desc: "Designed for sync and team workflows." },
  { icon: Mail, title: "Email Sharing", desc: "Send invoices in one click." },
];

function Index() {
  return (
    <Layout>
      {/* HERO */}
      <section className="relative overflow-hidden bg-hero">
        <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/30 blur-3xl animate-blob" />
        <div className="pointer-events-none absolute -bottom-32 -right-32 h-[28rem] w-[28rem] rounded-full bg-sky/30 blur-3xl animate-blob" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 pb-20 pt-12 sm:px-6 lg:grid-cols-2 lg:pt-20 lg:pb-28">
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-medium">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              New · QR Payments + 6 Templates
            </div>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
              Generate <span className="text-gradient">Beautiful Professional</span> Invoices in Seconds
            </h1>
            <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
              Azeel Invoice Easil is a premium SaaS for freelancers and businesses — instant PDF export,
              GST math, dashboard analytics and stunning templates. Free forever.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link to="/invoice" className="group inline-flex items-center gap-2 rounded-full bg-gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow hover-lift">
                Create Invoice <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/templates" className="inline-flex items-center gap-2 rounded-full border bg-card px-6 py-3 text-sm font-semibold hover:bg-muted">
                Watch Demo
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-success" /> No signup required</div>
              <div className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-success" /> 100% free</div>
              <div className="flex items-center gap-1.5">{[...Array(5)].map((_,i)=><Star key={i} className="h-4 w-4 fill-warning text-warning" />)} 4.9 / 5</div>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
              {[["120K+","Invoices"],["95+","Lighthouse"],["6+","Templates"]].map(([n,l])=>(
                <div key={l}>
                  <div className="text-2xl font-bold text-gradient">{n}</div>
                  <div className="text-xs text-muted-foreground">{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* MOCKUP */}
          <div className="relative animate-fade-up">
            <div className="relative mx-auto max-w-lg">
              <div className="glass shadow-glow rounded-3xl p-5 hover-lift">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-9 w-9 rounded-xl bg-gradient-primary" />
                    <div>
                      <div className="text-sm font-semibold">Acme Studio</div>
                      <div className="text-[10px] text-muted-foreground">acme.studio</div>
                    </div>
                  </div>
                  <div className="rounded-full bg-success/15 px-2 py-0.5 text-[10px] font-semibold text-success">PAID</div>
                </div>
                <div className="mt-4 rounded-2xl border bg-card p-4">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <div className="text-xs text-muted-foreground">Invoice</div>
                      <div className="font-display text-lg font-bold">INV-2025-0042</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-muted-foreground">Total</div>
                      <div className="font-display text-2xl font-bold text-gradient">$2,480.00</div>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2 text-xs">
                    {[["Brand identity package",1,1800],["Landing page design",1,520],["Revisions",2,80]].map(([d,q,p])=>(
                      <div key={d as string} className="flex justify-between border-b pb-2">
                        <span>{d}</span><span className="text-muted-foreground">{q} × ${p}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* floating cards */}
              <div className="glass shadow-card absolute -left-8 -bottom-6 hidden w-56 rounded-2xl p-4 sm:block animate-float">
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Revenue MTD</div>
                <div className="mt-1 font-display text-2xl font-bold">$48,210</div>
                <div className="mt-2 flex items-end gap-1 h-10">
                  {[30,55,42,70,60,85,72].map((h,i)=><div key={i} style={{height:`${h}%`}} className="w-3 rounded bg-gradient-primary" />)}
                </div>
              </div>
              <div className="glass shadow-card absolute -right-6 -top-6 hidden w-44 rounded-2xl p-3 sm:block animate-float" style={{animationDelay:".6s"}}>
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-success/15"><CheckCircle2 className="h-4 w-4 text-success" /></div>
                  <div>
                    <div className="text-xs font-semibold">Paid in full</div>
                    <div className="text-[10px] text-muted-foreground">2 sec ago</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <div className="text-xs font-semibold uppercase tracking-widest text-primary">Features</div>
          <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Everything you need to <span className="text-gradient">get paid faster</span></h2>
          <p className="mt-3 text-muted-foreground">Built for freelancers, agencies and small businesses.</p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {features.map(f => (
            <div key={f.title} className="group relative overflow-hidden rounded-2xl border bg-card p-5 hover-lift">
              <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-gradient-primary opacity-0 blur-2xl transition group-hover:opacity-30" />
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-semibold">{f.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <div className="text-xs font-semibold uppercase tracking-widest text-primary">Pricing</div>
          <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Simple, <span className="text-gradient">transparent</span> pricing</h2>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {[
            {name:"Free", price:"$0", desc:"For freelancers getting started.", popular:false, features:["Unlimited invoices","PDF download","3 templates","Local storage"]},
            {name:"Pro", price:"$9", desc:"For growing businesses.", popular:true, features:["Everything in Free","All 6 templates","Cloud sync","Recurring invoices","Custom branding"]},
            {name:"Business", price:"$29", desc:"For teams and agencies.", popular:false, features:["Everything in Pro","Team seats","API access","Priority support","Custom domain"]},
          ].map(p => (
            <div key={p.name} className={`relative rounded-3xl border p-7 ${p.popular ? "bg-gradient-primary text-primary-foreground shadow-glow" : "bg-card hover-lift"}`}>
              {p.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-warning px-3 py-1 text-[10px] font-bold uppercase text-warning-foreground">Most Popular</div>}
              <div className="font-display text-lg font-semibold">{p.name}</div>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-5xl font-extrabold">{p.price}</span>
                <span className={p.popular ? "opacity-80" : "text-muted-foreground"}>/mo</span>
              </div>
              <p className={`mt-2 text-sm ${p.popular ? "opacity-90" : "text-muted-foreground"}`}>{p.desc}</p>
              <ul className="mt-6 space-y-2 text-sm">
                {p.features.map(f => <li key={f} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4" /> {f}</li>)}
              </ul>
              <Link to="/invoice" className={`mt-7 block rounded-full px-4 py-2.5 text-center text-sm font-semibold ${p.popular ? "bg-primary-foreground text-primary" : "bg-gradient-primary text-primary-foreground shadow-glow"}`}>
                Get started
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-primary p-10 text-center text-primary-foreground shadow-glow sm:p-16">
          <div className="pointer-events-none absolute inset-0 opacity-30 [background:radial-gradient(circle_at_30%_20%,white,transparent_40%)]" />
          <h2 className="relative font-display text-3xl font-extrabold sm:text-5xl">Ready to send your first invoice?</h2>
          <p className="relative mx-auto mt-3 max-w-xl opacity-90">Join thousands of businesses creating professional invoices instantly.</p>
          <Link to="/invoice" className="relative mt-7 inline-flex items-center gap-2 rounded-full bg-primary-foreground px-7 py-3 text-sm font-semibold text-primary hover-lift">
            Launch Generator <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </Layout>
  );
}
