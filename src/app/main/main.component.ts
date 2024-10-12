import { Component } from '@angular/core';
import { WorkingService } from '../working.service';
import { Task } from '../task'

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

  clicks(){
    this.working.add({name:'',taskStart:new Date(), taskEnd:new Date(),active:true, status:{id:0,name:''}, work:[]});
  }
  constructor(public working : WorkingService){
    working.sub().subscribe( tasks => {
      console.log(tasks);
      
    })
  }

}
