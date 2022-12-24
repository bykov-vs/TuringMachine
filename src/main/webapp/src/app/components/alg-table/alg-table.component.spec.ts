import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgTableComponent } from './alg-table.component';

describe('AlgTableComponent', () => {
  let component: AlgTableComponent;
  let fixture: ComponentFixture<AlgTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlgTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlgTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
