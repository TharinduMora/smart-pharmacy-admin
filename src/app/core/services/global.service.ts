import {Inject, Injectable} from '@angular/core';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import {FunctionConfig, navigation} from '../config';
import {GlobalVariable} from '../com-classes';
import {GuardService} from './guard.service';

@Injectable()
export class GlobalService {

  private navigation: any = navigation || [];

  constructor(private gVariable: GlobalVariable,
              private guardSev: GuardService,
              @Inject(LOCAL_STORAGE) private storage: WebStorageService) {}

  public getAvailableFunctions(functionKeyList: any) {
    const functionConfig = FunctionConfig.FUNCTIONS || {};
    const functionIdList = this.gVariable.authentication.functions || [];
    const functionsMap: any = {};
    functionsMap.AT_LEAST_ONE = false;
    (functionKeyList || []).forEach((funcKey: any) => {
      functionsMap[funcKey] = functionIdList.indexOf(functionConfig[funcKey].ID) > -1;
      functionsMap.AT_LEAST_ONE = functionsMap[funcKey] ? true : functionsMap.AT_LEAST_ONE;
    });
    return functionsMap;
  }

  public loadWebStorage() {
    /*const branch = this.storage.get('branch_details_pk');
    const customMaster = this.storage.get('custom_master_data_pk');

    if (branch && customMaster) {
      this.gVariable.branchDetails = branch;
      this.gVariable.customMasterData = customMaster;
    } else {
      this.guardSev.removeAuthentication();
    }*/
  }

  public setAvailableMenuList() {
    const menuList: any = [];
    let childrenMenuList: any = [];
    this.navigation.forEach((obj: any) => {
      if (obj.menu) {
        if (obj.children) {
          childrenMenuList = [];
          obj.children.forEach((childrenObj: any) => {
            if (this.getAvailableFunctions(childrenObj.functions).AT_LEAST_ONE) {
            // if (true) {
              childrenMenuList.push(childrenObj);
            }
          });
          if (childrenMenuList.length > 0) {
            obj.children = childrenMenuList;
            menuList.push(obj);
          }
        } else {
          if (this.getAvailableFunctions(obj.functions).AT_LEAST_ONE) {
          // if (true) {
            menuList.push(obj);
          }
        }
      } else {
        menuList.push(obj);
      }
    });

    this.gVariable.navigationMenu = menuList;
  }

}
