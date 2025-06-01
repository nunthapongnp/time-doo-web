import { Component, Input } from "@angular/core";

@Component({
    selector: "app-select",
    templateUrl: "./select.component.html",
    styleUrl: "./select.component.scss",
    standalone: false,
})
export class SelectComponent {
    @Input() items: any[] = [];
    @Input() multiple = false;
    @Input() modelChange: any;
}
