import { useQueryClientInstance } from "@/src/context/QueryClient.client";
import { BooleanReturnType } from "@/src/hooks/use-boolean";
import axiosInstance, { endpoints } from "@/src/utils/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Flex, Form, InputNumber, Layout, message, Modal, Select, Space } from "antd";
import { TFunction } from "i18next";
import React, { useCallback } from "react";
const { Option } = Select;

type Props = {
  open: BooleanReturnType;
  t: TFunction;
  categoryId: string;
};

const AddBoxModal = ({ open, t, categoryId }: Props) => {
  const queryClient = useQueryClientInstance();
  const [form] = Form.useForm();

  const { mutate: createBox, isPending } = useMutation({
    mutationKey: ["add-box"],
    mutationFn: (data: any) => axiosInstance.post(endpoints.box.create, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boxes-with-count", categoryId] });
      message.success(t("successfully_created"));
      open.onFalse();
      form.resetFields();
    },
    onError: () => "",
  });

  const onFinish = useCallback(
    ({ reviewInterval, type }: { reviewInterval: number; type: string }) => {
      createBox({ reviewInterval: Number(reviewInterval) * Number(type || 1), categoryId });
    },
    [createBox]
  );

  const cancel = () => {
    form.setFieldsValue({ reviewInterval: "", type: "60" });
    open.onFalse();
  };

  return (
    <Modal open={open.value} onClose={cancel} onCancel={cancel} title={t("Create new box")} footer={null}>
      <Form initialValues={{ type: "60" }} form={form} name="add-box" onFinish={onFinish} layout="vertical">
        <Flex className="my-8 w-full gap-2">
          <Form.Item
            name="reviewInterval"
            className="flex-1"
            label={t("Review interval")}
            rules={[
              {
                required: true,
                message: "Review interval is required!",
              },
            ]}
          >
            <InputNumber min={1} className="w-full" size="large" placeholder={t("Review interval")} />
          </Form.Item>
          <Form.Item name="type" label={t("Unit")}>
            <Select size="large" style={{ width: 100 }}>
              <Option value="60">{t("min")}</Option>
              <Option value="3600">{t("hour")}</Option>
              <Option value="86400">{t("day")}</Option>
              <Option value="604800">{t("week")}</Option>
              <Option value="2592000">{t("month")}</Option>
            </Select>
          </Form.Item>
        </Flex>

        <Flex justify="flex-end" gap="10px">
          <Button onClick={cancel} type="default">
            {t("cancel")}
          </Button>
          <Button loading={isPending} type="primary" htmlType="submit">
            {t("save")}
          </Button>
        </Flex>
      </Form>
    </Modal>
  );
};

export default AddBoxModal;
