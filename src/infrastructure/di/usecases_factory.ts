import CreateTodoListInputPort from "../../domain/usecases/create_task/CreateTodoListInputPort";
import CreateTodoList from "../../domain/usecases/create_task/CreateTodoList";
import ListTodoListInputPort from "../../domain/usecases/list_task/ListTodoListInputPort";
import ListTodoList from "../../domain/usecases/list_task/ListTodoList";
import {getIdGenerator} from "./adapters_factory";
import {getTodoListRepository} from "./repositories_factory";

export const getCreateTodoList = (): CreateTodoListInputPort => {
  return new CreateTodoList(getIdGenerator(), getTodoListRepository());
};

export const getListTodoList = (): ListTodoListInputPort => {
  return new ListTodoList(getTodoListRepository());
};
