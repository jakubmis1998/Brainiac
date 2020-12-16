import { HttpClient, HttpHeaders } from '@angular/common/http'

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SmartGuy } from '../interfaces/smart-guy';
import { SmartGuyTable } from '../interfaces/smart-guy-table';
import { endpoints } from '../../../core/endpoints';

@Injectable()
export class ApiService {

  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) { }

  getBrainiacs(pagination: { page: number, per_page: number, total: number }): Observable<SmartGuyTable> {
    return this.http.get<SmartGuyTable>(
      endpoints.glueKickoff(`${ endpoints.smartGuys }?page=${ pagination.page }`),
      { headers: this.httpHeaders }
    );
  }

  addBrainiac(brainiac: SmartGuy): Observable<SmartGuy> {
    return this.http.post<SmartGuy>(
      endpoints.glueKickoff(`${ endpoints.smartGuys }`),
      brainiac,
      { headers: this.httpHeaders }
    );
  }

  deleteBrainiac(id: number): Observable<null> {
    return this.http.delete<null>(
      endpoints.glueKickoff(`${ endpoints.smartGuys }/${ id }`),
      { headers: this.httpHeaders }
    );
  }

  editBrainiac(brainiac: SmartGuy): Observable<SmartGuy> {
    return this.http.put<SmartGuy>(
      endpoints.glueKickoff(`${ endpoints.smartGuys }/${ brainiac.id }`),
      brainiac,
      { headers: this.httpHeaders }
    );
  }

}
