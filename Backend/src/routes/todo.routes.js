import { Router } from "express";

import {
  createTodo,
  deleteTodo,
  getAllTodos,
  getTodoById,
  toggleTodoDoneStatus,
  updateTodo,
} from "../controller/todo.controllers.js";
import {
  createTodoValidator,
  getAllTodosQueryValidators,
  updateTodoValidator,
} from "../validators/todo.validators.js";
import { mongoIdPathVariableValidator } from "../validators/mongodb.validators.js";
import { validate } from "../validators/validate.js";

const router = Router();

router
  .route("/")
  .post(createTodoValidator(), validate, createTodo)
  .get(getAllTodosQueryValidators(), validate, getAllTodos);

router
  .route("/:todoId")
  .get(mongoIdPathVariableValidator("todoId"), validate, getTodoById)
  .patch(
    mongoIdPathVariableValidator("todoId"),
    updateTodoValidator(),
    validate,
    updateTodo
  )
  .delete(mongoIdPathVariableValidator("todoId"), validate, deleteTodo);

router
  .route("/toggle/status/:todoId")
  .patch(
    mongoIdPathVariableValidator("todoId"),
    validate,
    toggleTodoDoneStatus
  );

export default router;
