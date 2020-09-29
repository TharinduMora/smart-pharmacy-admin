import { Injectable } from '@angular/core';

import {ApiServiceConfig, GlobalVariable, HttpService} from '../core';

@Injectable()
export class MasterDataManagementService {

  constructor(private httpService: HttpService, private gVariable: GlobalVariable) { }

  public assignDomainEntitlement(req) {
    const formattedReq = {
      "domainId": req.domainId,
      "shopId": this.gVariable.shopId,
      "branchId": this.gVariable.branchId,
      "entitlementIds": req.entitlementIds || []
    };
    const promise = new Promise((resolve, reject) => {
      return this.httpService.httpPost(ApiServiceConfig.MASTER_DATA_MGT_API_SERVICE, '/assignDomainEntitlement', formattedReq, null)
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

  public deleteEntitlements(req) {
    const formattedReq = req || {};
    const promise = new Promise((resolve, reject) => {
      return this.httpService.httpDelete(ApiServiceConfig.MASTER_DATA_MGT_API_SERVICE, '/domain/entitlement', formattedReq, null)
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

  public assignShopEntitlements(req) {
    const formattedReq = {
      "shopId": req.shopId,
      "branchId": this.gVariable.branchId,
      "entitlementIds": req.entitlementIds || []
    };
    const promise = new Promise((resolve, reject) => {
      return this.httpService.httpPost(ApiServiceConfig.MASTER_DATA_MGT_API_SERVICE, '/assignShopEntitlement', formattedReq, null)
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

  public deleteShopEntitlements(req) {
    const formattedReq = req || {};
    const promise = new Promise((resolve, reject) => {
      return this.httpService.httpDelete(ApiServiceConfig.MASTER_DATA_MGT_API_SERVICE, '/shop/entitlement', formattedReq, null)
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

  public updateCategoryStatus(req) {
      const promise = new Promise((resolve, reject) => {
        return this.httpService.httpPut(ApiServiceConfig.MASTER_DATA_MGT_API_SERVICE, '/category/updateStatus', req, null)
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

  public updateServiceCategoryStatus(req) {
      const promise = new Promise((resolve, reject) => {
        return this.httpService.httpPut(ApiServiceConfig.MASTER_DATA_MGT_API_SERVICE, '/service/category/updateStatus', req, null)
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

  public updateBrandStatus(req) {
    const promise = new Promise((resolve, reject) => {
      return this.httpService.httpPut(ApiServiceConfig.MASTER_DATA_MGT_API_SERVICE, '/brand/updateStatus', req, null)
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

  public addProductCategory(req) {
    const formattedReq = req || {};
    const promise = new Promise((resolve, reject) => {
      return this.httpService.httpPost(ApiServiceConfig.MASTER_DATA_MGT_API_SERVICE, '/category', formattedReq, null)
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

  public addServiceCategory(req) {
    const formattedReq = req || {};
    const promise = new Promise((resolve, reject) => {
      return this.httpService.httpPost(ApiServiceConfig.MASTER_DATA_MGT_API_SERVICE, '/service/category', formattedReq, null)
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

  public updateProductCategory(req) {
    const formattedReq = req || {};
    const promise = new Promise((resolve, reject) => {
      return this.httpService.httpPut(ApiServiceConfig.MASTER_DATA_MGT_API_SERVICE, '/category', formattedReq, null)
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

  public updateServiceCategory(req) {
    const formattedReq = req || {};
    const promise = new Promise((resolve, reject) => {
      return this.httpService.httpPut(ApiServiceConfig.MASTER_DATA_MGT_API_SERVICE, '/service/category', formattedReq, null)
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

  public addBrand(req) {
    const formattedReq = req || {};
    const promise = new Promise((resolve, reject) => {
      return this.httpService.httpPost(ApiServiceConfig.MASTER_DATA_MGT_API_SERVICE, '/brand', formattedReq, null)
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

  public updateBrand(req) {
    const formattedReq = req || {};
    const promise = new Promise((resolve, reject) => {
      return this.httpService.httpPut(ApiServiceConfig.MASTER_DATA_MGT_API_SERVICE, '/brand', formattedReq, null)
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

  public addNewMasterData(req) {
    const formattedReq = req || {};
      const promise = new Promise((resolve, reject) => {
        return this.httpService.httpPost(ApiServiceConfig.MASTER_DATA_MGT_API_SERVICE, '/customMasterData', formattedReq, null)
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

  public updateMasterData(req) {
    const formattedReq = req || {};
    const promise = new Promise((resolve, reject) => {
      return this.httpService.httpPut(ApiServiceConfig.MASTER_DATA_MGT_API_SERVICE, '/customMasterData', formattedReq, null)
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
