import Image from "next/image";
import type { Locale } from "@/i18n/config";
import type { ProjectCover as Cover } from "@/types/content";
import { cn } from "@/lib/cn";

// Saída real do menu do sistema, conforme o README do repositório.
const terminalLines = [
  "---------CONTROLE DE PRODUTOS---------",
  "1 - Cadastrar produtos",
  "2 - Listar produtos",
  "3 - Buscar produtos",
  "4 - Entrada/Saída/Ajuste de estoque",
  "5 - Mostrar valor total do estoque",
  "6 - Excluir Produto",
  "7 - Editar Produto",
  "8 - Relatório do estoque",
  "9 - Histórico de movimentações",
  "0 - Sair",
];

function TerminalArt() {
  return (
    <div className="absolute inset-[7%] overflow-hidden rounded-[2.2cqw] border border-white/10 bg-[#0a101d] shadow-[0_20px_50px_-20px_rgb(0_0_0/0.8)]">
      <div className="flex items-center gap-[1cqw] border-b border-white/[0.06] px-[3cqw] py-[2cqw]">
        {[0, 1, 2].map((i) => (
          <span key={i} className="size-[1.6cqw] rounded-full bg-slate-600/70" />
        ))}
        <span className="ml-[1.5cqw] font-mono text-[2.2cqw] text-slate-500">bash</span>
      </div>
      <pre className="px-[3.5cqw] py-[2.6cqw] font-mono text-[2.45cqw] leading-[1.6] text-slate-300">
        <span className="text-emerald-300">$</span> python main.py{"\n"}
        {terminalLines.map((line, i) => (
          <span key={line} className={i === 0 ? "text-blue-300" : undefined}>
            {line}
            {"\n"}
          </span>
        ))}
        <span className="inline-block h-[2.6cqw] w-[1.3cqw] translate-y-[0.4cqw] bg-blue-400/80" />
      </pre>
    </div>
  );
}

const layers: Array<{ name: string; detail: Record<Locale, string> }> = [
  { name: "Frontend", detail: { pt: "HTML · CSS · JS", en: "HTML · CSS · JS" } },
  { name: "Controller", detail: { pt: "Requisições", en: "Requests" } },
  { name: "Service", detail: { pt: "Regras de negócio", en: "Business rules" } },
  { name: "Repository", detail: { pt: "SQL nativo", en: "Native SQL" } },
];

function ArchitectureArt({ locale }: { locale: Locale }) {
  return (
    <div className="absolute inset-[7%] flex flex-col justify-center gap-[3cqw]">
      <div className="flex items-center justify-between gap-[1.4cqw]">
        {layers.map((layer, i) => (
          <div key={layer.name} className="flex flex-1 items-center gap-[1.4cqw]">
            <div
              className={cn(
                "flex-1 rounded-[1.8cqw] border px-[1.6cqw] py-[2.4cqw] text-center",
                i === 2 ? "border-blue-400/50 bg-blue-500/15" : "border-white/10 bg-white/[0.03]",
              )}
            >
              <p className="font-mono text-[2.3cqw] font-medium text-slate-100">{layer.name}</p>
              <p className="mt-[0.6cqw] text-[1.8cqw] text-slate-400">{layer.detail[locale]}</p>
            </div>
            {i < layers.length - 1 && <span className="text-[2.6cqw] text-blue-300/70">→</span>}
          </div>
        ))}
      </div>

      <div className="flex items-stretch gap-[3cqw]">
        <div className="flex-1 rounded-[1.8cqw] border border-white/10 bg-[#0a101d] p-[2.4cqw]">
          <p className="font-mono text-[1.9cqw] text-slate-500">status</p>
          <div className="mt-[1.4cqw] flex flex-wrap items-center gap-[1.2cqw] font-mono text-[2.1cqw]">
            <span className="rounded-[1cqw] bg-amber-400/15 px-[1.4cqw] py-[0.6cqw] text-amber-200">SOLICITADO</span>
            <span className="text-slate-500">→</span>
            <span className="rounded-[1cqw] bg-emerald-400/15 px-[1.4cqw] py-[0.6cqw] text-emerald-200">LIBERADO</span>
            <span className="text-slate-500">|</span>
            <span className="rounded-[1cqw] bg-rose-400/15 px-[1.4cqw] py-[0.6cqw] text-rose-200">REJEITADO</span>
          </div>
        </div>
        <div className="grid w-[24%] place-items-center rounded-[1.8cqw] border border-white/10 bg-white/[0.03] p-[2cqw]">
          <div className="text-center">
            <p className="font-mono text-[2.3cqw] font-medium text-slate-100">MySQL</p>
            <p className="mt-[0.6cqw] text-[1.8cqw] text-slate-400">DECIMAL(15,2)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ProjectCoverProps {
  cover: Cover;
  locale: Locale;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

/** Capa com proporção fixa (16:10): screenshot real ou ilustração baseada no README. */
export function ProjectCover({ cover, locale, className, priority = false, sizes }: ProjectCoverProps) {
  return (
    <div
      className={cn(
        "@container relative aspect-[16/10] overflow-hidden bg-[radial-gradient(120%_120%_at_0%_0%,#13203b_0%,#0b1120_55%,#0a0f1c_100%)]",
        className,
      )}
    >
      {cover.type === "image" ? (
        <Image
          src={cover.src}
          alt={cover.alt[locale]}
          fill
          priority={priority}
          sizes={sizes ?? "(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"}
          className="object-cover object-top"
        />
      ) : (
        <div role="img" aria-label={cover.alt[locale]} className="absolute inset-0">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(rgb(148_163_184/0.06)_1px,transparent_1px),linear-gradient(90deg,rgb(148_163_184/0.06)_1px,transparent_1px)] bg-[size:6cqw_6cqw]"
          />
          {cover.type === "terminal" ? <TerminalArt /> : <ArchitectureArt locale={locale} />}
        </div>
      )}
    </div>
  );
}
