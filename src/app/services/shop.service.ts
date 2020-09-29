import {Injectable} from '@angular/core';

import {ApiServiceConfig, GlobalVariable, HttpService} from '../core';

@Injectable()
export class ShopService {

  constructor(private httpService: HttpService, private gVariable: GlobalVariable) { }

  public createShop (req: any) {
    const formattedReq = req || {};
    const promise = new Promise((resolve, reject) => {
      return this.httpService.httpPost(ApiServiceConfig.SHOP_API_SERVICE, '', formattedReq, null).then((data: any) => {
        if (data) {
          resolve(data);
        } else {
          reject('no content 204');
        }
      }).catch(error => {
        reject(error);
      });
    });
    return promise;
  }

  public updateShop (req: any) {
    // req.branchId = this.gVariable.branchId || 0;
    const formattedReq = req || {};
    const promise = new Promise((resolve, reject) => {
      return this.httpService.httpPut(ApiServiceConfig.SHOP_API_SERVICE, '', formattedReq, null).then((data: any) => {
        if (data) {
          resolve(data);
        } else {
          reject('no content 204');
        }
      }).catch(error => {
        reject(error);
      });
    });
    return promise;
  }

  public shopAllFindByCriteria(req) {
    req.shopId = this.gVariable.shopId || 0;
    req.branchId = this.gVariable.branchId || 0;
    const formattedReq = req || {};
    const promise = new Promise((resolve, reject) => {
      return this.httpService.httpPost(ApiServiceConfig.SHOP_API_SERVICE, '/shop/all/findByCriteria', formattedReq, null)
        .then((data: any) => {
          if (data) {
            resolve(data);
          } else {
            reject('no content 204');
          }
        }).catch(error => {
          reject(error);
        });

    });
    return promise;
  }

  public updateShopStatus(req) {
    const formattedReq = req || {};
     const promise = new Promise((resolve, reject) => {
          return this.httpService.httpPut(ApiServiceConfig.SHOP_API_SERVICE, '/updateStatus', formattedReq, null)
            .then((data: any) => {
              if (data) {
                resolve(data);
              } else {
                reject('no content 204');
              }
            }).catch(error => {
              reject(error);
            });
     });
    return promise;
  }

  public getShopDetailsById(id: number) {
     const promise = new Promise((resolve, reject) => {
          return this.httpService.httpGet(ApiServiceConfig.SHOP_API_SERVICE, '/shopDetails/'+id, {}, null)
            .then((data: any) => {
              if (data) {
                resolve(data);
              } else {
                reject('no content 204');
              }
            }).catch(error => {
              reject(error);
            });
     });
    return promise;
  }

}
