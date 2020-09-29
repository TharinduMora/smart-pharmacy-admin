import { ManageManufacturerModule } from './manage-manufacturer.module';

describe('ManageManufacturerModule', () => {
  let manageManufacturerModule: ManageManufacturerModule;

  beforeEach(() => {
    manageManufacturerModule = new ManageManufacturerModule();
  });

  it('should create an instance', () => {
    expect(manageManufacturerModule).toBeTruthy();
  });
});
