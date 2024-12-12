export interface Task {
    id: string;
    title: string;
    description: string;
    status: 'Pending' | 'Completed' | 'Overdue';
    priority: 'Low' | 'Medium' | 'High';
    dueDate: Date;
  }
  

