import {CreateTodoListRequest} from "./CreateTodoListRequest";
import CreateTodoListOutputPort from "./CreateTodoListOutputPort";

export default interface CreateTodoListInputPort {
  execute(request: CreateTodoListRequest, presenter: CreateTodoListOutputPort): Promise<void>;
}
