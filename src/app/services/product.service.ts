import { Injectable } from "@angular/core";

import { ApiServiceConfig, GlobalVariable, HttpService } from "../core";

@Injectable()
export class ProductService {
  constructor(
    private httpService: HttpService,
    private gVariable: GlobalVariable
  ) {}

  public productFindByCriteria(req: any) {
    const formattedReq = req;
    return new Promise((resolve, reject) =>
      this.httpService
        .httpPost(
          ApiServiceConfig.PRODUCT_API_SERVICE,
          "/findByCriteria",
          formattedReq,
          {}
        )
        .then((data: any) => {
          if (data) {
            resolve(data);
          } else {
            resolve({
              offset: 0,
              limit: 0,
              recordCount: 0,
              status: 0,
              errorCode: null,
              data: [],
            });
          }
        })
        .catch((error: any) => {
          reject(error);
        })
    );
  }

  public createNewProduct(req: any) {
    const formattedReq = {
      shopId: req.shopId,
      name: req.name,
      unit: req.unit,
      description: req.description,
      stockAvailable: req.stockAvailable || true,
      price: req.price,
      availableQuantity: req.availableQuantity || 0,
      image: req.image || "",
    };
    return new Promise((resolve, reject) =>
      this.httpService
        .httpPost(ApiServiceConfig.PRODUCT_API_SERVICE, "", formattedReq, {})
        .then((data: any) => {
          if (data) {
            resolve(data);
          } else {
            resolve({
              offset: 0,
              limit: 0,
              recordCount: 0,
              status: 0,
              errorCode: null,
              data: [],
            });
          }
        })
        .catch((error: any) => {
          reject(error);
        })
    );
  }

  public updateProduct(req: any) {
    const formattedReq = {
      id: req.id,
      shopId: req.shopId || this.gVariable.authentication.shopId,
      name: req.name,
      unit: req.unit,
      description: req.description,
      image: req.image,
      price: req.price,
      availableQuantity: req.availableQuantity || 0,
      stockAvailable: req.stockAvailable,
    };
    return new Promise((resolve, reject) =>
      this.httpService
        .httpPut(ApiServiceConfig.PRODUCT_API_SERVICE, "", formattedReq, {})
        .then((data: any) => {
          if (data) {
            resolve(data);
          } else {
            reject();
          }
        })
        .catch((error: any) => {
          reject(error);
        })
    );
  }

  public updateProductStatus(req: any) {
    const formattedReq = {
      shopId: req.shopId || this.gVariable.authentication.shopId,
      primaryId: req.primaryId,
      status: req.status,
    };
    return new Promise((resolve, reject) =>
      this.httpService
        .httpPut(
          ApiServiceConfig.PRODUCT_API_SERVICE,
          "/updateStatus",
          formattedReq,
          {}
        )
        .then((data: any) => {
          if (data) {
            resolve(data);
          } else {
            resolve({
              offset: 0,
              limit: 0,
              recordCount: 0,
              status: 0,
              errorCode: null,
              data: [],
            });
          }
        })
        .catch((error: any) => {
          reject(error);
        })
    );
  }
}
