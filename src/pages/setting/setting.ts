import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, FormArray,FormControl, Validators } from '@angular/forms';
import { TabsPage } from '../tabs/tabs';
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {
  settingForm:FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams,private _fb: FormBuilder) {
    this.settingForm = this._fb.group({
      provinsi: [""],
      kabupaten: [""],
      kecamantan: [""],
      nagari: [""],
		});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }

  close(){
		this.navCtrl.setRoot(TabsPage);
	}

}
