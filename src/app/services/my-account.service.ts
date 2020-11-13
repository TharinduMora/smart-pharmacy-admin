import {Injectable} from '@angular/core';
import {Md5} from 'ts-md5/dist/md5';

import {ApiServiceConfig, GlobalVariable, HttpService, StaticConfig} from '../core';

@Injectable()
export class MyAccountService {

  constructor(private httpService: HttpService, private gVariable: GlobalVariable) {
  }

  public getAdminById(id: number) {
    return new Promise((resolve, reject) =>
      this.httpService.httpGet(ApiServiceConfig.MY_ACCOUNT_API_SERVICE, '/admin/' + id, {}, {})
        .then((data: any) => {
          if (data && data.status === StaticConfig.RESPONSE_STATUS.SUCCESS) {
            resolve(data.data);
          } else {
            reject(null);
          }
        }).catch((error: any) => {
        reject(error);
      }));
  }

  public getShopById(id: number) {
    return new Promise((resolve, reject) =>
      this.httpService.httpGet(ApiServiceConfig.MY_ACCOUNT_API_SERVICE, '/shop/' + id, {}, {})
        .then((data: any) => {
          if (data && data.status === StaticConfig.RESPONSE_STATUS.SUCCESS) {
            resolve(data.data);
          } else {
            reject(null);
          }
        }).catch((error: any) => {
        reject(error);
      }));
  }

  public updateAdmin(req: any) {
    const formattedReq = {
      id: req.id,
      fullName: req.fullName,
      email: req.email,
      telephone: req.telephone,
      address: req.address,
      city: req.city
    };
    return new Promise((resolve, reject) =>
      this.httpService.httpPut(ApiServiceConfig.MY_ACCOUNT_API_SERVICE, '/admin', formattedReq, {})
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

  public changePassword(req: any) {
    const formattedReq = {
      id: req.id,
      currentPassword: req.currentPassword,
      newPassword: req.newPassword
    };
    return new Promise((resolve, reject) =>
      this.httpService.httpPut(ApiServiceConfig.MY_ACCOUNT_API_SERVICE, '/change-password', formattedReq, {})
        .then((data: any) => {
          if (data) {
            resolve(data);
          } else {
            resolve(null);
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
      this.httpService.httpPut(ApiServiceConfig.MY_ACCOUNT_API_SERVICE, '/shop', formattedReq, {})
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
