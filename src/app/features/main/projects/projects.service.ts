import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiResponse } from "../../../core/interfaces/response";
import { AuthenticationService } from "../../../core/services/auth.service";

export interface Project {
    id: number;
    tenantId: number;
    name: string;
    description: string;
    createdBy: number;
    createdAt: string;
    updatedBy?: number;
    updatedAt?: string;
}

@Injectable({
    providedIn: "root",
})
export class ProjectsService {
    constructor(
        private auth: AuthenticationService,
        private http: HttpClient,
    ) {}

    getAllProjects() {
        return this.http.get<ApiResponse<Project[]>>(
            "/api/v1/projects/tenant/" + this.auth.getTenantId(),
        );
    }
}
