import { Component } from '@angular/core';
import { WorkingService } from '../working.service';
import { Router } from '@angular/router';
import { Task } from '../task';
import { NgFor, NgIf } from '@angular/common';
import { TaskitemComponent } from '../taskitem/taskitem.component';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [NgFor, NgIf, TaskitemComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent {
  public tasks : Task[] = [];
  constructor (private serwis : WorkingService, private router: Router){
    serwis.sub().subscribe(task  => {
      console.log("działam", task)
      this.tasks = task;
    })
  }
}
