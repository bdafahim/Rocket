import {Component, OnInit, TemplateRef} from '@angular/core';
import { DashboardChartsData } from './dashboard-charts-data';
import {DashboardService} from "../../service/dashboard/dashboard.service";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {MachineLearningModel, ModelStatus} from "../../types/machine-learning-model";
import {select, Store} from "@ngrx/store";
import {ModelState} from "../../store/states/model-state";
import {ChangeModelState, LoadModels} from "../../store/actions";
import {getModelList, selectStatus} from "../../store/reducers";
import {filter} from "rxjs";


@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  models: MachineLearningModel[];
  machineLearningModels: MachineLearningModel[];
  modalRef?: BsModalRef;
  modelDetails: MachineLearningModel;
  stateButtonText: string;
  tagList = [
    {tag: "Computer Vision"}, {tag: "NLP"}, {tag: "Classification"}, {tag: "Data Visualization"}, {tag: "Education"}
  ];
  mappedModel = {};
  selectedTags: string;
  constructor(private chartsData: DashboardChartsData,
              private modalService: BsModalService,
              private dashboardService: DashboardService,
              private store: Store<ModelState>,
              ) {
  }

  ngOnInit(): void {
    this.getModelsFromStore();
    this.subToStatusChange();
  }

  getModelsFromStore() {
    this.store.dispatch(new LoadModels());
    this.store.pipe(
      select(getModelList),
    ).subscribe((data) => {
      this.models = data;
      this.machineLearningModels = data;
      data.forEach((e) => {
        e.tags.forEach((tag) => {
          if(!this.mappedModel[tag]) {
            this.mappedModel[tag] = [];
          }
          this.mappedModel[tag].push(e);
        })
      })
      console.log('mappedModels ', this.mappedModel);
      console.log('select from store', this.models);
    });
  }

  cardDetails(template: TemplateRef<any>, model: MachineLearningModel) {
    this.modelDetails = this.models.find(o => o.id === model.id)
    this.stateButtonText = this.modelDetails.state;
    console.log('modelDetails', this.modelDetails);
    this.modalRef = this.modalService.show(template);
  }

  search($event: Event) {
    const searchText = ($event.target as HTMLInputElement).value.toLowerCase()
    this.models = this.machineLearningModels.filter((o) =>{
      console.log('match', o.name.toLowerCase(), searchText.trim())
      return o.name.toLowerCase().includes(searchText.trim()) || o.description.toLowerCase().includes(searchText.trim());
    })
    console.log('Result', searchText, this.models);
  }

  changeState(modelDetails: MachineLearningModel) {
    let state;
    state = this.setModelState(modelDetails);
    const payload = {
      id: modelDetails.id,
      state: state
    }
    this.store.dispatch(new ChangeModelState(payload));
    // this.stateButtonText = payload.state;
    console.log(this.modelDetails);
  }

   setModelState(modelDetails: MachineLearningModel) {
    if (modelDetails.state === ModelStatus.ON) {
      return ModelStatus.OFF;
    } else {
      return ModelStatus.ON;
    }
  }

  subToStatusChange() {
    this.store.pipe(
      select(selectStatus),
      filter(u => !!u),
    ).subscribe((data) => {
      this.modelDetails = {...this.modelDetails, state: data.state};
      this.stateButtonText = data.state;
      const idx = this.models.findIndex(e => e.id === data.id);
      const tmpModels = [...this.models];
      tmpModels[idx] = {...tmpModels[idx], state: data.state};
      this.models = tmpModels;
      console.log('select from store', this.models);
    });
  }

  searchByTags() {
    setTimeout(() => {
      // this.models = this.machineLearningModels.filter((o) =>{
      //   return o.tags.indexOf(this.selectedTags.trim()) !== -1;
      // })
      // console.log(this.selectedTags);
      this.models = this.mappedModel[this.selectedTags];
      console.log('hjdssdlkskjd   ', this.models);
    }, 0);
  }

  clearSelectedTags() {
    this.models = this.machineLearningModels;
  }

  copyMessage(val: string) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
}
