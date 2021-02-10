import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { WheatherWidgetComponent } from './weather-widget/wheather-widget/wheather-widget.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorComponent } from './error/error.component';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { WheatherPipe } from './core/pipes/wheather.pipe';

@NgModule({
  declarations: [
    AppComponent,
    WheatherWidgetComponent,
    ErrorComponent,
    WheatherPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    environment.production ? [] : AkitaNgDevtools.forRoot(),
  ],
  entryComponents: [WheatherWidgetComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
