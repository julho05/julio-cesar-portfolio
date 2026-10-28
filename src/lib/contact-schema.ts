import { z } from "zod";

export interface ContactValidationMessages {
  nameMin: string;
  nameMax: string;
  email: string;
  subjectMin: string;
  subjectMax: string;
  messageMin: string;
  messageMax: string;
}

/** Schema compartilhado entre o formulário (mensagens traduzidas) e a API. */
export function createContactSchema(m: ContactValidationMessages) {
  return z.object({
    name: z.string().trim().min(2, m.nameMin).max(80, m.nameMax),
    email: z.string().trim().max(254, m.email).pipe(z.email(m.email)),
    subject: z.string().trim().min(3, m.subjectMin).max(120, m.subjectMax),
    message: z.string().trim().min(20, m.messageMin).max(2000, m.messageMax),
  });
}

export type ContactInput = z.infer<ReturnType<typeof createContactSchema>>;

/** Campos extras usados apenas para filtrar spam. */
export interface ContactPayload extends ContactInput {
  /** Honeypot: campo invisível que humanos deixam vazio. */
  website: string;
  /** Milissegundos entre a abertura do formulário e o envio. */
  elapsed: number;
}

export type ContactErrorCode = "unavailable" | "invalid" | "rate_limited" | "failed";
