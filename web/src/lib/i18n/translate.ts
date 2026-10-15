import type { Locale } from "./config";
import { de } from "./locales/de.generated";
import { en } from "./locales/en.generated";

type Translations = typeof en;

type DotPaths<T> = T extends string
  ? never
  : {
      [K in keyof T & string]: T[K] extends string ? K : `${K}.${DotPaths<T[K]>}`;
    }[keyof T & string];

type DeepPartial<T> = T extends string ? string : { [K in keyof T]?: DeepPartial<T[K]> };

export type TranslationKey = DotPaths<Translations>;

export type Translator = (key: TranslationKey, params?: Record<string, string | number>) => string;

// English is the source of truth; other locales may be incomplete and fall back to it per key.
const dictionaries: Record<Locale, DeepPartial<Translations>> = { en, de };

function lookup(dictionary: DeepPartial<Translations>, key: TranslationKey): string | undefined {
  const value = key.split(".").reduce<unknown>((node, segment) => {
    if (node && typeof node === "object" && segment in node) {
      return (node as Record<string, unknown>)[segment];
    }
    return undefined;
  }, dictionary);

  return typeof value === "string" ? value : undefined;
}

function resolve(locale: Locale, key: TranslationKey): string {
  const value = lookup(dictionaries[locale], key) ?? lookup(en, key);

  if (value === undefined) {
    throw new Error(`Missing translation for key "${key}"`);
  }

  return value;
}

export function createTranslator(locale: Locale): Translator {
  return (key, params) => {
    const template = resolve(locale, key);
    if (!params) {
      return template;
    }

    return template.replace(/{{(\w+)}}/g, (match, token: string) =>
      token in params ? String(params[token]) : match,
    );
  };
}
