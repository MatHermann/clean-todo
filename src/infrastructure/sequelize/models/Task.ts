import {Model, Table, Column, ForeignKey} from "sequelize-typescript";
import TodoListModel from "./TodoList";
import Task from "../../../domain/entities/Task";

@Table({tableName: "tasks", timestamps: false})
export default class TaskModel extends Model {
  @Column({allowNull: false})
  label!: string;

  @Column({allowNull: false})
  isDone!: boolean;

  @ForeignKey(() => TodoListModel)
  @Column({allowNull: false})
  todoListId?: string;

  toDomainTask(): Task {
    return new Task(this.label, this.isDone);
  }

  static toDomainTask(task: TaskModel): Task {
    return task.toDomainTask();
  }

  static fromDomainTask(task: Task): TaskModel {
    const result = new TaskModel();
    result.label = task.label;
    result.isDone = task.isDone;
    return result;
  }
}
