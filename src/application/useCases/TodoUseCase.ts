import { Todo, TodoStatus } from "../../domain/entities/Todo";
import { TodoRepository } from "../../domain/ports/TodoRepository";

export class TodoUseCases {
  constructor(private todoRepository: TodoRepository) {}

  async getAllTodos(): Promise<Todo[]> {
    return this.todoRepository.getAllTodos();
  }

  async getTodoById(id: string): Promise<Todo> {
    return this.todoRepository.getTodoById(id);
  }

  async addTodo(title: string, description: string): Promise<Todo> {
    return this.todoRepository.addTodo({
      title,
      description,
      status: TodoStatus.POR_HACER,
    });
  }

  async updateTodo(id: string, updates: Partial<Todo>): Promise<Todo> {
    return this.todoRepository.updateTodo(id, updates);
  }

  async deleteTodo(id: string): Promise<void> {
    return this.todoRepository.deleteTodo(id);
  }
  async updateTodoStatus(id: string, status: TodoStatus): Promise<Todo> {
    console.log("Actualizando estado de tarea en UseCases:", id, status);
    const updatedTodo = await this.todoRepository.updateTodo(id, { status });
    console.log("Tarea actualizada en UseCases:", updatedTodo);
    return updatedTodo;
  }
}
