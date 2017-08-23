import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { config } from './app.firebaseconfig';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import {AngularFireDatabase} from 'angularfire2/database';

import { IonicStorageModule } from '@ionic/storage';
import {Geolocation} from '@ionic-native/geolocation';
//import {GoogleMaps} from '@ionic-native/google-maps';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AuthProvider } from '../providers/auth/auth';
import { GeolocationProvider } from '../providers/geolocation/geolocation';
import { ImghandlerProvider } from '../providers/imghandler/imghandler';
import { SettingProvider } from '../providers/setting/setting';
import { TanahProvider } from '../providers/tanah/tanah';
import { BangunanProvider } from '../providers/bangunan/bangunan';
import { UserProvider } from '../providers/user/user';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(config),
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    GeolocationProvider,
    ImghandlerProvider,
    SettingProvider,
    TanahProvider,
    BangunanProvider,
    UserProvider
  ]
})
export class AppModule {}
