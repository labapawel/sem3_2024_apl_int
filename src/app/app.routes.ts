import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { TasksComponent } from './tasks/tasks.component';

export const routes: Routes = [
    {path: '', component: MainComponent},
    {path: 'tasks', component: TasksComponent},
    {path: 'add', component: AddTaskComponent},
    {path: 'add/:id', component: AddTaskComponent}
];
