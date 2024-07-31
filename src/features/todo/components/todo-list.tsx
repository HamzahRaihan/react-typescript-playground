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

  useEffect(() => {
    dispatch(getTodo());
  }, [dispatch]);

  return (
    <div className="flex flex-col gap-4 lg:w-2/3 w-full">
      {isLoading
        ? 'loading'
        : todos.map((todo) => (
            <TodoCard
              key={todo.id}
              title={todo.title}
              createdAt={todo.createdAt}
              description={todo.description}
              id={todo.id}
            />
          ))}
    </div>
  );
};

export default TodoList;
