import { Component, OnInit } from '@angular/core';

import { GuardService, GlobalVariable } from './../../core';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html'
})
export class AppHeaderComponent implements OnInit {

  private user: any = {};
  countryList: any = [];
  formValue: any = {};
  formAction = 'add';

  constructor(private guard: GuardService, public gVariable: GlobalVariable) {
  }

  ngOnInit() {
    // console.log(this.gVariable.authentication);
  }

  onLogOut() {
    this.guard.removeAuthentication();
  }

  onClickProfile() {

  }

  onClickChangePassword() {

  }

}
