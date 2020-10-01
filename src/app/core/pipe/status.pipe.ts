import {Pipe, PipeTransform} from '@angular/core';
import {StaticConfig} from '../config';

@Pipe({
  name: 'statusPipe'
})
export class StatusPipe implements PipeTransform {
  transform(statusId: number): String {
    Object.keys(StaticConfig.STATUS_LIST).forEach((KEY) => {
      if (StaticConfig.STATUS_LIST[KEY].ID === statusId) {
        return StaticConfig.STATUS_LIST[KEY].NAME.toUpperCase();
      }
    });
    return StaticConfig.STATUS_LIST.CREATED.NAME.toUpperCase();
  }
}
