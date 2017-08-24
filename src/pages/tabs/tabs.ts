import { Component,ViewChild, } from '@angular/core';
import { IonicPage,NavController, NavParams,Tabs } from 'ionic-angular';
import {HomePage} from '../home/home';
import {ProfilePage} from '../profile/profile';
/**
 * Generated class for the TabsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  private firstLoaded: boolean = false;
  tab1:any= HomePage;
  tab2:any= ProfilePage;
  tab3:any= ProfilePage;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
    //this.switchTabs();
  }

  /*ionViewDidEnter() {
    if (!this.firstLoaded && this.tabsmenu.getSelected().length() >= 2) {
        this.tabsmenu.getSelected().remove(0, this.tabsmenu.getSelected().length() - 1);
        this.firstLoaded = true;
    }
  }

  switchTabs() {
    this.tabsmenu.select(0, {});
  }*/

}
