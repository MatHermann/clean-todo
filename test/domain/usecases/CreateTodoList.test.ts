import {describe, test, expect} from "vitest";
import CreateTodoList from "../../../src/domain/usecases/create_todolist/CreateTodoList";
import IdGenerator from "../../../src/domain/ports/utils/IdGenerator";
import TodoListRepository from "../../../src/domain/ports/repositories/TodoListRepository";
import TodoList from "../../../src/domain/entities/TodoList";
import CreateTodoListOutputPort from "../../../src/domain/usecases/create_todolist/CreateTodoListOutputPort";
import {CreateTodoListResponse} from "../../../src/domain/usecases/create_todolist/CreateTodoListResponse";
import {CreateTodoListRequest} from "../../../src/domain/usecases/create_todolist/CreateTodoListRequest";

class FakeIdGenerator implements IdGenerator {
  next(): string {
    return Date.now() + String(Math.random());
  }
}

class FakeTodoListRepository implements TodoListRepository {
  private todoLists: { [id: string]: TodoList } = {};

  findById(id: string): Promise<TodoList | null> {
    return Promise.resolve(this.todoLists[id] || null);
  }

  list(page: number, itemsPerPage: number): Promise<TodoList[]> {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return Promise.resolve(Object.values(this.todoLists).slice(start, end));
  }

  save(todoList: TodoList): Promise<void> {
    this.todoLists[todoList.id] = todoList;
    return Promise.resolve();
  }

  delete(todoList: TodoList): Promise<void> {
    delete this.todoLists[todoList.id];
    return Promise.resolve();
  }
}

class FakeCreateTodoListPresenter implements CreateTodoListOutputPort {
  viewModel: CreateTodoListResponse | null = null;

  present(response: CreateTodoListResponse): void {
    this.viewModel = response;
  }
}

describe("CreateTodoList use case", () => {
  const idGenerator = new FakeIdGenerator();
  const repository = new FakeTodoListRepository();
  const useCase = new CreateTodoList(idGenerator, repository);
  const presenter = new FakeCreateTodoListPresenter();
  const request: CreateTodoListRequest = {
    label: "TodoList 1",
    description: "My first todo list",
    tasks: [
      {label: "Task 1", isDone: false},
      {label: "Task 2", isDone: false},
    ],
  };

  test("execute() creates a todo list", async () => {
    await useCase.execute(request, presenter);
    const viewModel = presenter.viewModel;

    expect(viewModel).not.toBeNull();
    if (viewModel) {
      expect(viewModel.id).toBeTypeOf("string");
      expect(viewModel.label).toBe(request.label);
      expect(viewModel.description).toBe(request.description);
      expect(viewModel.tasks).toEqual(request.tasks);
      expect(viewModel.createdAt).toBeInstanceOf(Date);
      expect(viewModel.updatedAt).toBeInstanceOf(Date);

      const todoList = await repository.findById(viewModel.id);
      expect(todoList).not.toBeNull();
    }
  });
});
