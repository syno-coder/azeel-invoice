import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { useEffect, useMemo, useRef, useState } from "react";
import { Invoice, InvoiceItem, calcTotals, formatMoney, loadInvoices, nextInvoiceNumber, upsertInvoice } from "@/lib/storage";
import { InvoicePreview, TEMPLATES, TemplateId } from "@/components/invoice/InvoicePreview";
import { Plus, Trash2, Download, Printer, Save, Sparkles, Upload } from "lucide-react";

export const Route = createFileRoute("/invoice")({
  head: () => ({
    meta: [
      { title: "Invoice Generator — Azeel Invoice Easil" },
      { name: "description", content: "Create, preview and download professional invoices as PDF in seconds." },
    ],
  }),
  component: InvoiceGenerator,
});

const CURRENCIES = ["USD","EUR","GBP","INR","AED","CAD","AUD","JPY","SGD"];

const newItem = (): InvoiceItem => ({ id: crypto.randomUUID(), description: "", qty: 1, price: 0, tax: 0, discount: 0 });

const blank = (): Invoice => ({
  id: crypto.randomUUID(),
  number: typeof window === "undefined" ? "INV-2025-0001" : nextInvoiceNumber(),
  date: new Date().toISOString().slice(0,10),
  dueDate: new Date(Date.now()+7*864e5).toISOString().slice(0,10),
  currency: "USD",
  status: "pending",
  template: "modern",
  company: { name: "Acme Studio", logo: "", gst: "29ABCDE1234F2Z5", email: "hello@acme.studio", phone: "+1 555 0102", website: "acme.studio", address: "1 Market St, San Francisco, CA" },
  client: { name: "Globex Inc.", email: "ap@globex.com", phone: "", billing: "200 Park Ave\nNew York, NY 10166", shipping: "" },
  items: [
    { id: crypto.randomUUID(), description: "Brand identity package", qty: 1, price: 1800, tax: 8, discount: 0 },
    { id: crypto.randomUUID(), description: "Landing page design", qty: 1, price: 520, tax: 8, discount: 0 },
  ],
  notes: "Thanks for choosing us!",
  terms: "Payment due within 7 days. Late fees apply after due date.",
  bankDetails: "Bank: Chase\nAcct: 0000-1234-5678\nSWIFT: CHASUS33",
  upi: "acme@upi",
  createdAt: Date.now(),
});

