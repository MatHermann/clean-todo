import {Request, Response} from "express";
import {checkSchema, matchedData, validationResult} from "express-validator";
import {getCreateTodoList} from "../../../di/usecases_factory";
import CreateTodoListJsonPresenter from "../../presenters/json/CreateTodoListJsonPresenter";

export const CreateTodoListApiValidator = checkSchema(
  {
    label: {notEmpty: true, isString: true},
    description: {notEmpty: true, isString: true},
    tasks: {isArray: true},
    "tasks.*.label": {notEmpty: true, isString: true},
    "tasks.*.isDone": {isBoolean: true},
  },
  ["body"],
)

export const CreateTodoListApiController = async (req: Request, res: Response) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    res.status(400).json({errors: result.array()})
    return;
  }

  const useCase = getCreateTodoList();
  const presenter = new CreateTodoListJsonPresenter();

  const {label, description, tasks} = matchedData(req);
  const data = {label, description, tasks};

  await useCase.execute(data, presenter);
  res.json(presenter.json);
}
