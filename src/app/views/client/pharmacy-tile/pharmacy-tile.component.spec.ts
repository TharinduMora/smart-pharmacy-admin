import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacyTileComponent } from './pharmacy-tile.component';

describe('PharmacyTileComponent', () => {
  let component: PharmacyTileComponent;
  let fixture: ComponentFixture<PharmacyTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PharmacyTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacyTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
