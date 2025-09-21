import { Radio, Select, Space, } from 'antd';
import { useContext } from 'react';
import { TodoContext } from '../../hooks/todo_context';
import type { AllowedSortBy, AllowedSortOrder } from '../../types';

export default function BodyOptions() {
    const { completed, priority, dispatch, sort_order, sort_by } = useContext(TodoContext);

    return (
        <div className="inline-block mb-4 sm:mb-10">
            <Space className='pr-8 mb-4'>
                <span className='font-normal'>Status:</span>

                <Radio.Group value={completed} onChange={(e) => dispatch({ type: "SET_FILTERS", payload: { completed: e.target.value } })}>
                    <Radio.Button value={false}>On Going</Radio.Button>
                    <Radio.Button value={true}>Completed</Radio.Button>
                </Radio.Group>
            </Space>

            <Space className='pr-8 mb-4'>
                <span className='font-normal'>Priority:</span>
                <Radio.Group value={priority} onChange={(e) => dispatch({ type: "SET_FILTERS", payload: { priority: e.target.value } })}>
                    <Radio.Button value="none">None</Radio.Button>

                    <Radio.Button value="low">Low</Radio.Button>
                    <Radio.Button value="medium">Medium</Radio.Button>
                    <Radio.Button value="high">High</Radio.Button>
                </Radio.Group>
            </Space>

            <Space >
                Sort:
                <Select
                    defaultValue={sort_by + "." + sort_order}
                    style={{ width: 150 }}
                    onChange={(e) => {
                        dispatch({
                            type: 'SET_FILTERS',
                            payload: {
                                sort_by: e.split(".")[0] as AllowedSortBy,
                                sort_order: e.split(".")[1] as AllowedSortOrder
                            }
                        })
                    }}
                    options={[
                        { value: 'created_at.DESC', label: 'Newest' },
                        { value: 'created_at.ASC', label: 'Oldest' },
                        { value: 'updated_at.DESC', label: 'Recently updated' },
                        // { value: 'updated_at.ASC', label: 'Oldest updated' },
                        { value: 'title.ASC', label: 'A-Z' },
                        { value: 'title.DESC', label: 'Z-A' },
                    ]}
                />
            </Space>
        </div>
    )
}
