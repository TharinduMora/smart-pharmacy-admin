import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';

import { ManageDomainRoutingModule } from './manage-domain-routing.module';
import { DomainComponent } from './domain/domain.component';
import { DomainEntitlementsFormComponent } from './domain-entitlements-form/domain-entitlements-form.component';
import { ManageDomainComponent } from './manage-domain.component';
import { PipeModule, DataGridModule } from './../../core';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    ManageDomainRoutingModule,
    PipeModule,
    DataGridModule
  ],
  declarations: [DomainComponent, ManageDomainComponent, DomainEntitlementsFormComponent],
  entryComponents: [
    DomainEntitlementsFormComponent
  ]
})
export class ManageDomainModule { }
