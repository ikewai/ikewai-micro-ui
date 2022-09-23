import { Inject, Component } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';

@Component({
    selector: 'dialog-overview-example-dialog',
    templateUrl: 'dialog.component.html',
    styleUrls: ['./dialog.component.css'],
  })

  export class DialogOverviewExampleDialog {

    dataMap = {};
    selectedData = [];
    isValidRequest = true;
    sampleSpecifications = {
      '16s': true,
      'WGS': true,
      'qPCR': true,
      'Cultured Data': true
    }

    name = "";
    affiliation: "";

    requestObject = {
      name: "",
      sampleSpecifications: this.sampleSpecifications,
      requestedSamples: [],
      isValidRequest: false,
    };
    
    constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder) { 
      data.map((item: any) => this.dataMap[item.value.id] = true);
      this.selectedData = data.map((item: any) => item.value.id);
    }
    
    onNoClick(): void {
      this.isValidRequest = false;
      this.dialogRef.close();
    }

    selectSample(e, item) {
      this.dataMap[item.value.id] = e.target.checked;
      this.selectedData = this.data.filter((item: any) => this.dataMap[item.value.id]).map((item: any) => item.value.id);
      this.requestObject.requestedSamples = this.selectedData;
    }

    toggleSpecs(e: any, choice: string) {
      this.sampleSpecifications[choice] = e.target.checked;
      this.requestObject.sampleSpecifications = this.sampleSpecifications;
    }

    keyEvent(e) {
      this.requestObject.name = this.name;
    }

    profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      affiliation: ['', Validators.required],
      email: ['', Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")],
      reason: ['', Validators.required],
      sampleSpecifications: this.fb.group({
        '16s': [true],
        'WGS': [true],
        'qPCR': [true],
        'Cultured Data': [true]
      }),
    });
  
  
  onSubmit() {
    if (!this.selectedData.length) return alert('No samples selected.')
    const data = {...this.profileForm.value, selectedData: this.selectedData, isValidRequest: this.profileForm.status === 'VALID' ? true : false}
    this.dialogRef.close(data);
  }
    
  }