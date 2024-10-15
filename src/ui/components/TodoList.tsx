import React, { useState, useEffect } from 'react';

import { Menu, CheckSquare, Circle, Square, XSquare, Trash2 } from 'lucide-react';
import { TodoUseCases } from '../../application/useCases/TodoUseCase';
import { Todo, TodoStatus } from '../../domain/entities/Todo';

interface TodoListProps {
    todoUseCases: TodoUseCases;
}

export const TodoList: React.FC<TodoListProps> = ({ todoUseCases }) => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodoTitle, setNewTodoTitle] = useState('');
    const [newTodoDescription, setNewTodoDescription] = useState('');

    useEffect(() => {
        loadTodos();
    }, []);

    const loadTodos = async () => {
        try {
            const loadedTodos = await todoUseCases.getAllTodos();
            console.log('Tareas cargadas:', loadedTodos);
            setTodos(loadedTodos);
        } catch (error) {
            console.error('Error al cargar las tareas:', error);
        }
    };

    const handleAddTodo = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newTodoTitle && newTodoDescription) {
            await todoUseCases.addTodo(newTodoTitle, newTodoDescription);
            setNewTodoTitle('');
            setNewTodoDescription('');
            loadTodos();
        }
    };

    const handleStatusChange = async (id: string, newStatus: TodoStatus) => {
        console.log('Cambiando estado de tarea:', id, newStatus);
        try {
            const updatedTodo = await todoUseCases.updateTodoStatus(id, newStatus);
            console.log('Tarea actualizada:', updatedTodo);
            setTodos(prevTodos => prevTodos.map(todo =>
                todo.id === id ? { ...todo, status: newStatus } : todo
            ));
        } catch (error) {
            console.error('Error al actualizar el estado de la tarea:', error);
        }
    };

    const handleDeleteTodo = async (id: string) => {
        await todoUseCases.deleteTodo(id);
        loadTodos();
    };

    const columns = [
        { status: TodoStatus.POR_HACER, color: 'bg-gray-200', iconColor: 'bg-blue-500', icon: Circle },
        { status: TodoStatus.EN_PROCESO, color: 'bg-yellow-200', iconColor: 'bg-yellow-500', icon: Square },
        { status: TodoStatus.COMPLETADAS, color: 'bg-green-200', iconColor: 'bg-green-500', icon: CheckSquare },
        { status: TodoStatus.BLOQUEADAS, color: 'bg-red-200', iconColor: 'bg-red-500', icon: XSquare }
    ];

    return (
        <section className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
            <header className="flex flex-col sm:flex-row justify-between items-center px-4 py-2 bg-white w-full max-w-7xl mb-4">
                <h1 className="text-2xl font-bold mb-4 text-gray-800">Tablero de Tareas</h1>
                <form onSubmit={handleAddTodo} className="flex items-center space-x-4">
                    <input
                        type="text"
                        className="border p-2 rounded-lg"
                        value={newTodoTitle}
                        onChange={(e) => setNewTodoTitle(e.target.value)}
                        placeholder="Título de la tarea"
                    />
                    <input
                        type="text"
                        className="border p-2 rounded-lg"
                        value={newTodoDescription}
                        onChange={(e) => setNewTodoDescription(e.target.value)}
                        placeholder="Descripción de la tarea"
                    />
                    <button
                        type="submit"
                        className="flex items-center justify-start text-gray-900 transition duration-200 hover:bg-gray-950 rounded-lg p-2 border border-gray-300 shadow-sm bg-gray-900"
                    >
                        <Menu className="h-5 w-5 text-white cursor-pointer mr-2" />
                        <span className="font-semibold text-white">Agregar tarea</span>
                    </button>
                </form>
            </header>

            <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {columns.map((column, index) => (
                        <div key={index} className={`${column.color} p-4 rounded-lg shadow-md`}>
                            <h3 className="text-md font-semibold mb-4 flex items-center">
                                <column.icon className={`h-5 w-5 mr-2`} />
                                {column.status}
                            </h3>
                            <div className="space-y-4">
                                {todos.filter(todo => todo.status === column.status).map((todo) => (
                                    <div key={todo.id} className="bg-white p-4 rounded-md shadow-sm flex flex-col justify-between min-h-[150px]">
                                        <div>
                                            <span className="text-gray-800 font-semibold">{todo.title}</span>
                                            <p className="text-gray-600">{todo.description}</p>
                                        </div>
                                        <div className="flex justify-between items-center mt-4">
                                            <div className="flex space-x-2">
                                                {columns.map((col) => (
                                                    col.status !== todo.status && (
                                                        <button
                                                            key={col.status}
                                                            className="text-gray-500 hover:text-gray-700"
                                                            onClick={() => handleStatusChange(todo.id, col.status)}
                                                            title={`Mover a ${col.status}`}
                                                        >
                                                            <col.icon className="h-5 w-5" />
                                                        </button>
                                                    )
                                                ))}
                                            </div>
                                            <button
                                                className="text-red-500 hover:text-red-700"
                                                onClick={() => handleDeleteTodo(todo.id)}
                                                title="Eliminar tarea"
                                            >
                                                <Trash2 className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TodoList;