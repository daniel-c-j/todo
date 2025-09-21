import { useContext, useState } from 'react';
import { Button, ColorPicker, Form, Input, Modal } from 'antd';
import { PlusOutlined } from "@ant-design/icons";
import type { Category } from '../../types';
import type { AxiosError } from 'axios';
import axios from 'axios';
import { HOST, PORT } from '../../constants';
import { TodoContext } from '../../hooks/todo_context';

const CreateNewCategoryModal = () => {
    const { dispatch, isLoading } = useContext(TodoContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleFinish = async (values: Partial<Category>) => {
        try {
            // TODO response feedback message notification
            dispatch({ type: "FETCH_START" })
            await axios({
                method: "POST",
                url: `${HOST}:${PORT}/api/categories`,
                data: values
            });
        } catch (e) {
            const axiosError = e as AxiosError;
            dispatch({ type: "FETCH_ERROR", payload: axiosError.message })
        } finally {
            dispatch({ type: "FORCE_REFRESH" })
        }
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div className='inline mb-2' >
            <Button disabled={isLoading} onClick={showModal} size='large'>
                <PlusOutlined />Create new category
            </Button>

            <Modal
                title="New Category"
                open={isModalOpen}
                onCancel={handleCancel}
                closable={isLoading}
                footer={
                    [
                        <Button type="text" disabled={isLoading} htmlType="button" onClick={() => handleCancel()}>
                            Cancel
                        </Button>,
                        <Button type="primary" disabled={isLoading} htmlType="submit" onClick={() => form.submit()}>
                            {isLoading ? "Loading..." : "Save"}
                        </Button>
                    ]
                }>
                <Form form={form}
                    layout="vertical"
                    initialValues={{
                        name: "",
                        color: "#000000",
                    }}
                    onFinish={handleFinish}>
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: "Please enter name" }]}
                    >
                        <Input placeholder="Category name" />
                    </Form.Item>

                    <Form.Item label="Color" name="color">
                        <ColorPicker defaultValue="#000000" defaultFormat='hex' format='hex' showText
                            onChangeComplete={(e) => form.setFieldValue("color", e.toHexString())} />
                    </Form.Item>

                </Form>
            </Modal>
        </div>
    );
};

export default CreateNewCategoryModal;