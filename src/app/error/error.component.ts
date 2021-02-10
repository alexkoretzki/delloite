import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { ErrorService } from '../services/error.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent implements OnInit {
  @Input() formInput: AbstractControl;

  isInvalid(): boolean {
    return ErrorService.isFieldInvalid(this.formInput);
  }

  ngOnInit(): void {}
  get messages(): string[] {
    let messages = [];
    if (!this.formInput) {
      return [];
    }
    for (const [key, value] of Object.entries(this.formInput.errors)) {
      messages.push(value.displayMessage);
    }
    return messages;
  }
}
