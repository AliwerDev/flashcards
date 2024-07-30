import { useAuthContext } from "@/src/auth/hooks";
import { Avatar, Divider, Dropdown, theme, Typography, MenuProps } from "antd";
import { useRouter } from "next/navigation";
import React, { useMemo } from "react";
import { CgProfile } from "react-icons/cg";
import { FaRegUser } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";

const ProfileItem = ({ t, lang }: { t: any; lang: string }) => {
  const { logout, user } = useAuthContext();
  const { token } = theme.useToken();
  const router = useRouter();

  const profileItems: MenuProps["items"] = useMemo(
    () => [
      {
        label: (
          <p className={"m-0 flex items-center gap-2"}>
            <CgProfile />
            {t(`Profile`)}
          </p>
        ),
        key: "profile",
        onClick: () => router.push("/dashboard/profile"),
      },
      {
        label: (
          <p className={"m-0 flex items-center"}>
            <HiOutlineLogout className={"mr-2"} /> {t("Chiqish") || ""}
          </p>
        ),
        key: "log-out",
        onClick: () => logout(),
      },
    ],
    [t]
  );
  return (
    <Dropdown
      menu={{ items: profileItems }}
      trigger={["click"]}
      dropdownRender={(menu) => (
        <div
          style={{
            backgroundColor: token.colorBgElevated,
            borderRadius: token.borderRadiusLG,
            boxShadow: token.boxShadowSecondary,
          }}
        >
          <div className={"flex items-center px-3 py-2"}>
            <Avatar src={user && user.picture} className={"mr-2"} icon={<FaRegUser />} />
            <div className={"m-0"}>
              <Typography className={"font-bold"}>{user && (user.firstName || user.lastName) ? `${user.firstName} ${user.lastName}` : t("User")}</Typography>
              <Typography>{user && user.email}</Typography>
            </div>
          </div>
          <Divider className={"my-0 py-0"} />
          {React.cloneElement(menu as React.ReactElement, { style: { boxShadow: "none" } })}
        </div>
      )}
    >
      <Avatar src={user && user.picture} className={"cursor-pointer"} size={"small"} icon={<FaRegUser />} />
    </Dropdown>
  );
};

export default ProfileItem;
