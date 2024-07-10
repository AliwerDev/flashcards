import { useMemo } from "react";
import { useRouter as useNextRouter } from "next/navigation";

// ----------------------------------------------------------------------

export function useRouter() {
  const router = useNextRouter();

  const customRouter = useMemo(
    () => ({
      back: () => router.back(),
      forward: () => window.history.forward(),
      push: (href: string, params?: Record<string, string>) => {
        const url = new URL(href, window.location.origin);
        if (params) {
          Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));
        }
        router.push(url.toString().replace(window.location.origin, ""));
      },
      replace: (href: string, params?: Record<string, string>) => {
        const url = new URL(href, window.location.origin);
        if (params) {
          Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));
        }
        router.replace(url.toString().replace(window.location.origin, ""));
      },
    }),
    [router]
  );

  return customRouter;
}
