import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopConfigComponent } from './shop-config.component';

describe('ShopConfigComponent', () => {
  let component: ShopConfigComponent;
  let fixture: ComponentFixture<ShopConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
