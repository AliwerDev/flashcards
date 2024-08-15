"use client";
import React from "react";
import { Form, Input, Button } from "antd";
import { LuUser, LuLock } from "react-icons/lu";
import Link from "next/link";
import { paths } from "@/src/routes/paths";
import { useAuthContext } from "@/src/auth/hooks";

type Props = {
  params: { lang: string };
};

export default function RegisterPage({ params: { lang } }: Props) {
  const { register } = useAuthContext();

  const onFinish = (values: any) => {
    register(values);
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
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
          <Input size="large" prefix={<LuUser />} placeholder="Email" type="email" className="w-full p-2 border rounded" />
        </Form.Item>

        <Form.Item
          name="firstName"
          rules={[
            {
              required: true,
              message: "Please input your firstname!",
            },
          ]}
        >
          <Input size="large" placeholder="First name" className="w-full p-2 border rounded" />
        </Form.Item>

        <Form.Item name="lastName">
          <Input size="large" placeholder="Last name" className="w-full p-2 border rounded" />
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
          <Input size="large" prefix={<LuLock />} type="password" placeholder="Password" className="w-full p-2 border rounded" />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: "Please input your confirm password!",
            },
          ]}
        >
          <Input size="large" prefix={<LuLock />} type="password" placeholder="Confirm password" className="w-full p-2  border rounded" />
        </Form.Item>

        <Form.Item>
          <Button size="large" type="primary" htmlType="submit" className="w-full text-white p-2 rounded">
            Register
          </Button>
          <div className="text-center mt-4">
            Do you have an account?
            <Link href={paths.auth.login(lang)} className="text-blue-500 ml-2">
              Login
            </Link>
          </div>
        </Form.Item>
      </Form>
    </>
  );
}
