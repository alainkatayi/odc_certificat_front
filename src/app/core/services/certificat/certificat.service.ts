import { Injectable } from '@angular/core';
import { environnement } from '../../../../environnemnts/environnement';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UserLocalService } from '../userLocal/user-local.service';
import { Observable } from 'rxjs';
import { Certificat } from '../../models/certificat';
import { PaginatedCertificat } from '../../models/pagination';

@Injectable({
  providedIn: 'root'
})
export class CertificatService {
  private url = environnement.apiUrl
  constructor(private http: HttpClient, private userLocaService: UserLocalService) { }

  getCertificats(page:number= 1): Observable<PaginatedCertificat>{   
    let params = new HttpParams()
      .set('page', page)
      .set('per_page', 12);
    const headers = this.userLocaService.getAuthHeaders()
    return this.http.get<PaginatedCertificat>(`${this.url}certificats/`, { headers, params })
  }
}


