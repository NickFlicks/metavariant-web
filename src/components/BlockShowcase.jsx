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
  Settings2,
  Lock,
  Zap,
  FileText,
} from "lucide-react";
import { EASE_OUT, popVariant } from "../lib/motion.js";

const BLOCKS = [
  {
    id: "label",
    name: "Product Label",
    icon: Tag,
    plan: "All plans",
    render: () => (
      <div className="relative flex h-full items-end rounded-lg bg-gradient-to-br from-brand-100 to-brand-200 p-3">
        <span className="rounded-full bg-ink px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
          Bestseller
        </span>
      </div>
    ),
  },
  {
    id: "description",
    name: "Variant Description",
    icon: PenLine,
    plan: "All plans",
    render: () => (
      <div className="space-y-1.5 text-xs leading-relaxed text-ink-secondary">
        <p>
          <strong className="text-ink">80% Merino Wool, 20% Nylon.</strong> Hand wash cold, lay
          flat to dry.
        </p>
        <ul className="list-disc space-y-0.5 pl-4">
          <li>Machine washable coating</li>
          <li>Store away from direct heat</li>
        </ul>
      </div>
    ),
  },
  {
    id: "image",
    name: "Image or File",
    icon: ImageIcon,
    plan: "Unlimited",
    render: () => (
      <div className="relative h-full overflow-hidden rounded-lg bg-gradient-to-br from-slate-700 to-ink">
        <span className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-full bg-emerald-400/20 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">
          <Zap className="h-2.5 w-2.5" strokeWidth={2.5} />
          Server-rendered
        </span>
        <span className="absolute bottom-2 left-2 text-[10px] font-medium text-white/70">
          Cached, no lazy-load delay
        </span>
      </div>
    ),
  },
  {
    id: "link",
    name: "Link",
    icon: Link2,
    plan: "Unlimited",
    render: () => (
      <div className="flex h-full items-center justify-center">
        <span className="inline-flex items-center gap-1.5 rounded-lg border border-brand-200 bg-white px-3 py-2 text-xs font-semibold text-brand-700">
          <FileText className="h-3.5 w-3.5" strokeWidth={1.8} />
          Size Guide (PDF)
        </span>
      </div>
    ),
  },
  {
    id: "shipping",
    name: "Shipping/Stock Alert",
    icon: AlertTriangle,
    plan: "All plans",
    render: () => (
      <div className="flex h-full items-center justify-center">
        <span className="inline-flex items-center gap-1.5 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-800">
          <AlertTriangle className="h-3.5 w-3.5" strokeWidth={1.8} />
          Made to order, 3 week lead time
        </span>
      </div>
    ),
  },
  {
    id: "b2b",
    name: "B2B / Case-Pack Pricing",
    icon: PackageSearch,
    plan: "Unlimited",
    render: () => (
      <div className="space-y-1 rounded-lg border border-slate-200 bg-white p-3 text-xs">
        <div className="flex justify-between text-ink-secondary">
          <span>Case of 24</span>
          <span className="font-semibold text-ink">$4.99 / unit</span>
        </div>
        <div className="flex justify-between border-t border-dashed border-slate-200 pt-1 font-semibold text-ink">
          <span>Case total</span>
          <span>$119.76</span>
        </div>
      </div>
    ),
  },
  {
    id: "specs",
    name: "Specifications Table",
    icon: ListChecks,
    plan: "Unlimited",
    render: () => (
      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white text-[11px]">
        {[
          ["Weight", "1.2 kg"],
          ["Capacity", "28 L"],
          ["Material", "Recycled canvas"],
        ].map(([label, val], i) => (
          <div
            key={label}
            className={`flex justify-between px-3 py-1.5 ${i > 0 ? "border-t border-slate-100" : ""}`}
          >
            <span className="text-ink-muted">{label}</span>
            <span className="font-medium text-ink">{val}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "material",
    name: "Material Card",
    icon: Palette,
    plan: "Unlimited",
    render: () => (
      <div className="flex h-full items-center gap-3 rounded-lg border border-slate-200 bg-white p-3">
        <span className="h-8 w-8 shrink-0 rounded-full border border-slate-200" style={{ backgroundColor: "#5B6B4F" }} />
        <div className="min-w-0">
          <p className="truncate text-xs font-semibold text-ink">Moss canvas</p>
          <p className="truncate text-[10px] text-ink-muted">Water-resistant, spot clean only</p>
        </div>
      </div>
    ),
  },
  {
    id: "document",
    name: "Document & Download",
    icon: FileDown,
    plan: "Unlimited",
    render: () => (
      <div className="flex h-full items-center justify-center">
        <span className="inline-flex items-center gap-1.5 rounded-lg bg-ink px-3 py-2 text-xs font-semibold text-white">
          <FileDown className="h-3.5 w-3.5" strokeWidth={1.8} />
          Download care guide
        </span>
      </div>
    ),
  },
  {
    id: "advanced",
    name: "Advanced (Custom Field)",
    icon: Settings2,
    plan: "All plans",
    render: () => (
      <div className="space-y-1.5 rounded-lg border border-dashed border-slate-300 bg-white p-3 text-[11px]">
        <div className="flex justify-between">
          <span className="text-ink-muted">Namespace</span>
          <span className="font-mono text-ink">custom</span>
        </div>
        <div className="flex justify-between">
          <span className="text-ink-muted">Key</span>
          <span className="font-mono text-ink">warranty_years</span>
        </div>
        <div className="flex justify-between">
          <span className="text-ink-muted">Render type</span>
          <span className="font-mono text-ink">Plain Text</span>
        </div>
      </div>
    ),
  },
];

export default function BlockShowcase({ className = "" }) {
  const [activeId, setActiveId] = useState(BLOCKS[0].id);
  const active = BLOCKS.find((b) => b.id === activeId) ?? BLOCKS[0];

  return (
    <div className={`glass glass-hover rounded-xl2 p-5 sm:p-6 ${className}`}>
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
          Ridgeline Backpack &middot; Black
        </p>
        <span className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulseDot" />
          Live preview
        </span>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,190px)_1fr]">
        <div className="relative flex gap-1.5 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
          {BLOCKS.map((b) => {
            const Icon = b.icon;
            const isActive = activeId === b.id;
            return (
              <button
                key={b.id}
                type="button"
                onClick={() => setActiveId(b.id)}
                className="relative flex shrink-0 items-center gap-2 rounded-lg px-2.5 py-2 text-left text-xs"
              >
                {isActive ? (
                  <motion.span
                    layoutId="block-showcase-active"
                    className="absolute inset-0 rounded-lg bg-brand-50/80 ring-1 ring-inset ring-brand-200"
                    transition={{ duration: 0.3, ease: EASE_OUT }}
                  />
                ) : null}
                <Icon
                  className={`relative h-3.5 w-3.5 shrink-0 ${isActive ? "text-brand-600" : "text-ink-muted"}`}
                  strokeWidth={1.8}
                />
                <span className={`relative truncate font-medium ${isActive ? "text-brand-700" : "text-ink-secondary"}`}>
                  {b.name}
                </span>
                {b.plan === "Unlimited" ? (
                  <Lock className="relative ml-auto h-3 w-3 shrink-0 text-ink-muted" strokeWidth={2} />
                ) : null}
              </button>
            );
          })}
        </div>

        <div>
          <div className="h-28 rounded-lg border border-white/60 bg-white/50 p-2 sm:h-32">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                variants={popVariant}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="h-full"
              >
                {active.render()}
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <p className="text-[11px] font-medium text-ink-muted">{active.name}</p>
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                active.plan === "Unlimited" ? "bg-brand-800 text-white" : "bg-slate-100 text-ink-muted"
              }`}
            >
              {active.plan}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
