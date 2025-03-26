import CreateTodoListOutputPort from "../../../../domain/usecases/create_todolist/CreateTodoListOutputPort";
import {CreateTodoListResponse} from "../../../../domain/usecases/create_todolist/CreateTodoListResponse";

export default class CreateTodoListHtmlPresenter implements CreateTodoListOutputPort {
  viewModel: Object = {};

  present(response: CreateTodoListResponse): void {
  }
}
