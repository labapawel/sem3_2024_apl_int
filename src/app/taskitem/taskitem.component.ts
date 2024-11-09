import { Component, Input } from '@angular/core';
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
  constructor (private roter : Router, private serv : WorkingService){

  }

  public getInfo() : string {
    console.log(this.remId);
    return this.serv.getTask(this.remId).name;
  }

  public edit(id: number){
    this.roter.navigate(['/add', id]);
  }

  public removesel(id:number){
    this.remId = id;
  }
  public remove(){
    if(this.remId>0)
      this.serv.remTask(this.remId);
    this.remId = 0;
  }
}
