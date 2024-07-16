"use client";
import { ReactNode } from "react";
import { RoleBasedGuard } from "@/src/auth/guard";

type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <RoleBasedGuard hasContent roles={["admin"]}>
      <div>{children}</div>
    </RoleBasedGuard>
  );
}
