import { StaticConfig } from "./../../../core/config/static-config";
import { ClientAPIService } from "./../../../services/client.api.service";
import { ActivatedRoute, Router } from "@angular/router";
import { GlobalVariable } from "./../../../core/com-classes/global-variable";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-medicine-details",
  templateUrl: "./medicine-details.component.html",
  styleUrls: ["./medicine-details.component.css"],
})
export class MedicineDetailsComponent implements OnInit {
  public paramSub: any;
  public medId: number;
  public medicineDetails: any;
  constructor(
    public globalVariable: GlobalVariable,
    private route: ActivatedRoute,
    private clientAPIService: ClientAPIService,
    private router: Router
  ) {}

  ngOnInit() {
    this.paramSub = this.route.params.subscribe((params) => {
      // this.shopId = +params["shopId"];
      this.medId = +params["medId"];
      this.findMedicineDetails();
      // this.getShopDetails(+params["id"]);
    });
  }

  findMedicineDetails() {
    this.clientAPIService
      .findMedicineById(this.medId)
      .then((res: any) => {
        if (res && res.status === StaticConfig.RESPONSE_STATUS.SUCCESS) {
          if (res.data) {
            this.medicineDetails = res.data;
          } else {
            this.navigateToHome();
          }
        } else {
          this.navigateToHome();
        }
      })
      .catch(() => {
        this.navigateToHome();
      });
  }

  navigateToHome() {
    this.router.navigate(["/client/home"]);
  }
}
