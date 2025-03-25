import {ListTodoListRequest} from "./ListTodoListRequest";
import ListTodoListOutputPort from "./ListTodoListOutputPort";
import ListTodoListInputPort from "./ListTodoListInputPort";
import TodoListRepository from "../../ports/repositories/TodoListRepository";

export default class ListTodoList implements ListTodoListInputPort {
  constructor(
    private readonly todoListRepository: TodoListRepository,
  ) {
  }

  async execute(request: ListTodoListRequest, presenter: ListTodoListOutputPort): Promise<void> {
    const todoLists = await this.todoListRepository.list(request.page, request.itemsPerPage);
    presenter.present({
      page: request.page,
      itemsPerPage: request.itemsPerPage,
      todoLists: todoLists.map(todoList => ({
        id: todoList.id,
        label: todoList.label,
        description: todoList.description,
        tasks: todoList.tasks.map(it => ({label: it.label, isDone: it.isDone})),
        createdAt: todoList.createdAt,
        updatedAt: todoList.updatedAt,
      })),
    });
  }
}
