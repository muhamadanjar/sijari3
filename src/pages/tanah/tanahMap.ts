import { Component } from '@angular/core';
import { NavController, NavParams,Platform } from 'ionic-angular';
import {Geolocation} from '@ionic-native/geolocation';
import {Storage} from '@ionic/storage';

import {
 GoogleMaps,
 GoogleMap,
 GoogleMapsEvent,
 LatLng,
 CameraPosition,
 MarkerOptions,
 Marker
} from '@ionic-native/google-maps';

@Component({
  selector: 'page-tanahmap',
  templateUrl: 'tanahMap.html',
  
})

    
export class TanahMapPage {
    map;
    constructor(public navCtrl: NavController, public navParams: NavParams,
        public storage: Storage,
        public geolocation:Geolocation,
        public platform:Platform,
        private googleMaps: GoogleMaps
	) {
    }
    loadMap() {
        let element: HTMLElement = document.getElementById('map');

        let map = this.googleMaps.create(element);
        let marker;
        
        map.one(GoogleMapsEvent.MAP_READY).then(() => {
            console.log('Map is ready!');
        });
    }
    initializeMap() {
        this.platform.ready().then(() => {
            //var infowindow = new google.maps.InfoWindow();
            var minZoomLevel = 12;
            //var pandeglangPoint = new google.maps.LatLng(-6.3252738,106.0764884);
            let map;
            /*map = new google.maps.Map(document.getElementById('map'), {
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
            });*/
            

            
        });
    }
    ngAfterViewInit() {
        this.loadMap();
    }
    
}