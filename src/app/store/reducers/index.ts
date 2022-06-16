import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import {ModelState} from "../states/model-state";
import {dashboardReducer} from "./dashboard/dashboard.reducer";
import {getModels} from '../selectors/dashboard/dashboard.selector'

export interface State {
  modelState: ModelState,
}

export const reducers: ActionReducerMap<State> = {
  modelState: dashboardReducer,
};

export const getDashboardState = createFeatureSelector<State>('dashboard');
export const getModelState = createSelector(getDashboardState, (state: State) => state.modelState);
export const getModelList = createSelector(getModelState , getModels);


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
