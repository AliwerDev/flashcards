"use client";
import { useEffect, useCallback } from "react";

import { paths } from "@/src/routes/paths";
import { useAuthContext } from "../hooks";
import { SplashScreen } from "@/app/components/shared/loading-screen";
import { useSearchParams } from "next/navigation";
import { useRouter } from "@/src/routes/hooks";

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
  lang: string;
};

export default function GuestGuard({ children, lang }: Props) {
  const { loading } = useAuthContext();

  return <>{loading ? <SplashScreen /> : <Container lang={lang}>{children}</Container>}</>;
}

// ----------------------------------------------------------------------

function Container({ children, lang }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const returnTo = searchParams.get("returnTo") || paths.dashboard.root(lang);
  const { authenticated } = useAuthContext();

  const check = useCallback(() => {
    if (authenticated) {
      router.replace(returnTo);
    }
  }, [authenticated, returnTo, router]);

  useEffect(() => {
    check();
  }, [check]);

  return <>{children}</>;
}
