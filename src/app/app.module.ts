import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Geolocation } from '@ionic-native/geolocation';
import { FileChooser } from "@ionic-native/file-chooser";
import { File } from "@ionic-native/file";
import { FilePath } from "@ionic-native/file-path";
import { SQLite } from "@ionic-native/sqlite";
import { Camera } from "@ionic-native/camera";
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { config } from './app.firebaseconfig';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import { IonicStorageModule } from '@ionic/storage';

//import {GoogleMaps} from '@ionic-native/google-maps';
//import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
//import {NoopAnimationsModule} from '@angular/platform-browser/animations';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { TanahPage } from '../pages/tanah/tanah';
import { TanahMapPage } from '../pages/tanah/tanahMap';
import { TanahviewPage } from '../pages/tanahview/tanahview';
import { TanahviewlistPage } from '../pages/tanahview/tanahviewlist';
import { TanaheditPage } from '../pages/tanahview/tanahedit';

import { BangunanPage } from '../pages/bangunan/bangunan';
import { BangunanMapPage } from '../pages/bangunan/bangunanMap';
import { BangunanviewPage } from '../pages/bangunanview/bangunanview';
import { BangunanviewlistPage } from '../pages/bangunanview/bangunanviewlist';
import { BangunaneditPage } from '../pages/bangunanview/bangunanedit';
import { SignupPage } from '../pages/signup/signup';
import { ProfilepicPage } from '../pages/profilepic/profilepic';
import { ProfilePage } from '../pages/profile/profile';
import { TabsPage } from '../pages/tabs/tabs';
import { SettingPage } from '../pages/setting/setting';
import { ChatPage } from '../pages/chat/chat';
import { PasswordresetPage } from '../pages/passwordreset/passwordreset';
import { KuesionerlistPage } from '../pages/kuesionerlist/kuesionerlist';

import { AuthProvider } from '../providers/auth/auth';
import { GeolocationProvider } from '../providers/geolocation/geolocation';
import { ImghandlerProvider } from '../providers/imghandler/imghandler';
import { SettingProvider } from '../providers/setting/setting';
import { TanahProvider } from '../providers/tanah/tanah';
import { BangunanProvider } from '../providers/bangunan/bangunan';
import { UserProvider } from '../providers/user/user';

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
import { RequestsProvider } from '../providers/requests/requests';
import { ChatProvider } from '../providers/chat/chat';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    TanahPage,TanahMapPage,
    TanahviewPage,TanahviewlistPage,TanaheditPage,
    BangunanPage,BangunanMapPage,
    BangunanviewPage,BangunanviewlistPage,BangunaneditPage,
    ProfilePage,
    ProfilepicPage,
    TabsPage,
    SettingPage,
    ChatPage,
    PasswordresetPage,
    KuesionerlistPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    //BrowserAnimationsModule,
    //NoopAnimationsModule,
    AngularFireModule.initializeApp(config),
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),

    MdButtonModule, MdCheckboxModule,MdSelectModule,MdInputModule,
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
    TanahPage,TanahMapPage,
    TanahviewPage,TanahviewlistPage,TanaheditPage,
    BangunanPage,BangunanMapPage,
    BangunanviewPage,BangunanviewlistPage,BangunaneditPage,
    ProfilePage,
    ProfilepicPage,
    TabsPage,
    SettingPage,
    ChatPage,
    PasswordresetPage,
    KuesionerlistPage
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
    UserProvider,
    AngularFireAuth,
    AngularFireDatabase,
    FileChooser,
    File,
    FilePath,
    RequestsProvider,
    ChatProvider,
    SQLite,
    Geolocation,
    Camera
  ]
})
export class AppModule {}
