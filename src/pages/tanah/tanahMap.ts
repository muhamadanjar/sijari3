import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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
    constructor(public navCtrl: NavController, public navParams: NavParams,
        private googleMaps: GoogleMaps
	) {
    }
    loadMap() {
        let element: HTMLElement = document.getElementById('map');

        let map: GoogleMap = this.googleMaps.create(element);
        let marker;
        // listen to MAP_READY event
        // You must wait for this event to fire before adding something to the map or modifying it in anyway
        map.one(GoogleMapsEvent.MAP_READY).then(
        () => {
            console.log('Map is ready!');
            // Now you can add elements to the map like the marker
        });

        // create CameraPosition
        let position: CameraPosition = {
        target: {
            lat: 43.0741904,
            lng: -89.3809802
        },
        zoom: 18,
        tilt: 30
        };

        // move the map's camera to position
        map.moveCamera(position);

        // create new marker
        let markerOptions: MarkerOptions = {
            //position: ionic,
            title: 'Ionic'
        };

        marker = map.addMarker(markerOptions)
        .then((marker: Marker) => {
            marker.showInfoWindow();
            });
    }
    
}