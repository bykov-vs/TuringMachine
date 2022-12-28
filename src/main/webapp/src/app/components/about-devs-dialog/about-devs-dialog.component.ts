import { Component, Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-about-devs-dialog',
  templateUrl: './about-devs-dialog.component.html',
  styleUrls: ['./about-devs-dialog.component.css']
})
export class AboutDevsDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AboutDevsDialogComponent>,
    
  ){}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
