import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/state/store';
import { addTodo } from '@/state/action/todo-action';

const formSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: 'Title must be  at least 2 characters',
    })
    .max(50, {
      message: 'Title maximum characters is 50',
    }),
  description: z
    .string()
    .min(10, {
      message: 'Description must be at least 10 characters',
    })
    .max(255, {
      message: 'Description maximum characters is 255',
    }),
  createdAt: z.string(),
  id: z.number(),
  isComplete: z.boolean(),
});

const TodoForm = () => {
  const { ongoingTodo, completedTodo } = useSelector(
    (state: RootState) => state.TodoReducer
  );

  // Combine the arrays and find the maximum id directly
  const latestId = Math.max(
    ...ongoingTodo.concat(completedTodo).map((todo) => todo.id)
  );

  const dispatch = useDispatch<AppDispatch>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      createdAt: new Date().toString(),
      id: latestId + 1,
      isComplete: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>): void {
    console.log('🚀 ~ onSubmit ~ values:', values);
    dispatch(addTodo(values));

    form.setValue('title', '');
    form.setValue('description', '');
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default TodoForm;
