import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvertoryReportComponent } from './invertory-report.component';

describe('InvertoryReportComponent', () => {
  let component: InvertoryReportComponent;
  let fixture: ComponentFixture<InvertoryReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InvertoryReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvertoryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
