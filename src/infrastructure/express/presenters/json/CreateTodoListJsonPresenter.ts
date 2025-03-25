import CreateTodoListOutputPort from "../../../../domain/usecases/create_task/CreateTodoListOutputPort";
import {CreateTodoListResponse} from "../../../../domain/usecases/create_task/CreateTodoListResponse";

export default class CreateTodoListJsonPresenter implements CreateTodoListOutputPort {
  json: Object = {};

  present(response: CreateTodoListResponse): void {
    this.json = response;
  }
}
