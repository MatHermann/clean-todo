import {Model, Table, Column, HasMany} from "sequelize-typescript";
import TodoList from "../../../domain/entities/TodoList";
import TaskModel from "./Task";

@Table({tableName: "todo_lists"})
export default class TodoListModel extends Model {
  @Column({primaryKey: true})
  id!: string;

  @Column({allowNull: false})
  label!: string;

  @Column({allowNull: false})
  description!: string;

  @HasMany(() => TaskModel)
  _tasks?: TaskModel[];

  get tasks(): TaskModel[] {
    return this._tasks || [];
  }

  set tasks(value: TaskModel[]) {
    this._tasks = value
  }

  toDomainTodoList(): TodoList {
    return new TodoList(
      this.id,
      this.label,
      this.description,
      this.tasks.map(TaskModel.toDomainTask),
      this.createdAt,
      this.updatedAt,
    );
  }

  static toDomainTodoList(todoList: TodoListModel): TodoList {
    return todoList.toDomainTodoList();
  }

  static fromDomainTodoList(todoList: TodoList): TodoListModel {
    const result = new TodoListModel();
    result.id = todoList.id;
    result.label = todoList.label;
    result.description = todoList.description;
    result.tasks = todoList.tasks.map(TaskModel.fromDomainTask);
    result.createdAt = todoList.createdAt;
    result.updatedAt = todoList.updatedAt;
    return result;
  }
}
