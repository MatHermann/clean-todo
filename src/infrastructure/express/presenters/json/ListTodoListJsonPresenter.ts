import ListTodoListOutputPort from "../../../../domain/usecases/list_task/ListTodoListOutputPort";
import {ListTodoListResponse} from "../../../../domain/usecases/list_task/ListTodoListResponse";

export default class ListTodoListJsonPresenter implements ListTodoListOutputPort {
  json: Object = {};

  present(response: ListTodoListResponse): void {
    this.json = response;
  }
}
