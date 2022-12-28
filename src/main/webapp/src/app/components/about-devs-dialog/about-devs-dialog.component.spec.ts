import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutDevsDialogComponent } from './about-devs-dialog.component';

describe('AboutDevsDialogComponent', () => {
  let component: AboutDevsDialogComponent;
  let fixture: ComponentFixture<AboutDevsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutDevsDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutDevsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
