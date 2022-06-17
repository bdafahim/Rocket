import {Action} from "@ngrx/store";
import {MachineLearningModel} from "../../../types/machine-learning-model";

export const LOAD_MODELS = '[Models] Load Models'
export const LOAD_MODELS_FAIL = '[Models] Load Models Fail'
export const LOAD_MODELS_SUCCESS = '[Models] Load Models Success'
export const CHANGE_MODEL_STATE = '[Model] Change Model State'

export class LoadModels implements Action {
  readonly type = LOAD_MODELS;
  constructor() {
  }
}

export class LoadModelsFail implements Action {
  readonly type = LOAD_MODELS_FAIL;
  constructor(public payload: { errorMessage: string }) {
  }
}

export class LoadModelsSuccess implements Action {
  readonly type = LOAD_MODELS_SUCCESS;
  constructor(public payload: { models: MachineLearningModel[]}) {
  }
}

export class ChangeModelState implements Action {
  readonly type = CHANGE_MODEL_STATE;
  constructor(public payload: {id: number, state: string}) {
  }
}

export type DashboardActions = LoadModels | LoadModelsFail | LoadModelsSuccess | ChangeModelState
