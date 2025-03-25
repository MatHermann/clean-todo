import express, {Request, Response} from "express";
import {CreateTodoListController, CreateTodoListValidator} from "../controllers/web/CreateTodoListController";
import {ListTodoListController, ListTodoListValidator} from "../controllers/web/ListTodoListController";

const router = express.Router();

router.get("/", (req: Request, res: Response) => res.render("index"));

router.post("/todoList", CreateTodoListValidator, CreateTodoListController);
router.get("/todoList", ListTodoListValidator, ListTodoListController);
router.get("/todoList/new", (req: Request, res: Response) => res.render("todoList/new"));

export default {
  path: "/",
  handler: router,
};
