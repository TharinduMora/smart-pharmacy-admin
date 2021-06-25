import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"],
})
export class MapComponent implements OnInit {
  @Input() marker: any;
  @Input() markerChangeble = true;
  @Output() clickedLocation = new EventEmitter();

  // zoomLevel: number = 13;
  height = 300;

  // for marker display
  selectedLon;
  selectedLat;

  // for place map
  lat = 6.80779248894501;
  lng = 79.8790865591;

  constructor() {}

  // Get Current Location Coordinates
  private getCurrentLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      });
    }
  }

  onMapReady(map) {
    if (this.marker && !(this.marker.lat === 0 && this.marker.lng === 0)) {
      this.selectedLat = this.marker.lat;
      this.selectedLon = this.marker.lng;

      this.lat = this.marker.lat;
      this.lng = this.marker.lng;
    } else {
      this.getCurrentLocation();
    }
  }

  ngOnInit() {}

  onClickLoc(position) {
    if (this.markerChangeble) {
      this.selectedLat = position.coords.lat;
      this.selectedLon = position.coords.lng;
      this.clickedLocation.emit({
        lat: this.selectedLat,
        lng: this.selectedLon,
      });
    }
  }
}
