"use client";
import { useEffect, useCallback } from "react";

import { paths } from "@/src/routes/paths";
import { useAuthContext } from "../hooks";
import { SplashScreen } from "@/src/shared/loading-screen";
import { useSearchParams } from "next/navigation";
import { useRouter } from "@/src/routes/hooks";

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function GuestGuard({ children }: Props) {
  const { loading } = useAuthContext();

  return <>{loading ? <SplashScreen /> : <Container>{children}</Container>}</>;
}

// ----------------------------------------------------------------------

function Container({ children }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const returnTo = searchParams.get("returnTo") || paths.dashboard.root;
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
