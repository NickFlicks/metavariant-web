import { useState } from "react";
import { Tag, AlertTriangle, PackageSearch, ListChecks, Palette, FileDown, Check, Lock } from "lucide-react";

const FIELDS = [
  {
    key: "product_label",
    name: "Product Label",
    icon: Tag,
    blockName: "Product Label",
    useCase: "Eye-catching badge",
    freePlan: true,
  },
  {
    key: "shipping_alert",
    name: "Shipping & Stock Alert",
    icon: AlertTriangle,
    blockName: "Shipping / Stock Alert",
    useCase: "Heads-up banner",
    freePlan: true,
  },
  {
    key: "case_pack",
    name: "Pack Quantity + Price Per Unit",
    icon: PackageSearch,
    blockName: "B2B / Case-Pack Pricing",
    useCase: "Wholesale pricing",
    freePlan: false,
  },
  {
    key: "variant_specs",
    name: "Variant Specifications",
    icon: ListChecks,
    blockName: "Specifications Table",
    useCase: "Spec comparison table",
    freePlan: false,
  },
  {
    key: "material",
    name: "Material Color + Details",
    icon: Palette,
    blockName: "Material Card",
    useCase: "Material & swatch card",
    freePlan: false,
  },
  {
    key: "document_file",
    name: "Download File",
    icon: FileDown,
    blockName: "Document & Download",
    useCase: "Downloadable document",
    freePlan: false,
  },
];

export default function StandardFieldsDemo({ className = "" }) {
  const [plan, setPlan] = useState("free");
  const [created, setCreated] = useState(() => new Set());

  const isAllowed = (field) => plan === "unlimited" || field.freePlan;
  const createdCount = created.size;

  function toggle(field) {
    if (!isAllowed(field) || created.has(field.key)) return;
    setCreated((prev) => new Set(prev).add(field.key));
  }

  return (
    <div className={`glass glass-hover rounded-xl2 p-5 sm:p-6 ${className}`}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
            Metafields Configuration &middot; Ready-made fields
          </p>
          <p className="mt-1 text-sm text-ink-secondary">
            Click Create, drag the matching block into your theme, and you&apos;re live.
          </p>
        </div>
        <div className="inline-flex items-center rounded-full border border-white/60 bg-white/50 p-0.5 text-xs font-semibold backdrop-blur">
          {["free", "unlimited"].map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPlan(p)}
              className={`rounded-full px-3 py-1.5 capitalize transition-colors ${
                plan === p ? "bg-ink text-white shadow-soft" : "text-ink-muted"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {FIELDS.map((field) => {
          const Icon = field.icon;
          const allowed = isAllowed(field);
          const isCreated = created.has(field.key);
          return (
            <button
              key={field.key}
              type="button"
              onClick={() => toggle(field)}
              disabled={!allowed || isCreated}
              className={`group flex flex-col justify-between gap-3 rounded-xl border p-4 text-left transition-all duration-300 ${
                isCreated
                  ? "border-emerald-200 bg-emerald-50/70"
                  : allowed
                    ? "border-white/60 bg-white/60 hover:-translate-y-0.5 hover:border-brand-200 hover:bg-white/80"
                    : "cursor-not-allowed border-white/40 bg-white/30 opacity-70"
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <Icon
                    className={`h-4 w-4 shrink-0 ${isCreated ? "text-emerald-600" : "text-brand-500"}`}
                    strokeWidth={1.8}
                  />
                  <span className="rounded-full bg-white/70 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-ink-muted">
                    {field.useCase}
                  </span>
                </div>
                <p className="mt-2 text-sm font-semibold text-ink">{field.name}</p>
                <p className="mt-0.5 text-[11px] text-ink-muted">
                  Theme block: <span className="font-medium text-ink-secondary">{field.blockName}</span>
                </p>
              </div>

              {isCreated ? (
                <span className="animate-pop inline-flex w-fit items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
                  <Check className="h-3 w-3" strokeWidth={2.5} />
                  Created
                </span>
              ) : allowed ? (
                <span className="inline-flex w-fit items-center rounded-lg bg-ink px-3 py-1.5 text-[11px] font-semibold text-white transition-colors group-hover:bg-brand-700">
                  Create field
                </span>
              ) : (
                <span className="inline-flex w-fit items-center gap-1 rounded-lg border border-slate-300/70 px-3 py-1.5 text-[11px] font-semibold text-ink-muted">
                  <Lock className="h-3 w-3" strokeWidth={2} />
                  Requires Unlimited
                </span>
              )}
            </button>
          );
        })}
      </div>

      <p className="mt-4 text-center text-[11px] text-ink-muted">
        {createdCount} of {FIELDS.length} shown here created &middot; 13 ready-made fields in total, no
        namespace or key to type.
      </p>
    </div>
  );
}
