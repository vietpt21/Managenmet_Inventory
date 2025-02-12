import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventorySummaryListComponent } from './inventory-summary-list.component';

describe('InventorySummaryListComponent', () => {
  let component: InventorySummaryListComponent;
  let fixture: ComponentFixture<InventorySummaryListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InventorySummaryListComponent]
    });
    fixture = TestBed.createComponent(InventorySummaryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
