import {Component, OnInit, TemplateRef} from '@angular/core';
import { DashboardChartsData, IChartProps } from './dashboard-charts-data';
import {DashboardService} from "../../service/dashboard/dashboard.service";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {MachineLearningModel} from "../../types/machine-learning-model";
import {select, Store} from "@ngrx/store";
import {ModelState} from "../../store/states/model-state";
import {LoadModels} from "../../store/actions";
import {getModelList} from "../../store/reducers";


@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(private chartsData: DashboardChartsData,
              private modalService: BsModalService,
              private dashboardService: DashboardService,
              private store: Store<ModelState>,
              ) {
  }
  models: MachineLearningModel[];
  machineLearningModels: MachineLearningModel[];
  modalRef?: BsModalRef;
  modelDetails: any;

  ngOnInit(): void {
    this.store.dispatch(new LoadModels());
    this.store.pipe(
      select(getModelList),
    ).subscribe((data) => {
      this.models = data;
      this.machineLearningModels = data;
      console.log('select from store', this.models);
    });
  }


  cardDetails(template: TemplateRef<any>, id: number) {
    let data: any = {};
    this.dashboardService.geModelsById(id).subscribe(
      res => {
        this.modelDetails = res;
        console.log('model details ', data);
        this.modalRef = this.modalService.show(template);
      }
    )
  }

  search($event: Event) {
    const searchText = ($event.target as HTMLInputElement).value.toLowerCase()
    this.models = this.machineLearningModels.filter((o) =>{
      console.log('match', o.name.toLowerCase(), searchText.trim())
      return o.name.toLowerCase().includes(searchText.trim()) || o.description.includes(searchText.trim());
    })
    console.log('Result', searchText, this.models);
  }
}
