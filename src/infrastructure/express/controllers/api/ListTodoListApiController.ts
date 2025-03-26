import {Request, Response} from "express";
import {checkSchema, validationResult, matchedData} from "express-validator";
import {getListTodoList} from "../../../di/usecases_factory";
import ListTodoListJsonPresenter from "../../presenters/json/ListTodoListJsonPresenter";

export const ListTodoListApiValidator = checkSchema(
  {
    page: {isInt: {options: {min: 1}}},
    itemsPerPage: {isInt: {options: {min: 1, max: 50}}},
  },
  ["query"],
);

export const ListTodoListApiController = async (req: Request, res: Response) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    res.status(400).json({errors: result.array()})
    return;
  }

  const useCase = getListTodoList();
  const presenter = new ListTodoListJsonPresenter();

  const {page, itemsPerPage} = matchedData(req);
  const data = {page, itemsPerPage};

  await useCase.execute(data, presenter);
  res.json(presenter.json);
};
