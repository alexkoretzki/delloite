import { Pipe, PipeTransform } from '@angular/core';
import { Wheather } from 'src/app/state/wheather.model';

export enum Unit {
  'standart' = 'K',
  'imperial' = 'F',
}

@Pipe({ name: 'wheather' })
export class WheatherPipe implements PipeTransform {
  transform(value: Wheather): string {
    const unit = Unit[value.unit];
    const sign = this.generateSign(value.temp);

    return `${value.city}, ${sign}${value.temp} ${unit}, ${value.description}`;
  }
  private generateSign(temp: number): string {
    if (temp > 0) return '+';
    if (temp < 0) return '-';
    return;
  }
}
