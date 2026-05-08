import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export const Route = createFileRoute("/faq")({
  head: () => ({ meta: [
    { title: "FAQ — Azeel Invoice Easil" },
    { name: "description", content: "Frequently asked questions about Azeel Invoice Easil." },
  ]}),
  component: FAQ,
});

const faqs = [
  ["Is Azeel Invoice Easil really free?", "Yes — the core invoice generator, PDF export, and templates are 100% free with no signup required."],
  ["Where are my invoices stored?", "All invoices are saved locally in your browser via LocalStorage. Cloud sync is available on Pro."],
  ["Can I add my company logo?", "Absolutely. Upload any image in the company details and it will appear on every template."],
  ["Does it support GST and tax?", "Yes — set tax % per line item. We auto-calculate subtotals, discounts, taxes and grand totals."],
  ["Is the PDF print-ready?", "PDFs are generated at high resolution and optimized for A4 printing."],
  ["Do you support multiple currencies?", "Yes — USD, EUR, GBP, INR, AED, CAD, AUD, JPY, SGD and more."],
  ["Is dark mode available?", "Yes, with system theme detection and saved preference."],
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Layout>
      <section className="bg-hero">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
          <h1 className="text-4xl font-bold sm:text-5xl">Frequently asked <span className="text-gradient">questions</span></h1>
        </div>
      </section>
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <div className="space-y-3">
          {faqs.map(([q,a], i) => (
            <div key={i} className="overflow-hidden rounded-2xl border bg-card shadow-soft">
              <button onClick={()=>setOpen(open===i?null:i)} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left">
                <span className="font-medium">{q}</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${open===i?"rotate-180":""}`}/>
              </button>
              {open===i && <div className="px-5 pb-5 text-sm text-muted-foreground">{a}</div>}
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
