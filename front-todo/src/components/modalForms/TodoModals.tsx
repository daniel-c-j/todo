import { useContext, useState } from "react";
import type { Category, Todo } from "../../types";
import { Button, Form, Input, Modal, Select, Switch } from "antd";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { TodoContext } from "../../hooks/todo_context";

const { Option } = Select;
const { TextArea } = Input;

const EditItemModal = ({ iconOnly = false, withText, todo, category, onSaveEdit }: { withText?: string, iconOnly: boolean, todo: Todo, category: Category[], onSaveEdit: (dt: Partial<Todo>) => Promise<void> }) => {
    const { isLoading } = useContext(TodoContext);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleFinish = async (values: Partial<Todo>) => {
        await onSaveEdit(values)
        setIsModalOpen(false);
    };

    return (
        <div className='mr-3 inline'>
            <Button onClick={showModal} disabled={isLoading} className='pt-1' size={iconOnly ? 'small' : 'large'} type={iconOnly ? 'link' : 'text'} style={{ color: "#000000" }}>
                <EditFilled />{withText !== null && withText}
            </Button>

            <Modal
                title="Edit"
                open={isModalOpen}
                closable={isLoading}
                onCancel={handleCancel}
                footer={
                    [
                        <Button disabled={isLoading} type="primary" htmlType="submit" onClick={() => form.submit()}>
                            {isLoading ? "Loading..." : "Save"}
                        </Button>
                    ]
                } >
                <Form form={form}
                    layout="vertical"
                    initialValues={{
                        title: todo.title ?? "",
                        description: todo.description ?? "",
                        completed: todo.completed ?? false,
                        priority: todo.priority ?? "medium",
                        category_id: todo.Category.id ?? 1,
                    }}
                    onFinish={handleFinish}
                >
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

                    {/* TODO Duedate */}
                    {/* <Form.Item label="Due date" name="due_date">
                <DatePicker showTime />
            </Form.Item> */}
                </Form>
            </Modal>
        </div >
    );
};


const DeleteItemModal = ({ iconOnly = false, withText, onDelete }: { withText?: string, iconOnly: boolean, onDelete: () => Promise<void> }) => {
    const { isLoading } = useContext(TodoContext);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = async () => {
        await onDelete()
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div className='mr-3 inline'>
            <Button onClick={showModal} disabled={isLoading} className='pt-1' size={iconOnly ? 'small' : 'large'} type={iconOnly ? 'link' : 'text'} style={{ color: "#000000" }}>
                <DeleteFilled />{withText !== null && withText}
            </Button>

            <Modal
                title="Are you sure?"
                open={isModalOpen}
                closable={isLoading}
                onOk={handleOk}
                okType='danger'
                onCancel={handleCancel}
            >
                <p>This action is destructive.</p>
            </Modal>
        </div>
    );
};

export { EditItemModal, DeleteItemModal }