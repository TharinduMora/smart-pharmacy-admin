import {Injectable} from '@angular/core';
import {Md5} from 'ts-md5/dist/md5';

import {ApiServiceConfig, GlobalVariable, HttpService} from '../core';

@Injectable()
export class AdminService {

  constructor(private httpService: HttpService, private gVariable: GlobalVariable) { }

  public login(req) {
    const formattedReq = {
      'userName': req.loginName || null,
      // 'password':  Md5.hashStr(req.password || '') || null
      'password': req.password || ''
    };

    return new Promise((resolve, reject) =>
      this.httpService.httpPut(ApiServiceConfig.ADMIN_API_SERVICE, '/login', formattedReq, {})
        .then((data: any) => {
          if (data) {
            resolve(data);
          } else {
            reject('no content 204');
          }
        }).catch((error: any) => {
        reject(error);
      }));
  }

  public adminFindByCriteria(req: any) {
    const formattedReq = req;
    return new Promise((resolve, reject) =>
      this.httpService.httpPost(ApiServiceConfig.ADMIN_API_SERVICE, '/findByCriteria', formattedReq, {})
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

  public createNewAdmin(req: any) {
    const formattedReq = {
      roleId: req.roleId,
      shopId: req.shopId,
      userName: req.userName,
      password: req.password,
      fullName: req.fullName,
      email: req.email,
      telephone: req.telephone,
      address: req.address,
      city: req.city
    };
    return new Promise((resolve, reject) =>
      this.httpService.httpPost(ApiServiceConfig.ADMIN_API_SERVICE, '', formattedReq, {})
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
      this.httpService.httpPut(ApiServiceConfig.ADMIN_API_SERVICE, '', formattedReq, {})
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

  public checkLoginNameAvailablity (req) {
    const promise = new Promise((resolve, reject) => {
      return this.httpService.httpPut(ApiServiceConfig.ADMIN_API_SERVICE, '/checkAvailability', req , null)
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

  public forgetPassword(req) {
    const promise = new Promise((resolve, reject) => {
      return this.httpService.httpPut(ApiServiceConfig.ADMIN_API_SERVICE, '/forgotPassword', req , null)
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

  public resetPassword(req) {
    const promise = new Promise((resolve, reject) => {
      return this.httpService.httpPut(ApiServiceConfig.ADMIN_API_SERVICE, '/forgotPasswordConfirmation', req , null)
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

  public createUser (req : any){
    let formattedReq = req || {};
    const records : any = [];
    let promise = new Promise((resolve, reject) => {
      return this.httpService.httpPost(ApiServiceConfig.ADMIN_API_SERVICE,'',formattedReq,null)
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

  public updateUser (req : any){
    let formattedReq = req || {};
    const records : any = [];
    let promise = new Promise((resolve, reject) => {
      return this.httpService.httpPut(ApiServiceConfig.ADMIN_API_SERVICE,'',formattedReq,null)
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

  public updateUserStatus(req) {
    const promise = new Promise((resolve, reject) => {
      return this.httpService.httpPut(ApiServiceConfig.ADMIN_API_SERVICE, '/updateStatus', req, null)
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

  public userFindByCriteria (req : any){
    let formattedReq = req || {};
    const records : any = [];
    let promise = new Promise((resolve, reject) => {
      return this.httpService.httpPost(ApiServiceConfig.ADMIN_API_SERVICE,"/findByCriteria",formattedReq,null)
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

  public checkUserAvailability (req){
    const records : any = [];
    let promise = new Promise((resolve, reject) => {
      return this.httpService.httpPut(ApiServiceConfig.ADMIN_API_SERVICE,"/checkAvailability", req ,null)
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
