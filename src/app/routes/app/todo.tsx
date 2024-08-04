import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TodoList from '@/features/todo/components/todo-list';
import TodoForm from '@/features/todo/components/todo-form';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/state/store';
import { useEffect } from 'react';
import { getTodo } from '@/state/action/todo-action';
import { Todo } from '@/types/todo';

const TodoHome = () => {
  const { ongoingTodo, completedTodo, isLoading } = useSelector(
    (state: RootState) => state.TodoReducer
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getTodo());
  }, [dispatch]);

  function handleSortingTodos(todos: Todo[]) {
    return [...todos].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  const sortedOngoingTodos = handleSortingTodos(ongoingTodo);
  const sortedCompletedTodos = handleSortingTodos(completedTodo);

  return (
    <div className="container flex justify-center">
      <div className="grid grid-cols-2 gap-4 w-full">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-xl">Ongoing</h1>
          <ScrollArea className="h-[79vh] w-full border dark:border-zinc-800 p-4 rounded-md">
            <TodoList todos={sortedOngoingTodos} isLoading={isLoading} />
          </ScrollArea>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-xl">Completed</h1>
          <ScrollArea className="h-[79vh] w-full border dark:border-zinc-800 p-4 rounded-md">
            <TodoList todos={sortedCompletedTodos} isLoading={isLoading} />
          </ScrollArea>
        </div>
      </div>
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

export default TodoHome;
