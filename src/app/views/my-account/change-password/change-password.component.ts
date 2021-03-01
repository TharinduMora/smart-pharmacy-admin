import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {MyAccountService} from '../../../services';
import {GlobalVariable} from '../../../core/com-classes';
import {ToastService} from '../../../core/services';
import {StaticConfig} from '../../../core/config';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordObj: any = {};

  constructor(private myAccountService: MyAccountService,
              public globalVariable: GlobalVariable,
              private toastService: ToastService) {
  }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const req = {
        id: this.globalVariable.authentication.id,
        currentPassword: this.changePasswordObj.currentPassword,
        newPassword: this.changePasswordObj.newPassword
      };
      this.myAccountService.changePassword(req).then((res: any) => {
        if (res && res.status === StaticConfig.RESPONSE_STATUS.SUCCESS) {
          this.toastService.showSuccess('Successfully Changed!');
        } else {
          this.toastService.showError('Failed to update!');
        }
      }).catch(() => {
        this.toastService.showError('Failed to update!');
      });
      // this.updateShop(this.shop);
    }
  }

}
