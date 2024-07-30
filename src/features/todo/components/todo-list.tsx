import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import TodoCard from './todo-card';

import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TodoForm from './todo-form';
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

      <div className="fixed lg:left-[85%] bottom-8 left-8">
        <Drawer>
          <DrawerTrigger asChild>
            <Button className="rounded-full h-16 w-16" variant="default">
              <Plus />
              <div className="sr-only">Open Drawer</div>
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="flex flex-col gap-2 mx-auto w-full max-w-xl p-10">
              <DrawerTitle>Create new Todo</DrawerTitle>
              <TodoForm />
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
};

export default TodoList;
