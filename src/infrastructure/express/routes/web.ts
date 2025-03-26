import express, {Request, Response} from "express";
import {CreateTodoListWebController, CreateTodoListWebValidator} from "../controllers/web/CreateTodoListWebController";
import {ListTodoListWebController, ListTodoListWebValidator} from "../controllers/web/ListTodoListWebController";

const router = express.Router();

router.get("/", (req: Request, res: Response) => res.render("index"));

router.post("/todoList", CreateTodoListWebValidator, CreateTodoListWebController);
router.get("/todoList", ListTodoListWebValidator, ListTodoListWebController);
router.get("/todoList/new", (req: Request, res: Response) => res.render("todoList/new"));

export default {
  path: "/",
  handler: router,
};
