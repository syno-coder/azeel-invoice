import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";

export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: [
    { title: "Privacy Policy — Azeel Invoice Easil" },
    { name: "description", content: "How we handle your data at Azeel Invoice Easil." },
  ]}),
  component: Privacy,
});

function Privacy() {
  return (
    <Layout>
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 prose-invert">
        <h1 className="text-4xl font-bold">Privacy Policy</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: May 2026</p>
        <div className="mt-6 space-y-5 text-sm leading-relaxed text-muted-foreground">
          <p>Your privacy matters. Azeel Invoice Easil stores your invoice data locally in your browser. We do not transmit your invoices to any server unless you explicitly opt into cloud sync.</p>
          <h2 className="text-xl font-semibold text-foreground">Data we collect</h2>
          <p>Anonymous, aggregated usage analytics to improve the product. No invoice contents are collected.</p>
          <h2 className="text-xl font-semibold text-foreground">Cookies</h2>
          <p>We use minimal cookies for theme preferences and session continuity.</p>
          <h2 className="text-xl font-semibold text-foreground">Contact</h2>
          <p>Questions? Email hello@azeelinvoice.com.</p>
        </div>
      </article>
    </Layout>
  );
}
