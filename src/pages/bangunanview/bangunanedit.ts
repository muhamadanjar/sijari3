import { Component,NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,LoadingController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { Geolocation } from '@ionic-native/geolocation';
import { GeolocationProvider } from '../../providers/geolocation/geolocation';
import { BangunanviewlistPage } from "./bangunanviewlist";
import {BangunanProvider} from '../../providers/bangunan/bangunan';
import {SettingProvider} from '../../providers/setting/setting';
import { FormBuilder, FormGroup, FormArray,FormControl, Validators } from '@angular/forms';
import { ImghandlerProvider } from '../../providers/imghandler/imghandler';
@IonicPage()
@Component({
  selector: 'page-bangunanedit',
  templateUrl: 'bangunanedit.html',
})

export class BangunaneditPage {
    bangunanForm: FormGroup;
    key;
    ibangunan: FirebaseListObservable<any>;
    constructor(public navCtrl: NavController, public navParams: NavParams,
    public bangunanservice: BangunanProvider, public alertCtrl: AlertController,public loadingCtrl:LoadingController,
    public settingservice: SettingProvider,private _fb: FormBuilder,
    public imghandler: ImghandlerProvider,public zone: NgZone
    ) {
        this.initForm();
        this.key = navParams.data.key;
        if(navParams.data.lokasi_proyek){
            this.bangunanForm.setValue(navParams.data);
        }
    }
    ngAfterViewInit() {
        var o = this.settingservice.AdminLTE.options;
        this.settingservice._init();
        if (o.enableBoxWidget) {
            this.settingservice.AdminLTE.boxWidget.activate();
        }
    }
    initForm(){
        this.bangunanForm = this._fb.group({
            key: [""],  
            lokasi_proyek: ["",Validators.required],
            kode_prov: [""],
            kode_kab: [""],
            kode_kec: [""],
            kode_kel: [""],
            jorong: [""],

            id_user:[""],
            nama: [""],
            alamat: [""],
            jenis_kelamin:[""],
            usia: [""],
            pendidikanterakhir: [""],
            statusrumahtangga: [""],
            lamatinggal: [""],

            jumlahorang: [""],
            jumlahkk: [""],
            statuskependudukan:[""],
            kepemilikanktp:[""],
            kepemilikankk:[""],

            statuskepemilikantanah: [""],
            statuskepemilikanrumah: [""],
            namapemilik:[""],
            alamatpemilik:[""],
            hargasewaperbulan:[""],
            jeniskontruksi:[""],
            strukpbb:[""],
            luasbumi:[""],
            luasbangunan:[""],
            kepemilikansuratimb:[""],
            pemanfaatanbangunan:[""],
            sumberpenerangan:[""],
            sambungantelpkabel:[""],
            jenispagarrumah:[""],
            panjangpagar:[""],
            kepemilikansumurmataair:[""],
            kepemilikanrumahlain:[""],
            kepemilikantanahlain:[""],
            lokasitanahditempatlain:[""],
            
            pekerjaanutama:[""],
            pekerjaansampingan:[""],
            totalpendapatanperbulan:[""],
            totalpengeluaranperbulan:[""],

            pengetahuanrespondenirigasi:[""],
            sumberinformasi:[""],
            kesediandirekolasi:[""],
            alasanpenolakanrelokasi:[""],
            bentukpergantiandisukai:[""],
            pendapatrespondenpemindahankolektif:[""],
            x:[""],
            y:[""],
            foto:[""],
        });
    }
    close(){
        this.navCtrl.setRoot(BangunanviewlistPage);
    }
    editBangunan(key){
        this.bangunanservice.editBangunan(key,this.bangunanForm.value);
        this.navCtrl.setRoot(BangunanviewlistPage);
    }

    editimage() {
        let statusalert = this.alertCtrl.create({
          buttons: ['okay']
        });
        let loading = this.loadingCtrl.create({
          content:'Uploading.....'
        });
        loading.present();
        this.imghandler.uploadimage().then((url: any) => {
          console.log(url)
        }).catch((err) => {
          loading.dismiss();
        });
      }
}