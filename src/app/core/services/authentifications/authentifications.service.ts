import { Router } from 'express';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environnement } from '../../../../environnemnts/environnement';
import { AuthLoginData, AuthLoginResponse } from '../../models/auth';
import { Observable } from 'rxjs';
import { UserLocalService } from '../userLocal/user-local.service';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationsService {
  private url = environnement.apiUrl
  constructor(private http:HttpClient,private userLocalService:UserLocalService) { }

  login(data:AuthLoginData):Observable<AuthLoginResponse>{
    return this.http.post<AuthLoginResponse>(`${this.url}login`, data)
  }

  logOut(){
    localStorage.clear()

  }
}
