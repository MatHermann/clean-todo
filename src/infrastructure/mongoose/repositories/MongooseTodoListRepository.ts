import TodoListRepository from "../../../domain/ports/repositories/TodoListRepository";
import TodoList from "../../../domain/entities/TodoList";
import TodoListModel, {TodoListDocument} from "../models/TodoList";

export default class MongooseTodoListRepository implements TodoListRepository {
  findById(id: string): Promise<TodoList | null> {
    return new Promise((resolve, reject) => {
      TodoListModel.findById(id)
        .then((doc: TodoListDocument | null) => resolve(doc ? doc.toDomainTodoList() : null))
        .catch(reject);
    });
  }

  list(page: number, itemsPerPage: number): Promise<TodoList[]> {
    return new Promise((resolve, reject) => {
      TodoListModel.find()
        .sort({_id: -1})
        .skip((page - 1) * itemsPerPage)
        .limit(itemsPerPage)
        .then((docs: TodoListDocument[]) => resolve(docs.map(TodoListModel.toDomainTodoList)))
        .catch(reject);
    });
  }

  save(todoList: TodoList): Promise<void> {
    return new Promise((resolve, reject) => {
      TodoListModel.fromDomainTodoList(todoList)
        .save()
        .then(() => resolve())
        .catch(reject);
    });
  }

  delete(todoList: TodoList): Promise<void> {
    return new Promise((resolve, reject) => {
      TodoListModel.deleteOne({_id: todoList.id})
        .then(() => resolve())
        .catch(reject);
    });
  }
}
