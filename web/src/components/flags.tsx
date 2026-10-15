import { type ComponentType } from "react";
import { type Locale } from "@/lib/i18n";

type FlagProps = { className?: string };

export function UkFlag({ className }: FlagProps) {
  return (
    <svg viewBox="0 0 60 60" className={className} aria-hidden>
      <clipPath id="uk-flag-circle">
        <circle cx="30" cy="30" r="30" />
      </clipPath>
      <g clipPath="url(#uk-flag-circle)">
        <rect width="60" height="60" fill="#012169" />
        <path d="M0 0L60 60M60 0L0 60" stroke="#fff" strokeWidth="12" />
        <path d="M0 0L60 60M60 0L0 60" stroke="#c8102e" strokeWidth="4" />
        <path d="M30 0V60M0 30H60" stroke="#fff" strokeWidth="20" />
        <path d="M30 0V60M0 30H60" stroke="#c8102e" strokeWidth="12" />
      </g>
    </svg>
  );
}

export function DeFlag({ className }: FlagProps) {
  return (
    <svg viewBox="0 0 60 60" className={className} aria-hidden>
      <clipPath id="de-flag-circle">
        <circle cx="30" cy="30" r="30" />
      </clipPath>
      <g clipPath="url(#de-flag-circle)">
        <rect width="60" height="20" fill="#000" />
        <rect y="20" width="60" height="20" fill="#dd0000" />
        <rect y="40" width="60" height="20" fill="#ffce00" />
      </g>
    </svg>
  );
}

export const LOCALE_FLAGS: Record<Locale, ComponentType<FlagProps>> = {
  en: UkFlag,
  de: DeFlag,
};
