import express from "express";
import {ListTodoListApiValidator, ListTodoListApiController} from "../controllers/api/ListTodoListApiController";
import {CreateTodoListApiValidator, CreateTodoListApiController} from "../controllers/api/CreateTodoListApiController";

const router = express.Router();

router.get("/todoList", ListTodoListApiValidator, ListTodoListApiController);
router.post("/todoList", CreateTodoListApiValidator, CreateTodoListApiController);

export default {
  path: "/api",
  handler: router,
};
