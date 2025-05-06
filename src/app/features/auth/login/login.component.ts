import { NgClass } from "@angular/common";
import { Component } from "@angular/core";
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from "@angular/forms";
import { Router, RouterModule } from "@angular/router";
import { AuthService } from "../auth.service";

@Component({
    selector: "app-login",
    imports: [ReactiveFormsModule, NgClass, RouterModule],
    templateUrl: "./login.component.html",
    styleUrl: "./login.component.scss",
})
export class LoginComponent {
    constructor(
        private router: Router,
        private fb: FormBuilder,
        private auth: AuthService,
    ) {}

    loginForm!: FormGroup;
    hidePassword = true;
    hideConfirm = true;

    ngOnInit() {
        this.createLoginForm();
    }

    createLoginForm() {
        this.loginForm = this.fb.group({
            email: ["", [Validators.required, Validators.email]],
            password: ["", Validators.required],
        });
    }

    get password(): string {
        return this.loginForm.get("password")?.value || "";
    }

    onSubmit() {
        if (this.loginForm.valid) {
            this.auth.login(this.loginForm.value).subscribe((res) => {
                const token = res?.data?.token;
                if (token) {
                    this.auth.setToken(token);
                    this.router.navigate(["/dashboard"]);
                }
            });
        }
    }
}
