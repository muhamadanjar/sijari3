import { Component } from '@angular/core';
import { NavController, NavParams,Platform } from 'ionic-angular';
import {Geolocation} from '@ionic-native/geolocation';
import {Storage} from '@ionic/storage';
import { TabsPage } from "../tabs/tabs";
import { BangunanPage } from "./bangunan";
import { FormBuilder, FormGroup, FormArray,FormControl, Validators } from '@angular/forms';
declare var google:any;
var map:any;
var markers = [];

@Component({
  selector: 'page-bangunanmap',
  templateUrl: 'bangunanMap.html',
  
})
    
export class BangunanMapPage {
    //map;
    position:Array<{x: any,y: any, z: any}>;
    data:any;
    constructor(public navCtrl: NavController, public navParams: NavParams,
        public storage: Storage,
        public geolocation:Geolocation,
        public platform:Platform,
        //private googleMaps: GoogleMaps
	) {
        console.log(navParams);
        
    }

    ngAfterViewInit() {
       this.initializeMap();
    }
    
    

    ngOnInit() {
        //this.loadMap();
    }

    ionViewDidLoad(){
        //this.loadMap();
    }

    close(){
        this.navCtrl.setRoot(TabsPage);
    }

    sendPosition(){
        this.navCtrl.setRoot(BangunanPage,this.navParams.data);
    }

    initializeMap() {
        this.platform.ready().then(() => {
            //var infowindow = new google.maps.InfoWindow();
            var minZoomLevel = 12;
            var pandeglangPoint = new google.maps.LatLng(-6.3252738,106.0764884);
            
            map = new google.maps.Map(document.getElementById('map'), {
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                center: pandeglangPoint,
                zoom: minZoomLevel,
                mapTypeControl: false,
                mapTypeControlOptions: {
                    style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                    position: google.maps.ControlPosition.TOP_CENTER
                },
                zoomControl: true,
                zoomControlOptions: {
                    position: google.maps.ControlPosition.TOP_LEFT
                },
                scaleControl: false,
                streetViewControl: true,
                streetViewControlOptions: {
                    position: google.maps.ControlPosition.LEFT_TOP
                },
                fullscreenControl: true
            });

            let t = this;
            google.maps.event.addListener(map, 'click', (event) => {
                t.addMarker(event.latLng);
            });

            
        });
    }

    addMarker(latlng, i=0) {
        this.clearMarkers();
        
        var marker = new google.maps.Marker({
            map: map,
            position: latlng,
            draggable: true,
            //icon: 'assets/img/icon_map.png'
        });
        
        console.log(this);
        this.navParams.data.x = latlng.lng();
        this.navParams.data.y = latlng.lat(); 
        markers.push(marker);
    }
    // Sets the map on all markers in the array.
    setMapOnAll(map) {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
        }
    }
    // Removes the markers from the map, but keeps them in the array.
    clearMarkers() {
        this.setMapOnAll(null);
    }
    // Shows any markers currently in the array.
    showMarkers() {
        this.setMapOnAll(map);
    }
    // Deletes all markers in the array by removing references to them.
    deleteMarkers() {
        this.clearMarkers();
        markers = [];
    }
    
}