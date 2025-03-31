import {Transaction} from "sequelize";
import TodoListRepository from "../../../domain/ports/repositories/TodoListRepository";
import TodoList from "../../../domain/entities/TodoList";
import TodoListModel from "../models/TodoList";
import TaskModel from "../models/Task";

export default class SequelizeTodoListRepository implements TodoListRepository {
  findById(id: string): Promise<TodoList | null> {
    return new Promise((resolve, reject) => {
      TodoListModel.findByPk(id)
        .then((todoList: TodoListModel | null) => resolve(todoList ? todoList.toDomainTodoList() : null))
        .catch(reject);
    });
  }

  list(page: number, itemsPerPage: number): Promise<TodoList[]> {
    return new Promise((resolve, reject) => {
      TodoListModel.findAll({
        order: [["id", "DESC"]],
        offset: (page - 1) * itemsPerPage,
        limit: itemsPerPage,
        include: TaskModel,
      })
        .then((todoLists: TodoListModel[]) => resolve(todoLists.map(TodoListModel.toDomainTodoList)))
        .catch(reject);
    });
  }

  save(todoList: TodoList): Promise<void> {
    return new Promise((resolve, reject) => {
      TodoListModel.sequelize?.transaction(async (transaction: Transaction) => {
        const todoListModel = TodoListModel.fromDomainTodoList(todoList);
        await todoListModel.save({transaction});
        await TaskModel.destroy({where: {todoListId: todoListModel.id}, transaction});
        await Promise.all(todoListModel.tasks.map(task => {
          task.todoListId = todoListModel.id;
          return task.save({transaction});
        }))
      })
        .then(() => resolve())
        .catch(reject);
    });
  }

  delete(todoList: TodoList): Promise<void> {
    return new Promise((resolve, reject) => {
      TodoListModel.fromDomainTodoList(todoList)
        .destroy()
        .then(() => resolve())
        .catch(reject);
    });
  }
}
