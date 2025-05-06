import { Component, Input } from "@angular/core";
import { Page } from "../page.model";

@Component({
    selector: "app-table",
    templateUrl: "./table.component.html",
    styleUrl: "./table.component.scss",
    standalone: false,
})
export class TableComponent {
    @Input() rows = [];
}
