import {Component, OnInit} from '@angular/core';
import {MyAccountService} from '../../../services/my-account.service';
import {GlobalVariable} from '../../../core/com-classes';
import {StaticConfig} from '../../../core/config';
import {ToastService} from '../../../core/services';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-my-shop',
  templateUrl: './my-shop.component.html',
  styleUrls: ['./my-shop.component.css']
})
export class MyShopComponent implements OnInit {

  action = 'view';
  shopForm: any = null;
  shop: any = null;
  public imageConfig: any = {
    image: null,
    imgUrl: this.globalVariable.appConfig.IMAGE_URL,
    width: 100,
    height: 100,
  };

  constructor(private myAccountService: MyAccountService,
              public globalVariable: GlobalVariable,
              private toastService: ToastService) {
  }

  ngOnInit() {
    this.getShopDetails();
  }

  onClickEdit() {
    this.action = 'edit';
    this.imageConfig.image = this.globalVariable.appConfig.IMAGE_URL + this.shop.image;
  }

  onCancelShopForm() {
    this.shopForm = this.shop;
    this.action = 'view';
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.updateShop(this.shopForm);
    }
  }

  getShopDetails() {
    this.myAccountService.getShopById(this.globalVariable.authentication.shopId).then((res: any) => {
      if (res) {
        this.shop = res;
        this.shopForm = {...this.shop};
      }
    });
  }

  onFileUploadEvent(event) {
    this.shopForm.image = event.data;
  }

  updateShop(req: any) {
    this.myAccountService.updateShop(req).then((res: any) => {
      if (res && res.status === StaticConfig.RESPONSE_STATUS.SUCCESS) {
        this.shop = this.shopForm;
        this.action = 'view';
        this.toastService.showSuccess('Successfully Updated!');
      } else {
        this.toastService.showError('Failed to update!');
      }
    }).catch(() => {
      this.toastService.showError('Failed to update!');
    });
  }

}
