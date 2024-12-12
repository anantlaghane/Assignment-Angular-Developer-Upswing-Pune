import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TasksState } from './task.reducer';
import { AppState } from '../store/app.state';


export const selectTasksState = createFeatureSelector<TasksState>('tasks');

export const selectTasks = createSelector(
  selectTasksState,
  (state) => state.tasks
);

export const selectPendingTasks = createSelector(
  selectTasks,
  (tasks) => tasks.filter((task) => task.status === 'Pending')
);

export const selectCompletedTasks = createSelector(
  selectTasks,
  (tasks) => tasks.filter((task) => task.status === 'Completed')
);
