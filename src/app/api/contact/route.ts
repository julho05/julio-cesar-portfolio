import { NextResponse, type NextRequest } from "next/server";
import { createContactSchema, type ContactErrorCode } from "@/lib/contact-schema";
import { getContactConfig } from "@/lib/contact-config";

const MAX_BODY_BYTES = 10_000;
const MIN_FILL_TIME_MS = 3_000;
const RATE_LIMIT = { max: 3, windowMs: 10 * 60 * 1000 };

/**
 * Limite por IP em memória. Em ambiente serverless cada instância tem o seu,
 * o que já barra rajadas; para um limite global, troque por um store externo (ex.: Upstash).
 */
const hits = new Map<string, number[]>();

function isRateLimited(ip: string, now: number): boolean {
  const recent = (hits.get(ip) ?? []).filter((time) => now - time < RATE_LIMIT.windowMs);
  if (recent.length >= RATE_LIMIT.max) {
    hits.set(ip, recent);
    return true;
  }
  hits.set(ip, [...recent, now]);
  return false;
}

// Na API as mensagens não são exibidas; só importa se o dado é válido.
const schema = createContactSchema({
  nameMin: "name",
  nameMax: "name",
  email: "email",
  subjectMin: "subject",
  subjectMax: "subject",
  messageMin: "message",
  messageMax: "message",
});

const fail = (error: ContactErrorCode, status: number) => NextResponse.json({ ok: false, error }, { status });

export async function POST(request: NextRequest) {
  const config = getContactConfig();
  if (!config) return fail("unavailable", 503);

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) return fail("invalid", 413);

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw);
  } catch {
    return fail("invalid", 400);
  }

  // Bots costumam preencher o honeypot ou enviar instantaneamente: finge sucesso e descarta.
  const elapsed = typeof body.elapsed === "number" ? body.elapsed : 0;
  if ((typeof body.website === "string" && body.website.length > 0) || elapsed < MIN_FILL_TIME_MS) {
    return NextResponse.json({ ok: true });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip, Date.now())) return fail("rate_limited", 429);

  const parsed = schema.safeParse(body);
  if (!parsed.success) return fail("invalid", 400);

  const { name, email, message } = parsed.data;
  // Remove quebras de linha do assunto (evita injeção de cabeçalhos).
  const subject = parsed.data.subject.replace(/[\r\n]+/g, " ");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${config.apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: config.from,
        to: [config.to],
        reply_to: email,
        subject: `[Portfólio] ${subject}`,
        text: `Nome: ${name}\nE-mail: ${email}\n\n${message}`,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) {
      console.error("[contact] Resend respondeu", response.status);
      return fail("failed", 502);
    }
  } catch (error) {
    console.error("[contact] Falha ao enviar", error);
    return fail("failed", 502);
  }

  return NextResponse.json({ ok: true });
}
