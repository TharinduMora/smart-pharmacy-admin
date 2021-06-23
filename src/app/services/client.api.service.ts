import { Injectable } from "@angular/core";

import { ApiServiceConfig, GlobalVariable, HttpService } from "../core";

@Injectable({
  providedIn: "root",
})
export class ClientAPIService {
  constructor(private httpService: HttpService) {}

  public findShopById(shopId: number) {
    return new Promise((resolve, reject) =>
      this.httpService
        .httpGet(ApiServiceConfig.CLIENT_API_SERVICE, "/shop/" + shopId, {}, {})
        .then((data: any) => {
          if (data) {
            resolve(data);
          } else {
            reject({});
          }
        })
        .catch((error: any) => {
          reject(error);
        })
    );
  }

  public findByMap(
    req: any,
    lat: number,
    long: number,
    rad: number,
    productName: string
  ) {
    const formattedReq = req;
    let productNameQuery = "";
    if (productName) {
      productNameQuery = "?productName=" + productName;
    }
    return new Promise((resolve, reject) =>
      this.httpService
        .httpPost(
          ApiServiceConfig.CLIENT_API_SERVICE,
          "/findByMap/" + lat + "/" + long + "/" + rad + productNameQuery,
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
