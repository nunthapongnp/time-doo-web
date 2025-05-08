import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { menuItems } from "./constants";
import { AuthenticationService } from "../../../core/services/auth.service";
import { TranslateService } from "@ngx-translate/core";

@Component({
    selector: "app-sidebar",
    templateUrl: "./sidebar.component.html",
    styleUrl: "./sidebar.component.scss",
    standalone: false,
})
export class SidebarComponent {
    constructor(
        private router: Router,
        private auth: AuthenticationService,
        private translate: TranslateService,
    ) {}

    isSidebarCollapsed = false;
    menuItems = menuItems;

    toggleSidebar() {
        this.isSidebarCollapsed = !this.isSidebarCollapsed;
    }

    logout() {
        this.auth.clearToken();
        this.router.navigate(["/login"]);
    }

    changeLanguage(lang: string) {
        localStorage.setItem("lang", lang);
        this.translate.use(lang);
    }
}
