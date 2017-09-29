import { Component,ViewChild,NgZone } from '@angular/core';
import { NavController, NavParams,Tabs,ActionSheetController } from 'ionic-angular';
import { tanahData } from '../tanah/tanahData';
//import {Tanah} from '../../models/tanah';

import { FormBuilder, FormGroup, FormArray,FormControl, Validators } from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation';
import { GeolocationProvider } from '../../providers/geolocation/geolocation';
import { TanahProvider } from '../../providers/tanah/tanah';
import { SettingProvider } from '../../providers/setting/setting';
import { ImghandlerProvider } from '../../providers/imghandler/imghandler';

import {Storage} from '@ionic/storage';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import {TabsPage} from '../tabs/tabs';
import {TanahMapPage} from '../tanah/tanahMap';
import { Camera } from "@ionic-native/camera";

export interface Tanaman {
    nama_tanaman: string;  // required field
	satu_tiga: string;
	tiga_sepuluh: string;
	lebih_sepuluh: string;
	foto:string;
}

export interface TanamanHias {
    nama_tanaman: string;  // required field
	batang: string;
	foto:string;
}


@Component({
    selector: 'page-tanahedit',
    templateUrl: 'tanahedit.html',
    providers:[Geolocation,AngularFireDatabase],

})
export class TanaheditPage {
    public data = {} as tanahData;
		public error: string;
		key:string;

		debug;
	
		allProvinsi;allKabupaten;allKecamatan;allKelurahan;
		kode_prov;kode_kab;kode_kec;kode_kel;
		allstatuskepemilikantanah;allpemanfaatantanah;

		kuesionerForm: FormGroup;
		tanamanhortikura;tanamanpelindung;
		tanamanhias;tanamanlain;
		
		public profile: any[];
		public statustanah: any[];
	
