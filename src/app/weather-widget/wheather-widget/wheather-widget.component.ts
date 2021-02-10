import { WheatherQuery } from './../../state/wheather.query';
import { CustomValidators } from 'src/app/core/validators/error.validator';
import { WheatherService } from './../../state/wheather.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { filter } from 'rxjs/operators';
import { Wheather } from 'src/app/state/wheather.model';

@Component({
  selector: 'app-wheather-widget',
  templateUrl: './wheather-widget.component.html',
  styleUrls: ['./wheather-widget.component.scss'],
})
export class WheatherWidgetComponent implements OnInit {
  form: FormGroup;
  wheatherItem: Wheather;
  @Output() addWidgetClick: EventEmitter<string> = new EventEmitter<string>();
  constructor(
    private fb: FormBuilder,
    private wheatherService: WheatherService,
    public wheatherQuery: WheatherQuery
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      city: [''],
      unit: ['', [CustomValidators.required, CustomValidators.correctUnit]],
    });
    this.form.controls['city'].setValue('bangkok');
  }
  changeCity(e) {
    this.form.controls['city'].setValue(e.target.value);
  }
  getFormControl(controlName): AbstractControl {
    return this.form.get(controlName);
  }
  get city(): string {
    return this.form.controls['city'].value;
  }
  submitForm(): void {
    this.form.markAllAsTouched();
    if (this.wheatherQuery.getEntity(this.city)) return;
    if (this.form.valid) {
      this.wheatherService.loadWheather(
        this.city,
        this.form.controls['unit'].value
      );
      this.wheatherQuery
        .selectLoading()
        .pipe(
          filter((loading) => {
            if (!loading) return true;
            return false;
          })
        )
        .subscribe(() => {
          this.wheatherItem = this.wheatherQuery.getEntity(this.city);
        });
      this.addWidgetClick.emit(this.city);
    }
  }
}
