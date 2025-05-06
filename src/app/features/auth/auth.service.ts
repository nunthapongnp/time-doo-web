import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthenticationService } from "../../core/services/auth.service";
import { ApiResponse } from "../../core/interfaces/response";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    constructor(
        private auth: AuthenticationService,
        private http: HttpClient,
    ) {}

    login(data: any) {
        return this.http.post<ApiResponse<any>>("/api/auth/login", data);
    }

    register(data: any) {
        return this.http.post<ApiResponse<any>>("/api/auth/register", data);
    }

    logout() {
        this.auth.clearToken();
    }

    setToken(token: string) {
        this.auth.setToken(token);
    }
}
