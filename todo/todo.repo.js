import { TodoModel } from "./todo.schema.js";

export default class TodoRepository {
  async create(todoData) {
    const todo = new TodoModel(todoData);
    return await todo.save();
  }

  async findAllByUser(userId) {
    return await TodoModel.find({ userId });
  }

  async update(todoId, updateData) {
    return await TodoModel.findByIdAndUpdate(todoId, updateData, { new: true });
  }

  async delete(todoId) {
    return await TodoModel.findByIdAndDelete(todoId);
  }
}
