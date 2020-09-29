import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomMasterConfigFormComponent } from './custom-master-config-form.component';

describe('CustomMasterConfigFormComponent', () => {
  let component: CustomMasterConfigFormComponent;
  let fixture: ComponentFixture<CustomMasterConfigFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomMasterConfigFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomMasterConfigFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
