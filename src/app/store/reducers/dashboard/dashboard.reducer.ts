import {ModelState} from "../../states/model-state";
import * as fromDashboardAction from "../../actions/dasboard/dashboard.action"

export const initialState: ModelState = {
  models: [],
  loaded: false,
  loading: false,
  loadingError: null,
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
      let updatedModel = state.models.find(o => o.id === action.payload.id)
      let updatedList = state.models;
      const modelToBeUpdated = updatedList.map((obj) => {
        if(obj.id === updatedModel.id) {
          console.log('state ', action.payload.state, ' model ', updatedModel);
          return {...obj, state: action.payload.state};
        }
        return obj;
      })
      // updatedList = [...state.models];
      console.log('Full List ', updatedList);
      return {
        ...state,
        models: modelToBeUpdated
      }
    }
  }
}
