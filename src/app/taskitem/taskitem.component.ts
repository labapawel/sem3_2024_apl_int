import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../task';
import { Router } from '@angular/router';
import { WorkingService } from '../working.service';

@Component({
  selector: 'app-taskitem',
  standalone: true,
  imports: [],
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

  public removesel(id:number){
    this.delete.emit(id);
  }

  
}
