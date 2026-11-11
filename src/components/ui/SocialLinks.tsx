import { socialLinks } from "@/lib/data";
import { GithubIcon, LinkedinIcon, MailIcon } from "./Icons";

const icons = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  email: MailIcon,
} as const;

export function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex items-center gap-2.5 ${className}`}>
      {socialLinks.map((link) => {
        const Icon = icons[link.icon];
        const external = link.icon !== "email";
        return (
          <li key={link.label}>
            <a
              href={link.href}
              target={external ? "_blank" : undefined}
              rel={external ? "noreferrer noopener" : undefined}
              aria-label={external ? `${link.label} (opens in a new tab)` : link.label}
              className="text-muted hover:border-cyan hover:text-cyan bg-surface/50 inline-flex h-11 w-11 items-center justify-center rounded-full border transition-[color,border-color,transform] duration-200 hover:-translate-y-0.5"
            >
              <Icon size={19} />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
