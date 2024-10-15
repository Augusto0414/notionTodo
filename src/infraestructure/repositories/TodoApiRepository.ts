import axios from "axios";
import { TodoRepository } from "../../domain/ports/TodoRepository";
import { Todo } from "../../domain/entities/Todo";

export class ApiTodoRepository implements TodoRepository {
  private apiUrl = "https://apitodo-g3vq.onrender.com/api/todos"; // Reemplaza con tu URL base real

  async getAllTodos(): Promise<Todo[]> {
    const response = await axios.get<Todo[]>(this.apiUrl);
    return response.data;
  }

  async getTodoById(id: string): Promise<Todo> {
    const response = await axios.get<Todo>(`${this.apiUrl}/${id}`);
    return response.data;
  }

  async addTodo(todo: Omit<Todo, "id">): Promise<Todo> {
    const response = await axios.post<Todo>(this.apiUrl, todo);
    return response.data;
  }

  async updateTodo(id: string, todo: Partial<Todo>): Promise<Todo> {
    console.log("Actualizando tarea:", id, todo);
    try {
      const response = await axios.put<Todo>(`${this.apiUrl}/${id}`, todo);
      console.log("Respuesta de actualización:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error al actualizar la tarea:", error);
      throw error;
    }
  }

  async deleteTodo(id: string): Promise<void> {
    await axios.delete(`${this.apiUrl}/${id}`);
  }
}
