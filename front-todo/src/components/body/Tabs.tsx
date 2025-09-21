import { Button, Tabs } from 'antd';
import { List } from 'antd';
import { useContext } from 'react';
import { TodoContext, type TodoAction } from '../../hooks/todo_context';
import TabPane from 'antd/es/tabs/TabPane';
import CategoryTab from '../modalForms/CategoryTab';
import TabItem from './TabItem';
import type { TodoContextType } from '../../types';
import { uid } from 'uid/secure';
import { useTailwindSm } from '../../hooks/sm-tailwind-breakpoint';

export default function BodyTabs() {
    const { category, dispatch, category_id, data, isError, isLoading, page, limit } = useContext(TodoContext);
    const isBiggerThanSM = useTailwindSm();

    return (
        <>
            <Tabs
                tabPosition={isBiggerThanSM ? "left" : "top"}
                tabBarGutter={20}
                style={isBiggerThanSM ? { marginLeft: -20 } : {}}
                activeKey={category_id?.toString()}
                onChange={(e) => {
                    dispatch({ type: "CLEAR_PAGE_LIMIT" })
                    dispatch({ type: "SET_FILTERS", payload: { category_id: Number(e) } })
                }}>

                {/* This is to include all */}
                <TabPane key={-1} tab={
                    <CategoryTab id={-1} color={"#555555"} current_id={category_id ?? 0} name={"All"} />
                }>
                    <TabList data={data} isError={isError} isLoading={isLoading} page={page} limit={limit} dispatch={dispatch} />
                </TabPane>

                {category.length === 0 || category === null
                    ? (<p>No item found</p>)
                    : category!.map((catg) => (
                        <TabPane key={catg.id} tab={
                            <CategoryTab id={Number(catg.id)} color={catg.color} current_id={category_id ?? 0} name={catg.name} />
                        }>
                            <TabList data={data} category_id={category_id} isError={isError} isLoading={isLoading} page={page} limit={limit} dispatch={dispatch} />
                        </TabPane>
                    ))}
            </Tabs >
        </>
    )
}


export function TabList({ data, dispatch, isError, isLoading, page, limit }: Partial<TodoContextType> & { dispatch: React.ActionDispatch<[action: TodoAction]> }) {
    const loadMore =
        !isLoading && !(data!.length === 0 || data === null) && data!.length === ((page || 1) * (limit || 10)) ? (
            <div style={{
                textAlign: 'center',
                marginTop: 12,
                height: 32,
                lineHeight: '32px',
            }}  >
                <Button onClick={() => dispatch({ type: "SET_FILTERS", payload: { page: (page || 1), limit: ((page || 0) + 1) * 10 } })}>Load more</Button>
            </div>
        ) : null;


    return (
        <List loading={isLoading} itemLayout="horizontal" loadMore={loadMore} >
            {!isLoading && !isError ?
                data!.length === 0 || data === null
                    ? (<p>No item found!</p>)
                    : data?.map((todo) => (
                        <List.Item key={uid(8)}>
                            <TabItem todo={todo} />
                        </List.Item>
                    ))
                : null
            }
        </List>
    )
}
