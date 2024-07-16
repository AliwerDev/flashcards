import { config } from "@/src/config";

export const fallbackLng = config.languages[0];
export const languages = config.languages;
export const defaultNS = "translation";
export const cookieName = "i18next";

export function getOptions(lng: string = fallbackLng, ns: string = defaultNS) {
  return {
    // debug: true,
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
}
