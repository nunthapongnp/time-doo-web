import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { SettingsComponent } from "./settings/settings.component";
import { ProjectsComponent } from "./projects/projects.component";
import { KanbanBoardComponent } from "./kanban-board/kanban-board.component";
import { UsersComponent } from "./users/users.component";

export const routes: Routes = [
    {
        path: "settings",
        component: SettingsComponent,
    },
    {
        path: "users",
        component: UsersComponent,
    },
    {
        path: "dashboard",
        component: DashboardComponent,
    },
    {
        path: "projects",
        component: ProjectsComponent,
    },
    {
        path: "tasks/:projectId",
        component: KanbanBoardComponent,
    },
    {
        path: "tasks",
        component: KanbanBoardComponent,
    },
];
