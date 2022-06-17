import {ModelState} from "../../states/model-state";
import * as fromDashboardAction from "../../actions/dasboard/dashboard.action"
import {ModelStatus} from "../../../types/machine-learning-model";

export const initialState: ModelState = {
  models: [],
  loaded: false,
  loading: false,
  loadingError: null,
  modelStatus: null,
}

export function dashboardReducer (state = initialState, action: fromDashboardAction.DashboardActions): ModelState {
  switch (action.type) {
    case fromDashboardAction.LOAD_MODELS: {
      console.log('Load models called from reducer',);
      return {
        ...state,
        loading: true,
        loaded: false,
        loadingError: null,
      }
    }

    case fromDashboardAction.LOAD_MODELS_SUCCESS: {
      console.log('payload from reducer: ', action.payload);
      return {
        ...state,
        models: action.payload.models,
        loading: false,
        loaded: true,
        loadingError: null,
      }
    }

    case fromDashboardAction.LOAD_MODELS_FAIL: {
      return {
        ...state,
        loadingError: action.payload.errorMessage,
        loading: false,
        loaded: false,

      }
    }
    case fromDashboardAction.CHANGE_MODEL_STATE: {
      return {
        ...state,
        modelStatus: {
          id: action.payload.id,
          state: action.payload.state === ModelStatus.ON ? ModelStatus.STARTING : ModelStatus.STOPPING
        },
      }
    }

    case fromDashboardAction.CHANGE_MODEL_STATE_SUCCESS: {
      return {
        ...state,
        modelStatus: {
          id: action.payload.id,
          state: action.payload.state,
        },
      }
    }
  }
}
