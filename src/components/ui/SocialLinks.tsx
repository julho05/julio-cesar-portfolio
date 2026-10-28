import { GithubIcon, LinkedinIcon } from "@/components/icons/BrandIcons";
import { profile } from "@/data/profile";
import type { SocialNetwork } from "@/types/content";
import { cn } from "@/lib/cn";

const networks: Record<SocialNetwork, { label: string; Icon: typeof GithubIcon }> = {
  github: { label: "GitHub", Icon: GithubIcon },
  linkedin: { label: "LinkedIn", Icon: LinkedinIcon },
};

interface SocialLinksProps {
  label: string;
  newTabLabel: string;
  className?: string;
  itemClassName?: string;
}

export function SocialLinks({ label, newTabLabel, className, itemClassName }: SocialLinksProps) {
  return (
    <ul aria-label={label} className={cn("flex items-center gap-2", className)}>
      {(Object.keys(networks) as SocialNetwork[]).map((network) => {
        const { label: name, Icon } = networks[network];
        return (
          <li key={network}>
            <a
              href={profile.socials[network]}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "grid size-11 place-items-center rounded-[var(--radius-control)] border border-border-subtle text-muted transition-[color,border-color,background-color,transform] duration-300 ease-out-expo hover:-translate-y-0.5 hover:border-accent/50 hover:bg-accent-soft hover:text-fg",
                itemClassName,
              )}
            >
              <Icon size={18} />
              <span className="sr-only">
                {name} ({newTabLabel})
              </span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
