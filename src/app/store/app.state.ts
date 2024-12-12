import { ActionReducerMap } from '@ngrx/store';
import { authReducer, AuthState } from '../state/auth.reducer';
import { TasksState } from '../state/task.reducer';


export interface AppState {
  auth: AuthState;
  tasks: TaskState;

}

