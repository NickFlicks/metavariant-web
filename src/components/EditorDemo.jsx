import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Loader2,
  UploadCloud,
  Bold,
  Italic,
  Link2,
  List,
  HelpCircle,
} from "lucide-react";
import { popVariant, staggerContainer, staggerItem, EASE_OUT } from "../lib/motion.js";

const TABS = [
  { id: "upload", label: "File picker" },
  { id: "richtext", label: "Rich text editor" },
  { id: "tooltip", label: "Inline tooltips" },
];

const MOCK_FILES = [
  { id: "f1", name: "ridgeline-black-swatch.jpg", color: "#20242E" },
  { id: "f2", name: "ridgeline-care-card.pdf", color: "#4D777B" },
  { id: "f3", name: "ridgeline-moss-texture.jpg", color: "#5B6B4F" },
];

function UploadTab() {
  const [status, setStatus] = useState("idle");
  const [selected, setSelected] = useState(null);

  function runSearch() {
    setStatus("loading");
    setSelected(null);
    setTimeout(() => setStatus("results"), 700);
  }

  return (
    <div className="rounded-lg border border-white/60 bg-white/60 p-4">
      <div className="flex items-center gap-2">
        <div className="flex flex-1 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2">
          <Search className="h-3.5 w-3.5 text-ink-muted" strokeWidth={1.8} />
          <span className="text-xs text-ink-muted">Search your Shopify Files&hellip;</span>
        </div>
        <motion.button
          type="button"
          onClick={runSearch}
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.96 }}
          className="shrink-0 rounded-lg bg-ink px-3 py-2 text-[11px] font-semibold text-white transition-colors hover:bg-brand-700"
        >
          Search
        </motion.button>
      </div>

      <div className="mt-3 min-h-[92px]">
        <AnimatePresence mode="wait">
          {status === "idle" && (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex h-[92px] items-center justify-center rounded-lg border border-dashed border-slate-300 text-[11px] text-ink-muted"
            >
              Search, or upload a brand-new file directly.
            </motion.div>
          )}
          {status === "loading" && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex h-[92px] items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white text-[11px] text-ink-muted"
            >
              <Loader2 className="h-3.5 w-3.5 animate-spin text-brand-500" strokeWidth={2} />
              Loading files from your store&hellip;
            </motion.div>
          )}
          {status === "results" && (
            <motion.div
              key="results"
              variants={staggerContainer(0.06)}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-3 gap-2"
            >
              {MOCK_FILES.map((f) => (
                <motion.button
                  key={f.id}
                  type="button"
                  onClick={() => setSelected(f.id)}
                  variants={staggerItem}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  className={`rounded-lg border p-2 text-left transition-colors ${
                    selected === f.id
                      ? "border-brand-400 bg-brand-50/70 ring-2 ring-brand-300"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <div
                    className="h-10 w-full rounded"
                    style={{ backgroundColor: f.color }}
                    aria-hidden="true"
                  />
                  <p className="mt-1.5 truncate text-[10px] text-ink-muted">{f.name}</p>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.button
        type="button"
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.98 }}
        className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-brand-200 bg-brand-50/40 px-3 py-2 text-[11px] font-semibold text-brand-700 transition-colors hover:bg-brand-50"
      >
        <UploadCloud className="h-3.5 w-3.5" strokeWidth={1.8} />
        Upload new file
      </motion.button>
    </div>
  );
}

function RichTextTab() {
  const [marks, setMarks] = useState(new Set(["bold"]));

  function toggle(mark) {
    setMarks((prev) => {
      const next = new Set(prev);
      next.has(mark) ? next.delete(mark) : next.add(mark);
      return next;
    });
  }

  const TOOLS = [
    { id: "bold", icon: Bold },
    { id: "italic", icon: Italic },
    { id: "link", icon: Link2 },
    { id: "list", icon: List },
  ];

  return (
    <div className="rounded-lg border border-white/60 bg-white/60 p-4">
      <div className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white p-1">
        {TOOLS.map((t) => {
          const Icon = t.icon;
          const active = marks.has(t.id);
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => toggle(t.id)}
              aria-pressed={active}
              className="relative flex h-7 w-7 items-center justify-center rounded-md text-ink-muted transition-colors hover:bg-slate-100"
            >
              {active ? (
                <motion.span
                  layoutId="richtext-active-tool"
                  className="absolute inset-0 rounded-md bg-brand-100"
                  transition={{ duration: 0.25, ease: EASE_OUT }}
                />
              ) : null}
              <Icon
                className={`relative h-3.5 w-3.5 ${active ? "text-brand-700" : ""}`}
                strokeWidth={2}
              />
            </button>
          );
        })}
      </div>
      <div className="mt-3 rounded-lg border border-slate-200 bg-white p-3 text-xs leading-relaxed text-ink-secondary">
        <motion.span
          animate={{ fontWeight: marks.has("bold") ? 700 : 400 }}
          className={marks.has("bold") ? "text-ink" : ""}
        >
          80% Merino Wool, 20% Nylon.
        </motion.span>{" "}
        <span className={marks.has("italic") ? "italic" : ""}>Hand wash cold, lay flat to dry.</span>{" "}
        {marks.has("link") ? (
          <span className="text-brand-600 underline underline-offset-2">Full care guide</span>
        ) : (
          "Full care guide."
        )}
        <AnimatePresence>
          {marks.has("list") ? (
            <motion.ul
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: EASE_OUT }}
              className="list-disc space-y-0.5 overflow-hidden pl-4"
            >
              <li className="pt-1.5">Machine washable coating</li>
              <li>Store away from direct heat</li>
            </motion.ul>
          ) : null}
        </AnimatePresence>
      </div>
      <p className="mt-2 text-[11px] text-ink-muted">
        Editing existing content prefills the same formatting automatically.
      </p>
    </div>
  );
}

function TooltipTab() {
  const [openId, setOpenId] = useState(null);
  const FIELDS = [
    { id: "namespace", label: "Namespace", copy: "A grouping label so your fields never collide with another app's. MetaVariant fills this in for you." },
    { id: "key", label: "Key", copy: "The exact identifier a theme block looks up. Ready-made fields set this automatically." },
    { id: "type", label: "Type", copy: "What kind of content this field holds: text, rich text, a file, a number, and so on." },
  ];

  return (
    <div className="rounded-lg border border-white/60 bg-white/60 p-4">
      <div className="grid gap-2 sm:grid-cols-3">
        {FIELDS.map((f) => (
          <div key={f.id} className="relative rounded-lg border border-slate-200 bg-white p-3">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-ink">{f.label}</span>
              <button
                type="button"
                aria-label={`What is ${f.label}?`}
                onMouseEnter={() => setOpenId(f.id)}
                onMouseLeave={() => setOpenId((v) => (v === f.id ? null : v))}
                onClick={() => setOpenId((v) => (v === f.id ? null : f.id))}
                className="flex h-4 w-4 items-center justify-center rounded-full border border-slate-300 text-ink-muted transition-colors hover:border-brand-400 hover:text-brand-600"
              >
                <HelpCircle className="h-3 w-3" strokeWidth={2} />
              </button>
            </div>
            <AnimatePresence initial={false}>
              {openId === f.id ? (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25, ease: EASE_OUT }}
                  className="overflow-hidden"
                >
                  <p className="mt-2 rounded-md bg-brand-50/70 p-2 text-[11px] leading-relaxed text-brand-800">
                    {f.copy}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        ))}
      </div>
      <p className="mt-3 text-[11px] text-ink-muted">Hover or tap the “?” next to any field.</p>
    </div>
  );
}

const PANELS = { upload: UploadTab, richtext: RichTextTab, tooltip: TooltipTab };

export default function EditorDemo({ className = "" }) {
  const [activeId, setActiveId] = useState(TABS[0].id);
  const Active = PANELS[activeId];

  return (
    <div className={`glass glass-hover rounded-xl2 p-5 sm:p-6 ${className}`}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
          Add Content &middot; variant editor
        </p>
        <div className="relative inline-flex flex-wrap gap-1 rounded-full border border-white/60 bg-white/50 p-0.5 text-xs font-semibold backdrop-blur">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveId(t.id)}
              className={`relative rounded-full px-3 py-1.5 transition-colors ${
                activeId === t.id ? "text-white" : "text-ink-muted"
              }`}
            >
              {activeId === t.id ? (
                <motion.span
                  layoutId="editor-demo-active-tab"
                  className="absolute inset-0 rounded-full bg-ink shadow-soft"
                  transition={{ duration: 0.3, ease: EASE_OUT }}
                />
              ) : null}
              <span className="relative">{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeId}
          variants={popVariant}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="mt-4"
        >
          <Active />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
