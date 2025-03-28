import {describe, test, expect} from "vitest";
import Task from "../../../src/domain/entities/Task";

describe("Task entity", () => {
  const task1 = new Task("Task 1", true);
  const task2 = new Task("Task 2", false);

  test("complete() sets isDone to true", () => {
    task1.complete();
    task2.complete();
    expect(task1.isDone).toBe(true);
    expect(task2.isDone).toBe(true);
  });

  test("clear() sets isDone to false", () => {
    task1.clear();
    task2.clear();
    expect(task1.isDone).toBe(false);
    expect(task2.isDone).toBe(false);
  });
});
