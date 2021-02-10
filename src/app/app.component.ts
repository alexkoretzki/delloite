import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Wheather } from './state/wheather.model';
import { WheatherQuery } from './state/wheather.query';
import { WheatherWidgetComponent } from './weather-widget/wheather-widget/wheather-widget.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  @ViewChild('container', { static: true, read: ViewContainerRef })
  entry: ViewContainerRef;
  subscription: Subscription = new Subscription();
  title = 'delloite';
  constructor(
    private resolver: ComponentFactoryResolver,
    public wheatherQuery: WheatherQuery
  ) {}
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  addWidget(id: string): void {
    if (this.wheatherQuery.getEntity(id)) return;
    this.addComponent();
  }

  private addComponent(): void {
    const factory = this.resolver.resolveComponentFactory(
      WheatherWidgetComponent
    );
    const componentRef = this.entry.createComponent(factory);
    const sub = componentRef.instance.addWidgetClick.subscribe((val) =>
      this.addWidget(val)
    );
    this.subscription.add(sub);
  }

  get wheatherList(): Observable<Wheather[]> {
    return this.wheatherQuery.selectAll();
  }
}
