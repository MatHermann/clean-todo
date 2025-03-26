import ListTodoListOutputPort from "../../../../domain/usecases/list_todolist/ListTodoListOutputPort";
import {ListTodoListResponse} from "../../../../domain/usecases/list_todolist/ListTodoListResponse";
import DateFormat from "../../../helpers/DateFormat";

export default class ListTodoListHtmlPresenter implements ListTodoListOutputPort {
  viewModel: Object = {};

  present(response: ListTodoListResponse): void {
    this.viewModel = {
      todoLists: response.todoLists.map(todoList => {
        let status: string;
        let statusBadge: string;
        if (todoList.tasks.every(task => !task.isDone)) {
          status = "Empty";
          statusBadge = "badge-warning";
        } else if (todoList.tasks.every(task => task.isDone)) {
          status = "Done";
          statusBadge = "badge-success";
        } else {
          status = "In progress...";
          statusBadge = "badge-primary";
        }
        return ({
          id: todoList.id,
          label: todoList.label,
          numTasks: todoList.tasks.length,
          status, statusBadge,
          createdAt: DateFormat.datetime(todoList.createdAt),
          updatedAt: DateFormat.datetime(todoList.updatedAt),
        });
      }),
    };
  }
}
