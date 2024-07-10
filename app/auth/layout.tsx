"use client";
import { ReactNode } from "react";
import { GuestGuard } from "@/src/auth/guard";

type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <GuestGuard>
      <div className="flex min-h-screen items-center justify-center bg-gray-100">{children}</div>
    </GuestGuard>
  );
}
