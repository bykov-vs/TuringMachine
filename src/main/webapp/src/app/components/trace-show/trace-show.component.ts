import {Component, EventEmitter, Inject, Input, Output} from '@angular/core';
import {HttpService} from "../../HttpService";
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
    selector: 'trace-show',
    templateUrl: './trace-show.html',
    styleUrls: ['./trace-show.css']
})
export class TraceShowComponent {
    constructor(
        private httpService: HttpService,
        public dialogRef: MatDialogRef<TraceShowComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ){}

    onNoClick(): void {
        this.dialogRef.close();
    }

    ngOnInit() {
        // will log the entire data object
    }

}