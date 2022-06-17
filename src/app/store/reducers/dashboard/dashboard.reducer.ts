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
      // if (action.payload.state !== 'On' && action.payload.state !== 'Off') {
      //   setTimeout(() => {
      //     let currentState = action.payload.state;
      //     // this.store.dispatch(new ChangeModelState({id: action.payload.id, state: currentState === 'Starting' ? 'On' : 'Off'}));
      //     console.log('TIMEOUT FUNC');
      //   }, 3000);
      // }

      /*let index = state.models.findIndex(o => o.id === action.payload.id);
      let updatedList = [...state.models];
      console.log('INDEX: ', index, updatedList);
      let currentState = action.payload.state;
      updatedList[index] = {...updatedList[index], state: currentState};
      console.log('Full List ', updatedList);*/
      return {
        ...state,
        modelStatus: {
          id: action.payload.id,
          state: action.payload.state === ModelStatus.ON ? ModelStatus.STARTING : ModelStatus.STOPPING
        },
      }
    }

    case fromDashboardAction.CHANGE_MODEL_STATE_SUCCESS: {
      /*if (action.payload.state !== 'On' && action.payload.state !== 'Off') {
          console.log('TIMEOUT FUNC...', action.payload);
          let index = state.models.findIndex(o => o.id === action.payload.id);
          let updatedList = [...state.models];
          console.log('INDEX2: ', index, updatedList);
          let currentState = action.payload.state;
          updatedList[index] = {...updatedList[index], state: currentState === 'Starting' ? 'On' : 'Off'};
          return {
            ...state,
            models: updatedList
          }
          // this.store.dispatch(new ChangeModelState({id: action.payload.id, state: currentState === 'Starting' ? 'On' : 'Off'}));
      }*/
      return {
        ...state,
        modelStatus: {
          id: action.payload.id,
          state: action.payload.state,
        },
      }
    }
  }

  function changeStateWithDelay(payload: { id: number; state: string}): number {
      return setTimeout(() => {
        console.log('TIMEOUT FUNC');
        let index = state.models.findIndex(o => o.id === payload.id);
        let updatedList = [...state.models];
        let currentState = payload.state;
        updatedList[index] = {...updatedList[index], state: currentState === 'Starting' ? 'On' : 'Off'};
        return {
          ...state,
          models: updatedList
        };
      }, 1000);
  }
}
