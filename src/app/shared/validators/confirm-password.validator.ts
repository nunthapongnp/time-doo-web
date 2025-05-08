import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function confirmPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const password = control.get("password")?.value;
        const confirmPassword = control.get("confirmPassword")?.value;

        if (password !== confirmPassword) {
            return { confirmPassword: true };
        }
        return null;
    };
}
