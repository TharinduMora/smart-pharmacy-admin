import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {AdminListComponent} from './admin-list/admin-list.component';
import {ComTabModule} from '../../core/com-tab/com-tab.module';
import {AdminViewComponent} from './admin-view/admin-view.component';
import {PipeModule} from '../../core/pipe';
import {ModalModule, PaginationModule} from 'ngx-bootstrap';
import {FormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ComTabModule,
    AdminRoutingModule,
    PipeModule,
    FormsModule,
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    NgSelectModule,
    SharedModule
  ],
  declarations: [AdminListComponent, AdminViewComponent],
  entryComponents: [AdminViewComponent]
})
export class AdminModule {
}
