import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, LayoutTemplate, Shapes } from "lucide-react";
import { popVariant, EASE_OUT } from "../lib/motion.js";

const FEATURES = [
  {
    id: "instant",
    title: "Instant updates",
    teaser: "No full page reload",
    icon: Zap,
    body: "Metafield values refresh the moment a shopper picks a new variant. Most themes fire a variant-change event automatically. If yours doesn't, MetaVariant falls back to a short polling window.",
  },
  {
    id: "placement",
    title: "Flexible placement",
    teaser: "Blocks or shortcodes",
    icon: LayoutTemplate,
    body: "Drop a theme editor block wherever your content already lives, or paste a shortcode like [variant_metafield] directly into freeform text such as a product description.",
  },
  {
    id: "types",
    title: "Rich metafield types",
    teaser: "Text, media, JSON & more",
    icon: Shapes,
    body: "Single line text, rich text, multi-line, image/video, URL, and JSON: every block maps cleanly to the variant a customer currently has selected.",
  },
];

function InstantPreview() {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <div className="flex items-center gap-1.5 border-b border-slate-100 pb-3">
        <span className="h-2.5 w-2.5 rounded-full bg-rose-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
        <span className="ml-3 truncate rounded bg-slate-100 px-2 py-1 text-[11px] text-ink-muted">
          yourstore.com/products/backpack
        </span>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <span className="text-xs font-medium text-ink-secondary">Variant changed</span>
        <span className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulseDot" />
          Content updated &middot; 0 reloads
        </span>
      </div>
    </div>
  );
}

function PlacementPreview() {
  const [mode, setMode] = useState("block");
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <div className="inline-flex rounded-full border border-slate-200 bg-slate-50 p-0.5 text-xs font-semibold">
        {["block", "shortcode"].map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={`rounded-full px-3 py-1 transition-colors ${
              mode === m ? "bg-white text-ink shadow-soft" : "text-ink-muted"
            }`}
          >
            {m === "block" ? "Theme block" : "Shortcode"}
          </button>
        ))}
      </div>
      <div className="mt-3">
        {mode === "block" ? (
          <div className="flex items-center gap-2 rounded-md border border-dashed border-brand-200 bg-brand-50/50 px-3 py-2 text-xs text-brand-700">
            <span className="rounded bg-brand-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
              +
            </span>
            Add block &rarr; MetaVariant Rich Text
          </div>
        ) : (
          <code className="block rounded-md bg-ink px-3 py-2 text-[11px] text-slate-100">
            [variant_metafield namespace="custom" key="care_notes"]
          </code>
        )}
      </div>
    </div>
  );
}

function TypesPreview() {
  const types = ["Single line", "Rich text", "Multiline", "Image/Video", "URL", "JSON"];
  return (
    <div className="flex flex-wrap gap-2 rounded-lg border border-slate-200 bg-white p-4">
      {types.map((t) => (
        <span
          key={t}
          className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-ink-secondary"
        >
          {t}
        </span>
      ))}
    </div>
  );
}

const PREVIEWS = {
  instant: InstantPreview,
  placement: PlacementPreview,
  types: TypesPreview,
};

export default function FeatureShowcase() {
  const [activeId, setActiveId] = useState(FEATURES[0].id);
  const active = FEATURES.find((f) => f.id === activeId) ?? FEATURES[0];
  const ActivePreview = PREVIEWS[active.id];

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,280px)_1fr]">
      <div className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
        {FEATURES.map((f) => {
          const Icon = f.icon;
          const isActive = activeId === f.id;
          return (
            <motion.button
              key={f.id}
              type="button"
              onClick={() => setActiveId(f.id)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: EASE_OUT }}
              className={`flex shrink-0 items-start gap-3 rounded-xl2 border p-4 text-left transition-colors ${
                isActive
                  ? "border-brand-300 bg-brand-50/70 shadow-soft"
                  : "border-slate-200 bg-white hover:border-slate-300"
              }`}
            >
              <Icon
                className={`mt-0.5 h-5 w-5 shrink-0 ${isActive ? "text-brand-600" : "text-ink-muted"}`}
                strokeWidth={1.8}
              />
              <span>
                <p className={`text-sm font-semibold ${isActive ? "text-brand-700" : "text-ink"}`}>
                  {f.title}
                </p>
                <p className="mt-1 text-xs text-ink-muted">{f.teaser}</p>
              </span>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          variants={popVariant}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="glass rounded-xl2 p-6"
        >
          <h3 className="text-lg font-semibold text-ink">{active.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-secondary">{active.body}</p>
          <div className="mt-5">
            <ActivePreview />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
