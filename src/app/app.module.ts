import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';

import { JariPage } from '../pages/jari/jari';
import { TanahPage } from '../pages/tanah/tanah';
import { BangunanPage } from '../pages/bangunan/bangunan';
import { SignupPage } from '../pages/signup/signup';
import { ProfilepicPage } from '../pages/profilepic/profilepic';
import { ProfilePage } from '../pages/profile/profile';
import { TabsPage } from '../pages/tabs/tabs';
import { config } from './app.firebaseconfig';
import { AngularFireAuth } from 'angularfire2/auth';

import { AngularFireModule } from 'angularfire2';

import { IonicStorageModule } from '@ionic/storage';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {//CdkTableModule,
    MdAutocompleteModule,
    MdButtonModule,
    MdButtonToggleModule,
    MdCardModule,
    MdCheckboxModule,
    MdChipsModule,
    MdCoreModule,
    MdDatepickerModule,
    MdDialogModule,
    MdExpansionModule,
    MdGridListModule,
    MdIconModule,
    MdInputModule,
    MdListModule,
    MdMenuModule,
    MdNativeDateModule,
    MdPaginatorModule,
    MdProgressBarModule,
    MdProgressSpinnerModule,
    MdRadioModule,
    MdRippleModule,
    MdSelectModule,
    MdSidenavModule,
    MdSliderModule,
    MdSlideToggleModule,
    MdSnackBarModule,
    MdSortModule,
    MdTableModule,
    MdTabsModule,
    MdToolbarModule,
    MdTooltipModule} from '@angular/material';
import { DbirigasiserviceProvider } from '../providers/dbirigasiservice/dbirigasiservice';
import { TanahProvider } from '../providers/tanah/tanah';
import { BangunanProvider } from '../providers/bangunan/bangunan';
import { GeolocationProvider } from '../providers/geolocation/geolocation';
import { AuthProvider } from '../providers/auth/auth';
import { SettingProvider } from '../providers/setting/setting';
import { UserProvider } from '../providers/user/user';
import { ImghandlerProvider } from '../providers/imghandler/imghandler';
import { FileChooser } from '@ionic-native/file-chooser';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    JariPage,
    TanahPage,
    BangunanPage,
    ProfilePage,
    ProfilepicPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    BrowserAnimationsModule,
    MdButtonModule, MdCheckboxModule,MdSelectModule,MdInputModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    IonicStorageModule.forRoot()
  ],
  exports: [
    //CdkTableModule,
    MdAutocompleteModule,
    MdButtonModule,
    MdButtonToggleModule,
    MdCardModule,
    MdCheckboxModule,
    MdChipsModule,
    MdCoreModule,
    MdDatepickerModule,
    MdDialogModule,
    MdExpansionModule,
    MdGridListModule,
    MdIconModule,
    MdInputModule,
    MdListModule,
    MdMenuModule,
    MdNativeDateModule,
    MdPaginatorModule,
    MdProgressBarModule,
    MdProgressSpinnerModule,
    MdRadioModule,
    MdRippleModule,
    MdSelectModule,
    MdSidenavModule,
    MdSliderModule,
    MdSlideToggleModule,
    MdSnackBarModule,
    MdSortModule,
    MdTableModule,
    MdTabsModule,
    MdToolbarModule,
    MdTooltipModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    JariPage,
    TanahPage,
    BangunanPage,
    ProfilePage,
    ProfilepicPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DbirigasiserviceProvider,
    TanahProvider,
    BangunanProvider,
    GeolocationProvider,
    AuthProvider,
    SettingProvider,
    AngularFireAuth,
    UserProvider,
    ImghandlerProvider,
    FileChooser
  ]
})
export class AppModule {}
