import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EASE_OUT } from "../lib/motion.js";

/**
 * Minimal hand-rolled syntax highlighter. No external highlighting library is
 * installed, so each snippet gets its own small rule set instead of pulling
 * in a generic language grammar. Each rule is tried, in order, anchored at
 * the current position via the sticky flag; the first one that matches wins.
 * This is a real lexer loop rather than one combined regex with numbered
 * capture groups, so a rule's own internal parentheses (like the optional
 * decimal in a number pattern) can't throw off the bookkeeping.
 */
function tokenize(code, rules) {
  const stickyRules = rules.map(([re, cls]) => [
    new RegExp(re.source, re.flags.replace(/[gy]/g, "") + "y"),
    cls,
  ]);
  const tokens = [];
  let i = 0;

  while (i < code.length) {
    let matched = false;
    for (const [re, cls] of stickyRules) {
      re.lastIndex = i;
      const m = re.exec(code);
      if (m && m[0].length > 0) {
        tokens.push({ text: m[0], cls });
        i += m[0].length;
        matched = true;
        break;
      }
    }
    if (!matched) {
      const last = tokens[tokens.length - 1];
      if (last && last.cls === "") {
        last.text += code[i];
      } else {
        tokens.push({ text: code[i], cls: "" });
      }
      i += 1;
    }
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
