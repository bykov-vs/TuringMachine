import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlphabetDownloadWindowComponent } from './alphabet-download-window.component';

describe('AboutDevsDialogComponent', () => {
    let component: AlphabetDownloadWindowComponent;
    let fixture: ComponentFixture<AlphabetDownloadWindowComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ AlphabetDownloadWindowComponent ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(AlphabetDownloadWindowComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
