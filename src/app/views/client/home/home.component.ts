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
  productName = "";

  constructor(private shopSev: ShopService) {}

  ngOnInit() {}

  onCurrentLocationChange(event: any) {
    console.log(event);
    this.getShopList(
      event.currentLocation.latitude,
      event.currentLocation.longitude,
      event.radius / 1000
    );
  }

  getShopList(lat: number, long: number, rad: number) {
    this.filteredShopList = [];
    this.shopSev
      .findByMap({}, lat, long, rad, this.productName)
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
