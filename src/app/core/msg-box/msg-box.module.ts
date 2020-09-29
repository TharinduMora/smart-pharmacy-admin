import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MsgBoxConfirmComponent } from './msg-box-confirm.component';
import {ModalModule} from "ngx-bootstrap/modal";

@NgModule({
  imports: [
    CommonModule,
    ModalModule.forRoot(),
  ],
  declarations: [MsgBoxConfirmComponent],
  entryComponents: [
    MsgBoxConfirmComponent
  ]
})
export class MsgBoxModule { }
