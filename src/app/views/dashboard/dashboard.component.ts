import {Component, OnInit, TemplateRef} from '@angular/core';
import { DashboardChartsData, IChartProps } from './dashboard-charts-data';
import {DashboardService} from "../../service/dashboard/dashboard.service";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";


@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(private chartsData: DashboardChartsData,
              private modalService: BsModalService,
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
  }
}
