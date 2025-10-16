import { Injectable } from '@angular/core';

import { json } from 'stream/consumers';
import { HttpHeaders } from '@angular/common/http';
import { AuthLoginData, AuthLoginResponse } from '../../models/auth';
import { User } from '../../models/user';
const SESSION_KEY = 'userSession';
@Injectable({
  providedIn: 'root'
})
export class UserLocalService {

  constructor() { }

  storeUserLocal(response:AuthLoginResponse):void{
    localStorage.setItem(SESSION_KEY,JSON.stringify(response))
  }

  getUser():AuthLoginResponse | null {
    if(typeof localStorage === 'undefined'){
      return null
    }
    const dataUser = localStorage.getItem(SESSION_KEY)
    return dataUser ? JSON.parse(dataUser) as AuthLoginResponse : null
  }

  getAuthHeaders():HttpHeaders {
    const user = this.getUser();
    return new HttpHeaders({
      Accept :'application/json',
      Authorization: `Bearer ${user?.token}`
    })

  }
}