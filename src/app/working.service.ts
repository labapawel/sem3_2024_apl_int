import { Injectable } from '@angular/core';
import { Status } from './status';
import { Task } from './task';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkingService {


  public taskStatus: Status[] = [
    {id: 0, name: "Do wykonania"},
    {id: 250, name: "W trakcie"},
    {id: 500, name: "Wykonane"},
  ]
  public workStatus: Status[] = [
    {id: 250, name: "W trakcie"},
    {id: 500, name: "Wykonane"},
  ]
  private tasks: Task[] = []; 
  private rxdata : BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>(this.tasks);

  public sub(): Observable<Task[]>{
    return this.rxdata.asObservable()
  }

  public refresh(): void {
    this.rxdata.next(this.tasks);
  }

  public add(task:Task){
    this.tasks.push(task);
    this.refresh();
  }

  constructor() { }
}
