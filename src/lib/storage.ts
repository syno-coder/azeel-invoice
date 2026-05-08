export type InvoiceItem = {
  id: string;
  description: string;
  qty: number;
  price: number;
  tax: number;
  discount: number;
};

export type Invoice = {
  id: string;
  number: string;
  date: string;
  dueDate: string;
  currency: string;
  status: "paid" | "pending" | "overdue";
  template: string;
  company: {
    name: string; logo?: string; gst: string; email: string; phone: string; website: string; address: string;
  };
  client: {
    name: string; email: string; phone: string; billing: string; shipping: string;
  };
  items: InvoiceItem[];
  notes: string;
  terms: string;
  bankDetails: string;
  upi: string;
  createdAt: number;
};

const KEY = "azeel_invoices_v1";

export const loadInvoices = (): Invoice[] => {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; }
};

export const saveInvoices = (list: Invoice[]) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(list));
};

export const upsertInvoice = (inv: Invoice) => {
  const list = loadInvoices();
  const i = list.findIndex(x => x.id === inv.id);
  if (i >= 0) list[i] = inv; else list.unshift(inv);
  saveInvoices(list);
};

export const deleteInvoice = (id: string) => {
  saveInvoices(loadInvoices().filter(x => x.id !== id));
};

export const duplicateInvoice = (id: string) => {
  const list = loadInvoices();
  const found = list.find(x => x.id === id);
  if (!found) return;
  const copy: Invoice = {
    ...found,
    id: crypto.randomUUID(),
    number: nextInvoiceNumber(),
    createdAt: Date.now(),
  };
  list.unshift(copy);
  saveInvoices(list);
};

export const nextInvoiceNumber = () => {
  const list = loadInvoices();
  const n = list.length + 1;
  return `INV-${new Date().getFullYear()}-${String(n).padStart(4, "0")}`;
};

export const calcTotals = (items: InvoiceItem[]) => {
  let subtotal = 0, tax = 0, discount = 0;
  items.forEach(it => {
    const line = it.qty * it.price;
    subtotal += line;
    discount += line * (it.discount / 100);
    tax += (line - line * (it.discount / 100)) * (it.tax / 100);
  });
  const total = subtotal - discount + tax;
  return { subtotal, tax, discount, total };
};

export const formatMoney = (n: number, currency = "USD") => {
  try {
    return new Intl.NumberFormat(undefined, { style: "currency", currency }).format(n);
  } catch {
    return `${currency} ${n.toFixed(2)}`;
  }
};
