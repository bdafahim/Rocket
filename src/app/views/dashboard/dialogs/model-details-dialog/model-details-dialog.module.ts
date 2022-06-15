import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModelDetailsDialogComponent } from './model-details-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";




@NgModule({
  declarations: [
    ModelDetailsDialogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule
  ],
  exports: [ModelDetailsDialogComponent]
})
// @ts-ignore
export class ModelDetailsDialogModule { }

