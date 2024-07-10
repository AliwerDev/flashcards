"use client";
import { useState, useEffect, useCallback } from "react";
import { paths } from "@/src/routes/paths";
import { SplashScreen } from "@/src/shared/loading-screen";

import { useAuthContext } from "../hooks";
import { useRouter } from "@/src/routes/hooks";

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function AuthGuard({ children }: Props) {
  const { loading } = useAuthContext();
  return <>{loading ? <SplashScreen /> : <Container>{children}</Container>}</>;
}

// ----------------------------------------------------------------------

function Container({ children }: Props) {
  const { authenticated } = useAuthContext();

  const [checked, setChecked] = useState(false);
  const router = useRouter();

  const check = useCallback(() => {
    if (!authenticated) {
      const searchParams = new URLSearchParams({
        returnTo: window.location.pathname,
      }).toString();

      const href = `${paths.auth.login}?${searchParams}`;
      router.replace(href);
    } else {
      setChecked(true);
    }
  }, [authenticated, router]);

  useEffect(() => {
    check();
  }, []);

  if (!checked) {
    return null;
  }

  return <>{children}</>;
}
