import {
  CREATE_NEW_TODO,
  DELETE_TODO,
  SET_COMPLETED_TODO,
  SET_ONGOING_TODO,
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

const successGetOngoingTodo = (payload: Todo[]) => {
  return {
    type: SUCCESS_GET_TODO,
    payload,
  };
};

const setCompletedTodo = (payload: Todo) => {
  return {
    type: SET_COMPLETED_TODO,
    payload,
  };
};

const setOngoingTodo = (payload: Todo) => {
  return {
    type: SET_ONGOING_TODO,
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
      dispatch(successGetOngoingTodo(response.data));
    } catch (err: unknown) {
      throw new Error((err as Error).message);
    }
  };
};

export const addTodo = (todo: Todo) => {
  return async (dispatch: Dispatch): Promise<void> => {
    dispatch(createNewTodo(todo));
    try {
      const response: AxiosResponse = await axios.post(url, todo);
      console.log(response);
    } catch (err: unknown) {
      throw new Error((err as Error).message);
    }
  };
};

export const setMarkTodo = (todo: Todo) => {
  return async (dispatch: Dispatch): Promise<void> => {
    if (todo.isComplete) {
      dispatch(setCompletedTodo(todo));
    }

    if (!todo.isComplete) {
      dispatch(setOngoingTodo(todo));
    }
    try {
      const response: AxiosResponse = await axios.put(
        `${url}/${todo.id}`,
        todo
      );
      console.log(response);
    } catch (err: unknown) {
      throw new Error((err as Error).message);
    }
  };
};

export const deleteTodo = (id: number) => {
  return async (dispatch: Dispatch): Promise<void> => {
    dispatch(deletedTodo(id));
    try {
      const response: AxiosResponse = await axios.delete(`${url}/${id}`);
      console.log(response);
    } catch (err) {
      throw new Error((err as Error).message);
    }
  };
};
