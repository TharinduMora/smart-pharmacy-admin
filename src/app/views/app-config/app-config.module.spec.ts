import { AppConfigModule } from './app-config.module';

describe('ManageConfigModule', () => {
  let manageConfigModule: AppConfigModule;

  beforeEach(() => {
    manageConfigModule = new AppConfigModule();
  });

  it('should create an instance', () => {
    expect(manageConfigModule).toBeTruthy();
  });
});
