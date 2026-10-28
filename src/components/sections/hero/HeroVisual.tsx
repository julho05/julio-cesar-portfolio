import type { Dictionary } from "@/i18n/dictionaries";
import { cn } from "@/lib/cn";

type TokenKind = "kw" | "type" | "fn" | "str" | "num" | "cm" | "p" | "t";
type Line = Array<[TokenKind, string]>;

const tokenColor: Record<TokenKind, string> = {
  kw: "text-[var(--code-keyword)]",
  type: "text-[var(--code-type)]",
  fn: "text-[var(--code-fn)]",
  str: "text-[var(--code-string)]",
  num: "text-[var(--code-number)]",
  cm: "text-[var(--code-comment)] italic",
  p: "text-[var(--code-punct)]",
  t: "text-slate-200",
};

/** TypeScript válido: agrega vendas por região (equivalente ao GROUP BY do card SQL). */
function tsLines(comment: string): Line[] {
  return [
    [["kw", "type "], ["type", "Sale"], ["p", " = { "], ["t", "region"], ["p", ": "], ["type", "string"], ["p", "; "], ["t", "amount"], ["p", ": "], ["type", "number"], ["p", " };"]],
    [],
    [["cm", `// ${comment}`]],
    [["kw", "export function "], ["fn", "revenueByRegion"], ["p", "("], ["t", "sales"], ["p", ": "], ["type", "Sale"], ["p", "[]) {"]],
    [["kw", "  const "], ["t", "totals"], ["p", " = "], ["kw", "new "], ["type", "Map"], ["p", "<"], ["type", "string"], ["p", ", "], ["type", "number"], ["p", ">();"]],
    [],
    [["kw", "  for "], ["p", "("], ["kw", "const "], ["p", "{ "], ["t", "region"], ["p", ", "], ["t", "amount"], ["p", " } "], ["kw", "of "], ["t", "sales"], ["p", ") {"]],
    [["kw", "    const "], ["t", "current"], ["p", " = "], ["t", "totals"], ["p", "."], ["fn", "get"], ["p", "("], ["t", "region"], ["p", ") ?? "], ["num", "0"], ["p", ";"]],
    [["t", "    totals"], ["p", "."], ["fn", "set"], ["p", "("], ["t", "region"], ["p", ", "], ["t", "current"], ["p", " + "], ["t", "amount"], ["p", ");"]],
    [["p", "  }"]],
    [],
    [["kw", "  return "], ["t", "totals"], ["p", ";"]],
    [["p", "}"]],
  ];
}

const sqlLines: Line[] = [
  [["kw", "SELECT "], ["t", "region"], ["p", ", "], ["fn", "SUM"], ["p", "("], ["t", "amount"], ["p", ")"]],
  [["kw", "FROM "], ["t", "sales"]],
  [["kw", "GROUP BY "], ["t", "region"], ["p", ";"]],
];

// Alturas puramente ilustrativas (sem valores ou rótulos de dados reais).
const bars = [46, 72, 58, 88, 64];

function Code({ lines, numbered = false }: { lines: Line[]; numbered?: boolean }) {
  return (
    <pre className="font-mono text-[10.5px] leading-[1.75] sm:text-[12.5px] lg:text-[11.5px] xl:text-[12.5px]">
      <code>
        {lines.map((line, i) => (
          <span key={i} className="flex">
            {numbered && (
              <span className="mr-4 hidden w-4 shrink-0 text-right text-slate-600 select-none sm:inline-block">{i + 1}</span>
            )}
            <span className="whitespace-pre">
              {line.length === 0
                ? " "
                : line.map(([kind, text], j) => (
                    <span key={j} className={tokenColor[kind]}>
                      {text}
                    </span>
                  ))}
            </span>
          </span>
        ))}
      </code>
    </pre>
  );
}

function WindowBar({ title, badge }: { title: string; badge?: string }) {
  return (
    <div className="flex items-center gap-3 border-b border-white/[0.06] px-4 py-3">
      <div className="flex gap-1.5">
        <span className="size-2.5 rounded-full bg-slate-600/70" />
        <span className="size-2.5 rounded-full bg-slate-600/70" />
        <span className="size-2.5 rounded-full bg-slate-600/70" />
      </div>
      <span className="font-mono text-[11px] text-slate-400">{title}</span>
      {badge && (
        <span className="ml-auto rounded-md border border-blue-400/20 bg-blue-500/10 px-1.5 py-0.5 font-mono text-[10px] text-blue-300">
          {badge}
        </span>
      )}
    </div>
  );
}

const panel =
  "rounded-2xl border border-white/[0.08] bg-[var(--code-bg)]/95 shadow-[0_30px_60px_-30px_rgb(0_0_0/0.8)] backdrop-blur-md";

export function HeroVisual({ copy, className }: { copy: Dictionary["hero"]["visual"]; className?: string }) {
  return (
    <div role="img" aria-label={copy.caption} className={cn("relative mx-auto w-full max-w-[34rem]", className)}>
      {/* Brilho atrás da composição */}
      <div className="absolute inset-[8%] -z-10 rounded-full bg-[var(--glow-1)] blur-[80px]" />

      {/* Janela principal */}
      <div className={cn(panel, "relative overflow-hidden")}>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-blue-400/60 to-transparent" />
        <WindowBar title={copy.codeTitle} badge="TS" />
        <div className="overflow-hidden px-4 py-4 [mask-image:linear-gradient(90deg,#000_88%,transparent)] sm:px-5 sm:pt-5 sm:pb-24 sm:[mask-image:none]">
          <Code lines={tsLines(copy.codeComment)} numbered />
        </div>
      </div>

      {/* Card SQL flutuante */}
      <div
        className={cn(
          panel,
          "animate-float absolute -bottom-10 -left-6 hidden w-[17.5rem] sm:block xl:-left-14",
        )}
      >
        <WindowBar title={copy.sqlTitle} badge="SQL" />
        <div className="px-4 py-3">
          <Code lines={sqlLines} />
        </div>
      </div>

      {/* Card de gráfico flutuante */}
      <div
        className={cn(
          panel,
          "animate-float-slow absolute -top-16 -right-4 hidden w-44 p-4 [animation-delay:-3s] sm:block xl:-right-10",
        )}
      >
        <p className="mb-3 text-[11px] font-medium text-slate-300">{copy.chartTitle}</p>
        <div className="flex h-16 items-end gap-2 border-b border-white/10">
          {bars.map((height, i) => (
            <span
              key={i}
              style={{ height: `${height}%` }}
              className={cn(
                "flex-1 rounded-t-sm",
                i === 3 ? "bg-linear-to-t from-blue-600 to-blue-300" : "bg-blue-400/25",
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
