import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EASE_OUT } from "../lib/motion.js";

/**
 * Minimal hand-rolled syntax highlighter. No external highlighting library is
 * installed, so each snippet gets its own small rule set instead of pulling
 * in a generic language grammar. Rules are tried in order at every position;
 * the first one that matches wins, so more specific patterns (e.g. a JSON
 * key, which is a string followed by a colon) are listed before the generic
 * fallback (any string).
 */
function tokenize(code, rules) {
  const combined = new RegExp(rules.map(([re]) => `(${re.source})`).join("|"), "g");
  const tokens = [];
  let lastIndex = 0;
  let match;

  while ((match = combined.exec(code)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({ text: code.slice(lastIndex, match.index), cls: "" });
    }
    const groupIndex = match.slice(1).findIndex((g) => g !== undefined);
    tokens.push({ text: match[0], cls: rules[groupIndex][1] });
    lastIndex = combined.lastIndex;
    if (match[0] === "") combined.lastIndex += 1;
  }
  if (lastIndex < code.length) {
    tokens.push({ text: code.slice(lastIndex), cls: "" });
  }
  return tokens;
}

const TOK = {
  tag: "text-brand-200",
  attr: "text-amber-300",
  string: "text-emerald-300",
  key: "text-brand-300",
  literal: "text-rose-300",
  number: "text-amber-300",
  punct: "text-night-muted",
  method: "text-brand-200 font-semibold",
  comment: "text-night-muted/70 italic",
};

const RULE_SETS = {
  shortcode: [
    [/\[|\]/g, TOK.punct],
    [/variant_metafield/g, TOK.tag],
    [/\b(namespace|key)\b/g, TOK.attr],
    [/=/g, TOK.punct],
    [/"[^"]*"/g, TOK.string],
  ],
  liquid: [
    [/\{%-?|-?%\}/g, TOK.punct],
    [/\b(render|schema|block|type)\b/g, TOK.tag],
    [/'[^']*'/g, TOK.string],
    [/,/g, TOK.punct],
  ],
  json: [
    [/"[^"]*"(?=\s*:)/g, TOK.key],
    [/"[^"]*"/g, TOK.string],
    [/\b(true|false|null)\b/g, TOK.literal],
    [/-?\b\d+(\.\d+)?\b/g, TOK.number],
    [/[{}[\],:]/g, TOK.punct],
  ],
  http: [
    [/^(GET|POST)\b/g, TOK.method],
    [/\b(variantId|shop|identifiers)\b/g, TOK.attr],
    [/[=&?]/g, TOK.punct],
    [/\/[a-z0-9-]+/gi, TOK.punct],
  ],
};

function Highlighted({ code, lang }) {
  const tokens = tokenize(code, RULE_SETS[lang] ?? []);
  return (
    <>
      {tokens.map((t, i) => (
        <span key={i} className={t.cls}>
          {t.text}
        </span>
      ))}
    </>
  );
}

/**
 * Tabbed, syntax-highlighted code preview for the dark landing page.
 * `tabs`: [{ label, lang, code }]
 */
export default function DevCodeBlock({ tabs, className = "" }) {
  const [active, setActive] = useState(0);
  const tab = tabs[active];

  return (
    <div className={`overflow-hidden rounded-xl2 border border-night-border bg-night-900/80 shadow-glassDark ${className}`}>
      <div className="flex items-center gap-1 border-b border-night-border bg-night-950/60 px-2 pt-2">
        <div className="mb-2 ml-1 flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-300/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
        </div>
        <div className="ml-3 flex gap-1">
          {tabs.map((t, i) => (
            <button
              key={t.label}
              type="button"
              onClick={() => setActive(i)}
              className={`relative rounded-t-md px-3 pb-2 text-xs font-medium transition-colors ${
                active === i ? "text-night-text" : "text-night-muted hover:text-night-secondary"
              }`}
            >
              {active === i ? (
                <motion.span
                  layoutId="devcodeblock-active-tab"
                  className="absolute inset-x-1 bottom-0 h-[2px] rounded-full bg-brand-300"
                  transition={{ duration: 0.25, ease: EASE_OUT }}
                />
              ) : null}
              <span className="relative">{t.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.pre
            key={tab.label}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18, ease: EASE_OUT }}
            className="overflow-x-auto px-5 py-4 text-[13px] leading-relaxed text-night-secondary"
          >
            <code>
              <Highlighted code={tab.code} lang={tab.lang} />
            </code>
          </motion.pre>
        </AnimatePresence>
      </div>
    </div>
  );
}
