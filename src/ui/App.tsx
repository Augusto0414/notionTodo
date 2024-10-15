import React from 'react';
import { ApiTodoRepository } from '../infraestructure/repositories/TodoApiRepository';
import { TodoUseCases } from '../application/useCases/TodoUseCase';
import { TodoList } from './components/TodoList';


const App: React.FC = () => {
    const todoRepository = new ApiTodoRepository();
    const todoUseCases = new TodoUseCases(todoRepository);

    return (
        <div className="App">
            <TodoList todoUseCases={todoUseCases} />
        </div>
    );
};

export default App;