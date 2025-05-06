import { NgClass } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "../auth.service";

@Component({
    selector: "app-register",
    imports: [ReactiveFormsModule, NgClass, RouterLink],
    templateUrl: "./register.component.html",
    styleUrl: "./register.component.scss",
})
export class RegisterComponent implements OnInit {
    constructor(
        private auth: AuthService,
        private router: Router,
        private fb: FormBuilder,
    ) {}

    registerForm!: FormGroup;
    hidePassword = true;
    hideConfirm = true;

    ngOnInit() {
        this.createRegisterForm();
    }

    createRegisterForm() {
        this.registerForm = this.fb.group({
            email: ["", [Validators.required, Validators.email]],
            password: ["", [Validators.required]],
            confirmPassword: ["", Validators.required],
        });
    }

    get password(): string {
        return this.registerForm.get("password")?.value || "";
    }

    get validLength() {
        return this.password.length >= 8;
    }

    get hasNumber() {
        return /\d/.test(this.password);
    }

    get hasSpecial() {
        return /[!@#$%^&*(),.?":{}|<>]/.test(this.password);
    }

    get passwordStrength(): number {
        return [this.validLength, this.hasNumber, this.hasSpecial].filter(
            Boolean,
        ).length;
    }

    onSubmit() {
        if (this.registerForm.valid) {
            this.auth.register(this.registerForm.value).subscribe((res) => {
                const token = res?.data?.token;
                if (token) {
                    this.auth.setToken(token);
                    this.router.navigate(["/dashboard"]);
                }
            });
        }
    }
}
