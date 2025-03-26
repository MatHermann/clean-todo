import {Request, Response} from "express";
import {checkSchema, validationResult, matchedData} from "express-validator";
import {getListTodoList} from "../../../di/usecases_factory";
import ListTodoListHtmlPresenter from "../../presenters/html/ListTodoListHtmlPresenter";

export const ListTodoListWebValidator = checkSchema(
  {
    page: {isInt: {options: {min: 1}}},
  },
  ["query"],
);

export const ListTodoListWebController = async (req: Request, res: Response) => {
  const result = validationResult(req);

  const useCase = getListTodoList();
  const presenter = new ListTodoListHtmlPresenter();

  const page = result.isEmpty() ? matchedData(req).page : 1;
  const data = {page, itemsPerPage: 10};

  await useCase.execute(data, presenter);
  res.render("todoList/list", presenter.viewModel);
};
