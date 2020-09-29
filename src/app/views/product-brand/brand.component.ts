import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import {GlobalService} from './../../core';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent implements OnInit {

  private mainPath = '/domain/brand';
  private subPath = '';

  private tabList: any[] = [
    {
      title: 'Product Category List',
      entitlements: [],
      active: false,
      route: '/domain/brand/list'
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
