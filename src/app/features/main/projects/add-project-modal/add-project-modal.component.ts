import { Component, EventEmitter, Input, Output } from "@angular/core";
import { SharedModule } from "../../../../shared/shared.module";
import { FormGroup } from "@angular/forms";
import { BsModalRef } from "ngx-bootstrap/modal";
import { User, UsersService } from "../../users/users.service";
import { AuthenticationService } from "../../../../core/services/auth.service";

@Component({
    selector: "app-add-project-modal",
    imports: [SharedModule],
    templateUrl: "./add-project-modal.component.html",
    styleUrl: "./add-project-modal.component.scss",
})
export class AddProjectModalComponent {
    @Input() form!: FormGroup;
    @Output() onCloseModal = new EventEmitter<void>();
    @Output() onSave = new EventEmitter<void>();

    constructor(
        public bsModalRef: BsModalRef,
        private userService: UsersService,
    ) {}

    users: User[] = [];
    usersSelect: any[] = [];
    projectMember: number[] = [];

    ngOnInit() {
        this.userService.getUserByTenant().subscribe((res) => {
            this.users = res.data;
            this.usersSelect = this.users.map((x) => ({
                label: x.fullName,
                value: x.id,
            }));
        });
    }

    closeModal() {
        this.onCloseModal.emit();
    }

    save() {
        this.onSave.emit();
    }
}
