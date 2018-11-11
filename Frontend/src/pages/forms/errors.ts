import { ValidationErrors } from "@angular/forms";

export class FormErrors {
  handler(error: ValidationErrors, args?: string[]): string {
    if(error.required) {
      return "*Este campo é obrigatório"
    }
  }
}
