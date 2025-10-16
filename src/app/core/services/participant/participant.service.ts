import { Injectable } from '@angular/core';
import { Participant } from '../../models/participant';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environnement } from '../../../../environnemnts/environnement';
import { UserLocalService } from '../userLocal/user-local.service';
import { PaginatedParticipant } from '../../models/pagination';

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {

  private url = environnement.apiUrl
  constructor(private http: HttpClient, private userLocaService: UserLocalService) { }

  getParticipants(page:number = 1): Observable<PaginatedParticipant> {
    let params = new HttpParams()
      .set('page', page)
      .set('per_page', 12);
    const headers = this.userLocaService.getAuthHeaders()
    return this.http.get<PaginatedParticipant>(`${this.url}participants`, { headers, params })
  }

}
