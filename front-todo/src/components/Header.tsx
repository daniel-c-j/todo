import CreateNewCategoryModal from './modalForms/NewCategoryModal';
import CreateNewTodoModal from './modalForms/NewTodoModal';
import SearchBar from './Search';

export default function Header() {
    return (
        <div>
            <h1 className="text-4xl font-semibold my-2">TODO</h1>
            <CreateNewTodoModal />
            <CreateNewCategoryModal />

            <SearchBar />
        </div>
    )
}
