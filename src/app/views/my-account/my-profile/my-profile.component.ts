import { Component, OnInit } from '@angular/core';
import {MyAccountService} from '../../../services';
import {GlobalVariable} from '../../../core/com-classes';
import {ToastService} from '../../../core/services';
import {NgForm} from '@angular/forms';
import {StaticConfig} from '../../../core/config';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  action = 'view';
  adminForm: any = null;
  admin: any = null;
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
    this.getAdminDetails();
  }

  onClickEdit() {
    this.action = 'edit';
    this.imageConfig.image = this.globalVariable.appConfig.IMAGE_URL + this.admin.image;
  }

  onCancelShopForm() {
    this.adminForm = this.admin;
    this.action = 'view';
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.updateAdmin(this.adminForm);
    }
  }

  getAdminDetails() {
    this.myAccountService.getAdminById(this.globalVariable.authentication.id).then((res: any) => {
      if (res) {
        this.admin = res;
        this.adminForm = {...this.admin};
      }
    });
  }

  onFileUploadEvent(event) {
    this.adminForm.image = event.data;
  }

  updateAdmin(req: any) {
    this.myAccountService.updateAdmin(req).then((res: any) => {
      if (res && res.status === StaticConfig.RESPONSE_STATUS.SUCCESS) {
        this.admin = this.adminForm;
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
