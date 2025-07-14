import TodoRepository from "./todo.repo.js";

export default class TodoController {
  constructor() {
    this.todoRepository = new TodoRepository();
  }

  async createTodo(req, res, next) {
    const { title, description, completed, reminderTime, date } = req.body;
    const userId = req.userID; // assumed to be set by auth middleware
    console.log(userId);
    

    if (!title || !reminderTime || !date) {
      return res.status(400).json({ error: "Title, reminderTime and date are required." });
    }

    try {
      const todo = await this.todoRepository.create({
        title,
        description,
        completed,
        reminderTime,
        date,
        userId
      });

      res.status(201).json({ message: "Todo created", todo });
    } catch (err) {
      next(err);
    }
  }

  async getTodos(req, res, next) {
    try {
      const todos = await this.todoRepository.findAllByUser(req.userID);
      res.status(200).json(todos);
    } catch (err) {
      next(err);
    }
  }

  async updateTodo(req, res, next) {
    try {
      const updated = await this.todoRepository.update(req.params.id, req.body);
      res.status(200).json(updated);
    } catch (err) {
      next(err);
    }
  }

  async deleteTodo(req, res, next) {
    try {
      await this.todoRepository.delete(req.params.id);
      res.status(200).json({ message: "Todo deleted" });
    } catch (err) {
      next(err);
    }
  }
}
