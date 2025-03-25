import express from "express";
import {ListTodoListValidator, ListTodoListController} from "../controllers/api/ListTodoListController";
import {CreateTodoListValidator, CreateTodoListController} from "../controllers/api/CreateTodoListController";

const router = express.Router();

router.get("/todoList", ListTodoListValidator, ListTodoListController);
router.post("/todoList", CreateTodoListValidator, CreateTodoListController);

export default {
  path: "/api",
  handler: router,
};
