import { useState } from "react";

const BLOCKS = [
  {
    name: "MetaVariant",
    icon: "M4 5h16v3H4V5zm0 5h10v3H4v-3zm0 5h16v3H4v-3z",
    desc: "The flexible, all-in-one block. Pick a render type — Plain Text, HTML, Rich Text, JSON, URL, or Image — to match your metafield's data type.",
  },
  {
    name: "Single Line",
    icon: "M5 12h14M5 12a2 2 0 100-4 2 2 0 000 4zM19 12a2 2 0 100 4 2 2 0 000-4z",
    desc: "Renders text as a styled label — pill, rounded, price-tag, bubble, or wave — with configurable colors, padding, and alignment. Great for “New” or “Limited Stock” callouts.",
  },
  {
    name: "Multiline",
    icon: "M4 6h16M4 12h16M4 18h10",
    desc: "Plain multi-line text with whitespace preserved, so line breaks render exactly as typed.",
  },
  {
    name: "Rich Text",
    icon: "M6 4h9a4 4 0 010 8H6V4zm0 8h10a4 4 0 010 8H6v-8z",
    desc: "Renders a Rich Text metafield's formatting — paragraphs, bold/italic, links, lists — as real HTML.",
  },
  {
    name: "Image / Video",
    icon: "M4 5h16v14H4V5zm4 10l3-4 3 3 2-2 4 3H8z",
    desc: "Renders an image or file-reference metafield with a configurable aspect ratio and max width.",
  },
  {
    name: "URL",
    icon: "M10 13a5 5 0 007 0l3-3a5 5 0 00-7-7l-1.5 1.5M14 11a5 5 0 00-7 0l-3 3a5 5 0 007 7l1.5-1.5",
    desc: "Renders a URL metafield as a clickable link.",
  },
  {
    name: "JSON",
    icon: "M8 4a2 2 0 00-2 2v3a2 2 0 01-2 2 2 2 0 012 2v3a2 2 0 002 2M16 4a2 2 0 012 2v3a2 2 0 002 2 2 2 0 00-2 2v3a2 2 0 01-2 2",
    desc: "Renders a JSON metafield formatted and monospaced — handy for debugging or structured data.",
  },
];

export default function BlockAccordion() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="divide-y divide-slate-200 rounded-xl2 border border-slate-200 bg-white">
      {BLOCKS.map((b, i) => {
        const open = openIndex === i;
        return (
          <div key={b.name}>
            <button
              type="button"
              onClick={() => setOpenIndex(open ? -1 : i)}
              aria-expanded={open}
              className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-slate-50"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5 shrink-0 text-brand-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d={b.icon} />
              </svg>
              <span className="flex-1 text-sm font-semibold text-ink">
                MetaVariant &mdash; {b.name}
              </span>
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-slate-300 text-ink-muted transition-transform duration-300 ${
                  open ? "rotate-45 border-brand-300 text-brand-600" : ""
                }`}
              >
                <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M6 1v10M1 6h10" strokeLinecap="round" />
                </svg>
              </span>
            </button>
            <div
              className={`grid transition-all duration-300 ease-out ${
                open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 pl-14 text-sm leading-relaxed text-ink-secondary">
                  {b.desc}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
