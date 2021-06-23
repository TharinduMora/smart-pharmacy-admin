import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { StaticConfig } from "src/app/core/config/static-config";
import { ShopService } from "src/app/services";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  filteredShopList = [];
  radiusByKiloMeters = 10;

  filterObject = {
    locationBase: {
      latitude: null,
      longitude: null,
      radius: null,
    },
    productName: null,
  };

  constructor(private shopSev: ShopService, private router: Router) {}

  ngOnInit() {}

  onApplyFilter() {
    this.getShopList();
  }

  onRadiusChanged(event: any) {
    if (event.radius) {
      this.filterObject.locationBase.radius = event.radius / 1000;
    }
  }

  onClickPharmacy(event: any) {
    if (event.id) {
      if (this.filterObject.productName) {
        this.router.navigate(["/client/shop/", event.id], {
          queryParams: { productName: this.filterObject.productName },
        });
      } else {
        this.router.navigate(["/client/shop/", event.id]);
      }
    }
  }

  onCurrentLocationChange(event: any) {
    console.log(event);
    if (
      event.currentLocation.latitude &&
      event.currentLocation.longitude &&
      event.radius
    ) {
      this.filterObject.locationBase.latitude = event.currentLocation.latitude;
      this.filterObject.locationBase.longitude =
        event.currentLocation.longitude;
      this.filterObject.locationBase.radius = event.radius / 1000;
    }
    this.getShopList();
  }

  getShopList() {
    if (
      this.filterObject.locationBase.latitude &&
      this.filterObject.locationBase.longitude &&
      this.filterObject.locationBase.radius
    ) {
      this.filteredShopList = [];
      this.shopSev
        .findByMap(
          {},
          this.filterObject.locationBase.latitude,
          this.filterObject.locationBase.longitude,
          this.filterObject.locationBase.radius,
          this.filterObject.productName
        )
        .then((res: any) => {
          if (res && res.status === StaticConfig.RESPONSE_STATUS.SUCCESS) {
            this.filteredShopList = res.data;
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }
}
