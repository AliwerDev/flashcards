import { useSearchParams as useNextSearchParams } from "next/navigation";
import { useMemo } from "react";

// ----------------------------------------------------------------------

export function useSearchParams() {
  const query = useNextSearchParams();

  const searchParams = useMemo(() => {
    const params = new URLSearchParams();
    for (const key in query) {
      if (query.hasOwnProperty(key)) {
        const value = query.get(key);
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
