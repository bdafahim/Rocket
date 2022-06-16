import {Injectable} from "@angular/core";
import {Actions, Effect} from "@ngrx/effects";
import {DashboardService} from "../../../service/dashboard/dashboard.service";
import {ofType} from "@ngrx/effects";
import {catchError, map, switchMap, of, tap} from "rxjs";
import {
  LOAD_MODELS, LoadModels,
  LoadModelsFail,
  LoadModelsSuccess
} from "../../actions";

@Injectable()
export class DashboardEffect {
  constructor(private actions$: Actions, private dashboardService: DashboardService) {
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
}
