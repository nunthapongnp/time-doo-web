import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: "app-confirm-modal",
    templateUrl: "./confirm-modal.component.html",
    styleUrl: "./confirm-modal.component.scss",
    standalone: false,
})
export class ConfirmModalComponent {
    @Input() description = "";
    @Output() onClose = new EventEmitter<void>();
    @Output() onProcess = new EventEmitter<void>();

    close() {
        this.onClose.emit();
    }

    process() {
        this.onProcess.emit();
    }
}
