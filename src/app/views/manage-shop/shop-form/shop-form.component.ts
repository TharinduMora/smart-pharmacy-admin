import { Component, OnInit, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {Subject} from 'rxjs';
import {NgForm, FormBuilder } from '@angular/forms';
import {Md5} from 'ts-md5/dist/md5';

import {ToastService, StaticConfig, GlobalVariable} from '../../../core';
import {MasterDataService, ShopService} from '../../../services';

@Component({
    selector: 'app-shop-form',
    templateUrl: './shop-form.component.html',
    styleUrls: []
})

export class ShopFormComponent implements OnInit {

    public shopData : any = {};
    public countryList = [];
    public currencyList = [];
    public onClose: Subject<boolean>;
    public action: string;

    constructor(public bsModalRef: BsModalRef,
                private toastNot: ToastService,
                private masterSev: MasterDataService,
                private shopSev : ShopService) {
        this.onClose = new Subject();
    }

  ngOnInit() {
    this.getCountryList();
    this.getCurrencyList();

    setTimeout(() => {
      // console.log(this.shopData);
    }, 0);
  }

  onCloseModal(response: any) {
    this.onClose.next(response);
    this.bsModalRef.hide();
  }


  onSubmit(form: NgForm) {
    if (form.valid) {
      let shop = Object.assign({}, this.shopData);
      shop.password = Md5.hashStr(shop.password);
      let req = {
        "user":{
          "firstName":shop.firstName,
          "lastName":shop.lastName,
          "loginName":shop.loginName,
          "password":shop.password,
        },
        "email":shop.email,
        "shopName":shop.shopName,
        "address1":shop.address1,
        "address2":shop.address2,
        "city":shop.city,
        "postalCode":shop.postalCode,
        "telephone":shop.telephone,
        "shopCategory":shop.shopCategory,
        "countryId":shop.countryId,
        "currency":shop.currency,
        "shopType":shop.shopType,
      };

      // console.log(req);
      this.addShop(req);
    }
  }

  onClickReset(form: NgForm) {
    form.onReset();
  }


  private addShop(req: any) {
    this.shopSev.createShop(req).then((response: any) => {
      this.toastNot.showSuccess('Shop Created Successfully.');
      this.onCloseModal(response.data);
    }).catch(error => {});
  }

  private getCountryList() {
    this.masterSev.getCountryList().then((response: any) => {
      this.countryList = response;
    }).catch(error => {});
  }

  private getCurrencyList() {
    this.masterSev.getCurrencyList().then((response: any) => {
      this.currencyList = response;
    }).catch(error => {});
  }
}
