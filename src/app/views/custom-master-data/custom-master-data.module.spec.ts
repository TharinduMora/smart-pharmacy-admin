import { CustomMasterDataModule } from './custom-master-data.module';

describe('CustomMasterDataModule', () => {
  let customMasterDataModule: CustomMasterDataModule;

  beforeEach(() => {
    customMasterDataModule = new CustomMasterDataModule();
  });

  it('should create an instance', () => {
    expect(customMasterDataModule).toBeTruthy();
  });
});
