import { useMemo } from "react";
import { useRouter } from "next/router";

// ----------------------------------------------------------------------

export function useSearchParams() {
  const { query } = useRouter();

  const searchParams = useMemo(() => {
    const params = new URLSearchParams();
    for (const key in query) {
      if (query.hasOwnProperty(key)) {
        const value = query[key];
        if (Array.isArray(value)) {
          value.forEach((val) => params.append(key, val));
        } else {
          params.append(key, value as string);
        }
      }
    }
    return params;
  }, [query]);

  return searchParams;
}
