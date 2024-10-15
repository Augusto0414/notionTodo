import { Todo } from "../entities/Todo";

export interface TodoRepository {
  getAllTodos(): Promise<Todo[]>;
  getTodoById(id: string): Promise<Todo>;
  addTodo(todo: Omit<Todo, "id">): Promise<Todo>;
  updateTodo(id: string, todo: Partial<Todo>): Promise<Todo>;
  deleteTodo(id: string): Promise<void>;
}
