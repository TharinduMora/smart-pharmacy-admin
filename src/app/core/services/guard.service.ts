import {Inject, Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';

import {GlobalVariable} from '../com-classes';

@Injectable()
export class GuardService implements CanActivate {
  constructor(private router: Router,
              @Inject(LOCAL_STORAGE) private storage: WebStorageService,
              private gVariable: GlobalVariable) {
  }

  public canActivate() {
    try {
      const authentication = this.storage.get('authentication_pk');

      if (authentication !== null && authentication.authorized) {
        this.gVariable.authentication = authentication;
        this.gVariable.shopId = this.gVariable.authentication.shopId || 0;
        this.gVariable.branchId = this.gVariable.authentication.branchId || 0;
        return true;
      } else {
        this.removeAuthentication();
        return false;
      }
    } catch (e) {
      this.removeAuthentication();
      return false;
    }
  }

  public createAuthentication(value: any) {
    value.authorized = true;
    this.storage.set('authentication_pk', value);
    this.canActivate();
  }

  public removeAuthentication() {
    this.storage.remove('authentication_pk');
    this.gVariable.authentication = {};
    this.router.navigate(['/login']);
  }

}
