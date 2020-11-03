import {Injectable} from '@angular/core';

import {ApiServiceConfig, GlobalVariable, HttpService} from '../core';

@Injectable()
export class ProductService {

  constructor(private httpService: HttpService, private gVariable: GlobalVariable) {
  }

  public productFindByCriteria(req: any) {
    const formattedReq = req;
    return new Promise((resolve, reject) =>
      this.httpService.httpPost(ApiServiceConfig.PRODUCT_API_SERVICE, '/findByCriteria', formattedReq, {})
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

  public createNewProduct(req: any) {
    const formattedReq = {
      shopId: req.shopId,
      name: req.name,
      description: req.description,
      stockAvailable: req.stockAvailable || true,
      price: req.price,
      image: req.image || ''
    };
    return new Promise((resolve, reject) =>
      this.httpService.httpPost(ApiServiceConfig.PRODUCT_API_SERVICE, '', formattedReq, {})
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

}
