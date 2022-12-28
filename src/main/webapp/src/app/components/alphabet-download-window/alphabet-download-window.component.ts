import {Component, EventEmitter, Inject, Input, Output} from '@angular/core';
import {HttpService} from "../../HttpService";
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
    selector: 'app-alphabet-download-window',
    templateUrl: './alphabet-download-window.html',
    styleUrls: ['./alphabet-download-window.css']
})
export class AlphabetDownloadWindowComponent {
    constructor(
        private httpService: HttpService,
        public dialogRef: MatDialogRef<AlphabetDownloadWindowComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ){}

    onNoClick(): void {
        this.dialogRef.close();
    }

    ngOnInit() {
        // will log the entire data object
        console.log(this.data)
    }

    deleteAlphabet(id : any) {
        console.log(id)
        this.httpService.deleteAlphabetById(id)
            .subscribe((data: any) => {
                alert(data.message)
            })
        this.dialogRef.close(null);
    }

    downloadAlphabet(symbols: any) {
        console.log(symbols)
        this.dialogRef.close(symbols);
    }
}
