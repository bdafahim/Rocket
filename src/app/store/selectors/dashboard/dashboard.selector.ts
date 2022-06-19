import {ModelState} from "../../states/model-state";

export const getModels = (state: ModelState) => state.models;
export const getStatus = (state: ModelState) => state.modelStatus;
