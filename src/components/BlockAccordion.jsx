import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Layers,
  Tag,
  AlignLeft,
  PenLine,
  Image as ImageIcon,
  Link2,
  Braces,
  Plus,
  PackageSearch,
  ListChecks,
  Palette,
  FileDown,
  Lock,
} from "lucide-react";
import { EASE_OUT } from "../lib/motion.js";

const BLOCKS = [
  {
    name: "MetaVariant",
    icon: Layers,
    plan: "All plans",
    desc: "The flexible, all-in-one block. Pick a render type (Plain Text, HTML, Rich Text, JSON, URL, or Image) to match your metafield's data type.",
  },
  {
    name: "Single Line",
    icon: Tag,
    plan: "All plans",
    desc: "Renders text as a styled label: pill, rounded, price-tag, bubble, or wave shapes, with configurable colors, padding, and alignment. Great for a “New” or “Limited Stock” callout.",
  },
  {
    name: "Multiline",
    icon: AlignLeft,
    plan: "All plans",
    desc: "Plain multi-line text with whitespace preserved, so line breaks render exactly as typed.",
  },
  {
    name: "Rich Text",
    icon: PenLine,
    plan: "All plans",
    desc: "Renders a Rich Text metafield's formatting, including paragraphs, bold and italic text, links, and lists, as real HTML.",
  },
  {
    name: "Image / Video",
    icon: ImageIcon,
    plan: "All plans",
    desc: "Renders an image or file-reference metafield with a configurable aspect ratio and max width.",
  },
  {
    name: "URL",
    icon: Link2,
    plan: "All plans",
    desc: "Renders a URL metafield as a clickable link.",
  },
  {
    name: "JSON",
    icon: Braces,
    plan: "All plans",
    desc: "Renders a JSON metafield formatted and monospaced, handy for debugging or structured data.",
  },
  {
    name: "B2B / Case-Pack Pricing",
    icon: PackageSearch,
    plan: "Unlimited",
    desc: "Shows a wholesale pricing breakdown for the selected variant: pack size, cost per unit, and the computed total. Set Pack Quantity and Price Per Unit once, and the block hides itself on variants that don't sell by the case.",
  },
  {
    name: "Specifications Table",
    icon: ListChecks,
    plan: "Unlimited",
    desc: "Turns a “Label: Value” list into a technical spec table on the storefront, one row per line, for things like Weight, Dimensions, or Storage.",
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
];

export default function BlockAccordion() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="glass divide-y divide-white/40 rounded-xl2">
      {BLOCKS.map((b, i) => {
        const open = openIndex === i;
        const Icon = b.icon;
        const isUnlimited = b.plan === "Unlimited";
        return (
          <div key={b.name}>
            <button
              type="button"
              onClick={() => setOpenIndex(open ? -1 : i)}
              aria-expanded={open}
              className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-white/40"
            >
              <Icon className="h-5 w-5 shrink-0 text-brand-500" strokeWidth={1.8} />
              <span className="flex-1 text-sm font-semibold text-ink">
                MetaVariant &middot; {b.name}
              </span>
              {isUnlimited ? (
                <span className="hidden shrink-0 items-center gap-1 rounded-full bg-brand-800/90 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white sm:inline-flex">
                  <Lock className="h-2.5 w-2.5" strokeWidth={2.5} />
                  Unlimited
                </span>
              ) : (
                <span className="hidden shrink-0 rounded-full bg-white/70 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-ink-muted sm:inline-flex">
                  All plans
                </span>
              )}
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
