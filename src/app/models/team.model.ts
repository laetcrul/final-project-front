import { Department } from "./department.model";

export interface Team{
    id: string;
    label: string;
    department: Department;
}