import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    private http: HttpClient,
  ) { }

  getRegionData(region: string) {
    return this.http.get<any>('https://restcountries.eu/rest/v2/region/'+region, { observe: 'response' });
  }


}
