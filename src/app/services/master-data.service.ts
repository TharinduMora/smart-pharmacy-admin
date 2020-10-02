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

  public getShopCategories () {
    const promise = new Promise((resolve, reject) => {
      return this.httpService.httpGet(ApiServiceConfig.MASTER_DATA_API_SERVICE, '/shopCategories', {}, null)
        .then((data: any) => {
          if (data) {
            // console.log(data);
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

  public shopCategoryFindByCriteria (req: any) {
    req.shopId = this.gVariable.shopId || 0;
    req.branchId = this.gVariable.branchId || 0;
    const formattedReq = req || {};
    const promise = new Promise((resolve, reject) => {
      return this.httpService.httpPost(ApiServiceConfig.MASTER_DATA_API_SERVICE, '/shopCategories/findByCriteria', formattedReq, null)
        .then((data: any) => {
          if (data) {
            // console.log(data);
            resolve(data);
          } else {
            resolve({'offset': 0, 'limit': 0, 'recordCount': 0, 'status': 0, 'errorCode': null, 'data': []});
          }
        }).catch(error => {
          reject(error);
        });
    });
    return promise;
  }

  public categoryFindByCriteria(req: any) {
    req.shopId = this.gVariable.shopId || 0;
    req.branchId = this.gVariable.branchId || 0;
    const formattedReq = req;
    return new Promise((resolve, reject) =>
      this.httpService.httpPost(ApiServiceConfig.MASTER_DATA_API_SERVICE, '/category/findByCriteria', formattedReq, {})
        .then((data: any) => {
          if (data) {
            resolve(data);
          } else {
            reject({});
          }
        }).catch((error: any) => {
        reject(error);
      }));
  }

  public serviceCategoryFindByCriteria(req: any) {
    req.shopId = this.gVariable.shopId || 0;
    req.branchId = this.gVariable.branchId || 0;
    const formattedReq = req;
    return new Promise((resolve, reject) =>
      this.httpService.httpPost(ApiServiceConfig.MASTER_DATA_API_SERVICE, '/service/category/findByCriteria', formattedReq, {})
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

  public getAssignedEntitlementsByDomain(domainId: number) {
    const promise = new Promise((resolve, reject) => {
      return this.httpService.httpGet(ApiServiceConfig.MASTER_DATA_API_SERVICE, '/domain/assignedEntitlements/' + domainId, {}, null)
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

  public getUnAssignEntitlementsByDomain(domainId: number) {
    const promise = new Promise((resolve, reject) => {
      return this.httpService.httpGet(ApiServiceConfig.MASTER_DATA_API_SERVICE, '/domain/unassignedEntitlements/' + domainId, {}, null)
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

  public getAllEntitlements() {
    const promise = new Promise((resolve, reject) => {
      return this.httpService.httpGet(ApiServiceConfig.MASTER_DATA_API_SERVICE, '/entitlement', {}, null)
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

  public getAssignedEntitlementsByShop(shopId: any) {
    const entitlementList = [];
    const promise = new Promise((resolve, reject) => {
      return this.httpService.httpGet(ApiServiceConfig.MASTER_DATA_API_SERVICE, '/entitlements/' + shopId, {}, null)
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

  public getUnAssignEntitlementsByShop(shopId) {
    const promise = new Promise((resolve, reject) => {
      return this.httpService.httpGet(ApiServiceConfig.MASTER_DATA_API_SERVICE, '/shop/unassignedEntitlements/' + shopId, {}, null)
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

  public getProductCategoryDetailsById(id) {
    const promise = new Promise((resolve, reject) => {
      return this.httpService.httpGet(ApiServiceConfig.MASTER_DATA_API_SERVICE, '/productCategoryDetails/' + id, {}, null)
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

  public getServiceCategoryDetailsById(id) {
    const promise = new Promise((resolve, reject) => {
      return this.httpService.httpGet(ApiServiceConfig.MASTER_DATA_API_SERVICE, '/serviceCategoryDetails/' + id, {}, null)
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

  public getBrands(req) {
    req.shopId = this.gVariable.shopId || 0;
    req.branchId = this.gVariable.branchId || 0;
    const formattedReq = req || {};
    const promise = new Promise((resolve, reject) => {
      return this.httpService.httpPost(ApiServiceConfig.MASTER_DATA_API_SERVICE, '/brand/findByCriteria',  formattedReq, null)
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

  public getMasterData(masterDataId: any) {
    const promise = new Promise((resolve, reject) => {
      return this.httpService.httpGet(ApiServiceConfig.MASTER_DATA_API_SERVICE, '/customMasterData/' + masterDataId, {}, null)
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

  public getCountryList (){
    const records : any = [];
    let promise = new Promise((resolve, reject) => {
      return this.httpService.httpGet(ApiServiceConfig.MASTER_DATA_API_SERVICE,"/countries",{},null)
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

  public getCurrencyList(){
    const currencies : any = [];
    let promise = new Promise((resolve, reject) => {
      return this.httpService.httpGet(ApiServiceConfig.MASTER_DATA_API_SERVICE,"/currencies",{},null)
        .then((data : any) => {
          if (data) {
            data.forEach((obj : any) => {
              currencies.push(obj);
            });
            data = currencies.map((i) => { i.currencyDisplay = i.name + '-(' + i.symbol + ')'; return i; });
            resolve(data);
          } else {
            reject({});
          }
      }).catch(error => {
          reject(error);
      });
    });
    return promise;
  }

}
