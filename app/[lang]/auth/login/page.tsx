"use client";
import React from "react";
import { Form, Input, Button, theme } from "antd";
import { LuUser, LuLock } from "react-icons/lu";
import Link from "next/link";
import { paths } from "@/src/routes/paths";
import { useAuthContext } from "@/src/auth/hooks";

type Props = {
  params: { lang: string };
};

export default function LoginPage({ params: { lang } }: Props) {
  const { login } = useAuthContext();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const onFinish = (values: any) => {
    login(values);
  };

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
          <Button type="primary" htmlType="submit" className="w-full text-white p-2 rounded">
            Log in
          </Button>
          <div className="text-center mt-4">
            Don't have an account?
            <Link href={paths.auth.register(lang)} className="text-blue-500 ml-2">
              Register now!
            </Link>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}
