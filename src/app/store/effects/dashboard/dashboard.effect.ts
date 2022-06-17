import {Injectable} from "@angular/core";
import {Actions, Effect} from "@ngrx/effects";
import {DashboardService} from "../../../service/dashboard/dashboard.service";
import {ofType} from "@ngrx/effects";
import {catchError, map, switchMap, of, tap} from "rxjs";
import {
  CHANGE_MODEL_STATE, ChangeModelState, ChangeModelStateSuccess,
  LOAD_MODELS, LoadModels,
  LoadModelsFail,
  LoadModelsSuccess
} from "../../actions";
import {Store} from "@ngrx/store";
import {ModelState} from "../../states/model-state";

@Injectable()
export class DashboardEffect {
  constructor(private actions$: Actions, private dashboardService: DashboardService,
  private store: Store<ModelState>
  ) {
  }

  @Effect()
  loadModels$ = this.actions$.pipe(
    ofType(LOAD_MODELS),
    map((action: LoadModels) => action),
    tap(e => console.log('EFFECT CALLED')),
    switchMap((a) => {
      return this.dashboardService.getModels()
        .pipe(
          map((response) => new LoadModelsSuccess({ models: response })),
          catchError((error) => of(new LoadModelsFail({ errorMessage: error }))),
        );
    }),
  )

  @Effect()
  changeModelState$ = this.actions$.pipe(
    ofType(CHANGE_MODEL_STATE),
    map((action: ChangeModelState) => action.payload),
    switchMap((data) => {
      return this.dashboardService.changeModelState(data.id, data.state);
    }),
    tap(e => console.log('CHANGE MODEL EFFECT CALLED')),
    map(
      (res) => new ChangeModelStateSuccess({id: res.id, state: res.state})
    )
  )

}
