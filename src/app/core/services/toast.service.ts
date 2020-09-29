import {Injectable} from '@angular/core';
// import { ToastsManager } from 'ng6-toastr/ng2-toastr';
import {ToastrManager} from 'ng6-toastr-notifications';

@Injectable()
export class ToastService {

  private toastrOptions: any = {toastTimeout: 3000, showCloseButton: true, position: 'top-left'};

  constructor(public toastr: ToastrManager) {}

  showSuccess(text: any) {
    this.toastr.successToastr(text, 'Success!', this.toastrOptions);
  }

  showError(text: any) {
    this.toastr.errorToastr(text, 'Oops!', this.toastrOptions);
  }

  showWarning(text: any) {
    this.toastr.warningToastr(text, 'Warning!', this.toastrOptions);
  }

  showInfo(text: any) {
    this.toastr.infoToastr(text, 'Info', this.toastrOptions);
  }

  // showCustom(body: any) {
  //   this.toastr.customToastr(
  //     '<span style=\'color: green; font-size: 16px; text-align: center;\'>Custom Toast</span>',
  //     null,
  //     { enableHTML: true }
  //   );
  // }
  //
  // showToast(position: any = 'top-left') {
  //   this.toastr.infoToastr('This is a toast.', 'Toast', {
  //     position: position
  //   });
  // }

}
