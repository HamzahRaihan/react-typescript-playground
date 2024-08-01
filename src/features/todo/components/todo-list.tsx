import TodoCard from './todo-card';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/state/store';
import React, { useEffect } from 'react';
import { getTodo } from '@/state/action/todo-action';

const TodoList: React.FC = () => {
  const { todos, isLoading } = useSelector(
    (state: RootState) => state.TodoReducer
  );
  const dispatch = useDispatch<AppDispatch>();
  console.log('🚀 ~ isLoading:', isLoading);
  console.log('🚀 ~ todos:', todos);

  useEffect(() => {
    dispatch(getTodo());
  }, [dispatch]);

  const sortedTodos = [...todos].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="flex flex-col gap-4 lg:w-2/3 w-full ">
      {isLoading
        ? 'loading'
        : sortedTodos.map((todo) => (
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
