import { languages } from "@/app/i18/settings";
import { BooleanReturnType, useBoolean } from "@/src/hooks/use-boolean";
import { IBox } from "@/src/types/box";
import { ICard } from "@/src/types/card";
import axiosInstance, { endpoints } from "@/src/utils/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Flex, Form, Input, message, Modal, Select, Space, Switch, Typography } from "antd";
import { TFunction } from "i18next";
import React, { useEffect } from "react";
import { LuTrash } from "react-icons/lu";
const { Option } = Select;

type Props = {
  openBool: BooleanReturnType;
  activeBoxId: string;
  boxes: IBox[];
  t: TFunction;
};

const AddEditCardModal = ({ openBool, t, activeBoxId, boxes }: Props) => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const [modal, contextHolder] = Modal.useModal();
  const isJsonUploadBool = useBoolean();

  const { mutate: createCard, isPending } = useMutation({
    mutationKey: ["add-card"],
    mutationFn: (data: ICard) => (openBool.data ? axiosInstance.patch(endpoints.card.edit(openBool.data._id), data) : isJsonUploadBool.value ? axiosInstance.post(endpoints.card.createList, data) : axiosInstance.post(endpoints.card.create, data)),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["boxes", variables.boxId] });
      queryClient.invalidateQueries({ queryKey: ["boxes"] });
      queryClient.invalidateQueries({ queryKey: ["active-cards"] });
      message.success(openBool.data ? t("successfully_changed") : t("successfully_created"));
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

  const onFinish = (values: any) => {
    if (isJsonUploadBool.value) {
      try {
        const cards = JSON.parse(values.cards);
        createCard({ ...values, cards });
      } catch (error) {
        message.error(t("Invalid json format, don't forget keys and values must be enclosed in double quotes!"));
        return;
      }
    } else {
      createCard(values);
    }
  };

  const cancel = () => {
    form.resetFields();
    openBool.onFalse();
  };

  const confirmRemove = () => {
    modal.confirm({
      title: t("Are you sure you want to delete"),
      okText: t("yes"),
      onOk() {
        deleteCard(openBool.data);
      },
      onCancel() {},
    });
  };

  useEffect(() => {
    if (openBool.value) {
      if (openBool.data) form.setFieldsValue(openBool.data);
      else if (activeBoxId) form.setFieldsValue({ boxId: activeBoxId });
    }
  }, [openBool, activeBoxId]);

  return (
    <Modal open={openBool.value} onClose={cancel} onCancel={cancel} title={openBool.data ? t("Edit card") : t("Create new card")} footer={null}>
      {contextHolder}

      <Form form={form} name="add-card" onFinish={onFinish} layout="vertical">
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

        {isJsonUploadBool.value ? (
          <Form.Item
            rules={[
              {
                required: true,
                message: "List is required!",
              },
            ]}
            name="cards"
            label={t("Cards list like json")}
          >
            <Input.TextArea placeholder={`[\n\t{ "front": "Front text 1", "back": "Back text 1" },\n\t{ "front": "Front text 2", "back": "Back text 2" },\n\t...\n]`} rows={9} />
          </Form.Item>
        ) : (
          <>
            {" "}
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
          </>
        )}

        <Flex gap="10px">
          <div className="flex-1">
            {openBool.data ? (
              <Button onClick={confirmRemove} type="default" icon={<LuTrash />} danger>
                {t("delete")}
              </Button>
            ) : (
              <Space>
                <Typography.Text type="secondary">Upload list</Typography.Text>
                <Switch checked={isJsonUploadBool.value} onChange={isJsonUploadBool.onToggle} />
              </Space>
            )}{" "}
          </div>
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
