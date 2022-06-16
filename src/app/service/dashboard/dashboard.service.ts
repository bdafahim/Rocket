import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {MachineLearningModel} from "../../types/machine-learning-model";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  baseUrl = 'http://localhost:3000';
  constructor(private  http: HttpClient) { }
  getModels(): Observable<MachineLearningModel[]> {
    const url = `${this.baseUrl}/models`
    return this.http.get(url)
      .pipe(
        catchError((err) => {
          return err.message;
        })
      ) as Observable<MachineLearningModel[]>
  }
  geModelsById(id: number) {
    const url = `${this.baseUrl}/models/${id}`
    return this.http.get(url);
  }
}
