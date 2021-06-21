import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { AgmMarker, MapsAPILoader } from "@agm/core";
import { Marker } from "@agm/core/services/google-maps-types";

declare var google: any;

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
    latitude: 7.87,
    longitude: 80.3,
  };
  public myLocation = {
    latitude: 0,
    longitude: 0,
  };
  public radius = 1000;
  private map: any;

  public minZoomLevel = 5;
  public maxZoomLevel = 18;
  public currentZoomLevel = 8;

  address: string;

  private geoCoder;

  private autocompleteService;

  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) {}

  ngOnInit() {
    this.mapsAPILoader.load().then(() => {
      this.autocompleteService = new google.maps.places.AutocompleteService();
      const autocomplete = new google.maps.places.Autocomplete(
        this.searchElementRef.nativeElement,
        {
          types: ["address"],
          // "address",
        }
      );
      this.geoCoder = new google.maps.Geocoder();
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          const place = autocomplete.getPlace();
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          const newLatitude = place.geometry.location.lat();
          const newLongitude = place.geometry.location.lng();
          this.setCurrentLocation(newLatitude, newLongitude);
        });
      });
    });
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode(
      { location: { lat: latitude, lng: longitude } },
      (results, status) => {
        if (status === "OK") {
          if (results[0]) {
            this.address = results[0].formatted_address;
          }
        }
      }
    );
  }

  onMapReady(map) {
    this.map = map;
    map.streetViewControl = false;
    this.getMyLocation().then((res: any) => {
      this.setCurrentLocation(res.coords.latitude, res.coords.longitude);
      this.getAddress(res.coords.latitude, res.coords.longitude);
      this.myLocation.latitude = res.coords.latitude;
      this.myLocation.longitude = res.coords.longitude;
    });
  }

  onZoom(event) {
    if (
      this.minZoomLevel < this.currentZoomLevel &&
      this.maxZoomLevel > this.currentZoomLevel
    ) {
      // this.drawCircle();
    }
    this.currentZoomLevel = event;
  }

  onChangeCurrentLocation(event) {
    this.setCurrentLocation(event.coords.lat, event.coords.lng);
    this.getAddress(event.coords.lat, event.coords.lng);
  }

  setCurrentLocation(latitude: number, longitude: number) {
    this.currentLocation.latitude = latitude;
    this.currentLocation.longitude = longitude;
    this.drawCircle();
    console.log(this.currentLocation);
  }

  private drawCircle() {
    this.radius = 10 * 1000;
    this.emitAreaDetails();
    // setTimeout(() => {
    //   const bounds = this.map.getBounds();
    //   const upperBound = bounds.na.l;
    //   const lowerBound = bounds.na.j;
    //   this.map.setCenter({
    //     lat: this.currentLocation.latitude,
    //     lng: this.currentLocation.longitude,
    //   });
    //   this.radius = Math.round((111111 * (upperBound - lowerBound)) / 2.1);
    //   this.emitAreaDetails();
    // }, 500);
  }

  onClickView(i) {
    this.clickedLocationIndex.emit({ id: i });
  }

  emitAreaDetails() {
    this.searchingArea.emit({
      currentLocation: this.currentLocation,
      radius: this.radius,
    });
  }

  getMyLocation() {
    return new Promise((resolve, reject) => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          // console.log(position);
          // this.lat = position.coords.latitude;
          // this.lng = position.coords.longitude;
          // this.zoom = 15;
          resolve(position);
        });
      }
      // this.geolocation.getCurrentPosition().then((resp) => {
      //     resolve(resp);
      // }).catch((error) => {
      //     reject(false);
      //     console.log('Error getting location', error);
      // });
    });
  }
}
