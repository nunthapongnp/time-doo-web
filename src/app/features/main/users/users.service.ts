import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiResponse } from "../../../core/interfaces/response";
import { AuthenticationService } from "../../../core/services/auth.service";

export interface User {
    id: number;
    tenantId: number;
    email: string;
    fullName: string;
    avatarUrl: string;
    createdBy: number;
    createdAt: string;
    updatedBy: Date;
    updatedAt: Date;
    role: string;
}

@Injectable({
    providedIn: "root",
})
export class UsersService {
    constructor(
        private auth: AuthenticationService,
        private http: HttpClient,
    ) {}

    getUserByTenant() {
        return this.http.get<ApiResponse<User[]>>(
            "/api/v1/users/tenants/" + this.auth.getTenantId(),
        );
    }

    addUser(user: User) {
        user.tenantId = this.auth.getTenantId() ?? 0;
        return this.http.post<ApiResponse<User>>("/api/v1/users", user);
    }

    editUser(user: User) {
        return this.http.put<ApiResponse<User>>("/api/v1/users", user);
    }

    deleteUser(userId: number) {
        return this.http.delete<ApiResponse<User>>("/api/v1/users/" + userId);
    }
}
