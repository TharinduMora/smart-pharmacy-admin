import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyAccountRoutingModule } from './my-account-routing.module';
import {ComTabModule} from '../../core/com-tab/com-tab.module';
import {PipeModule} from '../../core/pipe';
import {FormsModule} from '@angular/forms';
import {ModalModule, PaginationModule} from 'ngx-bootstrap';
import {NgSelectModule} from '@ng-select/ng-select';
import {SharedModule} from '../../shared/shared.module';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { MyShopComponent } from './my-shop/my-shop.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

@NgModule({
  imports: [
    CommonModule,
    ComTabModule,
    PipeModule,
    FormsModule,
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    NgSelectModule,
    SharedModule,
    MyAccountRoutingModule
  ],
  declarations: [MyProfileComponent, MyShopComponent, ChangePasswordComponent]
})
export class MyAccountModule { }
