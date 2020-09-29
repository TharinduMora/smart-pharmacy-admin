import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {KeysPipe} from "./keys.pipe";
import {FilterEntitlementPipe} from "./filter.pipe";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [KeysPipe, FilterEntitlementPipe],
  exports: [ KeysPipe, FilterEntitlementPipe ]
})
export class PipeModule { }
