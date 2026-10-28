"use client";

import { useId, useMemo, useState, type BaseSyntheticEvent } from "react";
import { useForm, type FieldError, type UseFormRegisterReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleAlert, CircleCheck, Info, LoaderCircle, Send } from "lucide-react";
import type { Dictionary } from "@/i18n/dictionaries";
import { createContactSchema, type ContactErrorCode, type ContactInput } from "@/lib/contact-schema";
import { buttonClasses } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

type Status = { type: "idle" } | { type: "success" } | { type: "error"; code: ContactErrorCode };

interface ContactFormProps {
  t: Dictionary["contact"]["form"];
  /** `false` quando não há serviço de envio configurado no servidor. */
  enabled: boolean;
}

const inputClasses =
  "w-full rounded-[var(--radius-control)] border border-border bg-bg/60 px-4 py-3 text-[0.9375rem] text-fg placeholder:text-muted/70 " +
  "transition-[border-color,box-shadow] duration-300 outline-none " +
  "focus:border-accent focus:shadow-[0_0_0_3px_rgb(59_130_246/0.2)] " +
  "aria-[invalid=true]:border-rose-400/70 disabled:cursor-not-allowed disabled:opacity-60";

interface FieldProps {
  id: string;
  label: string;
  requiredLabel: string;
  error?: FieldError;
  children: (props: { id: string; "aria-invalid": boolean; "aria-describedby"?: string }) => React.ReactNode;
}

function Field({ id, label, requiredLabel, error, children }: FieldProps) {
  const errorId = `${id}-error`;
  return (
    <div>
      <label htmlFor={id} className="mb-2 flex items-center gap-1 text-sm font-medium text-fg">
        {label}
        <span aria-hidden="true" className="text-accent-glow">
          *
        </span>
        <span className="sr-only">({requiredLabel})</span>
      </label>
      {children({ id, "aria-invalid": Boolean(error), "aria-describedby": error ? errorId : undefined })}
      {error?.message && (
        <p id={errorId} className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-400">
          <CircleAlert aria-hidden="true" className="size-3.5 shrink-0" />
          {error.message}
        </p>
      )}
    </div>
  );
}

export function ContactForm({ t, enabled }: ContactFormProps) {
  const uid = useId();
  const [status, setStatus] = useState<Status>({ type: "idle" });

  const schema = useMemo(() => createContactSchema(t.validation), [t.validation]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  async function onSubmit(data: ContactInput, event?: BaseSyntheticEvent) {
    setStatus({ type: "idle" });
    const form = event?.target as HTMLFormElement | undefined;
    const honeypot = form?.elements.namedItem("website") as HTMLInputElement | null | undefined;
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          website: honeypot?.value ?? "",
          // timeStamp = ms desde o carregamento da página (envios instantâneos indicam bot).
          elapsed: Math.round(event?.timeStamp ?? 0),
        }),
      });
      const result = (await response.json()) as { ok: boolean; error?: ContactErrorCode };
      if (result.ok) {
        setStatus({ type: "success" });
        reset();
      } else {
        setStatus({ type: "error", code: result.error ?? "failed" });
      }
    } catch {
      setStatus({ type: "error", code: "failed" });
    }
  }

  const fields: Array<{ name: keyof ContactInput; label: string; placeholder: string; autoComplete?: string; type?: string }> = [
    { name: "name", label: t.name, placeholder: t.namePlaceholder, autoComplete: "name" },
    { name: "email", label: t.email, placeholder: t.emailPlaceholder, autoComplete: "email", type: "email" },
  ];

  const errorMessage = (code: ContactErrorCode) =>
    code === "rate_limited" ? t.rateLimited : code === "unavailable" ? t.unavailable : t.error;

  const input = (registration: UseFormRegisterReturn, extra: Record<string, unknown>) => ({ ...registration, ...extra });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate aria-labelledby={`${uid}-title`}>
      <h3 id={`${uid}-title`} className="font-display text-xl font-semibold text-fg">
        {t.title}
      </h3>

      {!enabled && (
        <p className="mt-4 flex gap-2.5 rounded-[var(--radius-control)] border border-accent/25 bg-accent-soft p-4 text-sm leading-relaxed text-fg">
          <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent-glow" />
          {t.unavailable}
        </p>
      )}

      <fieldset disabled={!enabled || isSubmitting} className="mt-6 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          {fields.map((field) => (
            <Field key={field.name} id={`${uid}-${field.name}`} label={field.label} requiredLabel={t.required} error={errors[field.name]}>
              {(a11y) => (
                <input
                  {...input(register(field.name), a11y)}
                  type={field.type ?? "text"}
                  autoComplete={field.autoComplete}
                  placeholder={field.placeholder}
                  className={inputClasses}
                />
              )}
            </Field>
          ))}
        </div>

        <Field id={`${uid}-subject`} label={t.subject} requiredLabel={t.required} error={errors.subject}>
          {(a11y) => <input {...input(register("subject"), a11y)} placeholder={t.subjectPlaceholder} className={inputClasses} />}
        </Field>

        <Field id={`${uid}-message`} label={t.message} requiredLabel={t.required} error={errors.message}>
          {(a11y) => (
            <textarea
              {...input(register("message"), a11y)}
              rows={5}
              placeholder={t.messagePlaceholder}
              className={cn(inputClasses, "min-h-36 resize-y")}
            />
          )}
        </Field>

        {/* Honeypot: invisível para pessoas e leitores de tela. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label>
            Website
            <input type="text" name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        <button type="submit" className={buttonClasses("primary", "lg", "w-full sm:w-auto")}>
          {isSubmitting ? (
            <>
              <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />
              {t.sending}
            </>
          ) : (
            <>
              {t.submit}
              <Send aria-hidden="true" className="size-4 transition-transform duration-300 group-hover/button:translate-x-0.5" />
            </>
          )}
        </button>
      </fieldset>

      <div aria-live="polite" role="status" className="mt-5 empty:hidden">
        {status.type === "success" && (
          <p className="flex gap-2.5 rounded-[var(--radius-control)] border border-emerald-400/30 bg-emerald-400/10 p-4 text-sm text-fg">
            <CircleCheck aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-emerald-400" />
            {t.success}
          </p>
        )}
        {status.type === "error" && (
          <p className="flex gap-2.5 rounded-[var(--radius-control)] border border-rose-400/30 bg-rose-400/10 p-4 text-sm text-fg">
            <CircleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-rose-400" />
            {errorMessage(status.code)}
          </p>
        )}
      </div>
    </form>
  );
}
