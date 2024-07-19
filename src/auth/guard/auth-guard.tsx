"use client";
import { useState, useEffect, useCallback } from "react";
import { paths } from "@/src/routes/paths";
import { SplashScreen } from "@/app/components/shared/loading-screen";

import { useAuthContext } from "../hooks";
import { useRouter } from "@/src/routes/hooks";

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
  lang: string;
};

export default function AuthGuard({ children, lang }: Props) {
  const { loading } = useAuthContext();
  return <>{loading ? <SplashScreen /> : <Container lang={lang}>{children}</Container>}</>;
}

// ----------------------------------------------------------------------

function Container({ children, lang }: Props) {
  const { authenticated } = useAuthContext();

  const [checked, setChecked] = useState(false);
  const router = useRouter();

  const check = useCallback(() => {
    if (!authenticated) {
      const searchParams = new URLSearchParams({
        returnTo: window.location.pathname,
      }).toString();

      const href = `${paths.auth.login(lang)}?${searchParams}`;
      router.replace(href);
    } else {
      setChecked(true);
    }
  }, [authenticated, router]);

  useEffect(() => {
    check();
  }, [authenticated]);

  if (!checked) {
    return null;
  }

  return <>{children}</>;
}
