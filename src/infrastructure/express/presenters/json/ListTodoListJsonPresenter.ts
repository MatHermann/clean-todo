import ListTodoListOutputPort from "../../../../domain/usecases/list_todolist/ListTodoListOutputPort";
import {ListTodoListResponse} from "../../../../domain/usecases/list_todolist/ListTodoListResponse";

export default class ListTodoListJsonPresenter implements ListTodoListOutputPort {
  json: Object = {};

  present(response: ListTodoListResponse): void {
    this.json = response;
  }
}
