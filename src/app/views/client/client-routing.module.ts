import { ShopComponent } from "./shop/shop.component";
import { ClientLayoutComponent } from "./client-layout/client-layout.component";
import { HomeComponent } from "./home/home.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MedicineDetailsComponent } from "./medicine-details/medicine-details.component";

const routes: Routes = [
  {
    path: "",
    component: ClientLayoutComponent,
    children: [
      { path: "", redirectTo: "home", pathMatch: "full" },
      { path: "home", component: HomeComponent },
      { path: "shop/:shopId", component: ShopComponent },
      { path: "medicine/:medId", component: MedicineDetailsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {}