function InvoiceGenerator() {
  const [invoice, setInvoice] = useState<Invoice>(blank());
  const [template, setTemplate] = useState<TemplateId>("modern");
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInvoice(prev => ({ ...prev, number: nextInvoiceNumber() }));
  }, []);

  const totals = useMemo(() => calcTotals(invoice.items), [invoice.items]);

  const update = (patch: Partial<Invoice>) => setInvoice(prev => ({ ...prev, ...patch }));
  const updateCompany = (patch: Partial<Invoice["company"]>) => setInvoice(prev => ({ ...prev, company: { ...prev.company, ...patch } }));
  const updateClient = (patch: Partial<Invoice["client"]>) => setInvoice(prev => ({ ...prev, client: { ...prev.client, ...patch } }));
  const updateItem = (id: string, patch: Partial<InvoiceItem>) =>
    setInvoice(prev => ({ ...prev, items: prev.items.map(i => i.id === id ? { ...i, ...patch } : i) }));
  const addItem = () => setInvoice(prev => ({ ...prev, items: [...prev.items, newItem()] }));
  const removeItem = (id: string) => setInvoice(prev => ({ ...prev, items: prev.items.filter(i => i.id !== id) }));

  const onLogo = (file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => updateCompany({ logo: String(e.target?.result || "") });
    reader.readAsDataURL(file);
  };

  const save = () => {
    upsertInvoice({ ...invoice, template });
    alert("Invoice saved locally.");
  };

  const downloadPDF = async () => {
    const el = document.getElementById("invoice-preview");
    if (!el) return;
    const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
      import("html2canvas"),
      import("jspdf"),
    ]);
    const canvas = await html2canvas(el, { scale: 2, backgroundColor: "#ffffff", useCORS: true });
    const img = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pageW = pdf.internal.pageSize.getWidth();
    const pageH = pdf.internal.pageSize.getHeight();
    const ratio = canvas.width / canvas.height;
    const imgW = pageW - 20;
    const imgH = imgW / ratio;
    let y = 10;
    if (imgH < pageH - 20) {
      pdf.addImage(img, "PNG", 10, y, imgW, imgH);
    } else {
      // Multi-page
      const pageHeightPx = (canvas.width * (pageH - 20)) / (pageW - 20);
      let remaining = canvas.height;
      let position = 0;
      while (remaining > 0) {
        const slice = document.createElement("canvas");
        slice.width = canvas.width;
        slice.height = Math.min(pageHeightPx, remaining);
        const ctx = slice.getContext("2d")!;
        ctx.drawImage(canvas, 0, position, canvas.width, slice.height, 0, 0, canvas.width, slice.height);
        const sliceImg = slice.toDataURL("image/png");
        const sliceH = (slice.height * imgW) / slice.width;
        pdf.addImage(sliceImg, "PNG", 10, 10, imgW, sliceH);
        remaining -= slice.height;
        position += slice.height;
        if (remaining > 0) pdf.addPage();
      }
    }
    pdf.save(`${invoice.number}.pdf`);
  };

  const printInvoice = () => window.print();

  const inputCls = "w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring";
  const labelCls = "text-[11px] font-semibold uppercase tracking-wider text-muted-foreground";

  return (
    <Layout>
      <section className="bg-hero">
        <div className="mx-auto max-w-7xl px-4 pt-10 pb-6 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-medium">
                <Sparkles className="h-3.5 w-3.5 text-primary" /> Live preview
              </div>
              <h1 className="mt-3 text-3xl font-bold sm:text-4xl">Invoice <span className="text-gradient">Generator</span></h1>
              <p className="mt-1 text-sm text-muted-foreground">Fill the form on the left — preview updates instantly.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button onClick={save} className="inline-flex items-center gap-1.5 rounded-full border bg-card px-4 py-2 text-sm font-medium hover-lift"><Save className="h-4 w-4" /> Save</button>
              <button onClick={printInvoice} className="inline-flex items-center gap-1.5 rounded-full border bg-card px-4 py-2 text-sm font-medium hover-lift"><Printer className="h-4 w-4" /> Print</button>
              <button onClick={downloadPDF} className="inline-flex items-center gap-1.5 rounded-full bg-gradient-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-glow hover-lift"><Download className="h-4 w-4" /> Download PDF</button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-2">
        {/* FORM */}
        <div className="space-y-6">
          {/* Template picker */}
          <div className="rounded-2xl border bg-card p-5 shadow-card">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">Template</h2>
              <Link to="/templates" className="text-xs text-primary story-link">Browse all</Link>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6">
              {TEMPLATES.map(t => (
                <button key={t.id} onClick={() => setTemplate(t.id)}
                  className={`rounded-lg border px-2 py-2 text-xs font-medium transition ${template===t.id ? "bg-gradient-primary text-primary-foreground shadow-glow" : "bg-background hover:bg-muted"}`}>
                  {t.name}
                </button>
              ))}
            </div>
          </div>

          {/* Company */}
          <div className="rounded-2xl border bg-card p-5 shadow-card">
            <h2 className="mb-4 font-semibold">Company Details</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Company Name"><input className={inputCls} value={invoice.company.name} onChange={e=>updateCompany({name:e.target.value})}/></Field>
              <Field label="GST / Tax No."><input className={inputCls} value={invoice.company.gst} onChange={e=>updateCompany({gst:e.target.value})}/></Field>
              <Field label="Email"><input className={inputCls} type="email" value={invoice.company.email} onChange={e=>updateCompany({email:e.target.value})}/></Field>
              <Field label="Phone"><input className={inputCls} value={invoice.company.phone} onChange={e=>updateCompany({phone:e.target.value})}/></Field>
              <Field label="Website"><input className={inputCls} value={invoice.company.website} onChange={e=>updateCompany({website:e.target.value})}/></Field>
              <Field label="Logo">
                <label className="flex cursor-pointer items-center gap-2 rounded-lg border bg-background px-3 py-2 text-sm hover:bg-muted">
                  <Upload className="h-4 w-4" />
                  <span className="truncate">{invoice.company.logo ? "Change logo" : "Upload logo"}</span>
                  <input type="file" accept="image/*" className="hidden" onChange={e=>onLogo(e.target.files?.[0])}/>
                </label>
              </Field>
              <Field label="Address" className="sm:col-span-2"><textarea className={inputCls} rows={2} value={invoice.company.address} onChange={e=>updateCompany({address:e.target.value})}/></Field>
            </div>
          </div>

          {/* Client */}
          <div className="rounded-2xl border bg-card p-5 shadow-card">
            <h2 className="mb-4 font-semibold">Client Details</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Client Name"><input className={inputCls} value={invoice.client.name} onChange={e=>updateClient({name:e.target.value})}/></Field>
              <Field label="Email"><input className={inputCls} value={invoice.client.email} onChange={e=>updateClient({email:e.target.value})}/></Field>
              <Field label="Phone"><input className={inputCls} value={invoice.client.phone} onChange={e=>updateClient({phone:e.target.value})}/></Field>
              <Field label="Billing Address"><textarea className={inputCls} rows={2} value={invoice.client.billing} onChange={e=>updateClient({billing:e.target.value})}/></Field>
              <Field label="Shipping Address" className="sm:col-span-2"><textarea className={inputCls} rows={2} value={invoice.client.shipping} onChange={e=>updateClient({shipping:e.target.value})}/></Field>
            </div>
          </div>

          {/* Invoice meta */}
          <div className="rounded-2xl border bg-card p-5 shadow-card">
            <h2 className="mb-4 font-semibold">Invoice Details</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <Field label="Invoice #"><input className={inputCls} value={invoice.number} onChange={e=>update({number:e.target.value})}/></Field>
              <Field label="Date"><input className={inputCls} type="date" value={invoice.date} onChange={e=>update({date:e.target.value})}/></Field>
              <Field label="Due Date"><input className={inputCls} type="date" value={invoice.dueDate} onChange={e=>update({dueDate:e.target.value})}/></Field>
              <Field label="Currency">
                <select className={inputCls} value={invoice.currency} onChange={e=>update({currency:e.target.value})}>
                  {CURRENCIES.map(c=><option key={c}>{c}</option>)}
                </select>
              </Field>
              <Field label="Status">
                <select className={inputCls} value={invoice.status} onChange={e=>update({status:e.target.value as Invoice["status"]})}>
                  <option value="pending">Pending</option><option value="paid">Paid</option><option value="overdue">Overdue</option>
                </select>
              </Field>
            </div>
          </div>

          {/* Items */}
          <div className="rounded-2xl border bg-card p-5 shadow-card">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">Line Items</h2>
              <button onClick={addItem} className="inline-flex items-center gap-1 rounded-full bg-gradient-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-glow"><Plus className="h-3.5 w-3.5"/> Add</button>
            </div>
            <div className="mt-3 space-y-2">
              {invoice.items.map(it => (
                <div key={it.id} className="grid grid-cols-12 gap-2 rounded-lg border bg-background p-2">
                  <input className={`${inputCls} col-span-12 sm:col-span-4`} placeholder="Description" value={it.description} onChange={e=>updateItem(it.id,{description:e.target.value})}/>
                  <input className={`${inputCls} col-span-3 sm:col-span-2`} type="number" min={0} placeholder="Qty" value={it.qty} onChange={e=>updateItem(it.id,{qty:+e.target.value||0})}/>
                  <input className={`${inputCls} col-span-3 sm:col-span-2`} type="number" min={0} placeholder="Price" value={it.price} onChange={e=>updateItem(it.id,{price:+e.target.value||0})}/>
                  <input className={`${inputCls} col-span-3 sm:col-span-1`} type="number" min={0} placeholder="Tax%" value={it.tax} onChange={e=>updateItem(it.id,{tax:+e.target.value||0})}/>
                  <input className={`${inputCls} col-span-3 sm:col-span-2`} type="number" min={0} placeholder="Disc%" value={it.discount} onChange={e=>updateItem(it.id,{discount:+e.target.value||0})}/>
                  <button onClick={()=>removeItem(it.id)} className="col-span-12 inline-flex items-center justify-center rounded-lg border bg-card text-destructive hover:bg-destructive/10 sm:col-span-1" aria-label="Remove">
                    <Trash2 className="h-4 w-4"/>
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-3 flex justify-end gap-6 text-sm">
              <div><span className="text-muted-foreground">Subtotal:</span> <strong>{formatMoney(totals.subtotal, invoice.currency)}</strong></div>
              <div><span className="text-muted-foreground">Tax:</span> <strong>{formatMoney(totals.tax, invoice.currency)}</strong></div>
              <div className="text-base"><span className="text-muted-foreground">Total:</span> <strong className="text-gradient">{formatMoney(totals.total, invoice.currency)}</strong></div>
            </div>
          </div>

          {/* Extras */}
          <div className="rounded-2xl border bg-card p-5 shadow-card">
            <h2 className="mb-4 font-semibold">Notes, Terms & Payment</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Notes"><textarea className={inputCls} rows={3} value={invoice.notes} onChange={e=>update({notes:e.target.value})}/></Field>
              <Field label="Terms & Conditions"><textarea className={inputCls} rows={3} value={invoice.terms} onChange={e=>update({terms:e.target.value})}/></Field>
              <Field label="Bank Details"><textarea className={inputCls} rows={3} value={invoice.bankDetails} onChange={e=>update({bankDetails:e.target.value})}/></Field>
              <Field label="UPI / Payment ID"><input className={inputCls} value={invoice.upi} onChange={e=>update({upi:e.target.value})}/></Field>
            </div>
          </div>
        </div>

        {/* PREVIEW */}
        <div className="lg:sticky lg:top-24 self-start">
          <div ref={previewRef} className="rounded-2xl border bg-muted/40 p-3 sm:p-5">
            <InvoicePreview invoice={{ ...invoice, template }} template={template} />
          </div>
        </div>
      </section>
    </Layout>
  );
}

function Field({ label, children, className="" }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <div className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</div>
      {children}
    </label>
  );
}
