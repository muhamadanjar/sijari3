import { Component,ViewChild } from '@angular/core';
import { Platform,Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SQLite,SQLiteObject } from "@ionic-native/sqlite";

import { AuthProvider } from '../providers/auth/auth';
import { Storage } from '@ionic/storage';
import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';
import { SettingPage } from '../pages/setting/setting';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = LoginPage;
  pages: Array<{title: string,icon: string, component: any}>
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
  private auth:AuthProvider,private storage:Storage) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      let db = new SQLite();
      db.create({
        name:'data.db',
        location:'default'
      })
      .then((db:SQLiteObject) => {
        db.executeSql('create table if not exist user (nama VARCHAR(32))',{})
        .then(()=>{ 
          console.log('Executed SQL user');
        }).catch(e => { 
          console.log(e);
        });
      })
      .catch(e => console.log(e));
      splashScreen.hide();
      auth.getUser();
      storage.get('user').then((user)=>{
        if(user != null){
          this.rootPage = TabsPage;
        }
      });
      /*setTimeout(() => {
        splashScreen.hide();
      }, 100);*/
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

