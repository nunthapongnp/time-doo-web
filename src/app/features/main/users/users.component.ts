import { Component, TemplateRef } from "@angular/core";
import { UsersService } from "./users.service";
import { SharedModule } from "../../../shared/shared.module";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { emptyTextValidator } from "../../../shared/validators/empty-text.validator";
import { AuthenticationService } from "../../../core/services/auth.service";
import { ToastrService } from "ngx-toastr";
import { confirmPasswordValidator } from "../../../shared/validators/confirm-password.validator";

@Component({
    selector: "app-users",
    imports: [SharedModule],
    templateUrl: "./users.component.html",
    styleUrl: "./users.component.scss",
})
export class UsersComponent {
    constructor(
        private fb: FormBuilder,
        private usersService: UsersService,
        private modalService: BsModalService,
        private toastr: ToastrService,
    ) {}

    modalRef?: BsModalRef;
    users: any[] = [];
    form!: FormGroup;
    deleteUserId = 0;

    ngOnInit() {
        this.createForm();
        this.loadData();
    }

    loadData() {
        this.usersService.getUserByTenant().subscribe((res) => {
            this.users = res.data;
        });
    }

    createForm() {
        this.form = this.fb.group(
            {
                fullName: [
                    "",
                    [Validators.required, Validators.maxLength(250)],
                ],
                email: [
                    "",
                    [
                        Validators.required,
                        Validators.email,
                        Validators.maxLength(250),
                        emptyTextValidator,
                    ],
                ],
                password: [
                    "",
                    [
                        Validators.required,
                        Validators.maxLength(250),
                        emptyTextValidator,
                    ],
                ],
                confirmPassword: [
                    "",
                    [
                        Validators.required,
                        Validators.maxLength(250),
                        emptyTextValidator,
                    ],
                ],
                role: [null],
            },
            {
                validator: confirmPasswordValidator(),
            },
        );
    }

    openModalAddUser(template: TemplateRef<void>) {
        this.form.reset();
        this.modalRef = this.modalService.show(template, {
            class: "modal-lg",
            ignoreBackdropClick: true,
            keyboard: false,
        });
    }

    closeModalAddUser() {
        this.modalRef?.hide();
        this.form.reset();
    }

    addUser() {
        if (this.form.valid) {
            this.usersService.addUser(this.form.value).subscribe(
                (_) => {
                    this.loadData();
                    this.toastr.success("user has been created", "Success!");
                },
                (err) => {
                    this.toastr.error(
                        err.error.error,
                        "Failed to create user!",
                    );
                },
            );
            this.closeModalAddUser();
        }
    }

    openModalDeleteUser(template: TemplateRef<void>, userId: number) {
        this.setDeleteUserId(userId);
        this.modalRef = this.modalService.show(template, {
            class: "modal-sm",
        });
    }

    setDeleteUserId(userId: number) {
        this.deleteUserId = userId;
    }

    clearDeleteUserId() {
        this.deleteUserId = 0;
    }

    deleteUser() {
        this.usersService.deleteUser(this.deleteUserId).subscribe(
            (_) => {
                this.loadData();
                this.toastr.success("user has been deleted", "Success!");
            },
            (err) => {
                this.toastr.error(err.error.error, "Failed to delete user!");
            },
        );
        this.closeModalDeleteUser();
    }

    closeModalDeleteUser() {
        this.clearDeleteUserId();
        this.modalRef?.hide();
    }

    openModalEditUser(template: TemplateRef<void>, userId: number) {
        this.form.patchValue(this.users.find((x) => x.id === userId));
        this.modalRef = this.modalService.show(template, {
            class: "modal-lg",
            ignoreBackdropClick: true,
            keyboard: false,
        });
    }

    closeModalEditUser() {
        this.modalRef?.hide();
        this.form.reset();
    }
}
