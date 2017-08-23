import { Component,ViewChild } from '@angular/core';
import { Platform,Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AuthProvider } from '../providers/auth/auth';
import { Storage } from '@ionic/storage';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';
import { SettingPage } from '../pages/setting/setting';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = HomePage;
  pages: Array<{title: string,icon: string, component: any}>
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
  private auth:AuthProvider,private storage:Storage) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.pages = [
        { title: 'Home', icon:'home', component: HomePage, },
        { title: 'Profil', icon:'person', component: ProfilePage, },
        { title: 'Pengaturan', icon:'hammer', component: SettingPage, }
      ];
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout(){
    this.auth._logout();
    this.storage.set('user',null);
    this.nav.setRoot(LoginPage);
  }
}

