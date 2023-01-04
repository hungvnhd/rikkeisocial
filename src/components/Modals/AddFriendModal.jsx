import React, { useContext } from "react";
import { Form, Modal, Input } from "antd";
import { AppContext } from "../../Context/AppProvider";
import { addDocument } from "../firebase/services";
import { AuthContext } from "../../Context/AuthProvider";

export default function AddFriendModal() {
  const { isAddFriendVisible, setIsAddFriendVisible } = useContext(AppContext);
  const {
    user: { uid },
  } = useContext(AuthContext);

  const [form] = Form.useForm();
  console.log(form);
  const handleOk = () => {
    addDocument("rooms", { ...form.getFieldsValue(), member: [uid] });

    form.resetFields();

    setIsAddFriendVisible(false);
  };

  const handleCancel = () => {
    form.resetFields();

    setIsAddFriendVisible(false);
  };

  return (
    <div>
      <Modal
        title='tao phong'
        open={isAddFriendVisible}
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
