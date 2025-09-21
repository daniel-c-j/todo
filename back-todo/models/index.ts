import defineCategoryModel from "./category.model";
import defineTodoModel from "./todo.model";

// ! Relational has to be in one file

const Category = defineCategoryModel();
const Todo = defineTodoModel();

// Cardinality TODO -> Category : N-1
Category.hasMany(Todo, { foreignKey: "category_id" });
Todo.belongsTo(Category, { foreignKey: "category_id" });

export { Category, Todo };
