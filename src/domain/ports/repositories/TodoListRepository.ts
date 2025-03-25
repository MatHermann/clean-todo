import TodoList from "../../entities/TodoList";

export default interface TodoListRepository {
  findById(id: string): Promise<TodoList | null>;

  list(page: number, itemsPerPage: number): Promise<TodoList[]>;

  save(todoList: TodoList): Promise<void>;

  delete(todoList: TodoList): Promise<void>;
}
