import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";

export const Route = createFileRoute("/terms")({
  head: () => ({ meta: [
    { title: "Terms & Conditions — Azeel Invoice Easil" },
    { name: "description", content: "Terms governing your use of Azeel Invoice Easil." },
  ]}),
  component: Terms,
});

function Terms() {
  return (
    <Layout>
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h1 className="text-4xl font-bold">Terms & Conditions</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: May 2026</p>
        <div className="mt-6 space-y-5 text-sm leading-relaxed text-muted-foreground">
          <p>By using Azeel Invoice Easil you agree to these terms. The service is provided "as is" without warranty of any kind.</p>
          <h2 className="text-xl font-semibold text-foreground">Acceptable use</h2>
          <p>Do not use the service for unlawful purposes or to create misleading documents.</p>
          <h2 className="text-xl font-semibold text-foreground">Liability</h2>
          <p>We are not liable for any indirect, incidental or consequential damages arising from your use.</p>
          <h2 className="text-xl font-semibold text-foreground">Changes</h2>
          <p>We may update these terms from time to time. Continued use means acceptance of any changes.</p>
        </div>
      </article>
    </Layout>
  );
}