		@ViewChild(Tabs) tabs: Tabs;
    constructor(public navCtrl: NavController, public navParams: NavParams,
  	public geolocation:Geolocation,
		public geolocationService: GeolocationProvider,
		public actionSheetCtrl:ActionSheetController,
		private _fb: FormBuilder,
		public tanahProvider:TanahProvider,
		public dbsetting:SettingProvider,
		public imghandler:ImghandlerProvider,
		public storage:Storage,
		public zone:NgZone,
		db: AngularFireDatabase,
		public afireauth: AngularFireAuth,
		public camera:Camera
	) {
		
		this.allstatuskepemilikantanah = this.tanahProvider.getStatusKepemilikanTanah();
		this.allpemanfaatantanah = this.tanahProvider.getPemanfaatanTanah();
		this.dbsetting.getAllProvinsi().subscribe((data)=>{
            this.allProvinsi=data;
        },function (error){
            console.log("error"+error);
        },function(){
            console.log("Mengambil data kecamatan");
        });
       
		this.initForm();
		//this.kuesionerForm.patchValue({'id_user':this.afireauth.auth.currentUser.uid});
		
		this.profile = tanahProvider.getPagesProfile();
		this.statustanah = tanahProvider.getPagesStatusTanah();

		var o = this.dbsetting.AdminLTE.options;
		this.dbsetting._init();
		if (o.enableBoxWidget) {
			this.dbsetting.AdminLTE.boxWidget.activate();
		}
		this.tanamanhortikura = navParams.data.tanaman_hortikultura;
		this.tanamanpelindung = navParams.data.tanamanpelindung;
		this.tanamanhias = navParams.data.tanamanhias;
		this.tanamanlain = navParams.data.tanamanlain;
		this.checkdata(navParams);
    	this.key = navParams.data.key;
	}
  	ngAfterViewInit() {
		this.geolocate2();
	}
	public ngOnInit() {
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
                this.tanahProvider.initTanaman(),
			]),
			tanamanhias: this._fb.array([
				this.tanahProvider.initTanamanBatang()
			]),
			tanamanpelindung:this._fb.array([
                this.tanahProvider.initTanaman(),
			]),
			tanamanlain:this._fb.array([
				this.tanahProvider.initTanamanBatang()
			]),
			x:[""],
			y:[""],
		});
	}
	
	initTanaman() {
		return this.tanahProvider.initTanaman();
	}
	initTanamanBatang(){
		return this.tanahProvider.initTanamanBatang();
	}
	addHortikultura() {
      const control = <FormArray>this.kuesionerForm.controls['tanaman_hortikultura'];
			control.push(this.initTanaman());
			
  }
  removeHortikultura(i: number) {
        const control = <FormArray>this.kuesionerForm.controls['tanaman_hortikultura'];
        control.removeAt(i);
	}
	addTanamanhias(){
		const control = <FormArray>this.kuesionerForm.controls['tanamanhias'];
        control.push(this.initTanamanBatang());
	}
	removeTanamanhias(i: number) {
		const control = <FormArray>this.kuesionerForm.controls['tanamanhias'];
		control.removeAt(i);
	}
	addTanamanpelindung(){
		const control = <FormArray>this.kuesionerForm.controls['tanamanpelindung'];
        control.push(this.initTanaman());
	}
	removeTanamanpelindung(i: number) {
		const control = <FormArray>this.kuesionerForm.controls['tanamanpelindung'];
		control.removeAt(i);
	}
	addTanamanlain(){
		const control = <FormArray>this.kuesionerForm.controls['tanamanlain'];
    	control.push(this.initTanamanBatang());
	}
	removeTanamanlain(i: number) {
		const control = <FormArray>this.kuesionerForm.controls['tanamanlain'];
		control.removeAt(i);
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
							'foto':_arr[i].foto,
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
							'foto':_arr[i].foto,
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

  geolocate(){
		this.geolocationService.geolocate();
		this.geolocationService.getCoords().then(
		    (position) => {
		      	this.data.x = position.coords.longitude;
						this.data.y = position.coords.latitude;

						this.kuesionerForm.patchValue({'x':position.coords.longitude});
						this.kuesionerForm.patchValue({'y':position.coords.latitude});
					
		    }, (error) => {
		    	this.error = JSON.stringify(error);
		    }
		);
	}

	geolocate2(){
		if(this.geolocation){
	      this.geolocation.getCurrentPosition().then((position) => {
	        this.data.x = position.coords.longitude;
	        this.data.y = position.coords.latitude;
					this.kuesionerForm.patchValue({'x':position.coords.longitude});
					this.kuesionerForm.patchValue({'y':position.coords.latitude});
	      }, (err) => {
					console.log(err);
					this.error = JSON.stringify(err);
	      }).catch((error)=>{
					console.log('Error getting location', error);
					this.error = JSON.stringify(error);
				});
	  	}
	    /*this.geolocation.getCurrentPosition().then((resp) => {
		 		this.data.x = resp.coords.longitude;
				this.data.y = resp.coords.latitude;
				this.kuesionerForm.addControl('x',new FormControl(this.data.x));
				this.kuesionerForm.addControl('y',new FormControl(this.data.y));
			}).catch((error) => {
				console.log('Error getting location', error);
				this.error = JSON.stringify(error);
			});*/

		let watch = this.geolocation.watchPosition();
		watch.subscribe((data) => {
		 // data can be a set of coordinates, or an error (if an error occurred).
		 // data.coords.latitude
		 // data.coords.longitude

		});
	}

	pinpoint(){
		this.navCtrl.setRoot(TanahMapPage,this.kuesionerForm.value);
	}

	editTanah(key:string){
		this.tanahProvider.editTanah(key,this.kuesionerForm.value);
		this.navCtrl.setRoot(TabsPage);
	}
	close(){
		this.navCtrl.setRoot(TabsPage);
	}
	delete(key: string) {   
		this.tanahProvider.deleteTanahByKey(key); 
		this.navCtrl.setRoot(TabsPage);
	}

	changeProvinsi(provinsi){
	  this.dbsetting.getAllKabupaten(provinsi).subscribe((data)=>{
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
	  	this.dbsetting.getAllKecamatan(kabupaten).subscribe((data)=>{
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
	  	this.dbsetting.getAllDesa(kecamatan).subscribe((data)=>{
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
	addTanamanForm(controlname){
		const control = <FormArray>this.kuesionerForm.controls[controlname];
		control.push(this.tanahProvider.initTanaman());
	}
	removeTanamanForm(i: number,controlname){
		const control = <FormArray>this.kuesionerForm.controls[controlname];
		control.removeAt(i);
	}
	addTanamanBatangForm(controlname){
		const control = <FormArray>this.kuesionerForm.controls[controlname];
		control.push(this.tanahProvider.initTanamanBatang());
	}
	removeTanamanBatangForm(i: number,controlname){
		const control = <FormArray>this.kuesionerForm.controls[controlname];
		control.removeAt(i);
	}
	editimage(array_hortikura) {
		this.paSheetHortikura(array_hortikura);
	}
	paSheetHortikura(array_hortikura) {
		let tanahedit = this;
		
		let actionSheet = this.actionSheetCtrl.create({
		  title: 'Hortikura',
		  buttons: [
			{
			  text: 'Ambil Galeri',
			  role: 'destructive',
			  handler: () => {
					tanahedit.selectPhotoHortikura(array_hortikura);
			  }
			},{
			  text: 'Ambil Gambar',
			  handler: () => {
					tanahedit.takePhotoHortikura(array_hortikura);
			  }
			},{
			  text: 'Cancel',
			  role: 'cancel',
			  handler: () => {
				console.log('Cancel clicked');
			  }
			}
		  ]
		});
		actionSheet.present();
	}
  
	takePhotoHortikura(array_hortikura){
		const options = {
			quality: 75,
			destinationType: this.camera.DestinationType.FILE_URI,
			encodingType: this.camera.EncodingType.JPEG,
			mediaType: this.camera.MediaType.PICTURE
		}
		let tanaman = this.tanamanhortikura;
		this.imghandler.upload(options,'/tanah').then((uploadedurl: any)=>{
			tanaman[array_hortikura].foto = uploadedurl;
			this.kuesionerForm.patchValue({tanaman_hortikultura:this.tanamanhortikura});
		}).catch(err=>{
			this.error = JSON.stringify(err);
		});
	}
  
	selectPhotoHortikura(array_hortikura): void {
		const optionsselect = {
			sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
		  destinationType: this.camera.DestinationType.FILE_URI,
		  quality: 75,
		  encodingType: this.camera.EncodingType.PNG,
		}
		let tanaman = this.tanamanhortikura;
		this.imghandler.upload(optionsselect,'/tanah').then((uploadedurl: any)=>{
				tanaman[array_hortikura].foto = uploadedurl;
				this.kuesionerForm.patchValue({tanaman_hortikultura:this.tanamanhortikura});
		}).catch(err=>{
				this.error = JSON.stringify(err);
		});
		
	}
	editimagehias(array_hias) {
		this.paSheetHias(array_hias);
	}
	paSheetHias(array_hias) {
		let tanahedit = this;
		
		let actionSheet = this.actionSheetCtrl.create({
			title: 'Hias',
			buttons: [
			{
				text: 'Ambil Galeri',
				role: 'destructive',
				handler: () => {
					tanahedit.selectPhotoHias(array_hias);
				}
			},{
				text: 'Ambil Gambar',
				handler: () => {
					tanahedit.takePhotoHias(array_hias);
				}
			},{
				text: 'Cancel',
				role: 'cancel',
				handler: () => {
				console.log('Cancel clicked');
				}
			}
			]
		});
		actionSheet.present();
	}
	takePhotoHias(array_hias){
		const options = {
			quality: 75,
			destinationType: this.camera.DestinationType.FILE_URI,
			encodingType: this.camera.EncodingType.JPEG,
			mediaType: this.camera.MediaType.PICTURE
		}
		let tanaman = this.tanamanhias;
		this.imghandler.upload(options,'/hias').then((uploadedurl: any)=>{
			tanaman[array_hias].foto = uploadedurl;
			this.kuesionerForm.patchValue({tanamanhias:tanaman});
		}).catch(err=>{
			this.error = JSON.stringify(err);
		});
	}
	selectPhotoHias(array_hias): void {
		const optionsselect = {
			sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
		  destinationType: this.camera.DestinationType.FILE_URI,
		  quality: 75,
		  encodingType: this.camera.EncodingType.PNG,
		}
		let tanaman = this.tanamanhias;
		this.imghandler._uploadbase64(optionsselect).then((uploadedurl: any)=>{
			tanaman[array_hias].foto = uploadedurl;
			this.kuesionerForm.patchValue({tanamanhias:tanaman});
		}).catch(err=>{
			this.error = JSON.stringify(err);
		});
		
	}

	editimagelain(array_hias) {
		this.paSheetLain(array_hias);
	}
	paSheetLain(array_hias) {
		let tanahedit = this;
		
		let actionSheet = this.actionSheetCtrl.create({
			title: 'Hias',
			buttons: [
			{
				text: 'Ambil Galeri',
				role: 'destructive',
				handler: () => {
					tanahedit.selectPhotoLain(array_hias);
				}
			},{
				text: 'Ambil Gambar',
				handler: () => {
					tanahedit.takePhotoLain(array_hias);
				}
			},{
				text: 'Cancel',
				role: 'cancel',
				handler: () => {
				console.log('Cancel clicked');
				}
			}
			]
		});
		actionSheet.present();
	}
	takePhotoLain(array_hias){
		const options = {
			quality: 75,
			destinationType: this.camera.DestinationType.FILE_URI,
			encodingType: this.camera.EncodingType.JPEG,
			mediaType: this.camera.MediaType.PICTURE
		}
		let tanaman = this.tanamanlain;
		this.imghandler.upload(options,'/lain').then((uploadedurl: any)=>{
			tanaman[array_hias].foto = uploadedurl;
			this.kuesionerForm.patchValue({tanamanlain:tanaman});
		}).catch(err=>{
			this.error = JSON.stringify(err);
		});
	}
	selectPhotoLain(array_hias): void {
		const optionsselect = {
			sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
		  destinationType: this.camera.DestinationType.FILE_URI,
		  quality: 75,
		  encodingType: this.camera.EncodingType.PNG,
		}
		let tanaman = this.tanamanlain;
		this.imghandler.upload(optionsselect,'lain').then((uploadedurl: any)=>{
			tanaman[array_hias].foto = uploadedurl;
			this.kuesionerForm.patchValue({tanamanlain:tanaman});
		}).catch(err=>{
			this.error = JSON.stringify(err);
		});
		
	}

	editimagepelindung(array_hias) {
		this.paSheetPelindung(array_hias);
	}
	paSheetPelindung(array_hias) {
		let tanahedit = this;
		
		let actionSheet = this.actionSheetCtrl.create({
			title: 'Hias',
			buttons: [
			{
				text: 'Ambil Galeri',
				role: 'destructive',
				handler: () => {
					tanahedit.selectPhotoPelindung(array_hias);
				}
			},{
				text: 'Ambil Gambar',
				handler: () => {
					tanahedit.takePhotoPelindung(array_hias);
				}
			},{
				text: 'Cancel',
				role: 'cancel',
				handler: () => {
				console.log('Cancel clicked');
				}
			}
			]
		});
		actionSheet.present();
	}
	takePhotoPelindung(array_hias){
		const options = {
			quality: 75,
			destinationType: this.camera.DestinationType.FILE_URI,
			encodingType: this.camera.EncodingType.JPEG,
			mediaType: this.camera.MediaType.PICTURE
		}
		let tanaman = this.tanamanpelindung;
		this.imghandler._uploadbase64(options).then((uploadedurl: any)=>{
			tanaman[array_hias].foto = uploadedurl;
			this.kuesionerForm.patchValue({'tanamanpelindung':tanaman});
		}).catch(err=>{
			this.error = JSON.stringify(err);
		});
	}
	selectPhotoPelindung(array_hias): void {
		const optionsselect = {
			sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
		  destinationType: this.camera.DestinationType.FILE_URI,
		  quality: 75,
		  encodingType: this.camera.EncodingType.PNG,
		}
		let tanaman = this.tanamanpelindung;
		this.imghandler.upload(optionsselect,'pelindung').then((uploadedurl: any)=>{
			tanaman[array_hias].foto = uploadedurl;
			this.kuesionerForm.patchValue({tanamanpelindung:tanaman});
		}).catch(err=>{
			this.error = JSON.stringify(err);
		});
		
	}

}
