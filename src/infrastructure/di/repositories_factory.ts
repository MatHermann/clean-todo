import TodoListRepository from "../../domain/ports/repositories/TodoListRepository";
// import MongooseTodoListRepository from "../mongoose/repositories/MongooseTodoListRepository";
import SequelizeTodoListRepository from "../sequelize/repositories/SequelizeTodoListRepository";

export const getTodoListRepository = (): TodoListRepository => {
  // return new MongooseTodoListRepository();
  return new SequelizeTodoListRepository()
};
