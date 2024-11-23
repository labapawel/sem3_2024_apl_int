import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../task';
import { Router } from '@angular/router';
import { WorkingService } from '../working.service';
import { NgClass } from '@angular/common';
import { Work } from '../work';
import moment from 'moment';

@Component({
  selector: 'app-taskitem',
  standalone: true,
  imports: [NgClass],
  templateUrl: './taskitem.component.html',
  styleUrl: './taskitem.component.scss'
})
export class TaskitemComponent {
  private remId : number = -1;
  @Input() dane:Task = {id:-1,active:false, name:"",status:0,taskEnd:new Date(), taskStart:new Date(),work:[] }
  @Output() delete = new EventEmitter<number>();
  
  constructor (private roter : Router, private serv : WorkingService){

  }

    public edit(id: number){
    this.roter.navigate(['/add', id]);
  }
  public status() : boolean{
      let stat:boolean = false;
      if(this.dane.work.length>0)
          {
            let lastWork = this.dane.work.at(-1);
            stat = lastWork?.status.id == WorkingService.workStatusStart;
          }

      return stat;
  }

  public statusChange(){
      this.serv.statusChange(this.dane);
  }

  public removesel(id:number){
    this.delete.emit(id);
  }

  
}
