export default function CodeBlock({ children, className = "" }) {
  return (
    <pre
      className={`overflow-x-auto rounded-lg bg-ink px-4 py-3 text-[13px] leading-relaxed text-slate-100 ${className}`}
    >
      <code>{children}</code>
    </pre>
  );
}
