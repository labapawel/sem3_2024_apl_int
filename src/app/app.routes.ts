import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { AddTaskComponent } from './add-task/add-task.component';

export const routes: Routes = [
    {path: '', component: MainComponent},
    {path: 'add', component: AddTaskComponent}
];
