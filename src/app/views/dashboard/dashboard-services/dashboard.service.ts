import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  baseUrl = 'http://localhost:3000';
  constructor(private  http: HttpClient) { }
  getModels() {
    const url = `${this.baseUrl}/models`
    return this.http.get(url)
  }
  geModelsById(id: number) {
    const url = `${this.baseUrl}/models/${id}`
    return this.http.get(url);
  }
}
