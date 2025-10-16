import { Injectable } from '@angular/core';
import { environnement } from '../../../../environnemnts/environnement';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Formation } from '../../models/formation';
import { Observable } from 'rxjs';
import { UserLocalService } from '../userLocal/user-local.service';
import { PaginatedFormation } from '../../models/pagination';

@Injectable({
  providedIn: 'root'
})
export class FormationService {
  private url = environnement.apiUrl
  constructor(private http: HttpClient, private userLocaService:UserLocalService ) { }

  getFormations(page: number = 1): Observable<PaginatedFormation> {
    let params = new HttpParams()
      .set('page', page)
      .set('per_page', 12);
    const headers = this.userLocaService.getAuthHeaders()
    return this.http.get<PaginatedFormation>(`${this.url}formations`,{headers,params})
  }


}
