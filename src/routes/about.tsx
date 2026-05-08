import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { Sparkles, Heart, Globe2, Rocket } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [
    { title: "About — Azeel Invoice Easil" },
    { name: "description", content: "Our mission is to make invoicing effortless for every business in the world." },
  ]}),
  component: About,
});

function About() {
  return (
    <Layout>
      <section className="bg-hero">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
          <h1 className="text-4xl font-bold sm:text-5xl">About <span className="text-gradient">Azeel Invoice Easil</span></h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            We believe invoicing should be effortless. Azeel Invoice Easil empowers freelancers and small businesses to send beautiful, professional invoices in seconds — for free.
          </p>
        </div>
      </section>
      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4 sm:px-6">
        {[
          { icon: Rocket, title: "Fast", desc: "Generate invoices in under a minute." },
          { icon: Heart, title: "Friendly", desc: "Designed with care for everyday users." },
          { icon: Globe2, title: "Global", desc: "Multi-currency, multi-language ready." },
          { icon: Sparkles, title: "Premium", desc: "World-class design out of the box." },
        ].map(c => (
          <div key={c.title} className="rounded-2xl border bg-card p-6 shadow-card hover-lift">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow"><c.icon className="h-5 w-5"/></div>
            <h3 className="mt-4 font-semibold">{c.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{c.desc}</p>
          </div>
        ))}
      </section>
    </Layout>
  );
}
