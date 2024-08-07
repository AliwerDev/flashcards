"use client";
import React from "react";
import { Upload, Button, Form, Input, Row, Col, Card } from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";

const Profile: React.FC = () => {
  const [form] = Form.useForm();

  const handleFinish = (values: any) => {
    console.log("Form values:", values);
  };
  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <div style={{ padding: "20px" }}>
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Row gutter={[20, 20]}>
          <Col xs={24} sm={12} md={24} lg={8}>
            <Card className="h-full">
              <Form.Item name="upload" valuePropName="fileList" getValueFromEvent={(e: any) => (Array.isArray(e) ? e : e?.fileList)}>
                <>
                  {/* <Upload action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload" listType="picture-circle" fileList={fileList} onPreview={handlePreview} onChange={handleChange}>
                    {fileList.length >= 8 ? null : uploadButton}
                  </Upload>
                  {previewImage && (
                    <Image
                      wrapperStyle={{ display: "none" }}
                      preview={{
                        visible: previewOpen,
                        onVisibleChange: (visible) => setPreviewOpen(visible),
                        afterOpenChange: (visible) => !visible && setPreviewImage(""),
                      }}
                      src={previewImage}
                    />
                  )} */}
                </>
              </Form.Item>
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
              <Form.Item label="Email" name="email" rules={[{ required: true, message: "Please input your email!", type: "email" }]}>
                <Input />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Card>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Profile;
