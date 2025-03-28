import {describe, test, expect} from "vitest";
import Task from "../../../src/domain/entities/Task";
import TodoList from "../../../src/domain/entities/TodoList";

describe("TodoList entity", () => {
  const task1 = new Task("Task 1", true);
  const task2 = new Task("Task 2", false);
  const todoList1 = new TodoList("", "", "", []);
  const todoList2 = new TodoList("", "", "", [task1]);
  const todoList3 = new TodoList("", "", "", [task2]);
  const todoList4 = new TodoList("", "", "", [task1, task2]);
  const todoList5 = new TodoList("", "", "", [task1, task1]);
  const todoList6 = new TodoList("", "", "", [task2, task2]);

  test("isDone() returns true when all tasks are complete and false otherwise", () => {
    expect(todoList1.isDone()).toBe(true);
    expect(todoList2.isDone()).toBe(true);
    expect(todoList3.isDone()).toBe(false);
    expect(todoList4.isDone()).toBe(false);
    expect(todoList5.isDone()).toBe(true);
    expect(todoList6.isDone()).toBe(false);
  });

  test("isEmpty() returns true when no task is complete and false otherwise", () => {
    expect(todoList1.isEmpty()).toBe(true);
    expect(todoList2.isEmpty()).toBe(false);
    expect(todoList3.isEmpty()).toBe(true);
    expect(todoList4.isEmpty()).toBe(false);
    expect(todoList5.isEmpty()).toBe(false);
    expect(todoList6.isEmpty()).toBe(true);
  });

  test("complete() completes all tasks", () => {
    todoList1.complete()
    todoList2.complete()
    todoList3.complete()
    todoList4.complete()
    todoList5.complete()
    todoList6.complete()
    expect(todoList1.isDone()).toBe(true);
    expect(todoList2.isDone()).toBe(true);
    expect(todoList3.isDone()).toBe(true);
    expect(todoList4.isDone()).toBe(true);
    expect(todoList5.isDone()).toBe(true);
    expect(todoList6.isDone()).toBe(true);
  });

  test("clear() clears all tasks", () => {
    todoList1.clear()
    todoList2.clear()
    todoList3.clear()
    todoList4.clear()
    todoList5.clear()
    todoList6.clear()
    expect(todoList1.isEmpty()).toBe(true);
    expect(todoList2.isEmpty()).toBe(true);
    expect(todoList3.isEmpty()).toBe(true);
    expect(todoList4.isEmpty()).toBe(true);
    expect(todoList5.isEmpty()).toBe(true);
    expect(todoList6.isEmpty()).toBe(true);
  });
});
