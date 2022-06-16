import {ModelState} from "../../states/model-state";

export const getModels = (state: ModelState) => state.models;
export const getModelsLoading = (state: ModelState) => state.loading;
export const getModelsLoaded = (state: ModelState) => state.loaded;
export const getModelsLoadingError = (state: ModelState) => state.loadingError;
