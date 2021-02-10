import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Wheather } from './wheather.model';

export interface WheatherState extends EntityState<Wheather> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'wheather', idKey: 'city' })
export class WheatherStore extends EntityStore<WheatherState, Wheather> {
  constructor() {
    super();
  }
}
