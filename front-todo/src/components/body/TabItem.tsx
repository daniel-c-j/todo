import { useContext, useState } from 'react'
import { Badge, Button, Dropdown, type MenuProps } from 'antd';
import { TodoContext } from '../../hooks/todo_context';
import { CheckCircleFilled, CheckCircleOutlined, MoreOutlined, } from '@ant-design/icons';
import axios, { AxiosError } from 'axios';
import { HOST, PORT } from '../../constants';
import type { Todo } from '../../types';
import { DeleteItemModal, EditItemModal } from '../modalForms/TodoModals';



export default function TabItem({ todo }: { todo: Todo }) {
    const { dispatch, category, category_id } = useContext(TodoContext);
    const [completed, setCompleted] = useState(todo.completed)


    const handleEditSave = async (value: Partial<Todo>) => {
        try {
            // TODO response feedback message notification
            dispatch({ type: "FETCH_START" })
            await axios({
                method: "PUT",
                url: `${HOST}:${PORT}/api/todos/${todo.id}`,
                data: value
            });
        } catch (e) {
            const axiosError = e as AxiosError;
            dispatch({ type: "FETCH_ERROR", payload: axiosError.message })
        } finally {
            dispatch({ type: "FORCE_REFRESH" })
        }
    };

    const handleDelete = async () => {
        try {
            // TODO response feedback message notification
            dispatch({ type: "FETCH_START" })
            await axios({
                method: "DELETE",
                url: `${HOST}:${PORT}/api/todos/${todo.id}`,
            });
        } catch (e) {
            const axiosError = e as AxiosError;
            dispatch({ type: "FETCH_ERROR", payload: axiosError.message })
        } finally {
            dispatch({ type: "FORCE_REFRESH" })
        }
    }

    const items: MenuProps['items'] = [
        {
            key: "1",
            icon: <EditItemModal iconOnly withText='Edit' todo={todo} category={category} onSaveEdit={handleEditSave} />,
        },
        {
            key: "2",
            icon: <DeleteItemModal iconOnly withText='Delete' onDelete={handleDelete} />
        },
    ];

    return (
        <div className='flex flex-row justify-between items-center w-full'>
            <div className='flex flex-row items-center justify-center'>

                <div className='text-2xl pr-2'>
                    <button title='Complete' className='cursor-pointer' onClick={async () => {
                        try {
                            // TODO response feedback message notification
                            await axios({
                                method: "PATCH",
                                url: `${HOST}:${PORT}/api/todos/${todo.id}/complete`,
                                data: { completed: !completed }
                            });
                            setCompleted(!completed)
                        } catch (e) {
                            const axiosError = e as AxiosError;
                            dispatch({ type: "FETCH_ERROR", payload: axiosError.message })
                        }
                    }}>
                        {completed ? (<CheckCircleFilled />) : <CheckCircleOutlined />}
                    </button>
                </div>

                <div className='text-left pl-3'>
                    <p className='text-lg'>
                        <span className='pr-2'>{todo.title}</span>

                        {category_id === -1 && (<span className='pr-1'><Badge count={todo.Category.name.substring(0, 10) + (todo.Category.name.length > 10 ? "..." : "")} color={todo.Category.color} /></span>)}

                        <Badge count={todo.priority} color={
                            todo.priority === "low" ? "#62e877"
                                : todo.priority === "medium" ? "#e4ce0f"
                                    : "#f04242"
                        } />
                    </p>

                    <p className='text-sm text-gray-500'>{todo.description}</p>
                </div>
            </div>

            <div>
                <div className="inline sm:hidden">
                    <Dropdown menu={{ items }} >
                        <Button type='text'>
                            <MoreOutlined />
                        </Button>
                    </Dropdown>
                </div>

                <div className="hidden sm:inline">
                    <EditItemModal iconOnly={false} todo={todo} category={category} onSaveEdit={handleEditSave} />
                    <DeleteItemModal iconOnly={false} onDelete={handleDelete} />
                </div>
            </div>
        </div >
    )
}
