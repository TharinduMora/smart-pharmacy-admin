import { Component, EventEmitter, Input, OnInit, Output, AfterViewInit, SimpleChanges } from '@angular/core';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {

    @Input() marker: any;
    @Output() clickedLocation = new EventEmitter();

    // zoomLevel: number = 13;
    height = 300;

    // for marker display
    selectedLon;
    selectedLat;

    // for place map
    lat = 6.80779248894501;
    lng = 79.87908655910;

    constructor() {
        // this.height = platform.height() - 250;
    }

    // ngOnChanges(changes: SimpleChanges) {
    //     console.log(changes);
    //     if (this.marker.event) {
    //         console.log(this.marker);
    //     }
    //     // console.log(this.gridEvent);
    //     // if (this.gridEvent.event) {
    //     //     this.onCallGridEvent(this.gridEvent.event, this.gridEvent.data);
    //     // }
    // }

    // Get Current Location Coordinates
    private getCurrentLocation() {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                // console.log(position);
                this.lat = position.coords.latitude;
                this.lng = position.coords.longitude;
                // this.zoom = 15;
            });
        }
    }

    onMapReady(map) {
        // map.streetViewControl = false;
        // if (this.markerList && this.markerList.length > 0) {
        //     this.markerList.forEach((location: any) => {
        //         if (location.isHeadOffice) {
        //             this.lat = location.latitude;
        //             this.lng = location.longitude;
        //         }
        //     });
        // }
    }

    ngOnInit() {
        if (this.marker && !(this.marker.lat === 0 && this.marker.lng === 0)) {
            this.selectedLat = this.marker.lat;
            this.selectedLon = this.marker.lng;

            this.lat = this.marker.lat;
            this.lng = this.marker.lng;
        } else {
            this.getCurrentLocation();
        }
    }

    onClickLoc(position) {
        this.selectedLat = position.coords.lat;
        this.selectedLon = position.coords.lng;
        this.clickedLocation.emit({
            lat: this.selectedLat,
            lng: this.selectedLon
        });
        // console.log(position);
    }

}

// this.geolocation.getCurrentPosition().then((resp) => {
//     console.log('location= ', resp.coords.latitude, resp.coords.longitude);
//     this.lat = resp.coords.latitude;
//     this.lng = resp.coords.longitude;
//     // resp.coords.latitude
//     // resp.coords.longitude
// }).catch((error) => {
//     console.log('Error getting location', error);
// });
