import { Component } from '@angular/core';
import { WorkingService } from '../working.service';
import { FormsModule } from '@angular/forms';
import { Task } from '../task';
import { NgFor } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import moment from 'moment';
import 'moment-business-days';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent {

    // YYYY-MM-DDTHH:mm
    public dane: Task = {id:-1, name: "", active: true, status:0, taskEnd: new Date(), taskStart: new Date(), work: []};
    public status = WorkingService.taskStatus;
    constructor (public serv: WorkingService, private route: ActivatedRoute, private router: Router){
    }

    ngOnInit() : void {
        let id = this.route.snapshot.paramMap.get('id');
        this.dane = this.serv.getTask(id != null ? parseInt(id) : -1);
    }

    getTime(date : Date) : string {
      const year = date.getFullYear();
      const month = ((date.getMonth()+1)+"").padStart(2, "0");
      const day = (date.getDate()+"").padStart(2, "0");
      return `${year}-${month}-${day}`;
    }

    public getHours(){
      let start = moment(this.dane.taskStart);
      let koniec = moment(this.dane.taskEnd);
      koniec.add(1, 'day');
      return koniec.businessDiff(start)*8;
    }

    save(){
      this.serv.addOrUpdate(this.dane);
      this.router.navigate(['/tasks']);
    }

    setTaskStart(th: any) : void {
      let taskS = new Date(th.target.value);
      if(taskS <= this.dane.taskEnd)
          this.dane.taskStart = taskS;
    } 
    setTaskEnd(th: any) : void {
       let taskE = new Date(th.target.value);
       if(taskE>=this.dane.taskStart)
         this.dane.taskEnd = taskE;
    } 

}
