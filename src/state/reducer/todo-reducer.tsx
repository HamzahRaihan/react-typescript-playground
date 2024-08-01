import {
  CREATE_NEW_TODO,
  DELETE_TODO,
  SEARCH_TODO,
  START_FETCHING,
  SUCCESS_GET_TODO,
} from '@/contants/todo-contants';
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
        todos: action.payload,
        isLoading: false,
      };
    case CREATE_NEW_TODO:
      return {
        todos: [...state.todos, action.payload],
        isLoading: false,
      };
    case DELETE_TODO:
      return {
        todos: state.todos.filter((todo) => todo.id !== action.payload),
        isLoading: false,
      };
    case SEARCH_TODO:
      return {
        todos: state.todos.filter((todo) =>
          todo.title.toLowerCase().includes(action.payload.toLowerCase())
        ),
        isLoading: false,
      };
    default:
      return state;
  }
};

export default TodoReducer;
