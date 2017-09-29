import { Component,NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,LoadingController,ActionSheetController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { Geolocation } from '@ionic-native/geolocation';
import { Camera } from '@ionic-native/camera';
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
    imgurl;
    ibangunan: FirebaseListObservable<any>;
    constructor(public navCtrl: NavController, public navParams: NavParams,
    public bangunanservice: BangunanProvider, public alertCtrl: AlertController,public loadingCtrl:LoadingController,
    public settingservice: SettingProvider,private _fb: FormBuilder,
    public actionSheetCtrl:ActionSheetController,public camera:Camera,
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
		this.paSheet();
	}
	paSheet() {
		let tanahedit = this;
		
		let actionSheet = this.actionSheetCtrl.create({
			title: 'Hias',
			buttons: [
			{
				text: 'Ambil Galeri',
				role: 'destructive',
				handler: () => {
					tanahedit.selectPhoto();
				}
			},{
				text: 'Ambil Gambar',
				handler: () => {
					tanahedit.takePhoto();
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
	takePhoto(){
		const options = {
			quality: 75,
			destinationType: this.camera.DestinationType.FILE_URI,
			encodingType: this.camera.EncodingType.JPEG,
			mediaType: this.camera.MediaType.PICTURE
		}
		let loader = this.loadingCtrl.create({
            content: 'Please wait'
        })
        loader.present();
		this.imghandler.upload(options,'/bangunan').then((uploadedurl: any)=>{
            loader.dismiss();
            this.zone.run(() => {
                this.bangunanForm.patchValue({foto:uploadedurl});
            });
			
		}).catch(err=>{
			//this.error = JSON.stringify(err);
		});
	}
	selectPhoto(): void {
		const optionsselect = {
			sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
		  destinationType: this.camera.DestinationType.FILE_URI,
		  quality: 75,
		  encodingType: this.camera.EncodingType.PNG,
		}
		
		this.imghandler.upload(optionsselect,'pelindung').then((uploadedurl: any)=>{
			
			this.bangunanForm.patchValue({foto:uploadedurl});
		}).catch(err=>{
			//this.error = JSON.stringify(err);
		});
		
    }
    chooseimage() {
        let loader = this.loadingCtrl.create({
          content: 'Please wait'
        })
        loader.present();
        this.imghandler.uploadimage().then((uploadedurl: any) => {
          loader.dismiss();
          this.zone.run(() => {
            this.imgurl = uploadedurl;
            
          })
        })
      }
}