import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { HttpClient } from '@angular/common/http';
import { WheatherStore } from './wheather.store';
import { Wheather } from './wheather.model';
import { map } from 'rxjs/operators';
import { WheatherQuery } from './wheather.query';
@Injectable({ providedIn: 'root' })
export class WheatherService {
  constructor(
    private wheatherStore: WheatherStore,
    private http: HttpClient,
    public wheatherQuery: WheatherQuery
  ) {}

  loadWheather(city: string, unit: string) {
    this.wheatherStore.setLoading(true);
    if (this.checkIfExist(city, unit)) {
      this.wheatherStore.setLoading(false);
      return;
    }
    this.http
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&unit=${unit}&appid=0d7303c17ee3d3482cd82a2ad273a90d`
      )
      .pipe(
        map((entity) => {
          return {
            city: entity['name'].toLowerCase(),
            description: entity['weather'][0]['description'],
            temp: entity['main']['temp'],
            unit: unit,
          };
        })
      )
      .subscribe((entity) => {
        this.wheatherStore.add(entity, { loading: false });
      });
  }
  checkIfExist(id, unit): boolean {
    const item = this.wheatherQuery.getEntity(id);
    if (item) return true;
    return false;
  }
}
