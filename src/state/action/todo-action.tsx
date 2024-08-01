import {
  CREATE_NEW_TODO,
  DELETE_TODO,
  START_FETCHING,
  SUCCESS_GET_TODO,
} from '@/contants/todo-contants';
import { Todo } from '@/types/todo';
import { Dispatch } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';

const url = import.meta.env.VITE_TODO_URL;

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

const createNewTodo = (payload: Todo) => {
  return {
    type: CREATE_NEW_TODO,
    payload,
  };
};

const deletedTodo = (payload: number) => {
  return {
    type: DELETE_TODO,
    payload,
  };
};

export const getTodo = () => {
  return async (dispatch: Dispatch): Promise<void> => {
    dispatch(startFetching());

    try {
      const response: AxiosResponse = await axios.get(url);
      dispatch(successGetTodo(response.data));
    } catch (err: unknown) {
      throw new Error((err as Error).message);
    }
  };
};

export const addTodo = (todo: Todo) => {
  return async (dispatch: Dispatch): Promise<void> => {
    try {
      await axios.post(url, todo);
      dispatch(createNewTodo(todo));
    } catch (err: unknown) {
      throw new Error((err as Error).message);
    }
  };
};

export const deleteTodo = (id: number) => {
  return async (dispatch: Dispatch): Promise<void> => {
    try {
      const response: AxiosResponse = await axios.delete(`${url}/${id}`);
      console.log(response);
      dispatch(deletedTodo(id));
    } catch (err) {
      throw new Error((err as Error).message);
    }
  };
};
