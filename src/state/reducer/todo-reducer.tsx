import { START_FETCHING, SUCCESS_GET_TODO } from '@/contants/todo-contants';
import { Todo } from '@/types/todo';
import { PayloadAction } from '@reduxjs/toolkit';

type TodoState = {
  todos: Todo[];
  isLoading: boolean;
};

const initialState: TodoState = {
  todos: [],
  isLoading: false,
};

const TodoReducer = (
  state = initialState,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: PayloadAction<any>
): TodoState => {
  switch (action.type) {
    case START_FETCHING:
      return {
        ...state,
        isLoading: true,
      };
    case SUCCESS_GET_TODO:
      return {
        isLoading: false,
        todos: action.payload,
      };
    default:
      return state;
  }
};

export default TodoReducer;
