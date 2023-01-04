import React, { useContext } from "react";
import { Form, Modal, Input } from "antd";
import { AppContext } from "../../Context/AppProvider";
import { addDocument } from "../firebase/services";
import { AuthContext } from "../../Context/AuthProvider";

export default function AddRoomModal() {
  const { isAddRoomVisible, setIsAddRoomVisible } = useContext(AppContext);
  const {
    user: { uid },
  } = useContext(AuthContext);

  const [form] = Form.useForm();
  const handleOk = () => {
    console.log(form.getFieldError());
    addDocument("rooms", {
      ...form.getFieldsValue(),
      members: [uid],
      coderoom: "",
    });

    form.resetFields();

    setIsAddRoomVisible(false);
  };
  const handleCancel = () => {
    form.resetFields();

    setIsAddRoomVisible(false);
  };

  return (
    <div>
      <Modal
        title='tao phong'
        open={isAddRoomVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout='vertical'>
          <Form.Item label='ten phong' name='name'>
            <Input placeholder='nhap ten phong' />
          </Form.Item>
          <Form.Item label='mo ta' name='description'>
            <Input.TextArea placeholder='nhap mo ta' />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
