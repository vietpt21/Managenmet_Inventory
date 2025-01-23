import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageLocationsListComponent } from './storage-locations-list.component';

describe('StorageLocationsListComponent', () => {
  let component: StorageLocationsListComponent;
  let fixture: ComponentFixture<StorageLocationsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StorageLocationsListComponent]
    });
    fixture = TestBed.createComponent(StorageLocationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
