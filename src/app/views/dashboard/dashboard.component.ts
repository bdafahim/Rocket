import {Component, OnInit, TemplateRef} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { DashboardChartsData, IChartProps } from './dashboard-charts-data';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ModelDetailsDialogComponent} from "./dialogs/model-details-dialog/model-details-dialog.component";
import {MachineLearningModel} from "./types/machine-learning-model";
import {DashboardService} from "../../service/dashboard/dashboard.service";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";

interface IUser {
  name: string;
  state: string;
  registered: string;
  country: string;
  usage: number;
  period: string;
  payment: string;
  activity: string;
  avatar: string;
  status: string;
  color: string;
}

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  detailsModalRef: MatDialogRef<ModelDetailsDialogComponent, any> | undefined;
  constructor(private chartsData: DashboardChartsData,
              private modalService: BsModalService,
              private dialog: MatDialog,
              private dashboardService: DashboardService
              ) {
  }
  models: any;
  modalRef?: BsModalRef;
  modeldetails: any;

  ngOnInit(): void {
    this.dashboardService.getModels().subscribe(
      data => {
        this.models = data;
        console.log(this.models);
      }
    );
  }


  cardDetails(template: TemplateRef<any>, id: number) {
    let data: any = {};
    this.dashboardService.geModelsById(id).subscribe(
      res => {
        this.modeldetails = res;
        console.log('model details ', data);
        this.modalRef = this.modalService.show(template);
      }
    )
    // this.detailsModalRef = this.dialog.open(ModelDetailsDialogComponent,{
    //   data,
    //   width: '600px',
    //   maxWidth: '600px',
    //   height: 'auto',
    //   panelClass: 'dialog-confirmation'
    // })
  }
  openModal(template: TemplateRef<any>, data: any) {
    this.detailsModalRef = this.dialog.open(ModelDetailsDialogComponent,{
      data,
      width: '600px',
      maxWidth: '600px',
      height: 'auto',
      panelClass: 'dialog-confirmation'
    })
  }
}
