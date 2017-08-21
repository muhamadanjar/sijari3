import { Component,ViewChild, } from '@angular/core';
import { NavController, NavParams,Tabs } from 'ionic-angular';
import {HomePage} from '../home/home';
import {ProfilePage} from '../profile/profile';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})

export class TabsPage {
  tab1:any= HomePage;
  tab2:any= ProfilePage;
  tab3:any= ProfilePage;
  @ViewChild('myTab') tabRef: Tabs;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
    //this.switchTabs();
  }

  switchTabs() {
    this.tabRef.select(0, {});
  }

}
