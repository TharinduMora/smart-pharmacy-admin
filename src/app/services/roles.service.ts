import {Injectable} from '@angular/core';

import {ApiServiceConfig, GlobalVariable, HttpService} from '../core';

@Injectable()
export class RolesService {

  constructor(private httpService: HttpService, private gVariable: GlobalVariable) {
  }

  public getUserRoles() {
    const promise = new Promise((resolve, reject) => {
      return this.httpService.httpGet(ApiServiceConfig.ROLE_API_SERVICE, '/' + (this.gVariable.shopId || 0) + '/' + (this.gVariable.branchId || 0), {}, null)
        .then((data: any) => {
          if (data) {
            resolve(data);
          } else {
            reject({});
          }
        }).catch((error: any) => {
          reject(error);
        });
    });
    return promise;
  }

}
