import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {AdminListComponent} from './admin-list/admin-list.component';
import {ComTabModule} from '../../core/com-tab/com-tab.module';
import {AdminViewComponent} from './admin-view/admin-view.component';

@NgModule({
  imports: [
    CommonModule,
    ComTabModule,
    AdminRoutingModule
  ],
  declarations: [AdminListComponent, AdminViewComponent]
})
export class AdminModule {
}
