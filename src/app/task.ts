import { Status } from "./status";
import { Work } from "./work";

export interface Task {
    name:string,
    taskStart: Date,
    taskEnd: Date,
    active: boolean,
    status: number,
    work: Work[],
}
