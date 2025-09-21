import Search from 'antd/es/input/Search';
import { useContext, useEffect, useState } from 'react';
import { TodoContext } from '../hooks/todo_context';

export default function SearchBar() {
    const { dispatch, isLoading } = useContext(TodoContext);

    const [value, setValue] = useState<string>(""); // Immediate value
    const [debounced, setDebounced] = useState<string>(""); // Value after debounce
    const DEBOUNCE_MS = 300;

    useEffect(() => {
        const id = setTimeout(() => {
            setDebounced(value);
        }, DEBOUNCE_MS);

        // Clean up automatically cancels the pending update if `value` changes before timeout
        return () => clearTimeout(id);
    }, [value]);

    useEffect(() => {
        dispatch({ type: 'SET_FILTERS', payload: { title: debounced } })
    }, [debounced, dispatch]);

    return (
        <div className='mt-2'>
            <Search placeholder='Search' size='large' loading={isLoading} onChange={(e) => {
                setValue(e.target.value)
            }} />
        </div>
    )
}
