import {ListTodoListResponse} from "./ListTodoListResponse";

export default interface ListTodoListOutputPort {
  present(response: ListTodoListResponse): void;
}
