import { Todo } from '@/types/todo';
import TodoCard from './todo-card';

type TodosProps = {
  todos: Todo[];
  isLoading: boolean;
};

const TodoList = ({ todos, isLoading }: TodosProps) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      {isLoading
        ? 'loading'
        : todos.map((todo) => (
            <TodoCard
              key={todo.id}
              title={todo.title}
              createdAt={todo.createdAt}
              description={todo.description}
              isComplete={todo.isComplete}
              id={todo.id}
            />
          ))}
    </div>
  );
};

export default TodoList;
