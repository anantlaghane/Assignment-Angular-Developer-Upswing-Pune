import { createReducer, on } from '@ngrx/store';
import * as TaskActions from './task.action';
import { Task } from './tasks.model';

export interface TasksState {
  tasks: Task[];
}

export const initialState: TasksState = {
  tasks: [],
};

export const tasksReducer = createReducer(
  initialState,
  on(TaskActions.addTask, (state, { task }) => ({
    ...state,
    tasks: [...state.tasks, task],
  })),
  on(TaskActions.updateTask, (state, { task }) => ({
    ...state,
    tasks: state.tasks.map((t) => (t.id === task.id ? task : t)),
  })),
  on(TaskActions.deleteTask, (state, { taskId }) => ({
    ...state,
    tasks: state.tasks.filter((task) => task.id !== taskId),
  })),
  on(TaskActions.completeTask, (state, { taskId }) => ({
    ...state,
    task: state.tasks.map((task) =>
      task.id === taskId ? { ...task, status: 'Completed' } : task
    ),
  })),
  on(TaskActions.clearTasks, (state) => ({
    ...state,
    tasks: [],
  }))
  
);
