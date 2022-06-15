import {Component, EventEmitter, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MachineLearningModel} from "../../types/machine-learning-model";

@Component({
  selector: 'app-model-details-dialog',
  templateUrl: './model-details-dialog.component.html',
  styleUrls: ['./model-details-dialog.component.scss']
})
export class ModelDetailsDialogComponent implements OnInit {
  onDeclineOrConfirm = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<ModelDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MachineLearningModel
  ) {
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
  }

  buttonClick(btnType: string) {
    this.onDeclineOrConfirm.emit(btnType);
  }
}
