import { Task } from "./task";

export interface TaskList {
    id: number;
    titulo: string;
    quadrosId: number;
    tasks:Task[];
}