import {Injectable} from '@angular/core';

import {ApiServiceConfig, GlobalVariable, HttpService} from '../core';

@Injectable()
export class ShopService {

  constructor(private httpService: HttpService, private gVariable: GlobalVariable) {
  }

  public shopFindByCriteria(req: any) {
    const formattedReq = req;
    return new Promise((resolve, reject) =>
      this.httpService.httpPost(ApiServiceConfig.SHOP_API_SERVICE, '/findByCriteria', formattedReq, {})
        .then((data: any) => {
          if (data) {
            resolve(data);
          } else {
            resolve({'offset': 0, 'limit': 0, 'recordCount': 0, 'status': 0, 'errorCode': null, 'data': []});
          }
        }).catch((error: any) => {
        reject(error);
      }));
  }

  public createNewShop(req: any) {
    const formattedReq = {
      name: req.name,
      email: req.email,
      description: req.description,
      image: req.image,
      telephone: req.telephone,
      address: req.address,
      city: req.city,
      longitude: req.longitude,
      latitude: req.latitude,
      admin: {
        userName: req.admin.userName,
        password: req.admin.password,
        fullName: req.admin.fullName,
      }
    };
    return new Promise((resolve, reject) =>
      this.httpService.httpPost(ApiServiceConfig.SHOP_API_SERVICE, '', formattedReq, {})
        .then((data: any) => {
          if (data) {
            resolve(data);
          } else {
            resolve({'offset': 0, 'limit': 0, 'recordCount': 0, 'status': 0, 'errorCode': null, 'data': []});
          }
        }).catch((error: any) => {
        reject(error);
      }));
  }

  public updateShop(req: any) {
    const formattedReq = {
      id: req.id,
      name: req.name,
      email: req.email,
      description: req.description,
      image: req.image,
      telephone: req.telephone,
      address: req.address,
      city: req.city,
      longitude: req.longitude,
      latitude: req.latitude,
    };
    return new Promise((resolve, reject) =>
      this.httpService.httpPut(ApiServiceConfig.SHOP_API_SERVICE, '', formattedReq, {})
        .then((data: any) => {
          if (data) {
            resolve(data);
          } else {
            resolve({'offset': 0, 'limit': 0, 'recordCount': 0, 'status': 0, 'errorCode': null, 'data': []});
          }
        }).catch((error: any) => {
        reject(error);
      }));
  }

}
