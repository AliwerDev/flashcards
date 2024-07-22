"use client";
import React from "react";
import { Form, Input, Button, theme, Divider, message } from "antd";
import { LuUser, LuLock } from "react-icons/lu";
import Link from "next/link";
import { paths } from "@/src/routes/paths";
import { useAuthContext } from "@/src/auth/hooks";
import { useGoogleLogin, useGoogleOneTapLogin, googleLogout } from "@react-oauth/google";
import { useBoolean } from "@/src/hooks/use-boolean";
import { useTranslation } from "@/app/i18/client";

type Props = {
  params: { lang: string };
};

export default function LoginPage({ params: { lang } }: Props) {
  const { t } = useTranslation(lang);
  const { login, loginByGoogle } = useAuthContext();
  const loadingBool = useBoolean();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const onFinish = (values: any) => {
    loadingBool.onTrue();
    login(values).finally(() => loadingBool.onFalse());
  };

  const loginWithgoogle = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      loadingBool.onTrue();
      googleLogout();
      loginByGoogle({ access_token: tokenResponse.access_token as string }).finally(() => {
        loadingBool.onFalse();
      });
    },
    onError: () => {
      message.error("Login Failed");
    },
  });

  useGoogleOneTapLogin({
    onSuccess: (credentialResponse) => {
      loadingBool.onTrue();
      googleLogout();
      loginByGoogle({ credential: credentialResponse.credential as string }).finally(() => {
        loadingBool.onFalse();
      });
    },
    onError: () => {
      message.error("Login Failed");
    },
  });

  return (
    <div style={{ background: colorBgContainer, borderRadius: borderRadiusLG }} className="w-full max-w-md p-8 shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
      <Form name="login" className="login-form" onFinish={onFinish}>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your Email!",
            },
          ]}
        >
          <Input prefix={<LuUser />} placeholder="Email" type="email" className="w-full p-2 border rounded" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input prefix={<LuLock />} type="password" placeholder="Password" className="w-full p-2 border rounded" />
        </Form.Item>

        <Form.Item>
          <Button loading={loadingBool.value} type="primary" htmlType="submit" className="w-full text-white p-2 rounded">
            {t("Log in")}
          </Button>
          <div className="text-center mt-4">
            {t("Don't have an account")}?
            <Link href={paths.auth.register(lang)} className="text-blue-500 ml-2">
              {t("Register now")}!
            </Link>
          </div>
        </Form.Item>
      </Form>

      <Divider className="my-4" orientation="center" plain>
        {t("or")}
      </Divider>

      <Button onClick={() => loginWithgoogle()} type="dashed" size="large" icon={<img src="/assets/icons/ic_google.svg" width="20px" height="20px" alt="google" />} className="w-full !bg-white dark:!bg-inherit mb-2">
        {t("Continue with Google")}
      </Button>
    </div>
  );
}
