import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { useEffect, useMemo, useState } from "react";
import { Invoice, calcTotals, deleteInvoice, duplicateInvoice, formatMoney, loadInvoices } from "@/lib/storage";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Tooltip, Legend, Filler } from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import { Search, Copy, Trash2, FileText, DollarSign, Clock, AlertCircle, Users } from "lucide-react";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Tooltip, Legend, Filler);

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — Azeel Invoice Easil" },
      { name: "description", content: "Track revenue, paid, pending and overdue invoices with live analytics." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const [list, setList] = useState<Invoice[]>([]);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<"all"|"paid"|"pending"|"overdue">("all");

  useEffect(() => { setList(loadInvoices()); }, []);

  const refresh = () => setList(loadInvoices());

  const stats = useMemo(() => {
    let total = 0, paid = 0, pending = 0, overdue = 0;
    const clients = new Set<string>();
    list.forEach(i => {
      const t = calcTotals(i.items).total;
      total += t;
      if (i.status === "paid") paid += t;
      if (i.status === "pending") pending += t;
      if (i.status === "overdue") overdue += t;
      if (i.client.name) clients.add(i.client.name.toLowerCase());
    });
    return { total, paid, pending, overdue, clients: clients.size };
  }, [list]);

  const filtered = useMemo(() => {
    return list.filter(i => {
      if (filter !== "all" && i.status !== filter) return false;
      if (!q) return true;
      const s = q.toLowerCase();
      return i.number.toLowerCase().includes(s) || i.client.name.toLowerCase().includes(s);
    });
  }, [list, q, filter]);

  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const byMonth = Array(12).fill(0);
  list.forEach(i => { byMonth[new Date(i.createdAt).getMonth()] += calcTotals(i.items).total; });

  const cards = [
    { label:"Total Revenue", val: formatMoney(stats.total,"USD"), icon: DollarSign, color:"from-[#2563EB] to-[#38BDF8]" },
    { label:"Paid", val: formatMoney(stats.paid,"USD"), icon: FileText, color:"from-[#10B981] to-[#38BDF8]" },
    { label:"Pending", val: formatMoney(stats.pending,"USD"), icon: Clock, color:"from-[#F59E0B] to-[#EF4444]" },
    { label:"Overdue", val: formatMoney(stats.overdue,"USD"), icon: AlertCircle, color:"from-[#EF4444] to-[#F59E0B]" },
    { label:"Clients", val: String(stats.clients), icon: Users, color:"from-[#0F172A] to-[#2563EB]" },
  ];

  return (
    <Layout>
      <section className="bg-hero">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <h1 className="text-3xl font-bold sm:text-4xl">Your <span className="text-gradient">Dashboard</span></h1>
          <p className="mt-1 text-sm text-muted-foreground">Real-time analytics for invoices saved on this device.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {cards.map(c => (
            <div key={c.label} className="relative overflow-hidden rounded-2xl border bg-card p-5 shadow-card hover-lift">
              <div className={`absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br ${c.color} opacity-25 blur-2xl`} />
              <div className="flex items-center justify-between">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{c.label}</div>
                <c.icon className="h-4 w-4 text-primary" />
              </div>
              <div className="mt-2 font-display text-2xl font-bold">{c.val}</div>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border bg-card p-5 shadow-card lg:col-span-2">
            <h3 className="mb-3 font-semibold">Revenue by month</h3>
            <Bar
              data={{
                labels: months,
                datasets: [{
                  label: "Revenue",
                  data: byMonth,
                  backgroundColor: "rgba(37,99,235,0.7)",
                  borderRadius: 8,
                }],
              }}
              options={{ responsive: true, plugins: { legend: { display: false } } }}
            />
          </div>
          <div className="rounded-2xl border bg-card p-5 shadow-card">
            <h3 className="mb-3 font-semibold">Status</h3>
            <Doughnut
              data={{
                labels: ["Paid","Pending","Overdue"],
                datasets: [{
                  data: [stats.paid, stats.pending, stats.overdue],
                  backgroundColor: ["#10B981","#F59E0B","#EF4444"],
                  borderWidth: 0,
                }],
              }}
            />
          </div>
        </div>

        <div className="mt-6 rounded-2xl border bg-card p-5 shadow-card">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="font-semibold">Recent Invoices</h3>
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search invoice or client"
                  className="rounded-full border bg-background pl-8 pr-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-ring"/>
              </div>
              <div className="flex rounded-full border bg-background p-0.5 text-xs">
                {(["all","paid","pending","overdue"] as const).map(f => (
                  <button key={f} onClick={()=>setFilter(f)}
                    className={`rounded-full px-3 py-1 capitalize ${filter===f ? "bg-gradient-primary text-primary-foreground" : "text-muted-foreground"}`}>
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-xs uppercase tracking-wider text-muted-foreground">
                <tr><th className="p-3">Invoice</th><th className="p-3">Client</th><th className="p-3">Date</th><th className="p-3">Status</th><th className="p-3 text-right">Total</th><th className="p-3"></th></tr>
              </thead>
              <tbody>
                {filtered.length === 0 && (
                  <tr><td colSpan={6} className="p-8 text-center text-muted-foreground">
                    No invoices yet. <Link to="/invoice" className="text-primary story-link">Create your first one →</Link>
                  </td></tr>
                )}
                {filtered.map(i => {
                  const t = calcTotals(i.items).total;
                  const color = i.status==="paid" ? "bg-success/15 text-success" : i.status==="overdue" ? "bg-destructive/15 text-destructive" : "bg-warning/15 text-warning-foreground";
                  return (
                    <tr key={i.id} className="border-t">
                      <td className="p-3 font-medium">{i.number}</td>
                      <td className="p-3">{i.client.name}</td>
                      <td className="p-3 text-muted-foreground">{i.date}</td>
                      <td className="p-3"><span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${color}`}>{i.status}</span></td>
                      <td className="p-3 text-right font-semibold">{formatMoney(t, i.currency)}</td>
                      <td className="p-3 text-right">
                        <div className="inline-flex gap-1">
                          <button onClick={()=>{duplicateInvoice(i.id); refresh();}} className="rounded-full border p-1.5 hover:bg-muted" aria-label="Duplicate"><Copy className="h-3.5 w-3.5" /></button>
                          <button onClick={()=>{if(confirm("Delete this invoice?")){deleteInvoice(i.id); refresh();}}} className="rounded-full border p-1.5 text-destructive hover:bg-destructive/10" aria-label="Delete"><Trash2 className="h-3.5 w-3.5" /></button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </Layout>
  );
}
