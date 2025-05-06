import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiResponse } from "../../../core/interfaces/response";
import { AuthenticationService } from "../../../core/services/auth.service";

export interface Column {
    id: number;
    projectId: number;
    name: string;
    position: number;
    tasks: Task[];
    createdBy: number;
    createdAt: string;
    updatedBy: any;
    updatedAt: any;
}

export interface Task {
    id: number;
    projectId: number;
    columnId: number;
    title: string;
    description: string;
    assigneeId: any;
    dueDate: any;
    position: number;
    createdBy: number;
    createdAt: string;
    updatedBy: any;
    updatedAt: any;
}

@Injectable({
    providedIn: "root",
})
export class KanbanBoardService {
    constructor(
        private auth: AuthenticationService,
        private http: HttpClient,
    ) {}

    getColumnsWithTasksByProject(projectId: number) {
        return this.http.get<ApiResponse<Column[]>>(
            `/api/v1/projects/${projectId}/columns/tasks`,
        );
    }

    addColumn(projectId: number, column: Column) {
        return this.http.post<ApiResponse<Task>>(
            `/api/v1/projects/${projectId}/columns`,
            column,
        );
    }

    addTask(columnId: number, task: Task) {
        return this.http.post<ApiResponse<Task>>(
            `/api/v1/columns/${columnId}/tasks`,
            task,
        );
    }
}
