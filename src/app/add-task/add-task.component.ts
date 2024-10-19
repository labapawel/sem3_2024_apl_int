import { Component } from '@angular/core';
import { WorkingService } from '../working.service';
import { FormsModule } from '@angular/forms';
import { Task } from '../task';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent {

    // YYYY-MM-DDTHH:mm
    public dane: Task = {name: "", active: true, status:0, taskEnd: new Date(), taskStart: new Date(), work: []};
    public status = WorkingService.taskStatus;
    constructor (public serv: WorkingService){

    }

    getTime(date : Date) : string {
      const year = date.getFullYear();
      const month = ((date.getMonth()+1)+"").padStart(2, "0");
      const day = (date.getDate()+"").padStart(2, "0");
      return `${year}-${month}-${day}`;
    }

    save(){
      this.serv.add(this.dane);
    }

    setTaskStart(th: any) : void {
        this.dane.taskStart = new Date(th.target.value);
    } 
    setTaskEnd(th: any) : void {
        this.dane.taskEnd = new Date(th.target.value);
    } 

}
