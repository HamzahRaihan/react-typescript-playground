import {
  CREATE_NEW_TODO,
  DELETE_TODO,
  SEARCH_TODO,
  SET_COMPLETED_TODO,
  SET_ONGOING_TODO,
  START_FETCHING,
  SUCCESS_GET_TODO,
} from '@/contants/todo-contants';
import { Todo } from '@/types/todo';
import { PayloadAction } from '@reduxjs/toolkit';

type TodoState = {
  completedTodo: Todo[];
  ongoingTodo: Todo[];
  isLoading: boolean;
};

const initialState: TodoState = {
  completedTodo: [],
  ongoingTodo: [],
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
        ongoingTodo: action.payload.filter((todo: Todo) => !todo.isComplete),
        completedTodo: action.payload.filter((todo: Todo) => todo.isComplete),
        isLoading: false,
      };
    case CREATE_NEW_TODO:
      return {
        ongoingTodo: [...state.ongoingTodo, action.payload],
        completedTodo: [...state.completedTodo],
        isLoading: false,
      };
    case SET_COMPLETED_TODO:
      return {
        ongoingTodo: state.ongoingTodo.filter(
          (todo) => todo.id !== action.payload.id
        ),
        completedTodo: [...state.completedTodo, action.payload],
        isLoading: false,
      };
    case SET_ONGOING_TODO:
      return {
        ongoingTodo: [...state.ongoingTodo, action.payload],
        completedTodo: state.completedTodo.filter(
          (todo) => todo.id !== action.payload.id
        ),
        isLoading: false,
      };
    case DELETE_TODO:
      return {
        ongoingTodo: state.ongoingTodo.filter(
          (todo) => todo.id !== action.payload
        ),
        completedTodo: state.completedTodo.filter(
          (todo) => todo.id !== action.payload
        ),
        isLoading: false,
      };
    case SEARCH_TODO:
      return {
        ongoingTodo: state.ongoingTodo.filter((todo) =>
          todo.title.toLowerCase().includes(action.payload.toLowerCase())
        ),
        completedTodo: state.completedTodo.filter((todo) =>
          todo.title.toLowerCase().includes(action.payload.toLowerCase())
        ),
        isLoading: false,
      };
    default:
      return state;
  }
};

export default TodoReducer;
