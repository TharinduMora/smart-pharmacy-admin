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
  public medicineKeyword = "";
  public productList = [];

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
    this.route.queryParams.subscribe((params) => {
      if (params && params.medicineKeyword) {
        this.medicineKeyword = params.medicineKeyword;
        // console.log(params.medicineKeyword);
      }
    });
  }

  ngOnDestroy() {
    this.paramSub.unsubscribe();
  }

  navigateToHome() {
    this.router.navigate(["/client/home"]);
  }

  onClickSearch() {
    this.getProductList();
  }

  getProductList() {
    this.productList = [];
    let req = {
      shopId: this.shopDetails.id,
      offset: 0,
      limit: 100,
      searchKeys: [],
      values: [],
      operators: [],
    };
    if (this.medicineKeyword && this.medicineKeyword !== "") {
      req.searchKeys.push("name");
      req.operators.push("like");
      req.values.push(this.medicineKeyword);
    }
    this.clientAPIService
      .productFindByCriteria(req)
      .then((res: any) => {
        if (res && res.status === StaticConfig.RESPONSE_STATUS.SUCCESS) {
          if (res.data.length > 0) {
            this.productList = res.data;
          }
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  getShopDetails(id: number) {
    this.clientAPIService
      .findShopById(id)
      .then((res: any) => {
        if (res && res.status === StaticConfig.RESPONSE_STATUS.SUCCESS) {
          this.shopDetails = res.data;
          this.getProductList();
        } else {
          this.navigateToHome();
        }
      })
      .catch(() => {
        this.navigateToHome();
      });
  }
}
