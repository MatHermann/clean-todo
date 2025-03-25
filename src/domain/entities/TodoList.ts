import PersistentEntity from "./base/PersistentEntity";
import Task from "./Task";

export default class TodoList extends PersistentEntity {
  constructor(
    id: string,
    private _label: string,
    private _description: string,
    private _tasks: Task[] = [],
    createdAt: Date = new Date(),
    updatedAt: Date = new Date(),
  ) {
    super(id, createdAt, updatedAt);
  }

  get label(): string {
    return this._label;
  }

  set label(value: string) {
    this._label = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get tasks(): Task[] {
    return this._tasks;
  }

  set tasks(value: Task[]) {
    this._tasks = value;
  }

  isDone(): boolean {
    return this._tasks.every(item => item.isDone);
  }

  complete(): void {
    this._tasks.forEach(item => item.complete());
  }

  isEmpty(): boolean {
    return this._tasks.every(item => !item.isDone);
  }

  clear(): void {
    this._tasks.forEach(item => item.clear());
  }
}
