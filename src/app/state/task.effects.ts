import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import * as TaskActions from './task.action';
import { Task } from './tasks.model'; 

@Injectable()
export class TasksEffects {
  constructor(private actions$: Actions) {}

  fetchTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.fetchTasks),
      mergeMap(() =>
        of<Task[]>([
          {
            id: '1',
            title: 'Sample Task',
            description: 'This is a sample task.',
            status: 'Completed',
            priority: 'Medium',
            dueDate: new Date(),
          },
        ]).pipe(
          map((tasks) => TaskActions.fetchTasksSuccess({ tasks })),
          catchError((error) => of(TaskActions.fetchTasksFailure({ error })))
        )
      )
    )
  );
}  
