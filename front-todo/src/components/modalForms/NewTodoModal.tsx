import { useContext, useState } from "react";
import type { Todo } from "../../types";
import { Button, Form, Input, Modal, Select, Switch } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { TodoContext } from "../../hooks/todo_context";
import axios, { AxiosError } from "axios";
import { HOST, PORT } from "../../constants";

const { Option } = Select;
const { TextArea } = Input;

const CreateNewTodoModal = () => {
    const { dispatch, category, isLoading } = useContext(TodoContext);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleFinish = async (values: Partial<Todo>) => {
        try {
            // TODO response feedback message notification
            dispatch({ type: "FETCH_START" })
            await axios({
                method: "POST",
                url: `${HOST}:${PORT}/api/todos`,
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

    return (
        <div className='mr-3 inline'>
            <Button onClick={showModal} disabled={isLoading} className='my-2' size='large' >
                <PlusOutlined /> Create new todo
            </Button>

            <Modal
                title="Edit"
                open={isModalOpen}
                onCancel={handleCancel}
                closable={isLoading}
                footer={
                    [
                        <Button disabled={isLoading} type="text" htmlType="button" onClick={() => handleCancel()}>
                            Cancel
                        </Button>,
                        <Button disabled={isLoading} type="primary" htmlType="submit" onClick={() => form.submit()}>
                            {isLoading ? "Loading..." : "Save"}
                        </Button>
                    ]
                } >
                <Form form={form}
                    layout="vertical"
                    initialValues={{
                        title: "",
                        description: "",
                        completed: false,
                        priority: "medium",
                        category_id: 1,
                    }}
                    onFinish={handleFinish} >
                    <Form.Item
                        label="Title"
                        name="title"
                        rules={[{ required: true, message: "Please enter a title" }]}
                    >
                        <Input placeholder="Todo title" />
                    </Form.Item>

                    <Form.Item label="Description" name="description">
                        <TextArea rows={4} placeholder="Optional description" />
                    </Form.Item>

                    <Form.Item
                        label="Completed"
                        name="completed"
                        valuePropName="checked"
                    >
                        <Switch />
                    </Form.Item>

                    <Form.Item
                        label="Priority"
                        name="priority"
                        rules={[{ required: true, message: "Select a priority" }]}
                    >
                        <Select>
                            <Option value="low">
                                <span className={'text-lg rounded-full inline'}
                                    style={{ color: "green" }}>● </span>
                                Low
                            </Option>
                            <Option value="medium">
                                <span className={'text-lg rounded-full inline'}
                                    style={{ color: "yellow" }}>● </span>
                                Medium
                            </Option>
                            <Option value="high">
                                <span className={'text-lg rounded-full inline'}
                                    style={{ color: "red" }}>● </span>
                                High
                            </Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Category"
                        name="category_id"
                        rules={[{ required: true, message: "Select category" }]}
                    >
                        <Select defaultValue={1}>
                            {category.map((catg) => (
                                <Option key={catg.id} value={catg.id}>
                                    <span>
                                        <span className={'text-lg rounded-full inline'}
                                            style={{ color: catg.color }}>● </span>
                                        {catg.name}
                                    </span>
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div >
    );
};

export default CreateNewTodoModal