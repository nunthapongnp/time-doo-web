import { Routes } from "@angular/router";
import { MainLayoutComponent } from "./layouts/main-layout/main-layout.component";
import { AuthLayoutComponent } from "./layouts/auth-layout/auth-layout.component";
import { AuthGuard } from "./core/guards/auth.guard";

export const routes: Routes = [
    {
        path: "",
        redirectTo: "dashboard",
        pathMatch: "full",
    },
    {
        path: "",
        component: AuthLayoutComponent,
        loadChildren: () =>
            import("./features/auth/auth.routes").then((m) => m.routes),
    },
    {
        path: "",
        component: MainLayoutComponent,
        canActivate: [AuthGuard],
        providers: [AuthGuard],
        loadChildren: () =>
            import("./features/main/main.routes").then((m) => m.routes),
    },
    {
        path: "**",
        redirectTo: "dashboard",
        pathMatch: "full",
    },
];
