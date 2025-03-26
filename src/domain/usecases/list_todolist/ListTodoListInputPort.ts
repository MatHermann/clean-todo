import {ListTodoListRequest} from "./ListTodoListRequest";
import ListTodoListOutputPort from "./ListTodoListOutputPort";

export default interface ListTodoListInputPort {
  execute(request: ListTodoListRequest, presenter: ListTodoListOutputPort): Promise<void>;
}
