import { useState } from "react";
import { Layers, Tag, AlignLeft, PenLine, Image as ImageIcon, Link2, Braces, Plus } from "lucide-react";

const BLOCKS = [
  {
    name: "MetaVariant",
    icon: Layers,
    desc: "The flexible, all-in-one block. Pick a render type (Plain Text, HTML, Rich Text, JSON, URL, or Image) to match your metafield's data type.",
  },
  {
    name: "Single Line",
    icon: Tag,
    desc: "Renders text as a styled label: pill, rounded, price-tag, bubble, or wave shapes, with configurable colors, padding, and alignment. Great for a “New” or “Limited Stock” callout.",
  },
  {
    name: "Multiline",
    icon: AlignLeft,
    desc: "Plain multi-line text with whitespace preserved, so line breaks render exactly as typed.",
  },
  {
    name: "Rich Text",
    icon: PenLine,
    desc: "Renders a Rich Text metafield's formatting, including paragraphs, bold and italic text, links, and lists, as real HTML.",
  },
  {
    name: "Image / Video",
    icon: ImageIcon,
    desc: "Renders an image or file-reference metafield with a configurable aspect ratio and max width.",
  },
  {
    name: "URL",
    icon: Link2,
    desc: "Renders a URL metafield as a clickable link.",
  },
  {
    name: "JSON",
    icon: Braces,
    desc: "Renders a JSON metafield formatted and monospaced, handy for debugging or structured data.",
  },
];

export default function BlockAccordion() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="divide-y divide-slate-200 rounded-xl2 border border-slate-200 bg-white">
      {BLOCKS.map((b, i) => {
        const open = openIndex === i;
        const Icon = b.icon;
        return (
          <div key={b.name}>
            <button
              type="button"
              onClick={() => setOpenIndex(open ? -1 : i)}
              aria-expanded={open}
              className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-slate-50"
            >
              <Icon className="h-5 w-5 shrink-0 text-brand-500" strokeWidth={1.8} />
              <span className="flex-1 text-sm font-semibold text-ink">
                MetaVariant &middot; {b.name}
              </span>
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-slate-300 text-ink-muted transition-transform duration-300 ${
                  open ? "rotate-45 border-brand-300 text-brand-600" : ""
                }`}
              >
                <Plus className="h-3 w-3" strokeWidth={2} />
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
