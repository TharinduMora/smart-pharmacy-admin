import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {AdminListComponent} from './admin-list/admin-list.component';
import {ComTabModule} from '../../core/com-tab/com-tab.module';
import {AdminViewComponent} from './admin-view/admin-view.component';
import {PipeModule} from '../../core/pipe';
import {PaginationModule} from 'ngx-bootstrap';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ComTabModule,
    AdminRoutingModule,
    PipeModule,
    FormsModule,
    PaginationModule.forRoot()
  ],
  declarations: [AdminListComponent, AdminViewComponent]
})
export class AdminModule {
}
