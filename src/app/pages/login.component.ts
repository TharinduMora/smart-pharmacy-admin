import {Component, Inject, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import {EventEmitterService, GlobalVariable, GuardService} from '../core';
import {AdminService} from '../services';
// import {forkJoin} from 'rxjs';

// import { Router } from '@angular/router';

@Component({
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {

  loginReq: any = {};
  questions: any = [];

  constructor(private guard: GuardService,
              private adminSev: AdminService,
              private gVariable: GlobalVariable,
              private eventEmitterSev: EventEmitterService,
              @Inject(LOCAL_STORAGE) private storage: WebStorageService) {
  }

  ngOnInit() {
    // this.form = new FormGroup();
  }

  onLoggedIn(form: NgForm) {
    // console.log(form);
    if (form.valid) {
      this.gVariable.waitingAppInit = true;
      this.adminSev.login(Object.assign({}, form.value))
        .then((data: any) => {
          // console.log(data);
          this.guard.createAuthentication(data);
          this.getConfigDetailsFromBackend();
        }).catch((error: any) => {
        this.gVariable.waitingAppInit = false;
          // console.log(error);
      });
    }
  }

  // isValid(question) { return this.form.controls[question.key].valid; }

  private getConfigDetailsFromBackend() {
    this.gVariable.waitingAppInit = false;
    this.eventEmitterSev.onBroadcastLoginSucceed();

    /* forkJoin([]).subscribe(results => {
      // console.log(results);
      this.eventEmitterSev.onBroadcastLoginSucceed();
      this.gVariable.waitingAppInit = false;
    }, error => {
      console.error(error);
      this.guard.removeAuthentication();
      this.gVariable.waitingAppInit = false;
    }); */
  }

}
