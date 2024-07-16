import { Dropdown, MenuProps, Typography } from "antd";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const flags: Record<string, string> = {
  ru: "/assets/flags/russia.png",
  en: "/assets/flags/united-kingdom.png",
  uz: "/assets/flags/uzbekistan.png",
};

type Props = { lang: string };

export const LanguageElements = ({ lang }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const onClick: MenuProps["onClick"] = (item) => {
    router.push(pathname.replace(/^\/[a-z]{2}(\/|$)/, `/${item.key}$1`));
  };

  const items: MenuProps["items"] = [
    {
      label: (
        <div className="flex items-center gap-2">
          <img src={flags.ru} alt="" width={24} height={24} />
          <Typography>Rus tili</Typography>
        </div>
      ),
      key: "ru",
    },
    {
      label: (
        <div className="flex items-center gap-2">
          <img src={flags.en} alt="" width={24} height={24} />
          <Typography>Ingliz tili</Typography>
        </div>
      ),
      key: "en",
    },
    {
      label: (
        <div className="flex items-center gap-2">
          <img src={flags.uz} alt="" width={24} height={24} />
          <Typography>O'zbek tili</Typography>
        </div>
      ),
      key: "uz",
    },
  ];

  return (
    <Dropdown menu={{ items, onClick }}>
      <img className="cursor-pointer" src={flags[lang]} alt="" width={24} height={24} />
    </Dropdown>
  );
};
