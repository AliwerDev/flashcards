"use client";
import React, { useEffect } from "react";
import { Button, Form, Input, Row, Col, Card, Image, message, Typography } from "antd";
import { useAuthContext } from "@/src/auth/hooks";
import { useTranslation } from "@/app/i18/client";
import get from "lodash.get";
import axiosInstance, { endpoints } from "@/src/utils/axios";
import { useMutation } from "@tanstack/react-query";

const Profile: React.FC<{ params: { lang: string } }> = ({ params: { lang } }) => {
  const { user, reinitialize } = useAuthContext();
  const [form] = Form.useForm();
  const { t } = useTranslation(lang);

  const { mutate: updateProfile, isPending } = useMutation({
    mutationKey: ["update-user"],
    mutationFn: (data: any) => axiosInstance.patch(endpoints.user.update, data),
    onSuccess: () => {
      reinitialize();
      message.success(t("successfully_updated"));
    },
    onError: () => "",
  });

  const { mutate: getToken } = useMutation({
    mutationKey: ["get-token"],
    mutationFn: (data: any) => axiosInstance.get(endpoints.auth.token, data),
    onSuccess: ({ data: token }) => {
      const url = `https://t.me/flashcardes_bot?start=${token}`;
      window.open(url, "_blank");
    },
    onError: () => "",
  });

  const handleFinish = (values: any) => {
    updateProfile({ firstName: values.firstName, lastName: values.lastName });
  };

  useEffect(() => {
    form.setFieldsValue({
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
    });
  }, [user]);

  return (
    <div style={{ padding: "20px" }}>
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Row gutter={[20, 20]}>
          <Col xs={24} sm={12} md={24} lg={8}>
            <Card className="h-full " classNames={{ body: "h-full flex justify-center items-center" }}>
              <Image wrapperClassName="w-full h-auto max-w-4 max-h-52 max-w-52 rounded-full overflow-hidden" src={get(user, "picture")} />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={24} lg={16}>
            <Card>
              <Form.Item label="First Name" name="firstName" rules={[{ required: true, message: "Please input your first name!" }]}>
                <Input />
              </Form.Item>
              <Form.Item label="Last Name" name="lastName" rules={[{ required: true, message: "Please input your last name!" }]}>
                <Input />
              </Form.Item>
              <Form.Item label="Email" name="email">
                <Input readOnly />
              </Form.Item>
              <Form.Item className="flex justify-end">
                <Button loading={isPending} type="primary" htmlType="submit">
                  {t("Save")}
                </Button>
              </Form.Item>
            </Card>
          </Col>
        </Row>
      </Form>

      {/* <Card className="mt-5">
        <Typography.Title level={5}>{t("Telegram accaunts")}</Typography.Title>

        <Button onClick={getToken}>Token tg</Button>
      </Card> */}
    </div>
  );
};

export default Profile;
