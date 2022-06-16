import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import {
  AvatarModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  FormModule,
  GridModule,
  NavModule,
  ProgressModule,
  TableModule,
  TabsModule
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { ChartjsModule } from '@coreui/angular-chartjs';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

import {ModelDetailsDialogModule} from "./dialogs/model-details-dialog/model-details-dialog.module";
import {StoreModule} from "@ngrx/store";
import {reducers} from "../../store/reducers";
import {EffectsModule} from "@ngrx/effects";
import {effects} from "../../store/effects";

@NgModule({
  imports: [
    DashboardRoutingModule,
    CardModule,
    NavModule,
    IconModule,
    TabsModule,
    CommonModule,
    GridModule,
    ProgressModule,
    ReactiveFormsModule,
    ButtonModule,
    FormModule,
    ButtonModule,
    ButtonGroupModule,
    ChartjsModule,
    AvatarModule,
    TableModule,
    ModelDetailsDialogModule,
    StoreModule.forFeature('dashboard', reducers),
    EffectsModule.forFeature(effects),
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule {
}
