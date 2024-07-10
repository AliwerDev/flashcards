import { m, MotionProps } from "framer-motion";

import { useResponsive } from "@/src/hooks/use-responsive";
import { varContainer } from "./variants";
import { Card } from "antd";

// ----------------------------------------------------------------------

type IProps = MotionProps;

interface Props extends IProps {
  children: React.ReactNode;
  disableAnimatedMobile?: boolean;
}

export default function MotionViewport({ children, disableAnimatedMobile = true, ...other }: Props) {
  const smDown = useResponsive("down", "sm");

  if (smDown && disableAnimatedMobile) {
    return <m.div {...other}>{children}</m.div>;
  }

  return (
    <m.div initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.3 }} variants={varContainer()} {...other}>
      {children}
    </m.div>
  );
}
