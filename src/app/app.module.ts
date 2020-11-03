import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {DatePipe, DecimalPipe} from '@angular/common';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {StorageServiceModule} from 'angular-webstorage-service';
// import { ToastModule } from 'ng6-toastr/ng2-toastr';
import {ToastrModule} from 'ng6-toastr-notifications';
// Import 3rd party components
import {ModalModule} from 'ngx-bootstrap/modal';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {ChartsModule} from 'ng2-charts/ng2-charts';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
// Import core
import {EventEmitterService, ExternalJs, GlobalClass, GlobalService, GlobalVariable, GuardService, HttpService, ToastService, MsgBoxModule} from './core';
// Import containers
import {FullLayoutComponent, SimpleLayoutComponent} from './containers';
// Import components
import {
  APP_SIDEBAR_NAV,
  AppAsideComponent,
  AppBreadcrumbsComponent,
  AppFooterComponent,
  AppHeaderComponent,
  AppSidebarComponent,
  AppSidebarFooterComponent,
  AppSidebarFormComponent,
  AppSidebarHeaderComponent,
  AppSidebarMinimizerComponent
} from './components';
// Import directives
import {AsideToggleDirective, MyFocusDirective, NAV_DROPDOWN_DIRECTIVES, ReplaceDirective, SIDEBAR_TOGGLE_DIRECTIVES} from './directives';
// Import api services
import {
  AdminService,
  MasterDataService,
  ShopService,
  RolesService, ProductService,
} from './services';

const API_SERVICES = [
  AdminService,
  MasterDataService,
  ShopService,
  RolesService,
  ProductService
];

export function HttpLoaderFactory(http: HttpClient) {
  // for development
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    FullLayoutComponent,
    SimpleLayoutComponent,
    AppAsideComponent,
    AppBreadcrumbsComponent,
    AppFooterComponent,
    AppHeaderComponent,
    AppSidebarComponent,
    AppSidebarFooterComponent,
    AppSidebarFormComponent,
    AppSidebarHeaderComponent,
    AppSidebarMinimizerComponent,
    APP_SIDEBAR_NAV,
    AsideToggleDirective,
    NAV_DROPDOWN_DIRECTIVES,
    ReplaceDirective,
    MyFocusDirective,
    SIDEBAR_TOGGLE_DIRECTIVES
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    StorageServiceModule,
    ToastrModule.forRoot(),
    ModalModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    AppRoutingModule,
    HttpClientModule,
    MsgBoxModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    DatePipe,
    DecimalPipe,
    HttpService,
    GlobalVariable,
    GlobalClass,
    ExternalJs,
    GuardService,
    EventEmitterService,
    ToastService,
    GlobalService,
    API_SERVICES
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
