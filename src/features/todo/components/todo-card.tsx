import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Todo } from '@/types/todo';
import { formatDate } from '@/utils/date';
import { DotsVerticalIcon } from '@radix-ui/react-icons';

const TodoCard = ({ id, title, createdAt, description }: Todo) => {
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between gap-2">
        <div className="sr-only">{id}</div>
        <div className="w-full">
          <CardTitle className="text-md">{title}</CardTitle>
          <CardDescription>{formatDate(createdAt)}</CardDescription>
        </div>
        <div className="w-fit">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <DotsVerticalIcon />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className=" hover:!bg-red-700 active:!bg-red-800">
                Delete
              </DropdownMenuItem>
              <DropdownMenuItem>Mark as Done</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      {description && (
        <CardContent>
          <div>{description}</div>
        </CardContent>
      )}
    </Card>
  );
};

export default TodoCard;
