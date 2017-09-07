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
    kuesionerForm: FormGroup;
    key;
    ibangunan: FirebaseListObservable<any>;

    allProvinsi;allKabupaten;allKecamatan;allKelurahan;
	kode_prov;kode_kab;kode_kec;kode_kel;
    allstatuskepemilikantanah;allpemanfaatantanah;
    
    constructor(public navCtrl: NavController, public navParams: NavParams,
    public tanahservice: TanahProvider, public alertCtrl: AlertController,
    public settingservice: SettingProvider,private _fb: FormBuilder,
    ) {
        this.allstatuskepemilikantanah = this.tanahservice.getStatusKepemilikanTanah();
		this.allpemanfaatantanah = this.tanahservice.getPemanfaatanTanah();
		this.settingservice.getAllProvinsi().subscribe((data)=>{
            this.allProvinsi=data;
            },function (error){
                console.log("error"+error);
            },function(){
                console.log("Mengambil data kecamatan");
            }
		);
        this.initForm();
        this.key = navParams.data.key;
        this.checkdata(navParams);
    }
    ngAfterViewInit() {
        var o = this.settingservice.AdminLTE.options;
        this.settingservice._init();
        if (o.enableBoxWidget) {
            this.settingservice.AdminLTE.boxWidget.activate();
        }
    }
    initForm(){
        this.kuesionerForm = this._fb.group({
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
			tanamanhias: this._fb.array([
				this.tanahservice.initTanamanBatang()
			]),
			tanamanpelindung:this._fb.array([
                this.tanahservice.initTanaman(),
			]),
			tanamanlain:this._fb.array([
				this.tanahservice.initTanamanBatang()
			]),
			x:[""],
			y:[""],
        });
    }
    close(){
        this.navCtrl.setRoot(TanahviewlistPage);
    }
    editBangunan(key){
        this.tanahservice.editTanah(key,this.kuesionerForm.value);
        this.navCtrl.setRoot(TanahviewlistPage);
    }
    initTanaman() {
        return this.tanahservice.initTanaman();
    }
    initTanamanBatang(){
        return this.tanahservice.initTanamanBatang();
    }
    checkdata(navParams){
		for (var key in navParams.data) {
			
			if(navParams.data[key] instanceof Array){
				
				if(key == 'tanaman_hortikultura' || key == 'tanamanpelindung'){
					let _arr = navParams.data[key];
					let tarr = this._fb.array([]);
					for(let i=0;i<_arr.length;i++){
						let tanaman = this.initTanaman();
						tanaman.patchValue({
							'nama_tanaman':_arr[i].nama_tanaman,
							'satu_tiga':_arr[i].satu_tiga,
							'tiga_sepuluh':_arr[i].tiga_sepuluh,
							'lebih_sepuluh':_arr[i].lebih_sepuluh,
						});
						tarr.push(tanaman);
					}
					console.log(tarr);
					this.kuesionerForm.setControl(key,tarr);	
				}else if(key == 'tanamanhias' || key == 'tanamanlain'){
					let _arr = navParams.data[key];
					let tarr = this._fb.array([]);
					for(let i=0;i<_arr.length;i++){
						let tanaman = this.initTanamanBatang();
						tanaman.patchValue({
							'nama_tanaman':_arr[i].nama_tanaman,
							'batang':_arr[i].batang,
						});
						tarr.push(tanaman);
					}
					console.log(tarr);
					this.kuesionerForm.setControl(key,tarr);	
					
				}
				
			}else{
				this.kuesionerForm.controls[key] = new FormControl(navParams.data[key]);
			}
		}
    }
    changeProvinsi(provinsi){
        this.settingservice.getAllKabupaten(provinsi).subscribe((data)=>{
                  this.allKabupaten=data;
                  this.kode_prov = provinsi;
            },function (error){
              console.log("error"+error)
            },function(){
              //loadingdata.dismiss();
            }
          );
              /*this.dbsetting.getallkabupaten(provinsi).then((res:any)=>{
                  console.log(res);
                  this.allKabupaten = res[0];
              });*/
              
    }
          
    changeKabupaten(kabupaten){
            this.settingservice.getAllKecamatan(kabupaten).subscribe((data)=>{
                  this.kode_kab = kabupaten;
            this.allKecamatan=data;
            //console.log(data);
            },function (error){
              console.log("error"+error)
            },function(){
              //loadingdata.dismiss();
            }
          );
    }
          
    changeKecamatan(kecamatan){
            this.settingservice.getAllDesa(kecamatan).subscribe((data)=>{
                  this.kode_kec = kecamatan;
            this.allKelurahan=data;
            //console.log(data);
            },function (error){
              console.log("error"+error)
            },function(){
              //loadingdata.dismiss();
            }
          );
    }
}