import { Injectable } from "@angular/core";
import { jwtDecode } from "jwt-decode";

export interface JwtPayload {
    userId: number;
    tenantId: number;
    role: string;
    exp?: number;
    iat?: number;
}

@Injectable({
    providedIn: "root",
})
export class AuthenticationService {
    clearToken() {
        localStorage.removeItem("token");
    }

    setToken(token: string) {
        localStorage.setItem("token", token);
    }

    getToken(): string | null {
        return localStorage.getItem("token");
    }

    getUserInfo(): JwtPayload | null {
        const token = this.getToken();
        if (!token) return null;

        try {
            return jwtDecode<JwtPayload>(token);
        } catch (err) {
            console.error("Invalid token:", err);
            return null;
        }
    }

    isTokenExpired(): boolean {
        const payload = this.getUserInfo();
        if (!payload?.exp) return true;

        const now = Math.floor(Date.now() / 1000);
        return payload.exp < now;
    }

    getUserId(): number | null {
        return this.getUserInfo()?.userId ?? null;
    }

    getTenantId(): number | null {
        return this.getUserInfo()?.tenantId ?? null;
    }

    getRole(): string | null {
        return this.getUserInfo()?.role ?? null;
    }

    isAdmin(): boolean {
        return (
            this.getRole() === "admin" ||
            this.getRole() === "owner" ||
            this.isSuperAdmin()
        );
    }

    isSuperAdmin(): boolean {
        return this.getRole() === "superadmin";
    }
}
