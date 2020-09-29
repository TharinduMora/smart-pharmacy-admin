import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminListComponent } from './admin-list/admin-list.component';
import { ManageAdminComponent } from './manage-admin.component';
import {TabsModule} from 'ngx-bootstrap/tabs';

@NgModule({
  imports: [
    CommonModule,
    TabsModule,
    AdminRoutingModule
  ],
  declarations: [AdminListComponent, ManageAdminComponent]
})
export class AdminModule { }
