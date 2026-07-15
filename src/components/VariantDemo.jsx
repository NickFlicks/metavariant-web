import { useState } from "react";

const VARIANTS = [
  {
    id: "sand",
    name: "Sand",
    swatch: "#D8CAB8",
    badge: "Bestseller",
    tone: "amber",
    note: "Wipe down with a damp cloth and store away from direct sunlight to protect the canvas coating.",
  },
  {
    id: "black",
    name: "Black",
    swatch: "#20242E",
    badge: "Back in stock",
    tone: "emerald",
    note: "Machine wash cold on a gentle cycle. The water-resistant coating is restored after every wash.",
  },
  {
    id: "moss",
    name: "Moss",
    swatch: "#5B6B4F",
    badge: "3 left, low stock",
    tone: "rose",
    note: "Spot clean only. Keep the moss-dyed canvas panel away from direct heat sources.",
  },
];

const TONE_CLASSES = {
  amber: "bg-amber-50 text-amber-700 border-amber-200",
  emerald: "bg-emerald-50 text-emerald-700 border-emerald-200",
  rose: "bg-rose-50 text-rose-700 border-rose-200",
};

export default function VariantDemo({ className = "" }) {
  const [activeId, setActiveId] = useState(VARIANTS[0].id);
  const active = VARIANTS.find((v) => v.id === activeId) ?? VARIANTS[0];

  return (
    <div
      className={`glass glass-hover w-full max-w-sm rounded-xl2 p-5 text-left ${className}`}
    >
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
          Ridgeline Backpack
        </p>
        <span className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulseDot" />
          Live
        </span>
      </div>

      <div
        className="mt-3 h-28 w-full rounded-lg transition-colors duration-500 sm:h-32"
        style={{ backgroundColor: active.swatch }}
        aria-hidden="true"
      />

      <div className="mt-4 flex items-center gap-3">
        <span className="text-sm font-semibold text-ink">Color</span>
        <div className="flex gap-2">
          {VARIANTS.map((v) => (
            <button
              key={v.id}
              type="button"
              onClick={() => setActiveId(v.id)}
              aria-label={`Switch to ${v.name}`}
              aria-pressed={v.id === activeId}
              className={`h-7 w-7 rounded-full ring-2 ring-offset-2 transition-transform ${
                v.id === activeId
                  ? "scale-110 ring-ink"
                  : "ring-transparent hover:scale-105 hover:ring-slate-300"
              }`}
              style={{ backgroundColor: v.swatch }}
            />
          ))}
        </div>
        <span className="ml-auto text-xs font-medium text-ink-muted">{active.name}</span>
      </div>

      <div
        key={active.id}
        className="mt-4 animate-pop space-y-2.5 rounded-lg border border-dashed border-brand-200 bg-brand-50/50 p-3"
      >
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${TONE_CLASSES[active.tone]}`}
          >
            {active.badge}
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-wide text-brand-600">
            MetaVariant &middot; Single Line
          </span>
        </div>
        <p className="text-xs leading-relaxed text-ink-secondary">{active.note}</p>
        <span className="text-[10px] font-semibold uppercase tracking-wide text-brand-600">
          MetaVariant &middot; Rich Text
        </span>
      </div>

      <p className="mt-3 text-center text-[11px] text-ink-muted">
        No page reload. Try another color.
      </p>
    </div>
  );
}
