import { combineReducers, configureStore } from '@reduxjs/toolkit';
import TodoReducer from './reducer/todo-reducer';

const rootReducer = combineReducers({
  TodoReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
