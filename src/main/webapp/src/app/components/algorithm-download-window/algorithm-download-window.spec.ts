import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgorithmDownloadWindowComponent } from './algorithm-download-window.component';

describe('AlgorithmDownloadWindowComponent', () => {
  let component: AlgorithmDownloadWindowComponent;
  let fixture: ComponentFixture<AlgorithmDownloadWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlgorithmDownloadWindowComponent ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AlgorithmDownloadWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
