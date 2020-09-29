import {Component, OnInit} from '@angular/core';
import {NavigationStart, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {EventEmitterService, GlobalService, GlobalVariable, GuardService, HttpService, ToastService} from './core';

// import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {

  constructor(private translate: TranslateService,
              private router: Router,
              private guard: GuardService,
              private gSev: GlobalService,
              private eventEmitSev: EventEmitterService,
              private toast: ToastService,
              private httpService: HttpService,
              public gVariable: GlobalVariable) {
    translate.addLangs(['en']);
    // translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa']);
    translate.setDefaultLang('en');
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en/) ? browserLang : 'en');
    // translate.use(browserLang.match(/en|fr|ur|es|it|fa/) ? browserLang : 'en');

    // toastNot.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.gVariable.waitingAppInit = true;
    this.loadConfig()
      .then((data: any) => {
        // console.log(data);
        this.gVariable.appConfig = data;
        this.initApp();
        this.gVariable.waitingAppInit = false;
      }).catch((error: any) => {
        console.log(error);
    });
  }

  private initApp() {
    this.guard.canActivate();
    // example: NavigationStart, RoutesRecognized, NavigationEnd
    const url = ['/login', '/register'];
    this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationStart) {
          // console.log('NavigationStart:', event.url);
          if (url.indexOf(event.url) === -1) {
            // this.guard.canActivate();
            if (!this.gVariable.authentication.authorized) {
              this.router.navigate(['/login']);
              return false;
            }
          }
        }
      });

    if (this.gVariable.authentication.authorized) {
      this.analyzeSystemConfig();
    }

    this.eventEmitSev.httpError.subscribe(
      (response: any) => {
        this.showHttpError(response);
      }
    );

    this.eventEmitSev.loginSucceed.subscribe(
      () => {
        this.analyzeSystemConfig();
        this.router.navigate(['/dashboard']);
      }
    );
  }

  private analyzeSystemConfig() {
    this.gSev.loadWebStorage();
    this.gSev.setAvailableMenuList();
  }

  private showHttpError(response: any) {
    // console.log(response);
    switch (response.status) {
      case -1:
        this.toast.showError('Service not working.');
        break;
      case 0:
        this.toast.showError('Service not working.');
        break;
      case 304:
        const eTag = response.headers.get('Etag');
        if (eTag) {
          const res = eTag.replace(/"/g, '');
          this.toast.showWarning(res);
        }
        break;
      case 401:
        this.toast.showInfo('Unauthorized. Invalid user.');
        // ssoAuth.logOut();
        break;
      case 404:
        this.toast.showError('404 Not Found.');
        break;
      case 400:
        this.toast.showError('Bad Request.');
        break;
      case 500:
        this.toast.showError('System Error.');
        break;
      default:
        break;
    }
  }

  private loadConfig() {
    const jsonFile = 'assets/app.config.json';
    return new Promise((resolve, reject) =>
      this.httpService.httpGetLocal(jsonFile)
        .then((data: any) => {
          // console.log(data);
          if (data) {
            resolve(data);
          } else {
            reject({'error': 'no content 204'});
          }
        }).catch((error: any) => {
        reject(error);
      }));
  }

  /*changeLang() {
     this.translate.use('en');
     this.translate.get('Dashboard').subscribe((res: string) => {
     console.log(res)
   });}*/

}
