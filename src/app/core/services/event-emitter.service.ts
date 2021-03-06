import {EventEmitter, Injectable, Output} from '@angular/core';

@Injectable()
export class EventEmitterService {
  @Output() httpError: EventEmitter<any> = new EventEmitter();
  @Output() loginSucceed: EventEmitter<any> = new EventEmitter();

  constructor() {}

  public onBroadcastHttpError(value: any) {
    this.httpError.emit(value);
  }

  public onBroadcastLoginSucceed() {
    this.loginSucceed.emit();
  }

}
