import {CreateTodoListRequest} from "./CreateTodoListRequest";
import CreateTodoListOutputPort from "./CreateTodoListOutputPort";
import CreateTodoListInputPort from "./CreateTodoListInputPort";
import TodoList from "../../entities/TodoList";
import Task from "../../entities/Task";
import TodoListRepository from "../../ports/repositories/TodoListRepository";
import IdGenerator from "../../ports/utils/IdGenerator";

export default class CreateTodoList implements CreateTodoListInputPort {
  constructor(
    private readonly idGenerator: IdGenerator,
    private readonly todoListRepository: TodoListRepository,
  ) {
  }

  async execute(request: CreateTodoListRequest, presenter: CreateTodoListOutputPort): Promise<void> {
    const todoList = new TodoList(
      this.idGenerator.next(),
      request.label,
      request.description,
      request.tasks.map(item => new Task(item.label, item.isDone)),
    );
    await this.todoListRepository.save(todoList);
    presenter.present({
      id: todoList.id,
      label: todoList.label,
      description: todoList.description,
      tasks: todoList.tasks.map(task => ({label: task.label, isDone: task.isDone})),
      createdAt: todoList.createdAt,
      updatedAt: todoList.updatedAt,
    });
  }
}
