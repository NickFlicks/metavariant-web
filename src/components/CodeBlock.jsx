import { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function CodeBlock({ children, className = "" }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const text = typeof children === "string" ? children : String(children ?? "");
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        throw new Error("Clipboard API unavailable");
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard access can be blocked in some browser contexts. That's fine, the
      // code is still fully selectable and copyable by hand.
    }
  };

  return (
    <div className={`group relative ${className}`}>
      <pre className="overflow-x-auto rounded-lg bg-ink px-4 py-3 pr-16 text-[13px] leading-relaxed text-slate-100">
        <code>{children}</code>
      </pre>
      <button
        type="button"
        onClick={handleCopy}
        className={`absolute right-2.5 top-2.5 inline-flex h-7 items-center gap-1.5 rounded-md border px-2.5 text-[11px] font-semibold transition-colors ${
          copied
            ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-300"
            : "border-white/10 bg-white/5 text-slate-300 opacity-0 hover:bg-white/10 hover:text-white group-hover:opacity-100 focus-visible:opacity-100"
        }`}
      >
        {copied ? <Check className="h-3.5 w-3.5" strokeWidth={2.5} /> : <Copy className="h-3.5 w-3.5" strokeWidth={2} />}
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}
