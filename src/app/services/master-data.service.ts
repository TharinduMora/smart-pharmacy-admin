import {Injectable} from '@angular/core';

import {ApiServiceConfig, GlobalVariable, HttpService} from '../core';

@Injectable()
export class MasterDataService {

  constructor(private httpService: HttpService, private gVariable: GlobalVariable) { }

  public getAllShopList() {
    return new Promise((resolve, reject) =>
      this.httpService.httpGet(ApiServiceConfig.MASTER_DATA_API_SERVICE,
        '/all/shops',
        {},
        {}).then((data: any) => {
        if (data) {
          resolve(data);
        } else {
          reject({});
        }
      }).catch((error: any) => {
        reject(error);
      }));
  }

  public getAllRoleList() {
    return new Promise((resolve, reject) =>
      this.httpService.httpGet(ApiServiceConfig.MASTER_DATA_API_SERVICE,
        '/all/roles',
        {},
        {}).then((data: any) => {
        if (data) {
          resolve(data);
        } else {
          reject({});
        }
      }).catch((error: any) => {
        reject(error);
      }));
  }

}
