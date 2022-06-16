import {MachineLearningModel} from "../../types/machine-learning-model";

export interface ModelState {
  models: MachineLearningModel[],
  loaded: boolean,
  loading: boolean,
  loadingError: string,
}
