import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Tag,
  PenLine,
  ImageIcon,
  Link2,
  AlertTriangle,
  PackageSearch,
  ListChecks,
  Palette,
  FileDown,
  Check,
  Lock,
} from "lucide-react";
import { staggerContainer, staggerItem, EASE_OUT } from "../lib/motion.js";

const TIER_RANK = { free: 0, advanced: 1, unlimited: 2 };
const TIER_LABEL = { free: "Free", advanced: "Advanced", unlimited: "Unlimited" };

const FIELDS = [
  {
    key: "product_label",
    name: "Product Label",
    icon: Tag,
    blockName: "Product Label",
    useCase: "Eye-catching badge",
    minTier: "free",
  },
  {
    key: "variant_description",
    name: "Variant Description",
    icon: PenLine,
    blockName: "Variant Description",
    useCase: "Rich text story",
    minTier: "free",
  },
  {
    key: "shipping_alert",
    name: "Shipping & Stock Alert",
    icon: AlertTriangle,
    blockName: "Shipping / Stock Alert",
    useCase: "Heads-up banner",
    minTier: "advanced",
  },
  {
    key: "variant_image",
    name: "Variant Image or File",
    icon: ImageIcon,
    blockName: "Image or File",
    useCase: "Photo or file link",
    minTier: "advanced",
  },
  {
    key: "variant_link",
    name: "Variant Link",
    icon: Link2,
    blockName: "Link",
    useCase: "Clickable link",
    minTier: "advanced",
  },
  {
    key: "case_pack",
    name: "Pack Quantity + Price Per Unit",
    icon: PackageSearch,
    blockName: "B2B / Case-Pack Pricing",
    useCase: "Wholesale pricing",
    minTier: "advanced",
  },
  {
    key: "variant_specs",
    name: "Variant Specifications",
    icon: ListChecks,
    blockName: "Specifications Table",
    useCase: "Spec comparison table",
    minTier: "advanced",
  },
  {
    key: "material",
    name: "Material Color + Details",
    icon: Palette,
    blockName: "Material Card",
    useCase: "Material & swatch card",
    minTier: "unlimited",
  },
  {
    key: "document_file",
    name: "Download File",
    icon: FileDown,
    blockName: "Document & Download",
    useCase: "Downloadable document",
    minTier: "unlimited",
  },
];

export default function StandardFieldsDemo({ className = "" }) {
  const [plan, setPlan] = useState("free");
  const [created, setCreated] = useState(() => new Set());

  const isAllowed = (field) => TIER_RANK[plan] >= TIER_RANK[field.minTier];
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
        <div className="relative inline-flex items-center rounded-full border border-white/60 bg-white/50 p-0.5 text-xs font-semibold backdrop-blur">
          {["free", "advanced", "unlimited"].map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPlan(p)}
              className={`relative rounded-full px-3 py-1.5 transition-colors ${
                plan === p ? "text-white" : "text-ink-muted"
              }`}
            >
              {plan === p ? (
                <motion.span
                  layoutId="standard-fields-plan-pill"
                  className="absolute inset-0 rounded-full bg-ink shadow-soft"
                  transition={{ duration: 0.3, ease: EASE_OUT }}
                />
              ) : null}
              <span className="relative">{TIER_LABEL[p]}</span>
            </button>
          ))}
        </div>
      </div>

      <motion.div
        key={plan}
        className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        variants={staggerContainer(0.05)}
        initial="hidden"
        animate="visible"
      >
        {FIELDS.map((field) => {
          const Icon = field.icon;
          const allowed = isAllowed(field);
          const isCreated = created.has(field.key);
          return (
            <motion.button
              key={field.key}
              type="button"
              onClick={() => toggle(field)}
              disabled={!allowed || isCreated}
              layout
              variants={staggerItem}
              whileHover={allowed && !isCreated ? { y: -3 } : undefined}
              whileTap={allowed && !isCreated ? { scale: 0.98 } : undefined}
              transition={{ duration: 0.25, ease: EASE_OUT }}
              className={`group flex flex-col justify-between gap-3 rounded-xl border p-4 text-left transition-colors duration-300 ${
                isCreated
                  ? "border-emerald-200 bg-emerald-50/70"
                  : allowed
                    ? "border-white/60 bg-white/60 hover:border-brand-200 hover:bg-white/80"
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

              <AnimatePresence mode="wait" initial={false}>
                {isCreated ? (
                  <motion.span
                    key="created"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, ease: EASE_OUT }}
                    className="inline-flex w-fit items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-semibold text-emerald-700"
                  >
                    <Check className="h-3 w-3" strokeWidth={2.5} />
                    Created
                  </motion.span>
                ) : allowed ? (
                  <motion.span
                    key="create"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="inline-flex w-fit items-center rounded-lg bg-ink px-3 py-1.5 text-[11px] font-semibold text-white transition-colors group-hover:bg-brand-700"
                  >
                    Create field
                  </motion.span>
                ) : (
                  <motion.span
                    key="locked"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="inline-flex w-fit items-center gap-1 rounded-lg border border-slate-300/70 px-3 py-1.5 text-[11px] font-semibold text-ink-muted"
                  >
                    <Lock className="h-3 w-3" strokeWidth={2} />
                    Requires {TIER_LABEL[field.minTier]}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </motion.div>

      <p className="mt-4 text-center text-[11px] text-ink-muted">
        {createdCount} of {FIELDS.length} created &middot; 13 ready-made fields across these 9
        dedicated blocks, no namespace or key to type.
      </p>
    </div>
  );
}
