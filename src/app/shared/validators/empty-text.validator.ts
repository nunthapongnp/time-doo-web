import { AbstractControl, ValidationErrors } from "@angular/forms";

export function emptyTextValidator(
    control: AbstractControl,
): ValidationErrors | null {
    const isEmpty = (control.value || "").trim().length === 0;
    const isInvalid = isEmpty || control.value === null;
    return isInvalid ? { required: true } : null;
}
