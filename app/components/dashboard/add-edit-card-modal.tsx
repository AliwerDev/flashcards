import { languages } from "@/app/i18/settings";
import { BooleanReturnType } from "@/src/hooks/use-boolean";
import { IBox } from "@/src/types/box";
import { ICard } from "@/src/types/card";
import axiosInstance, { endpoints } from "@/src/utils/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Flex, Form, Input, message, Modal, Select } from "antd";
import { TFunction } from "i18next";
import React, { useEffect } from "react";
import { LuTrash } from "react-icons/lu";
const { Option } = Select;

type Props = {
  open: BooleanReturnType;
  activeBoxId: string;
  boxes: IBox[];
  t: TFunction;
};

const AddEditCardModal = ({ open, t, activeBoxId, boxes }: Props) => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const [modal, contextHolder] = Modal.useModal();

  const { mutate: createCard, isPending } = useMutation({
    mutationKey: ["add-card"],
    mutationFn: (data: ICard) => (open.data ? axiosInstance.patch(endpoints.card.edit(open.data._id), data) : axiosInstance.post(endpoints.card.create, data)),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["boxes", variables.boxId] });
      queryClient.invalidateQueries({ queryKey: ["boxes"] });
      queryClient.invalidateQueries({ queryKey: ["active-cards"] });
      message.success(open.data ? t("successfully_changed") : t("successfully_created"));
      cancel();
    },
    onError: () => "",
  });

  const { mutate: deleteCard, isPending: isDeletePending } = useMutation({
    mutationKey: ["add-card"],
    mutationFn: (card: ICard) => axiosInstance.delete(endpoints.card.delete(card._id)),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["cards"] });
      queryClient.invalidateQueries({ queryKey: ["boxes"] });
      queryClient.invalidateQueries({ queryKey: ["active-cards"] });
      message.success(t("successfully_delated"));
      cancel();
    },
    onError: () => "",
  });

  const cancel = () => {
    form.resetFields();
    open.onFalse();
  };

  const confirmRemove = () => {
    modal.confirm({
      title: t("Are you sure you want to delete"),
      okText: t("yes"),
      onOk() {
        deleteCard(open.data);
      },
      onCancel() {},
    });
  };

  useEffect(() => {
    if (open.value) {
      if (open.data) form.setFieldsValue(open.data);
      else if (activeBoxId) form.setFieldsValue({ boxId: activeBoxId });
    }
  }, [open, activeBoxId]);

  return (
    <Modal open={open.value} onClose={cancel} onCancel={cancel} title={open.data ? t("Edit card") : t("Create new card")} footer={null}>
      {contextHolder}
      <Form form={form} name="add-card" onFinish={createCard} layout="vertical">
        <Form.Item
          name="boxId"
          label={t("Box")}
          rules={[
            {
              required: true,
              message: "Box is required!",
            },
          ]}
        >
          <Select size="large">
            {boxes.map((box, index) => (
              <Option key={box._id} value={box._id}>
                {index + 1} - {t("level")}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          rules={[
            {
              required: true,
              message: "Front is required!",
            },
          ]}
          name="front"
          label={t("Front")}
        >
          <Input.TextArea autoSize={{ minRows: 3 }} />
        </Form.Item>

        <Form.Item
          rules={[
            {
              required: true,
              message: "Back is required!",
            },
          ]}
          name="back"
          label={t("Back")}
        >
          <Input.TextArea autoSize={{ minRows: 3 }} />
        </Form.Item>

        <Flex justify="flex-end" gap="10px">
          {open.data && (
            <div className="flex-1">
              <Button onClick={confirmRemove} type="default" icon={<LuTrash />} danger>
                {t("delete")}
              </Button>
            </div>
          )}
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

export default AddEditCardModal;
