import {Injectable} from '@angular/core';

import {ApiServiceConfig, GlobalVariable, HttpService} from '../core';

@Injectable()
export class ManufacturerService {

  constructor(private httpService: HttpService, private gVariable: GlobalVariable) { }

  public createManufacturer (req: any) {
    const formattedReq = req || {};
    const promise = new Promise((resolve, reject) => {
      return this.httpService.httpPost(ApiServiceConfig.MANUFACTURER_API_SERVICE, '', formattedReq, null).then((data: any) => {
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

  public updateManufacturer (req: any) {
    // req.branchId = this.gVariable.branchId || 0;
    const formattedReq = req || {};
    const promise = new Promise((resolve, reject) => {
      return this.httpService.httpPut(ApiServiceConfig.MANUFACTURER_API_SERVICE, '', formattedReq, null).then((data: any) => {
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

  public manufacturerFindByCriteria(req) {
    // req.shopId = this.gVariable.shopId || 0;
    // req.branchId = this.gVariable.branchId || 0;
    const formattedReq = req || {};
    const promise = new Promise((resolve, reject) => {
      return this.httpService.httpPost(ApiServiceConfig.MANUFACTURER_API_SERVICE, '/findByCriteria', formattedReq, null)
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

  public updateManufacturerStatus(req) {
    const formattedReq = req || {};
     const promise = new Promise((resolve, reject) => {
          return this.httpService.httpPut(ApiServiceConfig.MANUFACTURER_API_SERVICE, '/updateStatus', formattedReq, null)
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

  public getManufacturerDetailsById(id: number) {

  }

}
