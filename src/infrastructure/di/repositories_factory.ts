import TodoListRepository from "../../domain/ports/repositories/TodoListRepository";
import MongooseTodoListRepository from "../mongoose/repositories/MongooseTodoListRepository";

export const getTodoListRepository = (): TodoListRepository => {
  return new MongooseTodoListRepository();
};
