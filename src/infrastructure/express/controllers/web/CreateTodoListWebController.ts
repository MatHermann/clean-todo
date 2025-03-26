import {Request, Response} from "express";
import {checkSchema, validationResult, matchedData} from "express-validator";
import {getCreateTodoList} from "../../../di/usecases_factory";
import CreateTodoListHtmlPresenter from "../../presenters/html/CreateTodoListHtmlPresenter";

export const CreateTodoListWebValidator = checkSchema(
  {
    label: {notEmpty: true, isString: true},
    description: {notEmpty: true, isString: true},
    tasks: {isArray: true},
    "tasks.*.label": {notEmpty: true, isString: true},
    "tasks.*.isDone": {isBoolean: true, optional: true},
  },
  ["body"],
);

export const CreateTodoListWebController = async (req: Request, res: Response) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    res.status(400).send(JSON.stringify(result.array(), null, 2));
    return;
  }

  const useCase = getCreateTodoList();
  const presenter = new CreateTodoListHtmlPresenter();

  const {label, description, tasks} = matchedData(req);
  const data = {
    label, description,
    tasks: tasks.map((task: { label: string, isDone?: string }) => ({
      label: task.label,
      isDone: task.isDone === "true",
    })),
  };

  await useCase.execute(data, presenter);
  res.redirect("/todoList");
};
