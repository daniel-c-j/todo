import { useContext, useState } from 'react';
import { Button, ColorPicker, Form, Input, Modal, Tooltip } from 'antd';
import type { Category } from '../../types';
import type { AxiosError } from 'axios';
import axios from 'axios';
import { HOST, PORT } from '../../constants';
import { TodoContext } from '../../hooks/todo_context';
import { useTailwindSm } from '../../hooks/sm-tailwind-breakpoint';

const CategoryTab = ({ color, name, id, current_id }: { color: string, name: string, id: number, current_id: number }) => {
    const isBiggerThanSM = useTailwindSm();

    const { dispatch, isLoading } = useContext(TodoContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    const formattedName = name.substring(0, 10) + (name.length > 10 ? "..." : "");

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleFinish = async (values: Partial<Category>) => {
        try {
            // TODO response feedback message notification
            dispatch({ type: "FETCH_START" })
            await axios({
                method: "PUT",
                url: `${HOST}:${PORT}/api/categories/${id}`,
                data: values
            });
        } catch (e) {
            const axiosError = e as AxiosError;
            dispatch({ type: "FETCH_ERROR", payload: axiosError.message })
        } finally {
            dispatch({ type: "FORCE_REFRESH" })
            setIsModalOpen(false);
        }
    };

    const title = <>
        <div className={'hidden sm:block size-4 rounded-full' + (current_id === id ? " animate-bounce" : "")}
            style={{ backgroundColor: color }} />

        <span className={'inline sm:hidden text-xl rounded-full ' + (current_id === id ? " animate-bounce" : "")}
            style={{ color }}>● </span>

        <span className="font-semibold">{formattedName}</span>
    </>

    const handleDelete = async () => {
        try {
            // TODO response feedback message notification
            dispatch({ type: "FETCH_START" })
            await axios({
                method: "DELETE",
                url: `${HOST}:${PORT}/api/categories/${current_id}`,
            });

            // Go back to "All"
            dispatch({ type: "CLEAR_PAGE_LIMIT" })
            dispatch({ type: "SET_FILTERS", payload: { category_id: -1 } })
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
        <div className={isBiggerThanSM ? '' : 'px-3'}>
            {id > 0 ? (
                <>
                    <Tooltip title="Double click to edit" mouseEnterDelay={0.5}>
                        <button onDoubleClick={showModal} disabled={isLoading} >
                            {title}
                        </button>
                    </Tooltip>

                    <Modal
                        title="Edit Category"
                        open={isModalOpen}
                        onCancel={handleCancel}
                        closable={isLoading}
                        footer={
                            [
                                <Button type="text" htmlType="button" disabled={isLoading} onClick={() => handleCancel()}>
                                    Cancel
                                </Button>,
                                <Button type="primary" disabled={isLoading} style={{ background: "red" }} onClick={() => handleDelete()}>
                                    {isLoading ? "Loading..." : "Delete"}
                                </Button>,
                                <Button type="primary" htmlType="submit" disabled={isLoading} onClick={() => form.submit()}>
                                    {isLoading ? "Loading..." : "Save"}
                                </Button>
                            ]
                        }>
                        <Form form={form}
                            layout="vertical"
                            initialValues={{
                                name,
                                color,
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
                </>
            ) : (title)
            }
        </div>
    );
};

export default CategoryTab;