import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Controls } from '../pages/home/controls/controls';
import { TimerPipe } from '../pipes/timeTransform';
import { counter } from '../pages/home/counter/counter';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Controls,
    counter,
    TimerPipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    FontAwesomeModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Controls,
    counter
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TimerPipe
  ]
})
export class AppModule {}
