import CreateTodoListOutputPort from "../../../../domain/usecases/create_task/CreateTodoListOutputPort";
import {CreateTodoListResponse} from "../../../../domain/usecases/create_task/CreateTodoListResponse";

export default class CreateTodoListHtmlPresenter implements CreateTodoListOutputPort {
  viewModel: Object = {};

  present(response: CreateTodoListResponse): void {
  }
}
