import { Invoice, calcTotals, formatMoney } from "@/lib/storage";

export type TemplateId = "modern" | "minimal" | "corporate" | "elegant" | "dark" | "creative";

export const TEMPLATES: { id: TemplateId; name: string; desc: string }[] = [
  { id: "modern", name: "Modern", desc: "Bold gradient header, clean grid." },
  { id: "minimal", name: "Minimal", desc: "Mono lines, breathable whitespace." },
  { id: "corporate", name: "Corporate", desc: "Navy banner, formal typography." },
  { id: "elegant", name: "Elegant", desc: "Serif touches, refined accents." },
  { id: "dark", name: "Dark", desc: "Sleek dark theme on white paper." },
  { id: "creative", name: "Creative", desc: "Colorful blobs and rounded cards." },
];

export function InvoicePreview({ invoice, template = "modern" }: { invoice: Invoice; template?: TemplateId }) {
  const totals = calcTotals(invoice.items);
  const c = invoice.currency;

  const Header = () => {
    if (template === "modern") return (
      <div className="rounded-t-2xl bg-gradient-to-br from-[#2563EB] to-[#38BDF8] p-6 text-white">
        <div className="flex items-start justify-between gap-4">
          <div>
            {invoice.company.logo && <img src={invoice.company.logo} alt="" className="mb-2 h-10 w-auto rounded bg-white/10 p-1" />}
            <div className="text-xl font-bold">{invoice.company.name || "Your Company"}</div>
            <div className="text-xs opacity-90">{invoice.company.email} · {invoice.company.phone}</div>
            <div className="text-xs opacity-90">{invoice.company.website}</div>
          </div>
          <div className="text-right">
            <div className="text-xs uppercase tracking-widest opacity-80">Invoice</div>
            <div className="text-2xl font-bold">{invoice.number}</div>
            <div className="mt-1 inline-block rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-bold uppercase">{invoice.status}</div>
          </div>
        </div>
      </div>
    );
    if (template === "corporate") return (
      <div className="border-b-4 border-[#0F172A] p-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#2563EB]">Tax Invoice</div>
            <div className="text-2xl font-bold text-[#0F172A]">{invoice.company.name || "Your Company"}</div>
            <div className="text-xs text-gray-600">GST: {invoice.company.gst}</div>
          </div>
          <div className="text-right">
            <div className="text-xs">Invoice No.</div>
            <div className="text-lg font-bold">{invoice.number}</div>
          </div>
        </div>
      </div>
    );
    if (template === "minimal") return (
      <div className="border-b p-6">
        <div className="flex items-baseline justify-between">
          <div className="text-2xl font-light tracking-tight">{invoice.company.name || "Your Company"}</div>
          <div className="font-mono text-xs uppercase tracking-widest text-gray-500">{invoice.number}</div>
        </div>
      </div>
    );
    if (template === "elegant") return (
      <div className="p-6 text-center">
        <div className="mx-auto inline-block border-y border-gray-300 px-8 py-2">
          <div className="font-serif text-3xl">{invoice.company.name || "Your Company"}</div>
        </div>
        <div className="mt-2 text-xs italic text-gray-500">Invoice {invoice.number}</div>
      </div>
    );
    if (template === "dark") return (
      <div className="rounded-t-2xl bg-[#0F172A] p-6 text-white">
        <div className="flex justify-between">
          <div>
            <div className="text-xl font-bold">{invoice.company.name || "Your Company"}</div>
            <div className="text-xs opacity-70">{invoice.company.email}</div>
          </div>
          <div className="text-right">
            <div className="text-xs opacity-70">INVOICE</div>
            <div className="text-2xl font-bold">{invoice.number}</div>
          </div>
        </div>
      </div>
    );
    // creative
    return (
      <div className="relative overflow-hidden rounded-t-2xl p-6">
        <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-[#38BDF8] opacity-30" />
        <div className="absolute -right-8 -bottom-8 h-28 w-28 rounded-full bg-[#2563EB] opacity-30" />
        <div className="relative flex justify-between">
          <div>
            <div className="text-2xl font-extrabold">{invoice.company.name || "Your Company"}</div>
            <div className="text-xs text-gray-600">{invoice.company.address}</div>
          </div>
          <div className="rounded-2xl bg-[#0F172A] px-3 py-2 text-right text-white">
            <div className="text-[10px] uppercase opacity-70">Invoice</div>
            <div className="text-lg font-bold">{invoice.number}</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div id="invoice-preview" className="mx-auto w-full max-w-[820px] rounded-2xl bg-white text-[#0F172A] shadow-card">
      <Header />
      <div className="grid gap-6 p-6 sm:grid-cols-2">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-widest text-gray-500">Bill To</div>
          <div className="mt-1 font-semibold">{invoice.client.name || "Client Name"}</div>
          <div className="text-xs text-gray-600 whitespace-pre-line">{invoice.client.billing}</div>
          <div className="text-xs text-gray-600">{invoice.client.email}</div>
        </div>
        <div className="sm:text-right">
          <div className="grid grid-cols-2 gap-1 text-xs sm:inline-grid">
            <div className="text-gray-500">Invoice Date</div><div>{invoice.date}</div>
            <div className="text-gray-500">Due Date</div><div>{invoice.dueDate}</div>
            <div className="text-gray-500">Currency</div><div>{c}</div>
          </div>
        </div>
      </div>

      <div className="px-6">
        <table className="w-full overflow-hidden rounded-lg text-sm">
          <thead className="bg-gray-50 text-left text-[11px] uppercase tracking-wider text-gray-600">
            <tr>
              <th className="p-3">Description</th>
              <th className="p-3 text-right">Qty</th>
              <th className="p-3 text-right">Price</th>
              <th className="p-3 text-right">Tax</th>
              <th className="p-3 text-right">Disc</th>
              <th className="p-3 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map(it => {
              const line = it.qty * it.price;
              const after = line - line * (it.discount/100);
              const total = after + after * (it.tax/100);
              return (
                <tr key={it.id} className="border-b last:border-0">
                  <td className="p-3">{it.description || "—"}</td>
                  <td className="p-3 text-right">{it.qty}</td>
                  <td className="p-3 text-right">{formatMoney(it.price, c)}</td>
                  <td className="p-3 text-right">{it.tax}%</td>
                  <td className="p-3 text-right">{it.discount}%</td>
                  <td className="p-3 text-right font-semibold">{formatMoney(total, c)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="grid gap-6 p-6 sm:grid-cols-2">
        <div className="space-y-3 text-xs">
          {invoice.notes && (<div><div className="font-semibold">Notes</div><div className="text-gray-600 whitespace-pre-line">{invoice.notes}</div></div>)}
          {invoice.terms && (<div><div className="font-semibold">Terms</div><div className="text-gray-600 whitespace-pre-line">{invoice.terms}</div></div>)}
          {(invoice.bankDetails || invoice.upi) && (
            <div>
              <div className="font-semibold">Payment</div>
              <div className="text-gray-600 whitespace-pre-line">{invoice.bankDetails}</div>
              {invoice.upi && <div className="text-gray-600">UPI: {invoice.upi}</div>}
            </div>
          )}
        </div>
        <div className="ml-auto w-full max-w-xs space-y-1 text-sm">
          <div className="flex justify-between"><span className="text-gray-500">Subtotal</span><span>{formatMoney(totals.subtotal, c)}</span></div>
          <div className="flex justify-between"><span className="text-gray-500">Discount</span><span>- {formatMoney(totals.discount, c)}</span></div>
          <div className="flex justify-between"><span className="text-gray-500">Tax</span><span>{formatMoney(totals.tax, c)}</span></div>
          <div className="mt-2 flex justify-between border-t pt-2 text-lg font-bold">
            <span>Total</span>
            <span className="text-[#2563EB]">{formatMoney(totals.total, c)}</span>
          </div>
        </div>
      </div>

      <div className="rounded-b-2xl border-t bg-gray-50 p-4 text-center text-[11px] text-gray-500">
        Thank you for your business — generated by Azeel Invoice Easil
      </div>
    </div>
  );
}
