import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventorySummaryDetailComponent } from './inventory-summary-detail.component';

describe('InventorySummaryDetailComponent', () => {
  let component: InventorySummaryDetailComponent;
  let fixture: ComponentFixture<InventorySummaryDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InventorySummaryDetailComponent]
    });
    fixture = TestBed.createComponent(InventorySummaryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
