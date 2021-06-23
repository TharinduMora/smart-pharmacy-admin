import { GlobalVariable } from "./../../../core/com-classes/global-variable";
import { ClientAPIService } from "./../../../services/client.api.service";
import { Component, OnInit } from "@angular/core";
import { StaticConfig } from "src/app/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-shop",
  templateUrl: "./shop.component.html",
  styleUrls: ["./shop.component.css"],
})
export class ShopComponent implements OnInit {
  public shopDetails: any;
  public paramSub: any;

  constructor(
    private clientAPIService: ClientAPIService,
    public globalVariable: GlobalVariable,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.paramSub = this.route.params.subscribe((params) => {
      // this.shopId = +params["shopId"];
      this.getShopDetails(+params["shopId"]);
    });
  }

  ngOnDestroy() {
    this.paramSub.unsubscribe();
  }

  navigateToHome() {
    this.router.navigate(["/client/home"]);
  }

  getShopDetails(id: number) {
    this.clientAPIService
      .findShopById(id)
      .then((res: any) => {
        if (res && res.status === StaticConfig.RESPONSE_STATUS.SUCCESS) {
          this.shopDetails = res.data;
        } else {
          this.navigateToHome();
        }
      })
      .catch(() => {
        this.navigateToHome();
      });
  }
}
