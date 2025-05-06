import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthenticationService } from "../services/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private auth: AuthenticationService) {}
    canActivate(): boolean {
        try {
            if (this.auth.getToken() && !this.auth.isTokenExpired()) {
                return true;
            }
        } catch (e) {
            console.error("Invalid token", e);
        }
        this.router.navigate(["/login"]);
        return false;
    }
}
