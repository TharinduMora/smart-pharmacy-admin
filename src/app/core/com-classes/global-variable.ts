export class GlobalVariable {

  private _appConfig: any = {};
  private _waitingAppInit = false;
  private _authentication: any = {};
  private _navigationMenu: any = [];
  private _shopId = 0;
  private _branchId = 0;
  private _branchDetails: any = {};
  private _customMasterData: any = {};

  get appConfig(): any {
    return this._appConfig;
  }
  set appConfig(value: any) {
    this._appConfig = value;
  }

  get waitingAppInit(): boolean {
    return this._waitingAppInit;
  }
  set waitingAppInit(value: boolean) {
    this._waitingAppInit = value;
  }

  get authentication(): any {
    return this._authentication;
  }
  set authentication(value: any) {
    this._authentication = value;
  }

  get navigationMenu(): any {
    return this._navigationMenu;
  }
  set navigationMenu(value: any) {
    this._navigationMenu = value;
  }

  get shopId(): number {
    return this._shopId;
  }
  set shopId(value: number) {
    this._shopId = value;
  }

  get branchId(): number {
    return this._branchId;
  }
  set branchId(value: number) {
    this._branchId = value;
  }

  get branchDetails(): any {
    return this._branchDetails;
  }
  set branchDetails(value: any) {
    this._branchDetails = value;
  }

  get customMasterData(): any {
    return this._customMasterData;
  }
  set customMasterData(value: any) {
    this._customMasterData = value;
  }

}
