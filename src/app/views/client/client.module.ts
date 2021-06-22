import { FormsModule } from '@angular/forms';
import { SharedModule } from "./../../shared/shared.module";
import { HomeComponent } from "./home/home.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ClientRoutingModule } from "./client-routing.module";

@NgModule({
  imports: [CommonModule, ClientRoutingModule, SharedModule,FormsModule],
  declarations: [HomeComponent],
})
export class ClientModule {}
