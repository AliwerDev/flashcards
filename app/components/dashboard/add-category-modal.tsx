import { useQueryClientInstance } from "@/src/context/QueryClient.client";
import { BooleanReturnType } from "@/src/hooks/use-boolean";
import axiosInstance, { endpoints } from "@/src/utils/axios";
import { useMutation } from "@tanstack/react-query";
import { Button, Flex, Form, Input, message, Modal } from "antd";
import { TFunction } from "i18next";
import React, { useCallback, useEffect } from "react";

type Props = {
  open: BooleanReturnType;
  t: TFunction;
};

const AddEditCategoryModal = ({ open: openBool, t }: Props) => {
  const queryClient = useQueryClientInstance();
  const [form] = Form.useForm();

  const { mutate: onFinish, isPending } = useMutation({
    mutationKey: ["add-category"],
    mutationFn: (data: any) => (openBool.data ? axiosInstance.put(endpoints.category.edit(openBool?.data?._id), data) : axiosInstance.post(endpoints.category.create, data)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      message.success(openBool.data ? t("successfully_changed") : t("successfully_created"));
      openBool.onFalse();
      form.resetFields();
    },
    onError: () => "",
  });

  const cancel = () => {
    form.setFieldsValue({ title: "" });
    openBool.onFalse();
  };

  useEffect(() => {
    if (openBool.value) {
      if (openBool.data) form.setFieldsValue(openBool.data);
    }
  }, [openBool]);

  return (
    <Modal open={openBool.value} onClose={cancel} onCancel={cancel} title={t("Create new category")} footer={null}>
      <Form initialValues={{ type: "1" }} form={form} name="add-box" onFinish={onFinish} layout="vertical">
        <Form.Item
          name="title"
          label={t("Name")}
          rules={[
            {
              required: true,
              message: t("Name is required!"),
            },
          ]}
        >
          <Input min={1} className="w-full" size="large" placeholder={t("Name")} />
        </Form.Item>

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

export default AddEditCategoryModal;
