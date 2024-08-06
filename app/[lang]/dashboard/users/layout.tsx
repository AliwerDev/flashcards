"use client";
import { RoleBasedGuard } from "@/src/auth/guard";
import React from "react";

const LayoutUsers = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <RoleBasedGuard roles={["admin"]}>{children}</RoleBasedGuard>;
};

export default LayoutUsers;
