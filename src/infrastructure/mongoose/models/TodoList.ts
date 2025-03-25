import mongoose, {Schema, Model, HydratedDocument, Types} from "mongoose";
import TodoList from "../../../domain/entities/TodoList";

interface ITodoListMethods {
  toDomainTodoList(): TodoList;
}

export type TodoListDocument = HydratedDocument<TodoList, ITodoListMethods>;

interface ITodoListModel extends Model<TodoList, {}, ITodoListMethods> {
  fromDomainTodoList(task: TodoList): TodoListDocument;

  toDomainTodoList(task: TodoListDocument): TodoList;
}

const TodoListSchema = new Schema<TodoList, ITodoListModel>(
  {
    label: {type: String, required: true},
    description: {type: String, required: true},
    tasks: [{
      label: {type: String, required: true},
      isDone: {type: Boolean, required: true},
    }],
  },
  {timestamps: true},
);

TodoListSchema.method("toDomainTodoList", function () {
  return new TodoList(
    this.id,
    this.label,
    this.description,
    this.tasks,
    this.createdAt,
    this.updatedAt,
  );
});

TodoListSchema.static("toDomainTodoList", function (task: TodoListDocument) {
  return task.toDomainTodoList();
});

TodoListSchema.static("fromDomainTodoList", function (todoList: TodoList) {
  const self = mongoose.model<TodoList, ITodoListModel>("TodoList", TodoListSchema);
  return new self({
    _id: new Types.ObjectId(todoList.id),
    label: todoList.label,
    description: todoList.description,
    tasks: todoList.tasks.map(task => ({label: task.label, isDone: task.isDone})),
    createdAt: todoList.createdAt,
    updatedAt: todoList.updatedAt,
  });
});

export default mongoose.model<TodoList, ITodoListModel>("TodoList", TodoListSchema);
