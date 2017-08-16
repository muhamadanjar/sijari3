import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import {Http, Response} from "@angular/http";

import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import 'rxjs/add/observable/throw';
import {Observable} from "rxjs";

import { Geolocation } from '@ionic-native/geolocation';
import {LoadingController, Loading, ToastController} from "ionic-angular";
import {Camera} from '@ionic-native/camera';
import {File, FileEntry} from "@ionic-native/file";
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';


import { JariIrigasi } from './JariIrigasi';
import { jaridata } from '../../models/interfaces/jaridata';
import { DbirigasiserviceProvider } from '../../providers/dbirigasiservice/dbirigasiservice';

@Component({
  selector: 'page-jari',
  templateUrl: 'jari.html',
  providers:[Geolocation,Camera,File,FileTransfer]
})
export class JariPage {
  data = {} as JariIrigasi;
  lastImage: string = null;
  

  allJari:JariIrigasi[]=[];

  Id: string;
  daerah_irigasi: string;
  bendung: string;
  jaringan_irigasi:string;
  jaringan_irigasi_bangunan:string;
  saluran_primer:string;
  drain_inlet:string;
  saluran_sekunder:string;
  kondisi:string;
  x:any;
  y:any;
  foto: string;

  public myPhoto: any;
  public myPhotoURL: any;
  public error: string;
  private loading: Loading;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public readonly http: Http,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,  
  	public geolocation:Geolocation,
    public file: File,
    public transfer: FileTransfer,
    public camera: Camera,
    public _dbtaskservice: DbirigasiserviceProvider,
    
    
  	) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JariPage');
    /*let loadingdata=this.loadingCtrl.create({
      content:"Loading Tasks..."
    });
    loadingdata.present();
    this._dbtaskservice.getAllTasks().subscribe((data:jaridata[])=>{
      this.allJari=data;
      },function (error){
        console.log("error"+error)
      },function(){
        loadingdata.dismiss();
      }
     
    );*/
     
  }

  takePhoto() {
    this.camera.getPicture({
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.PNG,
      saveToPhotoAlbum: true
    }).then(imageData => {
      this.myPhoto = imageData;
      this._uploadPhoto(imageData);
    }, error => {
      this.error = JSON.stringify(error);
    });
  }

  selectPhoto(): void {
    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.FILE_URI,
      quality: 100,
      encodingType: this.camera.EncodingType.PNG,
    }).then(imageData => {
      this.myPhoto = imageData;
      this._uploadPhoto(imageData);
    }, error => {
      this.error = JSON.stringify(error);
    });
  }

  private uploadPhoto(imageFileUri: any): void {
    this.error = null;
    this.loading = this.loadingCtrl.create({
      content: 'Uploading...'
    });

    this.loading.present();

    this.file.resolveLocalFilesystemUrl(imageFileUri)
      .then(entry => (<FileEntry>entry).file(file => this.readFile(file)))
      .catch(err => console.log(err));
  }

  _uploadPhoto(imageData: any): void {
    this.error = null;
    this.loading = this.loadingCtrl.create({
      content: 'Uploading...'
    });

    this.loading.present();
    /*this.file.resolveLocalFilesystemUrl(imageData)
      .then(entry => (<FileEntry>entry).file(file => this.readFile(file)))
      .catch(err => console.log(err));*/
    const fileTransfer: FileTransferObject = this.transfer.create();
    let options1: FileUploadOptions = {
      fileKey: 'file',
      fileName: this.randomString(15)+'.jpg',
      headers: {}
    }
    fileTransfer.upload(imageData, 'http://10.10.100.252/api/pjuuploadimage',options1)
      .then((data) => {
       // success
       //alert("success");
       this.loading.dismiss()
    }, (err) => {
       // error
       alert("error"+JSON.stringify(err));
    });
 
  }

  upload(){
        let options = {
             quality: 100
        };
        this.camera.getPicture(options).then((imageData) => {
         // imageData is either a base64 encoded string or a file URI
         // If it's base64:

       const fileTransfer: FileTransferObject = this.transfer.create();

        let options1: FileUploadOptions = {
          fileKey: 'file',
          fileName: this.randomString(15)+'.jpg',
          headers: {}
        }

    fileTransfer.upload(imageData, 'http://10.10.100.252/php/upload.php', options1)
     .then((data) => {
       // success
       alert("success");

     }, (err) => {
       // error
       alert("error"+JSON.stringify(err));
     });


      });

   
  }

  private readFile(file: any) {
    const reader = new FileReader();
    reader.onloadend = () => {
      const formData = new FormData();
      const imgBlob = new Blob([reader.result], {type: file.type});
      formData.append('file', imgBlob, file.name);
      this.postData(formData);
    };
    reader.readAsArrayBuffer(file);
  }

  private postData(formData: FormData) {
    this.http.post("http://192.168.20.5/api/pjuuploadimage", formData)
      .catch((e) => this.handleError(e))
      .map(response => response.text())
      .finally(() => this.loading.dismiss())
      .subscribe(ok => this.showToast(ok));
  }

  private showToast(ok: boolean) {
    if (ok) {
      const toast = this.toastCtrl.create({
        message: 'Upload successful',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }
    else {
      const toast = this.toastCtrl.create({
        message: 'Upload failed',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    this.error = errMsg;
    return Observable.throw(errMsg);
  }

  addIrigasi(){
    let loadingdata=this.loadingCtrl.create({
      content:"Posting Tasks..."
    });
    loadingdata.present();
    /*this._dbtaskservice.addTask(new JariIrigasi(this.Id,this.daerah_irigasi,this.bendung,this.jaringan_irigasi,this.jaringan_irigasi_bangunan,this.saluran_primer,this.drain_inlet,this.saluran_sekunder,this.kondisi,this.x,this.y,this.foto))
    .subscribe(
      (data:JariIrigasi)=>{
        if(data!=null){
          this.allJari.push(new JariIrigasi(this.Id,this.daerah_irigasi,this.bendung,this.jaringan_irigasi,this.jaringan_irigasi_bangunan,this.saluran_primer,this.drain_inlet,this.saluran_sekunder,this.kondisi,this.x,this.y,this.foto));
          this.daerah_irigasi='';
          this.Id='';
        }
      },
      function(error){},
      function(){
        loadingdata.dismiss();
      }

    );*/

    this._dbtaskservice.InsertPostFasilitas(new JariIrigasi(this.Id,this.daerah_irigasi,this.bendung,this.jaringan_irigasi,this.jaringan_irigasi_bangunan,this.saluran_primer,this.drain_inlet,this.saluran_sekunder,this.kondisi,this.x,this.y,this.foto)).subscribe(data => {
          console.log(data);
          if(data[0].result == "success"){
            alert("OK");
            loadingdata.dismiss();
          }
      }, error => {
            console.log("Oooops!");
      });
  }



  randomString(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for(var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  
  

}
