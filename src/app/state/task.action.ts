import { createAction, props } from '@ngrx/store';
import { Task } from './tasks.model';

export const addTask = createAction('[Tasks] Add Task', props<{ task: Task }>());
export const updateTask = createAction('[Tasks] Update Task', props<{ task: Task }>());
export const deleteTask = createAction('[Tasks] Delete Task', props<{ taskId: string }>());
export const completeTask = createAction('[Tasks] Complete Task', props<{ taskId: string }>());
export const fetchTasks = createAction('[Tasks] Fetch Tasks');
export const fetchTasksSuccess = createAction('[Tasks] Fetch Tasks Success', props<{ tasks: Task[] }>());
export const fetchTasksFailure = createAction('[Tasks] Fetch Tasks Failure', props<{ error: any }>());
export const clearTasks = createAction('[Tasks] Clear Tasks');
