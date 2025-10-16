import { User } from "./user"

export interface AuthLoginData{
    eamil:string
    password:string
}

export interface AuthLoginResponse{
    name:string,
    email:string,
    email_verified_at:string,
    created_at:string,
    updated_at:string,
    token:string
}