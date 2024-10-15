import React, { useState } from 'react';
import { CreateTodo } from '../application/CreateTodo';
import { TodoApiRepository } from '../infraestructure/repositories/TodoApiRepository';
import { Todo } from '../domain/entities/Todo';
import { toast } from 'react-toastify';

const CreateTodoComponent: React.FC = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState<'Por hacer' | 'En proceso' | 'Completadas' | 'Bloqueadas'>('Por hacer');

    const todoRepository = new TodoApiRepository();
    const createTodoUseCase = new CreateTodo(todoRepository);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newTodo: Todo = { title, description, status };

        try {
            await createTodoUseCase.execute(newTodo);
            toast.success('TODO creado con éxito');
        } catch (error) {
            toast.error('Error al crear el TODO');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title">Título</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="description">Descripción</label>
                <input
                    type="text"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="status">Estado</label>
                <select id="status" value={status} onChange={(e) => setStatus(e.target.value as any)}>
                    <option value="Por hacer">Por hacer</option>
                    <option value="En proceso">En proceso</option>
                    <option value="Completadas">Completadas</option>
                    <option value="Bloqueadas">Bloqueadas</option>
                </select>
            </div>
            <button type="submit">Crear TODO</button>
        </form>
    );
};

export default CreateTodoComponent;
