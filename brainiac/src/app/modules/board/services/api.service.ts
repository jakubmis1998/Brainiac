import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SmartGuy } from '../interfaces/smart-guy';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = 'https://reqres.in/api';
  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  getBrainiacs(pagination): Observable<any> {
    return this.http.get(
      this.baseUrl + '/users?page=' + pagination.page,
      { headers: this.httpHeaders }
    );
  }

  addBrainiac(brainiac: SmartGuy): Observable<any> {
    return this.http.post(
      this.baseUrl + '/users/',
      brainiac,
      { headers: this.httpHeaders }
    );
  }

  deleteBrainiac(id: number): Observable<any> {
    return this.http.delete(
      this.baseUrl + '/users/' + id,
      { headers: this.httpHeaders }
    );
  }

  editBrainiac(brainiac: SmartGuy): Observable<any> {
    return this.http.put(
      this.baseUrl + '/users/' + brainiac.id,
      brainiac,
      { headers: this.httpHeaders }
    );
  }

  constructor(private http: HttpClient) { }
}
