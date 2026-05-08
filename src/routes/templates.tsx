import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { InvoicePreview, TEMPLATES } from "@/components/invoice/InvoicePreview";
import { Invoice } from "@/lib/storage";

export const Route = createFileRoute("/templates")({
  head: () => ({
    meta: [
      { title: "Invoice Templates — Azeel Invoice Easil" },
      { name: "description", content: "Six premium invoice templates: Modern, Minimal, Corporate, Elegant, Dark and Creative." },
    ],
  }),
  component: TemplatesPage,
});

const sample: Invoice = {
  id:"sample", number:"INV-2025-0042", date:"2025-05-01", dueDate:"2025-05-08",
  currency:"USD", status:"paid", template:"modern",
  company:{ name:"Acme Studio", gst:"29ABCDE1234F2Z5", email:"hello@acme.studio", phone:"+1 555 0102", website:"acme.studio", address:"1 Market St, SF" },
  client:{ name:"Globex Inc.", email:"ap@globex.com", phone:"", billing:"200 Park Ave\nNYC", shipping:"" },
  items:[
    { id:"1", description:"Brand identity package", qty:1, price:1800, tax:8, discount:0 },
    { id:"2", description:"Landing page design", qty:1, price:520, tax:8, discount:0 },
  ],
  notes:"Thanks for choosing us!", terms:"Due in 7 days.", bankDetails:"", upi:"", createdAt:Date.now(),
};

function TemplatesPage() {
  return (
    <Layout>
      <section className="bg-hero">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 text-center">
          <h1 className="text-4xl font-bold sm:text-5xl">Choose your <span className="text-gradient">template</span></h1>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">Six beautifully crafted designs. Switch instantly inside the generator.</p>
          <Link to="/invoice" className="mt-6 inline-block rounded-full bg-gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow hover-lift">Open Generator</Link>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-2">
        {TEMPLATES.map(t => (
          <div key={t.id} className="rounded-2xl border bg-card p-4 shadow-card hover-lift">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h3 className="font-display text-lg font-bold">{t.name}</h3>
                <p className="text-xs text-muted-foreground">{t.desc}</p>
              </div>
              <Link to="/invoice" className="rounded-full bg-gradient-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-glow">Use</Link>
            </div>
            <div className="overflow-hidden rounded-xl bg-muted/40 p-3">
              <div style={{ transform:"scale(0.78)", transformOrigin:"top center" }}>
                <InvoicePreview invoice={{ ...sample, template:t.id }} template={t.id} />
              </div>
            </div>
          </div>
        ))}
      </section>
    </Layout>
  );
}
