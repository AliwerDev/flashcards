"use client";

import { Typography } from "antd";
import { m } from "framer-motion";
import { useAuthContext } from "../hooks";
import { varBounce } from "@/app/components/shared/animate";

// ----------------------------------------------------------------------

type RoleBasedGuardProp = {
  hasContent?: boolean;
  roles?: string[];
  children: React.ReactNode;
};

const { Text, Title } = Typography;

export default function RoleBasedGuard({ hasContent = true, roles, children }: RoleBasedGuardProp) {
  const { user } = useAuthContext();

  const currentRole = user?.role;

  if (typeof roles !== "undefined" && currentRole && !roles.includes(currentRole)) {
    return hasContent ? (
      <div>
        <m.div variants={varBounce().in}>
          <Title level={2}>Permission Denied</Title>
        </m.div>

        <m.div variants={varBounce().in}>
          <Text type="secondary">You do not have permission to access this page</Text>
        </m.div>
      </div>
    ) : null;
  }

  return <>{children} </>;
}
