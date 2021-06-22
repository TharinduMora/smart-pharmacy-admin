import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-custom-map",
  templateUrl: "./custom-map.component.html",
  styleUrls: ["./custom-map.component.scss"],
})
export class CustomMapComponent implements OnInit {
  @Input() markerList: any;
  @Output() searchingArea = new EventEmitter();
  @Output() clickedLocationIndex = new EventEmitter();

  public height = 500;
  public currentLocation = {
    latitude: 6.767047694167956,
    longitude: 79.9862745390625,
  };
  public radiusByMeters = 10 * 1000;
  public radiusByKiloMeters;

  public minZoomLevel = 5;
  public maxZoomLevel = 18;
  public currentZoomLevel = 8;

  constructor() {}

  ngOnInit() {
    this.radiusByKiloMeters = this.radiusByMeters / 1000;
  }

  onMapReady(map) {
    this.getMyLocation().then((res: any) => {
      this.setCurrentLocation(res.coords.latitude, res.coords.longitude);
      this.emitAreaDetails();
    });
  }

  onClickPharmacy(pharmacy) {
    console.log(pharmacy);
  }

  onChangeCurrentLocation(event) {
    this.setCurrentLocation(event.coords.lat, event.coords.lng);
    this.emitAreaDetails();
  }

  onChangeRadious() {
    this.radiusByMeters = this.radiusByKiloMeters * 1000;
    this.emitAreaDetails();
  }

  setCurrentLocation(latitude: number, longitude: number) {
    this.currentLocation.latitude = latitude;
    this.currentLocation.longitude = longitude;
  }

  onClickView(i) {
    this.clickedLocationIndex.emit({ id: i });
  }

  emitAreaDetails() {
    this.searchingArea.emit({
      currentLocation: this.currentLocation,
      radius: this.radiusByMeters,
    });
  }

  getMyLocation() {
    return new Promise((resolve, reject) => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.currentZoomLevel = 10;
          resolve(position);
        });
      }
    });
  }
}
