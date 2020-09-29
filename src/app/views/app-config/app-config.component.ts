import { Component, OnInit } from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

import {GlobalService} from './../../core';

@Component({
  selector: 'app-manage-config',
  templateUrl: './app-config.component.html',
  styleUrls: ['./app-config.component.css']
})
export class AppConfigComponent implements OnInit {

  private mainPath = '/config/app-config';
  private subPath = '';

  private tabList: any[] = [
    {
      title: 'Custom Master Config',
      entitlements: [],
      active: false,
      route: '/config/app-config/master-data-config'
    },
    {
      title: 'Shop Config',
      entitlements: [],
      active: false,
      route: '/config/app-config/shop-config'
    }
  ];

  public tabs: any[] = [];

  constructor(private router: Router, private gSev: GlobalService) { }

  ngOnInit() {
    this.tabList.forEach((obj: any) => {
      // if (this.gSev.getAvailableEntitlement(obj.entitlements).AT_LEAST_ONE) {
      if (true) {
        this.tabs.push(obj);
      }
    });
    if (this.tabs.length > 0) {
      this.subPath = this.tabs[0].route;
    }
    this.initRoute();
  }

  onSelectTab(tab: any) {
    tab.active = true;
    this.router.navigate([tab.route]);
  }

  private initRoute() {
    this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          // console.log('NavigationEnd:', event.url);
          if (event.url === this.mainPath) {
            this.router.navigate([this.subPath]);
          }
          this.activeTab();
        }
      });
    if (this.router.url === this.mainPath) {
      this.router.navigate([this.subPath]);
    } else {
      this.activeTab();
    }
  }

  private activeTab() {
    for (const key in this.tabs) {
      if (this.router.url === this.tabs[key].route) {
        this.tabs[key].active = true;
        return true;
      }
    }
  }

}
