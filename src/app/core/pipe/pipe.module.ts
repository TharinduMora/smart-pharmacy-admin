import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {KeysPipe} from './keys.pipe';
import {FilterEntitlementPipe} from './filter.pipe';
import {StatusPipe} from './status.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [KeysPipe, FilterEntitlementPipe, StatusPipe],
  exports: [KeysPipe, FilterEntitlementPipe, StatusPipe]
})
export class PipeModule {
}
