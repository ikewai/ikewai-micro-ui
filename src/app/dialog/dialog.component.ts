import { Inject, Component } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
    selector: 'dialog-overview-example-dialog',
    templateUrl: 'dialog.component.html',
  })
  export class DialogOverviewExampleDialog {
  someValue: boolean = false;
  
  constructor(
   public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
  @Inject(MAT_DIALOG_DATA) public data: any) { }
  
  onNoClick(): void {
    this.dialogRef.close(this.someValue);
  }
  
  }