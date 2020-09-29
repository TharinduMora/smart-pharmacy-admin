import {AfterContentChecked, AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {GlobalService, ToastService} from '../services';

@Component({
  selector: 'app-com-tab',
  templateUrl: './com-tab.component.html',
  styleUrls: ['./com-tab.component.css']
})
export class ComTabComponent implements OnInit, AfterViewInit {

  private rootPath = '';
  public tabs: any[] = [];

  constructor(private router: Router,
              private gSev: GlobalService,
              private activatedRoute: ActivatedRoute,
              private toastNot: ToastService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.rootPath = '';
    this.activatedRoute.data.subscribe(data => {

      this.rootPath = data.rootPath;

      data.tabList.forEach((obj: any) => {
        if (this.gSev.getAvailableFunctions(obj.functions).AT_LEAST_ONE) {
          this.tabs.push(obj);
        }
      });

      if (this.tabs.length > 0) {
        this.subscribeToNavigationEvent();
        this.initRoute();
      } else {
        this.toastNot.showError('User Not Authorized to access this module.');
        this.router.navigate(['']).then();
      }
    });
  }

  onSelectTab(tab: any) {
    tab.active = true;
    this.router.navigate([this.rootPath + tab.route]).then();
  }

  initRoute() {
    if (this.router.url === this.rootPath) {
      this.router.navigate([this.rootPath + this.tabs[0].route]).then();
    } else {
      this.activeTab();
    }
  }

  subscribeToNavigationEvent() {
    this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          if (event.url === this.rootPath) {
            this.router.navigate([this.rootPath + this.tabs[0].route]).then();
          }
          this.activeTab();
        }
      });
  }

  private activeTab() {
    for (const key in this.tabs) {
      if (this.router.url === (this.rootPath + this.tabs[key].route)) {
        this.tabs[key].active = true;
        return true;
      }
    }
  }
}

