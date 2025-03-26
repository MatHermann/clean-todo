import CreateTodoListOutputPort from "../../../../domain/usecases/create_todolist/CreateTodoListOutputPort";
import {CreateTodoListResponse} from "../../../../domain/usecases/create_todolist/CreateTodoListResponse";

export default class CreateTodoListJsonPresenter implements CreateTodoListOutputPort {
  json: Object = {};

  present(response: CreateTodoListResponse): void {
    this.json = response;
  }
}
