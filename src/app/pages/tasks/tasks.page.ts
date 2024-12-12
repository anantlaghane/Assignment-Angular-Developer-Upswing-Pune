import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppState } from '../../store/app.state';
import { Task } from '../../state/tasks.model';
import { AlertController } from '@ionic/angular';
import * as TaskActions from '../../state/task.action';
import { selectTasks } from '../../state/tasks.selectors';
import { selectIsAuthenticated } from '../../state/auth.selectors';
import * as AuthActions from '../../state/auth.actions';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
})
export class TasksPage implements OnInit {
  tasks$: Observable<Task[]>;
  isAuthenticated$: Observable<boolean>;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private alertCtrl: AlertController
  ) {
    this.tasks$ = this.store.select(selectTasks);
    this.isAuthenticated$ = this.store.select(selectIsAuthenticated);
  }

  ngOnInit() {
    this.isAuthenticated$.subscribe((isAuthenticated) => {
      if (!isAuthenticated) {
        this.router.navigate(['/login']);
      }
    });
  }

  async addTask() {
    const alert = await this.alertCtrl.create({
      header: 'Add New Task',
      inputs: [
        { name: 'title', type: 'text', placeholder: 'Title' },
        { name: 'description', type: 'textarea', placeholder: 'Description' },
        { name: 'dueDate', type: 'date', placeholder: 'Due Date' },
      ],
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Add Task',
          handler: (data) => {
            if (data.title && data.description) {
              const newTask: Task = {
                id: Math.random().toString(),
                title: data.title,
                description: data.description,
                status: 'Pending', 
                priority: 'Medium', 
                dueDate: data.dueDate ? new Date(data.dueDate) : new Date(),
              };
              this.store.dispatch(TaskActions.addTask({ task: newTask }));
            } else {
              console.log('Please provide all required details.');
            }
          },
        },
      ],
    });

    await alert.present();
  }

  async editTask(task: Task) {
    const alert = await this.alertCtrl.create({
      header: 'Edit Task',
      inputs: [
        { name: 'title', type: 'text', placeholder: 'Title', value: task.title },
        { name: 'description', type: 'textarea', placeholder: 'Description', value: task.description },
        { name: 'dueDate', type: 'date', value: task.dueDate ? new Date(task.dueDate).toISOString().substring(0, 10) : '' },
      ],
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Save Changes',
          handler: (data) => {
            if (data.title && data.description) {
              const updatedTask: Task = {
                ...task,
                title: data.title,
                description: data.description,
                status: task.status, 
                priority: task.priority, 
                dueDate: data.dueDate ? new Date(data.dueDate) : task.dueDate,
              };
              this.store.dispatch(TaskActions.updateTask({ task: updatedTask }));
            } else {
              console.log('Please provide all required details.');
            }
          },
        },
      ],
    });

    await alert.present();
  }

  
  toggleStatus(task: Task) {
    const updatedStatus = task.status === 'Pending' ? 'Completed' : 'Pending';
    const updatedTask: Task = { ...task, status: updatedStatus };
    this.store.dispatch(TaskActions.updateTask({ task: updatedTask }));
  }

  deleteTask(taskId: string) {
    this.store.dispatch(TaskActions.deleteTask({ taskId }));
  }

  onLogout() {
    this.store.dispatch(AuthActions.logout());
    this.router.navigate(['/login']);
  }
}
