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

const TodoHome = () => {
  return (
    <div className="container flex justify-center mt-2">
      <TodoList />
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
