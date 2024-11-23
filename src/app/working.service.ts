import { Injectable } from '@angular/core';
import { Status } from './status';
import { Task } from './task';
import { BehaviorSubject, Observable } from 'rxjs';
import { Work } from './work';

@Injectable({
  providedIn: 'root'
})
export class WorkingService {
  public static workStatusNew:number = 0;
  public static workStatusStart:number = 250;
  public static workStatusStop:number = 500;
  static lastID: number = 0; 

  static workSelStatus(id:number):Status {return WorkingService.workStatus.filter(e=>e.id==id)[0]}

  static taskEmpty() : Task {
    return {id:-1, name: "", active: true, status:0, taskEnd: new Date(), taskStart: new Date(), work: []};
  } 

  static workEmpty() : Work {
    return {start: new Date(), stop: new Date(), status: WorkingService.workSelStatus(this.workStatusStart) }
  }



  public static taskStatus: Status[] = [
    {id: WorkingService.workStatusNew, name: "Do wykonania"},
    {id: WorkingService.workStatusStart, name: "W trakcie"},
    {id: WorkingService.workStatusStop, name: "Wykonane"},
  ]
  public static workStatus: Status[] = [
    {id: WorkingService.workStatusStart, name: "W trakcie"},
    {id: WorkingService.workStatusStop, name: "Wykonane"},
  ]
  private tasks: Task[] = []; 
  private rxdata : BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>(this.tasks);
  
  public taskStatusStart() : Task | null {
      let workTask = this.tasks.filter(e=>e.status==WorkingService.workStatusStart)[0]
      return workTask;
  }


  public sub(): Observable<Task[]>{
    return this.rxdata.asObservable()
  }

  public refresh(): void {
    this.rxdata.next(this.tasks);
  }

  public remTask(id:number){
    this.tasks = this.tasks.filter(e=>e.id != id);
    this.save();
    this.refresh();
  }

  public statusChange(task: Task){
  
    let work: Work | undefined =  task.work.at(-1);
    if(work != undefined && work.status.id == WorkingService.workStatusStart){
      work.status = WorkingService.workSelStatus(WorkingService.workStatusStop);
      work.stop = new Date();
      task.status = WorkingService.workStatusStop;
    } else {
      let activeTask = this.taskStatusStart();
      if(activeTask)
          this.statusChange(activeTask);

      work = WorkingService.workEmpty();
      task.status = WorkingService.workStatusStart;
      task.work.push(work);
    }
    
    this.addOrUpdate(task);
  }


  public getTask(id: number) : Task {
    let numTaska = this.tasks.findIndex(e=>e.id == id);
    // console
    if(numTaska>=0)
        return this.tasks[numTaska];
    return {id:-1, name: "", active: true, status:0, taskEnd: new Date(), taskStart: new Date(), work: []};
  }

  public addOrUpdate(task:Task){
    // console.log(task);
    
    if(task.id<0){
        this.tasks.push(task);
        task.id = ++WorkingService.lastID;
    } else 
    {
        let ind = this.tasks.findIndex(e=>e.id == task.id);
        if(ind>=0)
            { 
              this.tasks[ind] = task;              
            }
    }
    this.save();
    this.refresh();
    // console.log(task);
  }

  save() : void {
    localStorage.setItem('sem3_apl_int', JSON.stringify(this.tasks));
  }

  load() : void {
    let dane = localStorage.getItem('sem3_apl_int');
    if(!dane)
        dane = '[]';
    this.tasks = JSON.parse(dane) as Task[];  
    this.tasks.forEach(e=>{
      e.taskStart = new Date(e.taskStart);
      e.taskEnd = new Date(e.taskEnd);
    })

//    Math.max(1,2,4,5,6,78) //...[1,2,4,5,6,78]

    if(this.tasks.length)
        WorkingService.lastID = Math.max(...this.tasks.map(e=>e.id))
    // console.log(WorkingService.lastID);
      
    this.refresh();
  }

  constructor() {
      this.load();
   }
}
