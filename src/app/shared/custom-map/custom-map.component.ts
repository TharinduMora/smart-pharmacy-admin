import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";

@Component({
  selector: "app-custom-map",
  templateUrl: "./custom-map.component.html",
  styleUrls: ["./custom-map.component.scss"],
})
export class CustomMapComponent implements OnInit, OnChanges {
  @Input() markerList: any;
  @Input() radiusByKiloMeters: number = 10;
  @Output() onCurrentLocationChanged = new EventEmitter();
  @Output() onRadiusChanged = new EventEmitter();
  @Output() onClickPharmacy = new EventEmitter();

  public height = 500;
  public currentLocation = {
    latitude: 6.767047694167956,
    longitude: 79.9862745390625,
  };
  public radiusByMeters;
  // public radiusByKiloMeters;

  public minZoomLevel = 5;
  public maxZoomLevel = 18;
  public currentZoomLevel = 8;

  constructor() {}

  ngOnInit() {
    // this.radiusByKiloMeters = this.radiusByMeters / 1000;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.radiusByKiloMeters) {
      this.radiusByMeters = this.radiusByKiloMeters * 1000;
      this.onRadiusChanged.emit({ radius: this.radiusByMeters });
    }
  }

  onMapReady(map) {
    this.radiusByMeters = this.radiusByKiloMeters * 1000;
    this.getMyLocation().then((res: any) => {
      this.setCurrentLocation(res.coords.latitude, res.coords.longitude);
      this.emitAreaDetails();
    });
  }

  onClickShop(pharmacy) {
    this.onClickPharmacy.emit({ id: pharmacy.id });
  }

  onChangeCurrentLocation(event) {
    this.setCurrentLocation(event.coords.lat, event.coords.lng);
    this.emitAreaDetails();
  }

  setCurrentLocation(latitude: number, longitude: number) {
    this.currentLocation.latitude = latitude;
    this.currentLocation.longitude = longitude;
  }

  emitAreaDetails() {
    this.onCurrentLocationChanged.emit({
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
