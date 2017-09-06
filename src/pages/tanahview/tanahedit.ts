import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { Geolocation } from '@ionic-native/geolocation';
import { GeolocationProvider } from '../../providers/geolocation/geolocation';
import { TanahviewlistPage } from "./tanahviewlist";
import {TanahProvider} from '../../providers/tanah/tanah';
import {SettingProvider} from '../../providers/setting/setting';
import { FormBuilder, FormGroup, FormArray,FormControl, Validators } from '@angular/forms';
@IonicPage()
@Component({
  selector: 'page-tanahedit',
  templateUrl: 'tanahedit.html',
})

export class TanaheditPage {
    tanahForm: FormGroup;
    key;
    ibangunan: FirebaseListObservable<any>;
    constructor(public navCtrl: NavController, public navParams: NavParams,
    public tanahservice: TanahProvider, public alertCtrl: AlertController,
    public settingservice: SettingProvider,private _fb: FormBuilder,
    ) {
        this.initForm();
        this.key = navParams.data.key;
    }
    ngAfterViewInit() {
        var o = this.settingservice.AdminLTE.options;
        this.settingservice._init();
        if (o.enableBoxWidget) {
            this.settingservice.AdminLTE.boxWidget.activate();
        }
    }
    initForm(){
        this.tanahForm = this._fb.group({
			key: [""],
			lokasi_proyek: ["",Validators.required],
			kode_prov: [""],
			kode_kab: [""],
			kode_kec: [""],
			kode_kel: [""],
			jorong: [""],
			id_user:[""],
			nama_pemilik: [""],
			alamat_pemilik: [""],

			status_kepemilikan_tanah: [""],
			pemanfaatantanah: [""],
			tanaman_hortikultura: this._fb.array([
                this.tanahservice.initTanaman(),
			]),
			tanamanhias: this._fb.array([this._fb.group({
				nama_tanaman: [""],
				batang: [""]
			})]),
			tanamanpelindung:this._fb.array([
                this.tanahservice.initTanaman(),
			]),
			tanamanlain:this._fb.array([this._fb.group({
				nama_tanaman: [""],
				batang: [""]
			})]),
			x:[""],
			y:[""],
		});
    }
    close(){
        this.navCtrl.setRoot(TanahviewlistPage);
    }
    editBangunan(key){
        this.tanahservice.editTanah(key,this.tanahForm.value);
        this.navCtrl.setRoot(TanahviewlistPage);
    }
}