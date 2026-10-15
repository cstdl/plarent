"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { isLocale, LOCALE_COOKIE } from "@/lib/i18n";

const ONE_YEAR_IN_SECONDS = 60 * 60 * 24 * 365;

export async function setLocaleAction(locale: string) {
  if (!isLocale(locale)) {
    throw new Error(`Unsupported locale "${locale}"`);
  }

  (await cookies()).set(LOCALE_COOKIE, locale, {
    path: "/",
    maxAge: ONE_YEAR_IN_SECONDS,
    sameSite: "lax",
  });
  revalidatePath("/", "layout");
}
