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
  Plus,
  Lock,
} from "lucide-react";
import { EASE_OUT } from "../lib/motion.js";

// Matches the real {% schema %} "name" in each block's .liquid file, in
// extensions/variant-metafield-embed/blocks/. One block per Standard Field,
// plus Advanced for anything outside the standard set.
const BLOCKS = [
  {
    name: "Product Label",
    icon: Tag,
    plan: "Free",
    desc: "Shows a short badge for the selected variant, like “New” or “Limited Stock”, from the Product Label field.",
  },
  {
    name: "Variant Description",
    icon: PenLine,
    plan: "Free",
    desc: "Renders the Variant Description field's rich text formatting (paragraphs, bold/italic, links, lists) for the selected variant.",
  },
  {
    name: "Shipping/Stock Alert",
    icon: AlertTriangle,
    plan: "Advanced",
    desc: "Shows a warning badge for the selected variant from the Shipping & Stock Alert field, e.g. “Made to Order, 3 Week Lead Time”. Hidden on variants left blank.",
  },
  {
    name: "Specifications Table",
    icon: ListChecks,
    plan: "Advanced",
    desc: "Turns a “Label: Value” list into a technical spec table on the storefront, one row per line, for things like Weight, Dimensions, or Storage.",
  },
  {
    name: "Image or File",
    icon: ImageIcon,
    plan: "Advanced",
    desc: "Shows an image or file for the selected variant from the Variant Image or File field. The first image renders server-side for a faster Largest Contentful Paint.",
  },
  {
    name: "Link",
    icon: Link2,
    plan: "Advanced",
    desc: "Shows a clickable link for the selected variant, like a size guide or spec sheet, from the Variant Link field.",
  },
  {
    name: "B2B / Case-Pack Pricing",
    icon: PackageSearch,
    plan: "Advanced",
    desc: "Shows a wholesale pricing breakdown for the selected variant: pack size, cost per unit, and the computed total. Set Pack Quantity and Price Per Unit once, and the block hides itself on variants that don't sell by the case.",
  },
  {
    name: "Material Card",
    icon: Palette,
    plan: "Unlimited",
    desc: "An expanded material breakdown: a color or pattern swatch, a close-up texture photo, and descriptive details. Swatch image takes priority over a plain color swatch when both are set.",
  },
  {
    name: "Document & Download",
    icon: FileDown,
    plan: "Unlimited",
    desc: "A download button linking to a file for the selected variant, like a manual or safety certification. Hidden on variants with no file set.",
  },
  {
    name: "Advanced (Custom Field)",
    icon: Settings2,
    plan: "Unlimited",
    desc: "For your own custom variant metafields, outside the 9 dedicated blocks above. Type a namespace, key, and render type yourself.",
  },
];

const PLAN_BADGE_CLASSES = {
  Free: "bg-white/70 text-ink-muted",
  Advanced: "bg-brand-500 text-white",
  Unlimited: "bg-brand-800/90 text-white",
};

export default function BlockAccordion() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="glass divide-y divide-white/40 rounded-xl2">
      {BLOCKS.map((b, i) => {
        const open = openIndex === i;
        const Icon = b.icon;
        return (
          <div key={b.name}>
            <button
              type="button"
              onClick={() => setOpenIndex(open ? -1 : i)}
              aria-expanded={open}
              className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-white/40"
            >
              <Icon className="h-5 w-5 shrink-0 text-brand-500" strokeWidth={1.8} />
              <span className="flex-1 text-sm font-semibold text-ink">{b.name}</span>
              <span
                className={`hidden shrink-0 items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide sm:inline-flex ${PLAN_BADGE_CLASSES[b.plan]}`}
              >
                {b.plan !== "Free" ? <Lock className="h-2.5 w-2.5" strokeWidth={2.5} /> : null}
                {b.plan}
              </span>
              <motion.span
                animate={{ rotate: open ? 45 : 0 }}
                transition={{ duration: 0.3, ease: EASE_OUT }}
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-ink-muted ${
                  open ? "border-brand-300 text-brand-600" : "border-slate-300"
                }`}
              >
                <Plus className="h-3 w-3" strokeWidth={2} />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {open ? (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: EASE_OUT }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-5 pl-14 text-sm leading-relaxed text-ink-secondary">
                    {b.desc}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
