import { ArrowUpRight, Mail } from "lucide-react";
import { getDictionary } from "@/i18n/dictionaries";
import { profile } from "@/data/profile";
import { isContactEnabled } from "@/lib/contact-config";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Card, cardClasses, cardHoverClasses } from "@/components/ui/Card";
import { GithubIcon, LinkedinIcon } from "@/components/icons/BrandIcons";
import { ContactForm } from "@/components/contact/ContactForm";
import { cn } from "@/lib/cn";

export async function Contact() {
  const dict = await getDictionary();
  const t = dict.contact;

  const channels = [
    { name: "LinkedIn", hint: t.linkedinHint, href: profile.socials.linkedin, icon: <LinkedinIcon size={20} />, external: true },
    { name: "GitHub", hint: t.githubHint, href: profile.socials.github, icon: <GithubIcon size={20} />, external: true },
    ...(profile.email
      ? [{ name: profile.email, hint: t.emailHint, href: `mailto:${profile.email}`, icon: <Mail aria-hidden="true" className="size-5" />, external: false }]
      : []),
  ];

  return (
    <Section id="contact" className="overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 -z-10 h-[30rem] w-[56rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,var(--glow-1),transparent)]"
      />

      <div className="grid gap-12 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <SectionHeading id="contact-title" index={6} eyebrow={t.eyebrow} title={t.title} subtitle={t.description} />

          <Reveal delay={0.1} className="mt-10">
            <h3 className="sr-only">{t.channels}</h3>
            <ul className="space-y-3">
              {channels.map((channel) => (
                <li key={channel.href}>
                  <a
                    href={channel.href}
                    {...(channel.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className={cn(cardClasses, cardHoverClasses, "group flex min-h-16 items-center gap-4 px-5 py-4")}
                  >
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-accent/20 bg-accent-soft text-accent-glow">
                      {channel.icon}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-medium text-fg">{channel.name}</span>
                      <span className="block text-sm text-muted">{channel.hint}</span>
                    </span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-5 shrink-0 text-muted transition-[transform,color] duration-300 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent-glow"
                    />
                    {channel.external && <span className="sr-only">({dict.common.opensInNewTab})</span>}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="lg:col-span-7">
          <Card className="p-6 sm:p-9">
            <ContactForm t={t.form} enabled={isContactEnabled()} />
          </Card>
        </Reveal>
      </div>
    </Section>
  );
}
