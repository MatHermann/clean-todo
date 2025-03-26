import CreateTodoListInputPort from "../../domain/usecases/create_todolist/CreateTodoListInputPort";
import CreateTodoList from "../../domain/usecases/create_todolist/CreateTodoList";
import ListTodoListInputPort from "../../domain/usecases/list_todolist/ListTodoListInputPort";
import ListTodoList from "../../domain/usecases/list_todolist/ListTodoList";
import {getIdGenerator} from "./adapters_factory";
import {getTodoListRepository} from "./repositories_factory";

export const getCreateTodoList = (): CreateTodoListInputPort => {
  return new CreateTodoList(getIdGenerator(), getTodoListRepository());
};

export const getListTodoList = (): ListTodoListInputPort => {
  return new ListTodoList(getTodoListRepository());
};
