import { START_FETCHING, SUCCESS_GET_TODO } from '@/contants/todo-contants';
import { Todo } from '@/types/todo';
import { Dispatch } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';

const startFetching = () => {
  return {
    type: START_FETCHING,
  };
};

const successGetTodo = (payload: Todo[]) => {
  return {
    type: SUCCESS_GET_TODO,
    payload,
  };
};

export const getTodo = () => {
  return async (dispatch: Dispatch) => {
    dispatch(startFetching());

    const url = import.meta.env.VITE_TODO_URL;

    try {
      const response: AxiosResponse = await axios.get(url);
      console.log('🚀 ~ return ~ response:', response);
      dispatch(successGetTodo(response.data));
    } catch (err: unknown) {
      throw new Error((err as Error).message);
    }
  };
};
