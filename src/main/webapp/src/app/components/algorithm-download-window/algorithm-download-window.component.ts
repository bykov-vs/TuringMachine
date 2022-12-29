import {Component, Inject} from "@angular/core";
import {HttpService} from "../../HttpService";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
    selector: 'app-algorithm-download-window',
    templateUrl: './algorithm-download-window.html',
    styleUrls: ['./algorithm-download-window.css']
})
export class AlgorithmDownloadWindowComponent {
    isBase: boolean = false

    constructor(
        private httpService: HttpService,
        public dialogRef: MatDialogRef<AlgorithmDownloadWindowComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.isBase = this.data.isBase
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    ngOnInit() {
        this.isBase = this.data.isBase
        // will log the entire data object
        console.log(this.data)
    }

    deleteAlgorithm(id: any) {
        console.log(id)
        this.httpService.deleteAlgorithmById(id)
            .subscribe((data: any) => {
                alert(data.message)
            })
        this.dialogRef.close(null);
    }

    downloadAlgorithm(newAlgorithm: any) {
        console.log(newAlgorithm)
        this.dialogRef.close(newAlgorithm);
    }
}
