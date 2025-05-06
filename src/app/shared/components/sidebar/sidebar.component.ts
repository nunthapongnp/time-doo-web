import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { menuItems } from "./constants";
import { AuthenticationService } from "../../../core/services/auth.service";

@Component({
    selector: "app-sidebar",
    templateUrl: "./sidebar.component.html",
    styleUrl: "./sidebar.component.scss",
    standalone: false,
})
export class SidebarComponent {
    constructor(private router: Router, private auth: AuthenticationService) {}

    isSidebarCollapsed = false;
    menuItems = menuItems;

    toggleSidebar() {
        this.isSidebarCollapsed = !this.isSidebarCollapsed;
    }

    logout() {
        this.auth.clearToken();
        this.router.navigate(["/login"]);
    }
}
