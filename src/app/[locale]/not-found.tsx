import { ArrowLeft } from "lucide-react";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

export default async function NotFound() {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);

  return (
    <Container className="flex min-h-[70svh] flex-col items-start justify-center pt-32">
      <p className="font-mono text-sm text-accent-glow">404</p>
      <h1 className="mt-3 font-display text-4xl font-semibold text-fg sm:text-5xl">{dict.notFound.title}</h1>
      <p className="mt-4 max-w-md text-muted">{dict.notFound.description}</p>
      <ButtonLink href={`/${locale}`} variant="secondary" className="mt-8">
        <ArrowLeft aria-hidden="true" className="size-4" />
        {dict.notFound.back}
      </ButtonLink>
    </Container>
  );
}
