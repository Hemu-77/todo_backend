import express from "express";
import TodoController from "./todo.controller.js";

const todoRouter = express.Router();
const controller = new TodoController();

// these routes assume you already have req.userId via middleware

todoRouter.post("/", (req, res,next) =>  {
    controller.createTodo(req,res,next)
});
todoRouter.get("/", (req, res,next) =>  {
    controller.getTodos(req,res,next)
});
todoRouter.put("/:id",(req, res,next) =>  {
    controller.updateTodo(req,res,next)
});
todoRouter.delete("/:id", (req, res,next) =>  {
    controller.deleteTodo(req,res,next)
});

export default todoRouter;
