import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { WheatherStore, WheatherState } from './wheather.store';
import { Wheather } from './wheather.model';

@Injectable({
  providedIn: 'root'
})
export class WheatherQuery extends QueryEntity<WheatherState, Wheather> {

  constructor(protected store: WheatherStore) {
    super(store);
  }

}
