import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [
    { title: "Contact — Azeel Invoice Easil" },
    { name: "description", content: "Get in touch with the Azeel Invoice Easil team." },
  ]}),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <Layout>
      <section className="bg-hero">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
          <h1 className="text-4xl font-bold sm:text-5xl">Get in <span className="text-gradient">touch</span></h1>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">We'd love to hear from you. Send us a message and we'll respond within 24 hours.</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-1">
          {[
            {icon:Mail, label:"Email", val:"hello@azeelinvoice.com"},
            {icon:Phone, label:"Phone", val:"+1 (555) 010-2024"},
            {icon:MapPin, label:"Address", val:"1 Market St, San Francisco, CA"},
          ].map(c => (
            <div key={c.label} className="flex items-start gap-3 rounded-2xl border bg-card p-4 shadow-card">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground"><c.icon className="h-5 w-5"/></div>
              <div><div className="text-xs text-muted-foreground">{c.label}</div><div className="font-medium">{c.val}</div></div>
            </div>
          ))}
        </div>

        <form onSubmit={e=>{e.preventDefault(); setSent(true);}} className="rounded-2xl border bg-card p-6 shadow-card lg:col-span-2 space-y-4">
          {sent ? (
            <div className="rounded-xl bg-success/10 p-6 text-center text-success">
              <p className="font-semibold">Thanks — we received your message!</p>
              <p className="text-sm opacity-90">We'll get back within 24 hours.</p>
            </div>
          ) : (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                <input required maxLength={100} placeholder="Your name" className="rounded-lg border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"/>
                <input required type="email" maxLength={255} placeholder="Email" className="rounded-lg border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"/>
              </div>
              <input maxLength={120} placeholder="Subject" className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"/>
              <textarea required maxLength={1000} rows={5} placeholder="Your message" className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"/>
              <button className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow hover-lift">
                <Send className="h-4 w-4" /> Send message
              </button>
            </>
          )}
        </form>
      </section>
    </Layout>
  );
}
