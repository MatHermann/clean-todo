import {CreateTodoListResponse} from "./CreateTodoListResponse";

export default interface CreateTodoListOutputPort {
  present(response: CreateTodoListResponse): void;
}
