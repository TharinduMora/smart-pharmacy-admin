import {Injectable} from '@angular/core';

import {ApiServiceConfig, GlobalVariable, HttpService} from '../core';

@Injectable()
export class BranchService {

  constructor(private httpService: HttpService, private gVariable: GlobalVariable) { }

  public getBranchDetails(branchId) {
    return new Promise((resolve, reject) =>
      this.httpService.httpGet(ApiServiceConfig.BRANCH_API_SERVICE,
        '/details/' + this.gVariable.shopId + '/' + branchId,
        {},
        {}).then((data: any) => {
        if (data) {
          resolve(data[0]);
        } else {
          reject({});
        }
      }).catch((error: any) => {
        reject(error);
      }));
  }

}
