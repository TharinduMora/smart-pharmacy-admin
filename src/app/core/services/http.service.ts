import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
// import {HttpClient, HttpEventType, HttpHeaders, HttpRequest} from '@angular/common/http';
// import {AppConfig} from '../config';
import {GlobalVariable} from '../com-classes';
import {EventEmitterService} from './event-emitter.service';
// import { Response } from '@angular/http';
// import { Observable } from "rxjs/Observable";
// import { stringify } from 'querystring';

@Injectable()
export class HttpService {

  constructor(private httpClient: HttpClient,
              private gVariable: GlobalVariable,
              private eventEmitterSev: EventEmitterService) {
  }

  private getApiPath(sevConfig: any) {
    // let url = '';
    // switch (sevConfig.KEY) {
    //   case 'GBL_SEV':
    //     url = this.gVariable.appConfig.GBL_API_URL.PUBLIC;
    //     break;
    //   case 'RESTAURANT_SEV':
    //     url = this.gVariable.appConfig.RESTAURANT_API_URL.PUBLIC;
    //     break;
    //   default :
    //     break;
    // }
    return this.gVariable.appConfig.API_URL.PUBLIC;
  }

  public httpGetLocal(path: string) {
    return new Promise((resolve, reject) => {
      const header = new HttpHeaders().set('Content-Type', 'application/json');
      const httpHeaders = this.setHeader(header, {});
      const url = path;
      return this.httpClient.get(url, {headers: httpHeaders})
        .toPromise()
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          this.eventEmitterSev.onBroadcastHttpError(error);
          reject(error);
        });
    });
  }

  public httpGet(sevConfig: any, path: string, body: any, headerValue: any) {
    return new Promise((resolve, reject) => {
      const header = new HttpHeaders().set('Content-Type', 'application/json');
      const httpHeaders = this.setHeader(header, headerValue);
      let apiPath: string;
      apiPath = this.getApiPath(sevConfig);
      const url = apiPath + sevConfig.ROUTE_PATH + path;
      return this.httpClient.get(url, {headers: httpHeaders})
        .toPromise()
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          this.eventEmitterSev.onBroadcastHttpError(error);
          reject(error);
        });
    });
  }

  public httpPost(sevConfig: any, path: string, body: any, headerValue: any) {
    return new Promise((resolve, reject) => {
      const reqBody: string = JSON.stringify(body);
      let header: HttpHeaders;
      header = new HttpHeaders().set('Content-Type', 'application/json');
      const httpHeaders = this.setHeader(header, headerValue);
      const apiPath = this.getApiPath(sevConfig);
      const url = apiPath + sevConfig.ROUTE_PATH + path;
      return this.httpClient.request('POST', url, {body: reqBody, headers: httpHeaders})
        .toPromise()
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          this.eventEmitterSev.onBroadcastHttpError(error);
          reject(error);
        });
    });
  }

  public httpPut(sevConfig: any, path: string, body: any, headerValue: any) {
    return new Promise((resolve, reject) => {
      const reqBody = JSON.stringify(body);
      const header = new HttpHeaders().set('Content-Type', 'application/json');
      const httpHeaders = this.setHeader(header, headerValue);
      const apiPath = this.getApiPath(sevConfig);
      const url = apiPath + sevConfig.ROUTE_PATH + path;
      // console.log(url);
      return this.httpClient.request('PUT', url, {body: reqBody, headers: httpHeaders})
        .toPromise()
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          this.eventEmitterSev.onBroadcastHttpError(error);
          reject(error);
        });
    });
  }

  public httpDelete(sevConfig: any, path: string, body: any, headerValue: any) {
    return new Promise((resolve, reject) => {
      const reqBody = JSON.stringify(body);
      const header = new HttpHeaders().set('Content-Type', 'application/json');
      const httpHeaders = this.setHeader(header, headerValue);
      const apiPath = this.getApiPath(sevConfig);
      const url = apiPath + sevConfig.ROUTE_PATH + path;
      // console.log(url);
      return this.httpClient.request('DELETE', url, {body: reqBody, headers: httpHeaders})
        .toPromise()
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          this.eventEmitterSev.onBroadcastHttpError(error);
          reject(error);
        });
    });
  }

  public httpPostFileUpload(sevConfig: any, path: string, body: any, headerValue: any) {
    return new Promise((resolve, reject) => {
      const header = new HttpHeaders();
      const httpHeaders = this.setHeader(header, headerValue);
      const apiPath = this.getApiPath(sevConfig);
      const url = apiPath + sevConfig.ROUTE_PATH + path;
      const formData: FormData = new FormData();

      for (const key in body) {
        formData.append(key, body[key]);
      }
      return this.httpClient.request('POST', url, {body: formData, headers: httpHeaders})
        .toPromise()
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          this.eventEmitterSev.onBroadcastHttpError(error);
          reject(error);
        });
    });
  }

  /*
  public httpPostFileUpload_2(sevConfig: any, path: string, body: any, headerValue: any) {
    return new Promise((resolve, reject) => {
      const header = new HttpHeaders();
      const httpHeaders = this.setHeader(header, headerValue);
      const apiPath = HttpService.getApiPath(sevConfig);
      const url = apiPath + sevConfig.ROUTE_PATH + path;
      const formData: FormData = new FormData();

      for (const key in body) {
        formData.append(key, body[key]);
      }
      const request = new HttpRequest(
        'POST', url, formData, {headers: httpHeaders, reportProgress: true});
      return this.httpClient.request(request)
        .subscribe((response: any) => {
          switch (response.type) {
            // handle the upload progress event received
            case HttpEventType.UploadProgress:
              // console.log("UploadProgress");
              const progress = Math.round(100 * response.loaded / response.total);
              break;
            // handle the download progress event received
            case HttpEventType.DownloadProgress:

              break;
            // handle the response event received
            case HttpEventType.Response:
              // When getting the full response body
              // console.log("Response");
              resolve(response);
              break;
          }
        }, error => {
          // console.log(error);
          this.eventEmitterSev.onBroadcastHttpError(error);
          reject(error);
        }, () => {
          // console.log("On Completed");
          resolve(null);
        });
    });
  }
  */

  private setHeader(header: any, headerValue: any) {
    // var header = new HttpHeaders().set('Content-Type', 'multipart/form-data');
    if (this.gVariable.authentication.sessionId) {
      header = header.set('sessionid', this.gVariable.authentication.sessionId);
    } else {
      header = header.set('sessionid', 'null');
    }

    for (const key in (headerValue || {})) {
      header = header.set(key, headerValue[key]);
    }

    return header;
  }

}
