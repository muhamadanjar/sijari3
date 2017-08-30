import { Injectable } from '@angular/core';

@Injectable()
export class GeolocationProvider {
	coords:any;
   	constructor(){
        this.coords = null;
    }

    // Si da timeout, mostrar un error visual en el app
    // Si tocas ese error (tap), reintenta cargar datos
    geolocate() {
        var geoOptions = {timeout: 15000, enableHighAccuracy: true};

        if (this.coords) {
            return Promise.resolve(this.coords);
        }

        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve(position);
                }, 
                (error) => {
                    reject(error);
                }, geoOptions
            );  
        })
    }
    getCoords() {
        return this.geolocate().then(
            position => {
                return position;
            }).then(error => {
                return error;
            }
        );
    }

}


